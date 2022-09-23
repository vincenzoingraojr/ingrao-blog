import "dotenv/config";
import "reflect-metadata";
import express from "express";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/UserResolver";
import path from "path";
import favicon from "serve-favicon";
import cors from "cors";
import cookieParser from "cookie-parser";
import { verify } from "jsonwebtoken";
import { User } from "./entities/User";
import { createAccessToken, createRefreshToken } from "./auth/auth";
import { sendRefreshToken } from "./auth/sendRefreshToken";
import { PostResolver } from "./resolvers/PostResolver";
import { initAdmin } from "./helpers/initAdmin";
import { getPresignedUrl } from "./helpers/getPresignedUrl";

async function main() {
    const app = express();

    app.use(cookieParser());

    const allowList = [
        process.env.CLIENT_ORIGIN!,
        process.env.DASHBOARD_ORIGIN!,
    ];

    app.use(
        cors({
            origin(requestOrigin, callback) {
                if (allowList.indexOf(requestOrigin!) !== -1) {
                    callback(null, true);
                } else {
                    callback(null, false);
                }
            },
            credentials: true,
        })
    );

    app.use(express.static(path.join(__dirname, "./public")));
    app.use(favicon(path.join(__dirname, "./public", "favicon.ico")));
    app.get(process.env.NODE_ENV === "production" ? "/*" : "/", (_req, res) => {
        res.sendFile("index.html", {
            root: path.join(__dirname, "./public"),
        });
    });

    app.use(express.json());

    app.post("/", async (req, res) => {
        const token = req.cookies.cke;

        if (!token) {
            return res.send({ ok: false, accessToken: "" });
        }

        let payload: any = null;

        try {
            payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
        } catch (error) {
            console.error(error);
            return res.send({ ok: false, accessToken: "" });
        }

        const user = await User.findOne({ id: payload.id });

        if (!user) {
            return res.send({ ok: false, accessToken: "" });
        }

        if (user.tokenVersion !== payload.tokenVersion) {
            return res.send({ ok: false, accessToken: "" });
        }

        sendRefreshToken(res, createRefreshToken(user));

        return res.send({ ok: true, accessToken: createAccessToken(user) });
    });

    await createConnection({
        type: "postgres",
        url: process.env.DATABASE_URL,
        synchronize: true,
        logging: false,
        entities: ["src/entities/*.ts"],
        migrations: ["src/migrations/*.ts"],
        subscribers: ["src/subscribers/*.ts"],
        cli: {
            entitiesDir: "src/entities",
            migrationsDir: "src/migrations",
            subscribersDir: "src/subscribers",
        },
        ssl:
            process.env.NODE_ENV === "production"
                ? { rejectUnauthorized: false }
                : false,
    });

    const server = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolver, PostResolver],
        }),
        context: ({ req, res }) => ({ req, res }),
    });

    await server.start();

    server.applyMiddleware({ app, cors: false });

    app.listen({ port: process.env.PORT || 4000 }, () => {
        console.log("Express server started.");
    });

    app.post("/presigned-url", async (req, res) => {
        const { key } = req.body;
        const url = await getPresignedUrl(key);
        res.send({ url: url });
    });

    await initAdmin();
}

main().catch((error) => {
    console.log(error);
});
