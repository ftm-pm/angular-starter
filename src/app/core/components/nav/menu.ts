export interface MenuItem {
  path: string;
  label: string;
  icon: string;
  hidden ?: boolean;
  disabled ?: boolean;
}

export const menu: MenuItem[] = [
  {
    path: 'dashboard',
    label: 'menu.dashboard',
    icon: 'home',
  },
];
