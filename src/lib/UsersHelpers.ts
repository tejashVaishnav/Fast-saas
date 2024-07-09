import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import prisma from "./utils";

export async function isAutorizedto() {
  const session = await getServerSession(authOptions);

  if (session) {
    const user = await prisma.user.findFirst({
      where: { email: session.user?.email },
    });

    if (!user?.stripeCurrentPeriodEnd) {
      return false; //means no access
    }
    const endDate = new Date(user.stripeCurrentPeriodEnd);
    const currentDate = new Date();

    return !(endDate < currentDate); //if true then has access else no access
  }

  return false;
}


//TODO:
export async function removeUsers() {
  return true
}