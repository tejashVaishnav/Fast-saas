"use client";


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { newsletterSchema } from "@/lib/validators/FormValidators";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type NewsletterFormData = z.infer<typeof newsletterSchema>;

export function NewsLetterForm({userStat}:{userStat:string}) {

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  });
  const [isloading, setIsloading] = useState<boolean>(false);

  const onSubmit = async (data: NewsletterFormData) => {
    try {
      setIsloading(true);
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      if (response.ok) {
        toast("Subscribed to newsletter successfully!");
        reset(); // Clear the form
      }

      if (response.statusText == "Conflict") {
        toast("Email alreay Exits!");
      } 

    } catch (error: any) {
      setIsloading(false);
      console.log("error"+error) 
    } finally {
      setIsloading(false); 
    }
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-24 xl:py-24 mt-20 bg-secondary rounded-lg border-2 dark:border-none border-primary">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 items-center">
          <div className="flex flex-col justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-black dark:bg-gradient-to-r from-white to-gray-500">
                Join our monthly newsletter
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-zinc-100 mx-auto">
              {userStat == 'trial' ? 'Form functionality—an exclusive perk for our Pro subscribers.' :'No spam, ever. Your address will only be used for the company news. You can easily unsubscribe any time with a single click.'}
                
              </p>
            </div>
            <div className="w-full space-y-2 pt-5 mx-auto">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col items-center gap-2    "
              >
                <div className="w-full">
                  <Input
                    className={cn(
                      errors.email ? "  focus-visible:ring-destructive " : "",
                      "w-full flex-1     py-5 text-white"
                    )}
                    placeholder="Enter your email"
                    {...register("email")}
                    id="email"
                    type="email"
                  />
                  <p className="text-xs text-zinc-200 dark:text-zinc-100">
                    {errors.email && <span>{errors.email.message}</span>}
                  </p>
                </div>
                <Button
                  type="submit"
                  variant={"default"}
                  className="flex gap-2 w-1/3 "
                  disabled = {userStat == 'trial' ? true : false}
                >
                  {isloading ? (
                    <Loader2 className="animate-spin transition-all duration-1000" />
                  ) : undefined}
                  Start Now
                </Button>
              </form>

              <p className="text-xs text-zinc-200 dark:text-zinc-100">
                Start managing your emails today.
                <Link
                  className="underline underline-offset-2 text-primary"
                  href="#"
                  prefetch={false}
                >
                  Terms & Conditions
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
