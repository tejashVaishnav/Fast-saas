"use client";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import OrbitingCircles from "@/components/ui/orbitingCircles";
import { cn } from "@/lib/utils";
import { ArrowRight, Check, Clipboard } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const orbitingCircles = [
  {
    img: "/logos/next-auth.svg",
    duration: 30,
    delay: 20,
    radius: 80,
    reverse: true,
    className: "",
  },
  {
    img: "/logos/redis.svg",
    duration: 30,
    delay: 5,
    radius: 80,
    className: "",
    reverse: true,
  },
  {
    img: "/logos/supabase.svg",
    duration: 10,
    delay: 10,
    radius: 135,
    reverse: false,
    className: "",
  },
  {
    img: "/logos/node-mailer.svg",
    duration: 10,
    delay: 5,
    radius: 135,
    className: "",
    reverse: false,
  },
  {
    img: "/logos/nextjs.svg",
    duration: 30,
    delay: 5,
    radius: 0,
    reverse: false,
    className: "invert-0 dark:invert",
  },
  {
    img: "/logos/stripe.svg",
    duration: 20,
    delay: 20,
    radius: 190,
    reverse: true,
    className: "",
  },
  {
    img: "/logos/prisma.svg",
    duration: 20,
    delay: 10,
    radius: 190,
    className: "invert-0 dark:invert",
    reverse: true,
  },
];

export const HeroSection = () => {
  const { theme } = useTheme();
  const app = useRouter();
  const handleVercel = () => {
    app.push(
      "https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FtejashVaishnav%2FFast-Saas.git"
    );
  };

  const [copied, setCopied] = useState(false);
  const command = "npx create-fast-saas@latest";

  useEffect(() => {
    let timer: any;
    if (copied) {
      timer = setTimeout(() => {
        setCopied(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [copied]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <section className="  w-full">
        <div className="grid place-items-center mt-6  lg:max-w-screen-xl gap-8 mx-auto py-10 md:py-10">
          <div className="text-center space-y-8 ">
            <Badge variant="secondary" className="text-sm py-2 ">
              <span className="mr-2 text-primary">
                <Badge>New</Badge>
              </span>
              <span> Design is out now! </span>
            </Badge>
            <div className="absolute top-2  -z-[99] lg:-top-8 left-1/2 transform -translate-x-1/2 w-[90%] mx-auto h-24 lg:h-80 bg-primary/50 rounded-full blur-3xl -z-10-"></div>
            <div className=" mx-auto ">
              <h1 className="max-w-screen-md text-center text-4xl md:text-6xl font-bold">
                SaaS in a box:
                <span className="text-transparent px-2 bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text">
                  Just add
                </span>
                your big idea
              </h1>
            </div>

            <p className="max-w-screen-sm mx-auto text-sm text-muted-foreground">
              Ultimate SaaS Kickstarter: A lean boilerplate for rapidly
              launching your product. Built with modern technologies, Perfect
              for developers who want to focus on their unique product features
              rather than reinventing the wheel.
            </p>
            <div className="relative max-w-sm mx-5 sm:mx-auto p-4 cursor-pointer ">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 opacity-10 blur-xl"></div>
              <div className="relative   rounded-lg shadow-md p-3 flex items-center justify-between">
                <code className="text-gray-700 dark:text-gray-300 font-mono text-sm">
                  {command}
                </code>
                <button
                  onClick={copyToClipboard}
                  className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
                >
                  {copied ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <Clipboard className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            <div className="space-y-4 md:space-y-0 md:space-x-4">
              <Button
                onClick={handleVercel}
                className="w-5/6 md:w-1/4 font-bold group/arrow"
              >
                Deploye with vercel
                <ArrowRight className="size-5 ml-2 group-hover/arrow:translate-x-1 transition-transform" />
              </Button>

              <Link
                href={"https://github.com/tejashVaishnav/Fast-Saas.git"}
                className={cn(
                  "w-5/6 md:w-1/4 font-bold",
                  buttonVariants({ variant: "secondary" })
                )}
              >
                Github respository
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section
        id="features"
        className="flex flex-col items-center justify-center"
      >
        <div className="relative overflow-x-hidden flex max-w-6xl h-[30rem] items-center justify-center rounded-lg  overflow-hidden bg-background  ">
          <span className="w-screen pointer-events-none overflow-hidden whitespace-pre-wrap bg-gradient-to-b bg-black from-black to-gray-300/80 bg-clip-text text-center text-6xl sm:text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10"></span>
          {orbitingCircles.map((items, i) => (
            <OrbitingCircles
              key={i}
              className="h-[50px] w-[50px] border-none bg-transparent"
              duration={items.duration}
              delay={items.delay}
              radius={items.radius}
              reverse={items.reverse}
            >
              <Image
                src={items.img}
                alt=""
                className={items.className}
                height={100}
                width={100}
              />
            </OrbitingCircles>
          ))}
        </div>
        <span className="max-w-screen-md pointer-events-none overflow-hidden whitespace-pre-wrap bg-gradient-to-b bg-black from-black to-gray-300/80 bg-clip-text text-center text-6xl sm:text-7xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
          Everything you need to take-off soon as possible
        </span>
      </section>
    </div>
  );
};
