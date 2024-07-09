import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  createCheckoutLink,
  createCustomerIfNull,
  generateCustomerPortalLink,
  hasSubscription,
} from "@/lib/Stripe";
import { isAutorizedto } from "@/lib/UsersHelpers";
import prisma, { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { ArrowRight, Check, Star } from "lucide-react";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { authOptions } from "../../api/auth/[...nextauth]/options";
import DashboardSettings from "@/components/layout/dashboard/settings/settings";
 
export default async function page() {

  const session = await getServerSession(authOptions);
 

  return (
    <>
      <section className="container w-full">
       <DashboardSettings />
      </section>
      
    </>
  );
}
