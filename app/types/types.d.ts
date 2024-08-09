import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      youtube?: {
        id: string;
        snippet: {
          title: string;
          description: string;
          thumbnails: {
            default: {
              url: string;
            };
          };
        };
        statistics: {
          viewCount: string;
          subscriberCount: string;
          hiddenSubscriberCount: boolean;
        };
      };
    };
  }

  interface User {
    youtube?: {
      id: string;
      snippet: {
        title: string;
        description: string;
        thumbnails: {
          default: {
            url: string;
          };
        };
      };
      statistics: {
        viewCount: string;
        subscriberCount: string;
        hiddenSubscriberCount: boolean;
      };
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
    user?: User;
  }
}


interface Video {
  statistics: any;
  id: {
    videoId: string;
  };
  snippet: {
    tags: string[] | null;
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
