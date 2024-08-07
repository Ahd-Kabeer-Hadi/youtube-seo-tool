// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextApiHandler } from "next";

//@ts-ignore
const handler = NextAuth(authOptions)
// Export HTTP method handlers
export { handler as GET, handler as POST };
