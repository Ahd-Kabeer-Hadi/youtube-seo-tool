"use client";
import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";

export default function Page() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn(); // Redirect to sign-in page
    }
  }, [status]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "authenticated") {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div>Protected content for {session?.user?.name}</div>
      </main>
    );
  }

  return null; // Render nothing while redirecting
}
