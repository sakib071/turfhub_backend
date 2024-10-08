"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = require("nodemailer");
const sendEmail = (email, template, subject) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = (0, nodemailer_1.createTransport)({
        host: 'mail.turfhubb.com', // e.g., smtp.gmail.com for Gmail
        port: 587, // 587 for TLS or 465 for SSL
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'hello@turfhubb.com', // your email address
            pass: 'TUFmS2as68]?', // your email password or app password
        },
    });
    const mailOptions = {
        from: {
            name: 'turfhub',
            address: 'hello@turfhubb.com',
        },
        to: Array.isArray(email) ? email : [email], // Ensure `to` is always an array
        subject,
        html: template,
    };
    try {
        yield transporter.sendMail(mailOptions);
        return { success: true };
    }
    catch (error) {
        console.error(error, 'from sendEmail error');
        return { success: false };
    }
});
exports.sendEmail = sendEmail;
// export const sendEmail = async (to: string, html: string, subject: string) => {
//   const transporter = nodemailer.createTransport({
//     host: 'mail.turfhubb.com',
//     port: 465,
//     secure: config.NODE_ENV === 'production' ? true : true,
//     auth: {
//       // TODO: replace `user` and `pass` values from <https://forwardemail.net>
//       user: 'hello@turfhubb.com',
//       pass: 'TUFmS2as68]?',
//     },
//   })
//   await transporter.sendMail({
//     from: 'hello@turfhubb.com', // sender address
//     to, // list of receivers
//     subject: `${subject}`, // Subject line
//     text: '', // plain text body
//     html: `${html}`, // html body
//   })
// }
// /*
// MAIL_MAILER=smtp
// MAIL_HOST=mail.turfhubb.com
// MAIL_PORT=465
// MAIL_USERNAME=hello@turfhubb.com
// MAIL_PASSWORD="TUFmS2as68]?"
// MAIL_ENCRYPTION=ssl
// MAIL_FROM_ADDRESS=hello@turfhubb.com
// MAIL_FROM_NAME=Turfhub
// */
