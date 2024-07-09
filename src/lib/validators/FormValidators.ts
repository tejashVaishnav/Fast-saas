import * as z from "zod";

export const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  query: z.string().min(10, {
    message: "Query must be at least 10 characters.",
  }),
});



export const newsletterSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});