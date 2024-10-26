"use client";
import React, { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Sidebar from "@/app/dashboard/page";
import Footer from "@/(components)/footer/page";

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router?.push("/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "authenticated") {
    return (
      <>
        <div className="min-h-screen">
          <Sidebar />
        </div>
        <Footer />
      </>
    );
  }

  return null;
}
