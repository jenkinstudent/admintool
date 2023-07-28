import { MenuItem } from './menu.model';

export const adminMENU: MenuItem[] = [
  // {
  //   id: 3,
  //   label: 'Dashboard',
  //   link: '/admin/dashboard',
  //   icon: 'ri-dashboard-2-line',
  // },
];

export const branchMENU: MenuItem[] = [
  {
    id: 1,
    label: 'Dashboard',
    link: '/branch/dashboard',
    icon: 'ri-dashboard-2-line',
  },
  {
    id: 2,
    label: 'Utility',
    link: '/branch/utility',
    icon: 'ri-bill-line',
  },
  {
    id: 3,
    label: 'Courier',
    link: '/branch/courier',
    icon: 'ri-truck-line',
  }
  
];
