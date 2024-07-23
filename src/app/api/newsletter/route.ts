// app/api/newsletter/route.ts

import { NextResponse } from 'next/server';
import { z } from 'zod';
import  prisma  from '@/lib/utils'; // Adjust this import based on your Prisma setup
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/options';

const newsletterSchema = z.object({
  email: z.string().email(),
});

export async function POST(request: Request) {
  
  const session =  await getServerSession(authOptions)
  const user = await prisma.user.findFirst({where:{email:session?.user.email},select:{UserAccessLevel:true}})
  
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 })
  }

  if (user?.UserAccessLevel !== "Pro") {
    return NextResponse.json({ error: 'Pro subscription required' }, { status: 403 })
  }


  try {
    const body = await request.json();
    const { email } = newsletterSchema.parse(body);

    // Check if the email already exists
    const existingSubscriber = await prisma.newsletter.findUnique({
      where: { email },
    });

    if (existingSubscriber) {
      return NextResponse.json({ message: 'Email already subscribed' }, { status: 409 });
    }

    // If email doesn't exist, create a new subscription
    const subscriber = await prisma.newsletter.create({
      data: { email },
    });

    return NextResponse.json({ message: 'Subscribed to newsletter successfully', subscriber });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error('Newsletter subscription error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

function auth() {
  throw new Error('Function not implemented.');
}
