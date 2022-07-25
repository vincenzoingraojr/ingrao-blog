import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";

export const sendVerificationEmail = (email: string, origin: string, token: string) => {
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

    const link = `${origin === "dash" ? process.env.DASHBOARD_ORIGIN : process.env.CLIENT_ORIGIN}/verify/${token}`;

    ejs.renderFile(
        path.join(__dirname, "/templates/VerifyEmail.ejs"),
        { link: link },
        function (error, data) {
            if (error) {
                console.log(error);
            } else {
                transporter.sendMail({
                    from: "ingrao.blog <info@ingrao.blog>",
                    to: email,
                    subject: "Verify your account",
                    html: data,
                });
            }
        }
    );
};
