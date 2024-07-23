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
import { authOptions } from "../api/auth/[...nextauth]/options";
import { link } from "fs";
import { ContactUsForm } from "@/components/layout/dashboard/contact-us";
import { notFound } from "next/navigation";
import { NewsLetterForm } from "@/components/layout/dashboard/newsLetterform";

enum PopularPlan {
  NO = 0,
  YES = 1,
}

interface PlanProps {
  title: string;
  popular: PopularPlan;
  priceId: string | null;
  price: number;
  description: string;
  link: string;
  buttonText: string;
  benefitList: string[];
}
const plans: PlanProps[] = [
  {
    title: "Free",
    priceId: process.env.STRIPE_FREE_SUB_ID!,
    popular: 0,
    price: 0,
    link: "trial",
    description:
      "Lorem ipsum dolor sit, amet ipsum consectetur adipisicing elit.",
    buttonText: "Start Free Trial",
    benefitList: [
      "1 team member",
      "1 GB storage",
      "Upto 2 pages",
      "Community support",
      "AI assistance",
    ],
  },
  {
    title: "Pro",
    popular: 1,
    price: 45,
    link: "pro",
    priceId: process.env.STRIPE_PRO_SUB_ID!,
    description:
      "Lorem ipsum dolor sit, amet ipsum consectetur adipisicing elit.",
    buttonText: "Get starterd",
    benefitList: [
      "4 team member",
      "8 GB storage",
      "Upto 6 pages",
      "Priority support",
      "AI assistance",
    ],
  },
  {
    title: "Enterprise",
    priceId: null,
    popular: 0,
    link: "contact-us",
    price: 120,
    description:
      "Lorem ipsum dolor sit, amet ipsum consectetur adipisicing elit.",
    buttonText: "Contact US",
    benefitList: [
      "10 team member",
      "20 GB storage",
      "Upto 10 pages",
      "Phone & email support",
      "AI assistance",
    ],
  },
];

