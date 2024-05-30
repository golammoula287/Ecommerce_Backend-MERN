const nodemailer = require("nodemailer");


const EmailSend = async (EmailTo,EmailText,EmailSubject)=>{


    let Transport = nodemailer.createTransport({
        host: `${process.env.host}`,
        port: 25,
        secure: false,
        auth: {user: `${process.env.mail}`, pass: `${process.env.pass}`},
        tls: {rejectUnauthorized: false},
    })


    let MailOption = {

        from: `MERN ECOMMERCE SOLUTION <${process.env.mail}>`,
        to: EmailTo,
        subject: EmailSubject,
        text: EmailText,

    }

    return await Transport.sendMail(MailOption)

}


module.exports = EmailSend;