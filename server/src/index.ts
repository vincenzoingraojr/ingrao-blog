import "dotenv/config";
import "reflect-metadata";
import express from "express";
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
import { NewsletterResolver } from "./resolvers/NewsletterResolver";
import { CommentResolver } from "./resolvers/CommentResolver";
import { createUniqueIdentifier } from "./helpers/createUniqueIdentifier";
import { v4 as uuidv4 } from "uuid";
import appDataSource from "./dataSource";

async function main() {
    const app = express();

    app.use(cookieParser());

    const allowList = [
        process.env.CLIENT_ORIGIN as string,
        process.env.DASHBOARD_ORIGIN as string,
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

    await appDataSource.initialize()
        .then(() => {
            console.log("Data source ready.");
        })
        .catch((error) => {
            console.error("Error during data source initialization", error);
        });

    app.post("/", async (req, res) => {
        const userRepository = appDataSource.getRepository(User);

        const token = req.cookies.cke;
        const identifier = req.cookies.uid;

        if (!identifier) {
            createUniqueIdentifier(res, uuidv4());
        }

        if (!token) {
            return res.send({ ok: false, accessToken: "", role: "" });
        }

        let payload: any = null;

        try {
            payload = verify(token, process.env.REFRESH_TOKEN_SECRET as string);
        } catch (error) {
            console.error(error);
            return res.send({ ok: false, accessToken: "", role: "" });
        }

        const user = await userRepository.findOne({ where: { id: payload.id } });

        if (!user) {
            return res.send({ ok: false, accessToken: "", role: "" });
        }

        if (user.tokenVersion !== payload.tokenVersion) {
            return res.send({ ok: false, accessToken: "", role: "" });
        }

        sendRefreshToken(res, createRefreshToken(user));

        return res.send({ ok: true, accessToken: createAccessToken(user), role: user.role });
    });

    const server = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolver, PostResolver, NewsletterResolver, CommentResolver],
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
