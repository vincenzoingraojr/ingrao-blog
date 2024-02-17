import { User } from "../entities/User";
import { sign } from "jsonwebtoken";

export const createAccessToken = (user: User) => {
    return sign(
        { id: user.id, role: user.role },
        process.env.ACCESS_TOKEN_SECRET as string,
        {
            expiresIn: "15m",
        }
    );
};

export const createRefreshToken = (user: User) => {
    return sign(
        {
            id: user.id,
            role: user.role,
            tokenVersion: user.tokenVersion,
        },
        process.env.REFRESH_TOKEN_SECRET as string,
        {
            expiresIn: "7d",
        }
    );
};
