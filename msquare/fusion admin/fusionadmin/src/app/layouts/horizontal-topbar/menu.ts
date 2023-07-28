import { MenuItem } from './menu.model';

export const l1AdminMENU: MenuItem[] = [
  {
    id: 3,
    label: 'Dashboard',
    link: '/admin/dashboard',
    icon: 'ri-dashboard-2-line',
  },
  {
    id: 6,
    label: 'Transactions',
    icon: 'ri-newspaper-line',
    subItems: [
      {
        id: 9,
        label: 'Rent',
        link: '/admin/rent-transaction',
        parentId: 6
      },
      {
        id: 7,
        label: 'Utility',
        link: '/admin/utility-transaction',
        parentId: 6
      },
      {
        id: 8,
        label: 'Courier',
        link: '/admin/courier-transaction',
        parentId: 6
      },
      
    ]
  },
  
];

export const l2AdminMENU: MenuItem[] = [
  {
    id: 3,
    label: 'Dashboard',
    link: '/admin/dashboard',
    icon: 'ri-dashboard-2-line',
  },
  {
    id: 6,
    label: 'Transactions',
    icon: 'ri-newspaper-line',
    subItems: [
      {
        id: 9,
        label: 'Rent',
        link: '/admin/rent-transaction',
        parentId: 6
      },
      {
        id: 7,
        label: 'Utility',
        link: '/admin/utility-transaction',
        parentId: 6
      },
      {
        id: 8,
        label: 'Courier',
        link: '/admin/courier-transaction',
        parentId: 6
      },
      
    ]
  },
  
];

export const l1FinanceMENU: MenuItem[] = [
  {
    id: 3,
    label: 'Dashboard',
    link: '/admin/dashboard',
    icon: 'ri-dashboard-2-line',
  },
  {
    id: 6,
    label: 'Transactions',
    icon: 'ri-newspaper-line',
    subItems: [
      {
        id: 9,
        label: 'Rent',
        link: '/admin/rent-transaction',
        parentId: 6
      },
      {
        id: 7,
        label: 'Utility',
        link: '/admin/utility-transaction',
        parentId: 6
      },
      {
        id: 8,
        label: 'Courier',
        link: '/admin/courier-transaction',
        parentId: 6
      },
      
    ]
  },
  
];

export const l2FinanceMENU: MenuItem[] = [
  {
    id: 3,
    label: 'Dashboard',
    link: '/admin/dashboard',
    icon: 'ri-dashboard-2-line',
  },
  {
    id: 6,
    label: 'Transactions',
    icon: 'ri-newspaper-line',
    subItems: [
      {
        id: 9,
        label: 'Rent',
        link: '/admin/rent-transaction',
        parentId: 6
      },
      {
        id: 7,
        label: 'Utility',
        link: '/admin/utility-transaction',
        parentId: 6
      },
      {
        id: 8,
        label: 'Courier',
        link: '/admin/courier-transaction',
        parentId: 6
      },
      
    ]
  },
  
];

export const fieldAdminMENU: MenuItem[] = [
  {
    id: 3,
    label: 'Dashboard',
    link: '/admin/dashboard',
    icon: 'ri-dashboard-2-line',
  },
  {
    id: 6,
    label: 'Rent Transactions',
    link: '/admin/rent-transaction',
    icon: 'ri-newspaper-line'
  },
  {
    id: 7,
    label: 'Utility Transactions',
    link: '/admin/utility-transaction',
    icon: 'ri-newspaper-line'
  },
  
];

export const businessMENU: MenuItem[] = [
  {
    id: 3,
    label: 'Dashboard',
    link: '/admin/dashboard',
    icon: 'ri-dashboard-2-line',
  },
  {
    id: 6,
    label: 'Utility Transactions',
    link: '/admin/utility-transaction',
    icon: 'ri-newspaper-line'
  },
  
];

export const superAdminMENU: MenuItem[] = [
  {
    id: 3,
    label: 'Dashboard',
    link: '/admin/dashboard',
    icon: 'ri-dashboard-2-line',
  },
  {
    id: 2,
    label: 'Masters',
    icon: 'ri-dashboard-2-line',
    subItems: [
      {
        id: 3,
        label: 'Rent',
        link: '/admin/masters/rent',
        parentId: 2
      },
      {
        id: 4,
        label: 'Utility',
        link: '/admin/masters/utility',
        parentId: 2
      },
      {
        id: 5,
        label: 'Shakti',
        link: '/admin/masters/shakti',
        parentId: 2
      },
      
    ]
  },
  {
    id: 6,
    label: 'Transactions',
    icon: 'ri-newspaper-line',
    subItems: [
      {
        id: 9,
        label: 'Rent',
        link: '/admin/rent-transaction',
        parentId: 6
      },
      {
        id: 7,
        label: 'Utility',
        link: '/admin/utility-transaction',
        parentId: 6
      },
      {
        id: 8,
        label: 'Courier',
        link: '/admin/courier-transaction',
        parentId: 6
      },
      
    ]
  },
  
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
