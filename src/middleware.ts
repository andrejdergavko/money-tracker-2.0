export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/', '/statistics/:path*', '/import/:path*', '/api/:path*'],
};
