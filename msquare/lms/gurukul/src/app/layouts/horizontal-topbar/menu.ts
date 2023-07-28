import { MenuItem } from './menu.model';

export const menu: MenuItem[] = [
  {
    id: 2,
    label: 'Master',
    icon: 'mdi-home',
    subItems: [
      {
        id: 1,
        label: 'Dashboard',
        link: '/pages/dashboard',
        parentId: 2
      },
      {
        id: 3,
        label: 'My Programmes',
        link: '/pages/my-programmes',
        parentId: 2
      },
      {
        id: 4,
        label: 'My Courses',
        link: '/pages/my-courses',
        parentId: 2
      },
      {
        id: 5,
        label: 'My Modules',
        link: '/pages/my-modules',
        parentId: 2
      },
      {
        id: 6,
        label: 'My Learning Activities',
        link: '/pages/my-learning-activities',
        parentId: 2
      },
    ]
  },
  {
    id: 7,
    label: 'Activity',
    icon: 'mdi-cursor-default-click',
    subItems: [
      {
        id: 13,
        label: 'Active Wall',
        link: '/pages/active-wall',
        parentId: 7
      },
      {
        id: 8,
        label: 'Notifications',
        link: '/pages/notification',
        parentId: 7
      },
      {
        id: 9,
        label: 'Help & Support',
        link: '/pages/support',
        parentId: 7
      },
      {
        id: 10,
        label: 'My Calendar',
        link: '/pages/calender',
        parentId: 7
      },
      {
        id: 11,
        label: 'My Certificates & Rewards',
        link: '/pages/certificates',
        parentId: 7
      },
      {
        id: 12,
        label: 'My Profile',
        link: '/pages/profile',
        parentId: 7
      },
    ]
  },
  
];
