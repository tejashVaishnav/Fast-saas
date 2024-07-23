import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import Stripe from "stripe";

import { randomUUID } from "crypto";
import prisma from "./utils";

//price_1NarR3APMZcBliJSoefCKTi5

export const stripe = new Stripe(process.env.STRIPE_SK!, {
  apiVersion: "2024-06-20",
});

export async function hasSubscription() {
  const session = await getServerSession(authOptions);

  if (session) {
    const user = await prisma.user.findFirst({
      where: { email: session.user?.email },
    });

    const subscriptions = await stripe.subscriptions.list({
      customer: String(user?.stripe_customer_id),
    });

    return subscriptions.data.length > 0;
  }

  return false;
}

export async function createCheckoutLink(
  customer: string,
  price_id: string,
  userID: string
) {
  const checkout = await stripe.checkout.sessions.create({
    success_url: process.env.NEXTAUTH_URL + "/dashboard",
    cancel_url: process.env.NEXTAUTH_URL + "/dashboard",
    customer: customer,
    billing_address_collection: 'required',
    metadata: {
      userId: userID,
    },
    line_items: [
      {
        price: price_id,
        quantity: 1,
      },
    ],
    mode: "subscription",
  });

  return checkout.url;
}
// Generate Customer portal
export async function generateCustomerPortalLink(customerId: string) {
  try {
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: process.env.NEXTAUTH_URL + "/dashboard",
    });

    return portalSession.url;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

export async function createCustomerIfNull() {
  const session = await getServerSession(authOptions);

  if (session) {
    const user = await prisma.user.findFirst({
      where: { email: session.user?.email },
    });

    if (!user?.stripe_customer_id) {
      const customer = await stripe.customers.create({
        email: String(user?.email),
      });

      await prisma.user.update({
        where: {
          id: user?.id,
        },
        data: {
          stripe_customer_id: customer.id,
        },
      });
    }
    const user2 = await prisma.user.findFirst({
      where: { email: session.user?.email },
    });
    return user2?.stripe_customer_id;
  }
}
