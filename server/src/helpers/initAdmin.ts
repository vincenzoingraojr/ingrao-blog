import { User } from "../entities/User";
import { getConnection } from "typeorm";
import { createAccessToken } from "../auth/auth";
import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";

export async function initAdmin() {
    let transporter = nodemailer.createTransport({
        host: "authsmtp.securemail.pro",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
        tls: {
            rejectUnauthorized: false,
        },
    });
    
    let adminUser = await User.findOne({ where: { email: "vincent@ingrao.blog" } });

    if (!adminUser) {
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
            path.join(
                __dirname,
                "./templates/CompleteAccount.ejs"
            ),
            { link: link },
            function (error, data) {
                if (error) {
                    console.log(error);
                } else {
                    transporter.sendMail({
                        from: "ingrao.blog <info@ingrao.blog>",
                        to: "vincent@ingrao.blog",
                        subject: "Complete your account",
                        html: data,
                    });

                    console.log("Admin user initialized.");
                }
            }
        );
    }
}
