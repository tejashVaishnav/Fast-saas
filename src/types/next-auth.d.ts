import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      UserAccessLevel: string
    }
  }

  interface User {
    UserAccessLevel: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    UserAccessLevel: string
  }
}