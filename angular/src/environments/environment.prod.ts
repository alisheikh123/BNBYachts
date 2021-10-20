import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';

export const environment = {
  production: true,
  application: {
    baseUrl,
    name: 'BnBYachts',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: 'https://localhost:44311',
    redirectUri: baseUrl,
    clientId: 'BnBYachts_App',
    responseType: 'code',
    scope: 'offline_access BnBYachts',
    requireHttps: true
  },
  apis: {
    default: {
      url: 'https://localhost:44382',
      rootNamespace: 'BnBYachts',
    },
  },
} as Environment;
