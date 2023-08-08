import NextAuth, { NextAuthOptions, Session } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

import { prisma } from '~modules/prisma/prisma-client';

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/auth/signin',
  },
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      const isSignIn = user ? true : false;

      if (isSignIn) {
        token.userId = user.id;
      }

      return Promise.resolve(token);
    },
    async session({ session, token }) {
      const sessionUser = { ...session.user, id: token.userId };
      session.user = sessionUser as Session['user'];

      return Promise.resolve(session);
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
