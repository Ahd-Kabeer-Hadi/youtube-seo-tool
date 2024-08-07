// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextApiHandler } from "next";

// Create a handler for NextAuth
const handler: NextApiHandler = (req, res) => NextAuth(req, res, authOptions);

// Export HTTP method handlers
export { handler as GET, handler as POST };
