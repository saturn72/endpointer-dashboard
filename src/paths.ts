export const paths = {
  home: '/',
  auth: { signIn: '/auth/sign-in', signUp: '/auth/sign-up', resetPassword: '/auth/reset-password' },
  dashboard: {
    overview: '/dashboard',
    datasources: '/dashboard/datasources',
    account: '/dashboard/account',
    customers: '/dashboard/customers',
    integrations: '/dashboard/integrations',
    settings: '/dashboard/settings',
  },
  errors: { notFound: '/errors/not-found' },
} as const;
