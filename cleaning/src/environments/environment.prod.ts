// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: true,
    BOAT_API_URL: 'http://boat.bnb.techverxapps.com',
    BOOKING_API_URL: 'http://booking.bnb.techverxapps.com',
    CORE_API_URL: 'http://core.bnb.techverxapps.com',
    IDENTITY_API_URL: 'http://idv.bnb.techverxapps.com',
    PAYMENTS_API_URL: 'http://payment.bnb.techverxapps.com',
    S3BUCKET_URL:'https://bnbyachts.s3.amazonaws.com',
    CHAT_API_URL:'http://chat.bnb.techverxapps.com',
    CAPTAIN_APP_URL:'http://captain.bnb.techverxapps.com',
    MANAGEMENT_APP_URL:'http://management.bnb.techverxapps.com',
    CLEANING_APP_URL:'http://cleaning.bnb.techverxapps.com',
    stripeKey: "pk_test_51JjjR4IQmeuKTcwEUxVurdeswUrX0kjd0thsgPIYZpOiuPm7wf2XdKjWBjU2FtsT8PGjxmj7lCXU7QPA35qXuRPY00YGIKhP5f",
    Identity: {
      authority: "http://idv.bnb.techverxapps.com",
      redirectUrl: "http://cleaning.bnb.techverxapps.com",
      postLogoutRedirectUri: "http://cleaning.bnb.techverxapps.com",
      clientId: "BnBYachts_Cleaning",
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
