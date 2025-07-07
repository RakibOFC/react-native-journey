export const Routes = {
  Splash: 'Splash',
  Login: 'Login',
  Registration: 'Registration',
  Dashboard: 'Dashboard',
} as const;

export type RouteName = typeof Routes[keyof typeof Routes];