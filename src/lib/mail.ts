import nodemailer from 'nodemailer';

interface SendMailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendMail({ to, subject, html }: SendMailOptions) {
  const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;

  // Create a transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: SMTP_EMAIL || 'bernardasare040@gmail.com',
      pass: SMTP_PASSWORD,
    },
  });

  // Send mail
  return await transporter.sendMail({
    from: `"PCD System" <${SMTP_EMAIL || 'bernardasare040@gmail.com'}>`,
    to,
    subject,
    html,
  });
}