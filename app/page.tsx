"use client";
import { Button } from "@/components/ui/button";
import YouTubeChannelInfo from "@/components/ui/channel-info";
import { signIn, signOut, useSession } from "next-auth/react";

type User = {
  [key: string]: any;
};

export default function Home() {
  const { data: session } = useSession();

  const userHasYouTubeData = session?.user && (session.user as User).youtube;
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <header className="w-full flex justify-between items-center">
        {session && session.user ? (
          <>
            <div className="text-sm font-mono">
              Signed in as {session.user.name}
            </div>
            <Button variant="link" onClick={() => signOut()}>
              Sign out
            </Button>
          </>
        ) : (
          <Button variant="link" onClick={() => signIn()}>
            Sign in
          </Button>
        )}
      </header>

      <div className="flex flex-col items-center space-y-8">
        {userHasYouTubeData ? (
          // @ts-ignore
          <YouTubeChannelInfo user={session.user} />
        ) : (
          <div className="text-gray-500">
            {session?.user
              ? "No YouTube data available."
              : "Please sign in to see your YouTube channel information"}
          </div>
        )}
      </div>
    </main>
  );
}
