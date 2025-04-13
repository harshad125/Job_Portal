import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

export const sendEmail = (To, Subject, Text) => {
  let mailDetails = {
    from: process.env.EMAIL,
    to: To,
    subject: Subject,
    text: Text,
  };

  transporter.sendMail(mailDetails, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log('email send successfully');
    }
  });
};
