import WelcomeEmail from "@/components/Emails/WelcomeEmail";

import { render } from "@react-email/components";
import nodemailer from "nodemailer";

export async function sendWelcomeEmail({
  name: userFirstname,
  email,
}: {
  name: string | null | undefined;
  email: string | null | undefined;
}) {
  const emailHtml = render(WelcomeEmail({ userFirstname }));
  const transporter = nodemailer.createTransport({
    host: "smtp.google.com",
    secure: true,
    service: "Gmail",
    port: 25,
    auth: {
      user: process.env.GOOGLE_ID!,
      pass: process.env.GOOGLE_PASS!,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  try {
    // Send the email using the Resend API
    await transporter.sendMail({
      from: "Tejas from FastSaas <knifergamingyt@gmail.com>",
      to: email as string,
      subject: "Welcome to Fast-SaaS!",
      html: emailHtml,
    });
  } catch (error) {
    // Log any errors and re-throw the error
    console.log({ error });
    throw error;
  }
}
