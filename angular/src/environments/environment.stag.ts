// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    staging: true,
    production:false,
    BOAT_API_URL: 'http://52.207.14.110:21021',
    BOOKING_API_URL: 'http://52.207.14.110:21022',
    CORE_API_URL: 'http://52.207.14.110:21024',
    IDENTITY_API_URL: 'http://52.207.14.110:21025',
    PAYMENTS_API_URL: 'http://52.207.14.110:21023',
    S3BUCKET_URL:'https://bnbyachts.s3.amazonaws.com',
    CHAT_API_URL:'http://52.207.14.110:21026',
    stripeKey: "pk_test_51JjjR4IQmeuKTcwEUxVurdeswUrX0kjd0thsgPIYZpOiuPm7wf2XdKjWBjU2FtsT8PGjxmj7lCXU7QPA35qXuRPY00YGIKhP5f",
    Identity: {
      authority: "http://52.207.14.110:21025",
      redirectUrl: "http://52.207.14.110:8080",
      postLogoutRedirectUri: "http://52.207.14.110:8080",
      clientId: "BnBYachts_App",
      scope: "openid Core Booking Boat Payments",
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
