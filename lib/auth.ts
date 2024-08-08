import { NextApiHandler } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          scope:
            "openid profile email https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/youtube.readonly",
          response_type: "code",
          registration_uri: "https://accounts.google.com/o/oauth2/v2/auth",
          include_granted_scopes: "true",
          state: "pass-through value",
          response_mode: "query",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!user) return false;
      if (account?.provider === "google" && account.access_token) {
        try {
          const youtubeData = await axios.get(
            "https://www.googleapis.com/youtube/v3/channels",
            {
              params: {
                part: "snippet,contentDetails,statistics",
                mine: "true",
              },
              headers: {
                Authorization: `Bearer ${account.access_token}`,
              },
            }
          );

          if (
            youtubeData.data &&
            youtubeData.data.items &&
            youtubeData.data.items.length > 0
          ) {
            // Attach YouTube data to the user object or profile
            // @ts-ignore
            user.youtube = youtubeData.data.items[0];
          }
        } catch (error) {
          console.error("Failed to fetch YouTube data:", error);
        }
      }
      return true;
    },
    async jwt({ token, account, user }) {
      if (account && account.access_token) {
        token.accessToken = account.access_token;
      }
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      if (!token) return session;
      
      session.accessToken = token.accessToken;
      if (token.user) {
        session.user = token.user;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "secret",
};

const authHandler: NextApiHandler = (req, res) =>
  NextAuth(req, res, authOptions);

export default authHandler;
