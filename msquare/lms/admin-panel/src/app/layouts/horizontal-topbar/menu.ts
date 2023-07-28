import { MenuItem } from './menu.model';

export const menu: MenuItem[] = [
  {
    id: 2,
    label: 'Dashboard',
    icon: 'ri-donut-chart-line',
    link: '/pages/dashboard',
  },
  {
    id: 2,
    label: 'Master',
    icon: 'ri-database-line',
    subItems: [
      {
        id: 3,
        label: 'Employee',
        link: '/pages/master/employee',
        parentId: 2
      },
      {
        id: 4,
        label: 'Group',
        link: '/pages/master/group',
        parentId: 2
      }
    ]
  },
  {
    id: 7,
    label: 'Programs',
    icon: 'ri-book-mark-line',
    subItems: [
      {
        id: 13,
        label: 'Program',
        link: '/pages/programs/program',
        parentId: 7
      },
      {
        id: 8,
        label: 'Course',
        link: '/pages/programs/course',
        parentId: 7
      },
      {
        id: 9,
        label: 'Module',
        link: '/pages/programs/module',
        parentId: 7
      },
      {
        id: 10,
        label: 'Quiz',
        link: '/pages/programs/quiz',
        parentId: 7
      }
    ]
  },
  {
    id: 7,
    label: 'Learning Activity',
    icon: 'bx bx-book',
    subItems: [
      {
        id: 13,
        label: 'Program',
        link: '/pages/learning-activity/program',
        parentId: 7
      },
      {
        id: 8,
        label: 'Course',
        link: '/pages/learning-activity/course',
        parentId: 7
      },
      {
        id: 9,
        label: 'Module',
        link: '/pages/learning-activity/module',
        parentId: 7
      },
      {
        id: 10,
        label: 'Quiz',
        link: '/pages/learning-activity/quiz',
        parentId: 7
      }
    ]
  },
  {
    id: 7,
    label: 'Allocation',
    icon: ' ri-user-settings-line',
    subItems: [
      {
        id: 13,
        label: 'Manager',
        link: '/pages/allocation/manager',
        parentId: 7
      },
      {
        id: 8,
        label: 'Report',
        link: '/pages/allocation/report',
        parentId: 7
      }
    ]
  },
  {
    id: 7,
    label: 'Engage',
    icon: 'ri-notification-2-line',
    subItems: [
      {
        id: 13,
        label: 'Notification',
        link: '/pages/engage/notification',
        parentId: 7
      },
      {
        id: 8,
        label: 'CEO Message',
        link: '/pages/engage/ceo-message',
        parentId: 7
      },
      {
        id: 9,
        label: 'News',
        link: '/pages/engage/news',
        parentId: 7
      },
      {
        id: 10,
        label: 'Email',
        link: '/pages/engage/email',
        parentId: 7
      },
      {
        id: 10,
        label: 'Training Glimpse',
        link: '/pages/engage/training-glimpse',
        parentId: 7
      },
      {
        id: 10,
        label: 'Reward Products',
        link: '/pages/engage/reward-products',
        parentId: 7
      }
      ,
      {
        id: 10,
        label: 'Reward Orders',
        link: '/pages/engage/reward-orders',
        parentId: 7
      }
    ]
  },
  
  {
    id: 7,
    label: 'Reports',
    icon: ' ri-bar-chart-line',
    subItems: [
      {
        id: 13,
        label: 'Winners Report',
        link: '/pages/reports/winners-report',
        parentId: 7
      },
      {
        id: 13,
        label: 'Session Activity',
        link: '/pages/reports/session-activity-report',
        parentId: 7
      }
    ]
  },
  
  {
    id: 7,
    label: 'Settings',
    icon: ' ri-settings-2-line',
    subItems: [
      {
        id: 13,
        label: 'Profile Photo Approval',
        link: '/pages/settings/profile-photo-approval',
        parentId: 7
      },
      {
        id: 8,
        label: 'Employee Registration',
        link: '/pages/settings/employee-registration',
        parentId: 7
      },
      {
        id: 8,
        label: 'Users',
        link: '/pages/settings/users',
        parentId: 7
      }
    ]
  },
];
