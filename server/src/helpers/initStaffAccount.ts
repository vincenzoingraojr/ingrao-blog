import { User } from "../entities/User";
import appDataSource from "../dataSource";
import aws from "aws-sdk";
import { createAccessToken } from "../auth/auth";
import ejs from "ejs";
import path from "path";

export async function initStaffAccount() {
    const userRepository = appDataSource.getRepository(User);

    const ses = new aws.SES({
        credentials: {
            accessKeyId: process.env.SES_KEY_ID as string,
            secretAccessKey: process.env.SES_SECRET_KEY as string,
        },
        region: "eu-south-1",
    });

    let adminUser = await userRepository.findOne({
        where: { email: process.env.ADMIN_EMAIL },
    });

    if (!adminUser) {
        const result = await userRepository
            .createQueryBuilder()
            .insert()
            .into(User)
            .values({
                email: process.env.ADMIN_EMAIL,
                firstName: "Staff",
                lastName: "",
                title: "Mr.",
                gender: "Male",
                birthDate: "2002-01-24",
                role: "admin",
                newsletterSubscribed: true,
                verified: true,
                profilePicture: "https://storage.ingrao.blog/brand/logo.png",
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
                            ToAddresses: [process.env.ADMIN_EMAIL as string],
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
                            console.log("Staff user initialized.");
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                }
            }
        );
    }
}
