import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { prisma } from "./config/prisma";
import { compare } from "bcrypt";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Google({}),
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }
        const user = await prisma?.User?.findUnique({
          where: { email: credentials?.email },
        });

        if (!user) {
          throw new Error("User not found");
        }

        const isPasswordValid = await compare(
          credentials?.password as string,
          user?.password
        );

        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        return {
          id: user?.id,
          email: user?.email,
          name: user?.name,
          image: user?.image,
        };
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user?.id;
        token.email = user?.email;
        token.name = user?.name;
        token.image = user?.image;
      }
      return token;
    },
    async session({ session, token }) {
      const updatedUser = await prisma?.User?.findUnique({
        where: { id: token?.id as string },
      });

      if (updatedUser) {
        session.user.id = updatedUser?.id;
        session.user.email = updatedUser?.email;
        session.user.name = updatedUser?.name;
        session.user.image = updatedUser?.image;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      return url === "/signin" ? baseUrl : url;
    },
  },
});
