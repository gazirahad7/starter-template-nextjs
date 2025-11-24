export const APP_NAME = 'Next.js Starter';
export const APP_DESCRIPTION = 'A full-featured Next.js starter template with authentication, admin dashboard, and CMS';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  VERIFY_EMAIL: '/verify-email',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  DASHBOARD: '/dashboard',
  DASHBOARD_USERS: '/dashboard/users',
  DASHBOARD_CMS: '/dashboard/cms',
  DASHBOARD_ACCOUNT: '/dashboard/account',
  DASHBOARD_ACCOUNT_SECURITY: '/dashboard/account/security',
} as const;

export const PROTECTED_ROUTES = [
  ROUTES.DASHBOARD,
  ROUTES.DASHBOARD_USERS,
  ROUTES.DASHBOARD_CMS,
  ROUTES.DASHBOARD_ACCOUNT,
  ROUTES.DASHBOARD_ACCOUNT_SECURITY,
];

export const AUTH_ROUTES = [
  ROUTES.LOGIN,
  ROUTES.REGISTER,
  ROUTES.FORGOT_PASSWORD,
  ROUTES.RESET_PASSWORD,
];
