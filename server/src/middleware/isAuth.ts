import { MiddlewareFn } from "type-graphql";
import { verify } from "jsonwebtoken";
import { AuthContext } from "../types";

export const isAuth: MiddlewareFn<AuthContext> = ({ context }, next) => {
    const authorization = context.req.headers["authorization"];

    if (!authorization) {
        console.log("Not authenticated.");
    } else {
        try {
            const token = authorization.split(" ")[1];
            const payload = verify(token, process.env.ACCESS_TOKEN_SECRET as string);
            context.payload = payload as any;
        } catch (error) {
            console.log(error);
        }
    }

    return next();
};
