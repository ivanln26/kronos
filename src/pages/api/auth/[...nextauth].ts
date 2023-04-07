import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider, { type GoogleProfile } from "next-auth/providers/google";
import { prisma } from "@/server/db";
import { uccEmail, user } from "@/server/types";

export const authOptions: NextAuthOptions = {
  callbacks: {
    async signIn({ profile }) {
      return uccEmail.safeParse(profile?.email).success;
    },
    async jwt({ token, trigger, profile }) {
      if (trigger == "signIn") {
        const acc = profile as GoogleProfile;
        const res = user.safeParse({
          email: acc.email,
          name: acc.given_name,
          lastName: acc.family_name,
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
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
};

export default NextAuth(authOptions);
