import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "../auth";
import StoreProvider from "./StoreProvider";
import { Toaster } from "react-hot-toast";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CRM WEB",
  description: "client-relationship-system",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  console.log(session);

  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <SessionProvider session={session}>
            <Toaster />
            {children}
          </SessionProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
