// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  BOAT_API_URL:(<any>window)._env.BOAT_API_URL,
  BOOKING_API_URL: (<any>window)._env.BOOKING_API_URL,
  CORE_API_URL: (<any>window)._env.CORE_API_URL,
  IDENTITY_API_URL:(<any>window)._env.IDENTITY_API_URL,
  PAYMENTS_API_URL: (<any>window)._env.PAYMENTS_API_URL,
  CHAT_API_URL:(<any>window)._env.CHAT_API_URL,
  S3BUCKET_URL:(<any>window)._env.S3BUCKET_URL,
  CAPTAIN_APP_URL:(<any>window)._env.CAPTAIN_APP_URL,
  MANAGEMENT_APP_URL:(<any>window)._env.MANAGEMENT_APP_URL,
  CLEANING_APP_URL:(<any>window)._env.CLEANING_APP_URL,
  stripeKey: (<any>window)._env.stripeKey,
  Identity: {
    authority: (<any>window)._env.identity_authority,
    redirectUrl: (<any>window)._env.identity_redirectUrl,
    postLogoutRedirectUri: (<any>window)._env.identity_postLogoutRedirectUri,
    clientId: (<any>window)._env.identity_clientId,
    scope: (<any>window)._env.identity_scope,
    responseType:(<any>window)._env.identity_responseType
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
