import NextAuth, { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { config } from "@/config/config";
import prismadb from "@/libs/prismadb";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export const authOptions: AuthOptions = {
  providers: [
    process.env.VERCEL_ENV === "preview"
      ? Credentials({
          id: "credentials",
          name: "Credentials",
          credentials: {
            email: {
              label: "Email",
              type: "text",
            },
            password: {
              label: "Password",
              type: "password",
            },
          },
          async authorize(credentials) {
            if (!credentials?.email || !credentials.password) {
              throw new Error("Email and Password required!");
            }
            const user = await prismadb.user.findUnique({
              where: { email: credentials.email },
            });
            if (!user || !user.hashedPassword) {
              throw new Error("Email does not exist!");
            }
            const isCorrectPassword = await compare(
              credentials.password,
              user.hashedPassword
            );
            if (!isCorrectPassword) {
              throw new Error("InCorrect password!");
            }
            return user;
          },
        })
      : GithubProvider({
          clientId: config.githubClientId,
          clientSecret: config.githubClientSecret,
        }),
    GoogleProvider({
      clientId: config.googleClientId,
      clientSecret: config.googleClientSecret,
    }),
  ],
  pages: {
    signIn: "/auth",
  },
  debug: process.env.NODE_ENV === "development",
  adapter: PrismaAdapter(prismadb),
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  //@ts-ignore
  secret: {
    secret: process.env.NEXTAUTH_SECRET,
  },
};
export default NextAuth(authOptions);
