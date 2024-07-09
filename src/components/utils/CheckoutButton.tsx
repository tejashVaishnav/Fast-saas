"use client"
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "../ui/button";
import { useRouter } from "next/navigation";
import { createCheckoutLink } from "@/lib/Stripe";


interface ChcekOutButtonProps {
    ButtonText:string, 
    CurrSub :Boolean,
    priceID:string
    UserID:string
}
const CheckoutButton = ({ButtonText,CurrSub,priceID,UserID}:ChcekOutButtonProps) => {
    const app = useRouter()
   
    const handleCheckOut =async () =>{ 
           }

  return (
    <>
      <Button
        onClick={handleCheckOut}
        className={cn(
          "w-full",
          buttonVariants({
            variant: CurrSub ? "default" : "secondary",
          })
        )}
      >
        {ButtonText}
      </Button>
    </>
  );
};

export default CheckoutButton