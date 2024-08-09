import { NextApiHandler } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";
import { JWT } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
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
      if (!user || !account?.access_token) return false;

      if (account.provider === "google") {
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
            user.youtube = youtubeData.data.items[0];
          }
        } catch (error) {
          console.error("Failed to fetch YouTube data:", error);
        }
      }
      return true;
    },
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.accessTokenExpires =
          Date.now() + ((account.expires_in as number) || 0) * 1000;
      }

      if (user) {
        token.user = user;
      }

      if (Date.now() < (token.accessTokenExpires || 0)) {
        return token;
      }

      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      if (token.accessToken) {
        session.accessToken = token.accessToken;
      }

      if (token.user) {
        session.user = token.user;
      }

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "secret",
};

const refreshAccessToken = async (token: JWT): Promise<JWT> => {
  try {
    const response = await axios.post("https://oauth2.googleapis.com/token", {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      refresh_token: token.refreshToken,
      grant_type: "refresh_token",
    });

    return {
      ...token,
      accessToken: response.data.access_token,
      accessTokenExpires: Date.now() + response.data.expires_in * 1000,
    };
  } catch (error) {
    console.error("Failed to refresh access token:", error);
    return { ...token, error: "RefreshAccessTokenError" };
  }
};

const authHandler: NextApiHandler = (req, res) =>
  NextAuth(req, res, authOptions);

export default authHandler;
