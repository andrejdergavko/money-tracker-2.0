import { FC } from 'react';
import { getProviders, signIn } from 'next-auth/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithub,
  faGoogle,
  faFacebook,
} from '@fortawesome/free-brands-svg-icons';

import { Button } from '~components/ui/Button';

const AuthProvidersIcons: Record<string, JSX.Element> = {
  github: <FontAwesomeIcon icon={faGithub} className="mr-2" />,
  google: <FontAwesomeIcon icon={faGoogle} className="mr-2" />,
  facebook: <FontAwesomeIcon icon={faFacebook} className="mr-2" />,
};

type NextAuthProviders = ReturnType<typeof getProviders>;

type Props = {
  providers: NextAuthProviders;
};

const SignInForm: FC<Props> = ({ providers }) => {
  return (
    <div className="w-[420px] mx-14 mb-14 bg-slate-50 shadow-lg rounded-xl overflow-hidden">
      <div className="flex justify-center px-4 py-6 bg-slate-200">
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
  );
};

export default SignInForm;
