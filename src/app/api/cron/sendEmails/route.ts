import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/utils'
import nodemailer from 'nodemailer'
import { render } from '@react-email/render'
import Newsletter from '@/components/Emails/NewsLetter'
import { NextResponse } from 'next/server'


export async function POST(request: Request) {

    const apiKey = request.headers.get('x-api-key');
     
    if (apiKey !== process.env.CRON_API_KEY!) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  
    try {
      // Fetch all newsletter subscribers
      const subscribers = await prisma.newsletter.findMany()

      // Create Nodemailer transporter
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
      })

      // Send emails to all subscribers
      for (const subscriber of subscribers) {
        const emailHtml = render(Newsletter({ userFirstName: subscriber.email.split('@')[0] }))

        await transporter.sendMail({
          from: '"FastSaas" <noreply@yourcompany.com>',
          to: subscriber.email,
          subject: 'Your Monthly Newsletter',
          html: emailHtml,
        })

        console.log("email send" +subscriber.email.split('@')[0])
      }

      return NextResponse.json({ message: 'Newsletters sent successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error sending newsletters:', error);
        return NextResponse.json({ error: 'Failed to send newsletters' }, { status: 500 });
    
    }
 
}

