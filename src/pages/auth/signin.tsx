import { getServerSession } from 'next-auth/next';
import type { GetServerSidePropsContext } from 'next';
import { getProviders } from 'next-auth/react';

import { authOptions } from '~api/auth/[...nextauth]';
import SignInForm from '~modules/auth/components/SignInForm';

type NextAuthProviders = ReturnType<typeof getProviders>;

type Props = {
  providers: NextAuthProviders;
};

export default function SignIn({ providers }: Props) {
  return (
    <div className="flex h-screen justify-center items-center bg-slate-700">
      <SignInForm providers={providers} />
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return { redirect: { destination: '/' } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}
