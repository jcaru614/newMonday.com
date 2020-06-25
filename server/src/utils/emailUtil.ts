import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import dotenv from 'dotenv';
dotenv.config();

class EmailUtil {

    private transporter: Mail;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'jcaruana614@gmail.com',
                pass: 'Trijicon19!'
            }
        })
    }

    public send(data: any): void {
        const mailOptions: Mail.Options = {
            from: 'jcaruana614@gmail.com',
            to: data.email,
            subject: "Welcome to newMonday.com!",
            html: ` 
            <p>Greetings ${data.firstName},</p>
            <p>Welcome to newMonday.com! Hope you enjoy your projects and stories staying on track with your team.</p>
            <p>Sincerely,</p>
            <p>newMonday Team</p>
            <img width="150px" src="cid:monday@monday.20">
            `,
            attachments: [{
                filename: 'logo.png',
                path: '../client/public/logo.png',
                cid: 'monday@monday.20' //same cid value as in the html img src
            }]
        };
        this.transporter.sendMail(mailOptions, (error: Error | null, info: any) => {
            if (error) {
                console.log(error);
            } else {
                console.log(info);
            }
        })
    }


}

export default new EmailUtil();