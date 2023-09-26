import { Response } from "express";

export const createUniqueIdentifier = (res: Response, identifier: string) => {
    res.cookie("uid", identifier, {
        httpOnly: true,
        path: "/",
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
        secure: true,
    });
};