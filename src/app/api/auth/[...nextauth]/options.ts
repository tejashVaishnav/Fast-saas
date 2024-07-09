import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/utils";
import GoogleProvider from "next-auth/providers/google";
import { sendWelcomeEmail } from "@/lib/EmailHandler";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) { 
        (session.user as any).id = token.sub; 
        (session.user as any).UserAccessLevel = token.UserAccessLevel
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id; 
        token.UserAccessLevel = user.UserAccessLevel;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  events: {
    async createUser(message) {
      try {
        const params = {
          user: {
            name: message.user.name,
            email: message.user.email,
          },
        };
        await sendWelcomeEmail(params.user); // <-- send welcome email
      } catch (error) {}
    },
  },
};
