"use client";
// import { RecoilRoot } from "recoil";
import { SessionProvider } from "next-auth/react";
export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SessionProvider>{children}</SessionProvider>;
    </>
  );
};
