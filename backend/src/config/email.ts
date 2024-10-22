import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

export const smtpTransport = nodemailer.createTransport({
  pool: true,
  maxConnections: 1,
  service: 'naver',
  host: 'smtp.naver.com',
  port: 587,
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const generateRandomNumber = (min: number, max: number) => {
  let randNum = Math.floor(Math.random() * (max - min + 1)) + min;
  return randNum;
};
