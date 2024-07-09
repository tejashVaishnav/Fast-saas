import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export   async function POST(req: NextRequest, res: NextResponse) {
  // Verify the request is from your cron job service
  // This is important for security
  const apiKey = req.headers.get('x-api-key');
     
    if (apiKey !== process.env.CRON_API_KEY!) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  try {
    const currentDate = new Date();

    // Find all users whose subscription has ended
    const usersToUpdate = await prisma.user.findMany({
      where: {
        stripeCurrentPeriodEnd: {
          lt: currentDate
        }
      }
    });

    // Update these users to remove their access
    const updatePromises = usersToUpdate.map(user =>
      prisma.user.update({
        where: { id: user.id },
        data: { stripeCurrentPeriodEnd: null }
      })
    );

    await Promise.all(updatePromises);
    return new NextResponse(
      JSON.stringify({ error: "Webhook Error: No user present in metadata",message: `Updated ${usersToUpdate.length} users` }),
      {
        status: 200,
      }
    );
   
  } catch (error) {
    console.error('Error in subscription check cron job:', error);
    return new NextResponse(
      JSON.stringify({ error: "Internal server error"}),
      {
        status: 500,
      }
    );
    
  } finally {
    await prisma.$disconnect();
  }
}