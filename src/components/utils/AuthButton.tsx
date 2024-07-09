"use client";

import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import { ArrowRight, Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";

const AuthButton = ({ userSession }: { userSession: Session | null }) => {
 
  const [buttonLoadingState, setButtonStatus] = useState(false);
  return (
    <>
      {userSession ? (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <Image
                  src={userSession.user?.image as string}
                  width={36}
                  height={36}
                  alt="Avatar"
                  className="overflow-hidden rounded-full"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="border-muted-foreground">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild><Link href={'/dashboard'}>Dashboard</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link href={'/dashboard/settings'}>Settings</Link></DropdownMenuItem>
               
              <DropdownMenuItem asChild>
                <Button
                  className=" w-full text-left "
                  onClick={() => {
                    signOut({callbackUrl:'/'});
                  }}
                >
                  Log out
                  {buttonLoadingState ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <ArrowRight className="size-5 ml-2 " />
                  )}
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      ) : (
        <>
          {" "}
          <Button
            className=" flex gap-2 font-bold group/arrow rounded-full"
            onClick={() => {
              setButtonStatus(true);
              signIn("google", { callbackUrl: "/dashboard" });
            }}
          >
            Sign in
            {buttonLoadingState ? (
              <Loader2 className="animate-spin" />
            ) : (
              <ArrowRight className="size-5 ml-2 " />
            )}
          </Button>
        </>
      )}
    </>
  );
};
export default AuthButton;
