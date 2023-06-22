import NextAuth from 'next-auth';
import type { DefaultSession } from 'next-auth';

interface ExtendedUser {
  id: string;
}

declare module 'next-auth' {
  interface DefaultUser extends ExtendedUser {
    name: string;
    email: string;
    image: string;
  }
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */

  interface Session {
    user?: ExtendedUser & DefaultSession['user'];
    error?: string;
  }
}