export default async function page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    notFound();
  }

  await createCustomerIfNull();

  const user = await prisma.user.findFirst({
    where: {
      email: session?.user?.email,
    },
  });

  const manage = await generateCustomerPortalLink(
    user?.stripe_customer_id as string
  );

  const userSubStatus = await hasSubscription();

  const checkOutLink = await createCheckoutLink(
    user?.stripe_customer_id as string,
    process.env.STRIPE_PRO_SUB_ID!,
    user?.id as string
  );

  const userAccess = await isAutorizedto();

  return (
    <>
      <section className="container w-full">
        <div className="grid place-items-center lg:max-w-screen-xl gap-8 mx-auto py-10 md:py-10">
          <div className="text-center space-y-8">
            <div className="absolute top-2 lg:-top-8 left-1/2 transform -translate-x-1/2 w-[90%] mx-auto h-24 lg:h-80 bg-primary/50 rounded-full blur-3xl"></div>

            <div className="max-w-screen-md mx-auto text-center flex flex-col gap-5 items-center justify-center text-4xl md:text-6xl font-bold">
              <Image
                src={session?.user?.image as string}
                alt=""
                height={100}
                width={100}
                className="rounded-full z-[9]"
              />{" "}
              <h1 className="z-[9]">
                Welcome Back
                <br />
                <span className="text-transparent px-2   bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text">
                  {session?.user?.name}
                </span>
              </h1>
            </div>
            <p className="max-w-screen-sm mx-auto text-xl text-muted-foreground">
              {userAccess
                ? `welcome your current plan gives you full access for 
                     ${formatDistanceToNow(
                       user?.stripeCurrentPeriodEnd as Date,
                       { addSuffix: false }
                     )}`
                : `creators. Get access to exclusive resources, tutorials, and support.`}
            </p>

            <div className="space-y-4 md:space-y-0 md:space-x-4">
              <Link
                href={"/github"}
                target="_blank"
                className={cn(
                  "w-5/6 md:w-1/4 font-bold group/arrow",
                  buttonVariants({ variant: "default" })
                )}
              >
                Get Started
                <ArrowRight className="size-5 ml-2 group-hover/arrow:translate-x-1 transition-transform" />
              </Link>

              <Button
                asChild
                variant="secondary"
                className="w-5/6 md:w-1/4 font-bold"
              >
                <Link href={manage as string} target="_blank">
                  Manage Billing
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section id="pricing" className="container py-24 sm:py-24 sm:px-48">
        <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
          Pricing
        </h2>

        <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
          Get unlimitted access
        </h2>

        <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground pb-14">
          {userSubStatus
            ? "Upgrade to out premium business plan for your growing plaform"
            : "currently you dont have any running subsciption get stated by purchasing the right plane that suits you"}
        </h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-4">
          {plans.map(
            ({
              title,
              popular,
              link,
              priceId,
              price,
              description,
              buttonText,
              benefitList,
            }) => (
              <Card
                key={title}
                className={
                  user?.stripePriceId == priceId
                    ? "relative drop-shadow-xl shadow-black/10 dark:shadow-white/10 border-[1.5px] border-primary lg:scale-[1.1]"
                    : "relative"
                }
              >
                <CardHeader>
                  <CardTitle className="pb-2 flex gap-5 items-center">
                    {title}
                    {user?.stripePriceId == priceId ? (
                      <Badge
                        variant="secondary"
                        className="absolute -top-5 left-1/3  text-sm py-2"
                      >
                        <span className="mr-2 text-primary">
                          <Badge>
                            <Star className="h-4 w-4 px-0" />
                          </Badge>
                        </span>
                        <span> Current </span>
                      </Badge>
                    ) : undefined}
                  </CardTitle>

                  <CardDescription className="pb-4">
                    {description}
                  </CardDescription>

                  <div>
                    <span className="text-3xl font-bold">${price}</span>
                    <span className="text-muted-foreground"> /month</span>
                  </div>
                </CardHeader>

                <CardContent className="flex">
                  <div className="space-y-4">
                    {benefitList.map((benefit) => (
                      <span key={benefit} className="flex">
                        <Check className="text-primary mr-2" />
                        <h3>{benefit}</h3>
                      </span>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="flex flex-col gap-4">
                  {user?.stripePriceId == priceId ? undefined : link ==
                    "trial" ? undefined : link == "pro" ? (
                    <>
                      <CheckoutButton
                        checkOutLink={checkOutLink as string}
                        popular={popular}
                        buttonText={buttonText}
                      />
                    </>
                  ) : link == "contact-us" ? (
                    <>
                      {" "}
                      <Link
                        href="#contact-us"
                        className={cn(
                          "w-full",
                          buttonVariants({
                            variant: "secondary",
                          })
                        )}
                      >
                        {buttonText}
                      </Link>
                    </>
                  ) : undefined}

                  {user?.stripePriceId == priceId ? (
                    <>
                      <p className="font-thin">
                        Your {title == "Free" ? "Trial" : "Subsciption"} will
                        end{" "}
                        <strong>
                          {formatDistanceToNow(
                            user?.stripeCurrentPeriodEnd as Date,
                            { addSuffix: true }
                          )}
                        </strong>{" "}
                      </p>
                    </>
                  ) : undefined}
                </CardFooter>
              </Card>
            )
          )}
        </div>
        <section className="  w-full py-10">
          <NewsLetterForm userStat={user?.UserAccessLevel as string} />
        </section>
      </section>
    </>
  );
}

interface CheckoutButtonProps {
  checkOutLink: string;
  popular: PopularPlan;
  buttonText: string;
}
const CheckoutButton = ({
  checkOutLink,
  popular,
  buttonText,
}: CheckoutButtonProps) => {
  return (
    <Link
      href={checkOutLink}
      className={cn(
        "w-full",
        buttonVariants({
          variant: popular === PopularPlan?.YES ? "default" : "secondary",
        })
      )}
    >
      {buttonText}
    </Link>
  );
};
