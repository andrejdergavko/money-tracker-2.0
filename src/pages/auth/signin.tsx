import { getServerSession } from 'next-auth/next';
import type { GetServerSidePropsContext } from 'next';
import { getProviders, signIn } from 'next-auth/react';
import {
  faGithub,
  faGoogle,
  faFacebook,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Button } from '~components/ui/Button';
import { authOptions } from '~api/auth/[...nextauth]';

const AuthProvidersIcons: Record<string, JSX.Element> = {
  github: <FontAwesomeIcon icon={faGithub} className="mr-2" />,
  google: <FontAwesomeIcon icon={faGoogle} className="mr-2" />,
  facebook: <FontAwesomeIcon icon={faFacebook} className="mr-2" />,
};

type NextAuthProviders = ReturnType<typeof getProviders>;

type Props = {
  providers: NextAuthProviders;
};

export default function SignIn({ providers }: Props) {
  return (
    <div className="flex h-screen justify-center items-center bg-slate-700">
      <div className="w-[420px] mx-14 mb-14 bg-slate-50 rounded shadow-lg">
        <div className="py-7 px-10 bg-slate-200 rounded-t ">
          <h6 className="text-xl font-bold">Sign in to your account</h6>
        </div>
        <div className="p-10 flex flex-col gap-4">
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <Button
                className="w-full normal-case"
                variant="outlined"
                size="large"
                startIcon={AuthProvidersIcons[provider.id]}
                onClick={() => signIn(provider.id, { callbackUrl: '/' })}
              >
                {provider.name}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: '/' } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}
