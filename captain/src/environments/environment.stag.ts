// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    staging: true,
    production:false,
    BOAT_API_URL: 'http://boat.bnbstaging.techverxapps.com',
    BOOKING_API_URL: 'http://booking.bnbstaging.techverxapps.com',
    CORE_API_URL: 'http://core.bnbstaging.techverxapps.com',
    IDENTITY_API_URL: 'http://idv.bnbstaging.techverxapps.com',
    PAYMENTS_API_URL: 'http://payment.bnbstaging.techverxapps.com',
    S3BUCKET_URL:'https://bnbyachts.s3.amazonaws.com',
    CHAT_API_URL:'http://chat.bnbstaging.techverxapps.com',
    CAPTAIN_APP_URL:'http://captain.bnbstaging.techverxapps.com',
    MANAGEMENT_APP_URL:'http://management.bnbstaging.techverxapps.com',
    CLEANING_APP_URL:'http://cleaning.bnbstaging.techverxapps.com',
    stripeKey: "pk_test_51JjjR4IQmeuKTcwEUxVurdeswUrX0kjd0thsgPIYZpOiuPm7wf2XdKjWBjU2FtsT8PGjxmj7lCXU7QPA35qXuRPY00YGIKhP5f",
    Identity: {
      authority: "http://idv.bnbstaging.techverxapps.com",
      redirectUrl: "http://captain.bnbstaging.techverxapps.com",
      postLogoutRedirectUri: "http://captain.bnbstaging.techverxapps.com",
      clientId: "BnBYachts_Captain",
      scope: "openid Core Booking Boat Payments Chat",
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
