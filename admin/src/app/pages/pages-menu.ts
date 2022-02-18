import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'USER',
    icon: 'person-outline',
    children: [
    {
      title: 'Users',
      link: '/pages/user/users',
    },
  ]
  },
  {
    title: 'Host',
    icon: 'person-outline',
    children: [
      {
        title: 'Hosts',
        link: '/pages/host/host',
      }
    ]
  },
  {
    title: 'Dispute',
    icon: 'person-outline',
    children: [
      {
        title: 'Disputes',
        link: '/pages/dispute/dispute',
      }
    ]
  },
];
