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
  stripeKey: "pk_test_51JjjR4IQmeuKTcwEUxVurdeswUrX0kjd0thsgPIYZpOiuPm7wf2XdKjWBjU2FtsT8PGjxmj7lCXU7QPA35qXuRPY00YGIKhP5f",
  Identity: {
    authority: "http://idv.bnbstaging.techverxapps.com",
    redirectUrl: "http://client.bnbstaging.techverxapps.com",
    postLogoutRedirectUri: "http://client.bnbstaging.techverxapps.com",
    clientId: "BnBYachts_App",
    scope: "openid Core Booking Boat Payments Chat",
    responseType: 'code'
  }   
};