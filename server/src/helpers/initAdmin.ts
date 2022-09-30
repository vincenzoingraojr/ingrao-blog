import { User } from "../entities/User";
import { getConnection } from "typeorm";
import { createAccessToken } from "../auth/auth";
import aws from "aws-sdk";
import ejs from "ejs";
import path from "path";

export async function initAdmin() {
    const ses = new aws.SES({
        credentials: {
            accessKeyId: process.env.SES_KEY_ID!,
            secretAccessKey: process.env.SES_SECRET_KEY!,
        },
        region: "eu-south-1",
    });

    let users = await User.find({
        where: { role: "admin" || "writer" },
    });

    let adminUser = await User.findOne({
        where: { email: "vincent@ingrao.blog" },
    });

    if (!adminUser && users.length === 0) {
        const result = await getConnection()
            .createQueryBuilder()
            .insert()
            .into(User)
            .values({
                email: "vincent@ingrao.blog",
                firstName: "Vincenzo Jr.",
                lastName: "Ingrao",
                title: "Mr.",
                gender: "Male",
                birthDate: "2002-01-24",
                role: "admin",
                verified: true,
            })
            .returning("*")
            .execute();
        const user = result.raw[0];
        const token = createAccessToken(user);
        const link = `${process.env.DASHBOARD_ORIGIN}/complete-account/${token}`;

        ejs.renderFile(
            path.join(__dirname, "./templates/CompleteAccount.ejs"),
            { link: link },
            function (error, data) {
                if (error) {
                    console.log(error);
                } else {
                    const params: aws.SES.SendEmailRequest = {
                        Destination: {
                            ToAddresses: ["vincent@ingrao.blog"],
                        },
                        Message: {
                            Body: {
                                Html: {
                                    Data: data,
                                },
                            },
                            Subject: {
                                Data: "Complete your account",
                            },
                        },
                        Source: "noreply@ingrao.blog",
                    };

                    ses.sendEmail(params)
                        .promise()
                        .then(() => {
                            console.log("Admin user initialized.");
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                }
            }
        );
    }
}
