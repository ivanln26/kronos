import NextAuth, { type DefaultSession, type NextAuthOptions } from "next-auth";
import GoogleProvider, { type GoogleProfile } from "next-auth/providers/google";
import { prisma } from "@/server/db";
import { uccEmail, user } from "@/server/types";
import { type UserRole } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      role: UserRole | null;
      id: string;
    } & DefaultSession["user"];
  }

  interface Profile extends GoogleProfile {}
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    async signIn({ profile }) {
      return uccEmail.safeParse(profile?.email).success;
    },
    async jwt({ token, trigger, profile }) {
      if (trigger == "signIn") {
        const res = user.safeParse({
          email: profile?.email,
          name: profile?.given_name,
          lastName: profile?.family_name,
          role: "student",
        });
        if (res.success) {
          await prisma.user.upsert({
            where: { ucc: res.data.ucc },
            update: {},
            create: res.data,
          });
        }
      }
      return token;
    },
    async session({ session, token }) {
      const user = await prisma.user.findUnique({
        where: {
          ucc: token.email?.split("@")[0],
        },
      });
      return {
        ...session,
        user: {
          ...session.user,
          role: user?.role,
          id: user?.id.toString(),
        },
      };
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
};

export default NextAuth(authOptions);
