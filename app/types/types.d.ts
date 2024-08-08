import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
  interface User {
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
  }
}

interface Video {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      medium: {
        url: string;
      };
    };
  };
}

interface VideoResponse {
  id: any;
  snippet: any;
  items: Video[];
}

interface Snippet {
  title: string;
  description: string;
  tags: string[];
  categoryId: string;
}

interface Status {
  privacyStatus: "public" | "unlisted" | "private";
}

interface VideoFormData {
  snippet: Snippet;
  status: Status;
}
