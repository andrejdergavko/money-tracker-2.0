export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    // Защищенные страницы
    '/',
    '/statistics/:path*',
    '/import/:path*',
    // API маршруты, кроме /api/cron/*
    '/api/((?!cron/).)*'
  ]
};
