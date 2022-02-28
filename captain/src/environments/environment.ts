
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  BOAT_API_URL: 'https://localhost:44387',
  BOOKING_API_URL: 'https://localhost:44337',
  CORE_API_URL: 'https://localhost:44347',
  IDENTITY_API_URL: 'https://localhost:44311',
  PAYMENTS_API_URL: 'https://localhost:44366',
  CHAT_API_URL:'https://localhost:44363',
  S3BUCKET_URL:'https://bnbyachts.s3.amazonaws.com',
Management_App_Url:'https://localhost:4202',
  stripeKey: "pk_test_51JjjR4IQmeuKTcwEUxVurdeswUrX0kjd0thsgPIYZpOiuPm7wf2XdKjWBjU2FtsT8PGjxmj7lCXU7QPA35qXuRPY00YGIKhP5f",
  Identity: {
    authority: "https://localhost:44311",
    redirectUrl: "http://localhost:4200",
    postLogoutRedirectUri: "http://localhost:4200",
    clientId: "BnBYachts_App",
    scope: "openid Core Booking Boat Payments HostGateway Chat",
    responseType: 'code'
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
