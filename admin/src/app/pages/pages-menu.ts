import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: { icon: 'home', pack: 'fa' },
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'USER',
    icon: { icon: 'user', pack: 'fa' },
    children: [
    {
      title: 'Users',
      link: '/pages/user/users',
    },
    // {
    //   title: 'Set Password',
    //   link: '/pages/auth/setpassword',
    // },
  ]
  },
  {
    title: 'Host',
    icon: { icon: 'user-tie', pack: 'fa' },
    children: [
      {
        title: 'Hosts',
        link: '/pages/host/host',
      }
    ]
  },
  {
    title: 'Dispute',
    icon: { icon: 'question-circle', pack: 'fa' },
    children: [
      {
        title: 'Disputes',
        link: '/pages/dispute/dispute',
      }
    ]
  },
  {
    title: 'FAQS',
    icon: { icon: 'info-circle', pack: 'fa' },
    children: [
      {
        title: 'Faqs Listing',
        link: '/pages/faqs/faqs-listing',
      }
    ]
  },
  {
    title: 'Marketing',
    icon: { icon: 'chart-bar', pack: 'fa' },
    children: [
      {
        title : 'Market Pages',
        link : '/pages/marketing/marketing'
      },
      {
        title: 'Featured City',
        link: '/pages/marketing/cities',
      }
    ]
  },
];
