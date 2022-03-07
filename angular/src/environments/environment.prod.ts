export const environment = {
  production: true,
  BOAT_API_URL: 'http://boat.bnb.techverxapps.com',
  BOOKING_API_URL: 'http://booking.bnb.techverxapps.com',
  CORE_API_URL: 'http://core.bnb.techverxapps.com',
  IDENTITY_API_URL: 'http://idv.bnb.techverxapps.com',
  PAYMENTS_API_URL: 'http://payment.bnb.techverxapps.com',
  S3BUCKET_URL:'https://bnbyachts.s3.amazonaws.com',
  CHAT_API_URL:'http://chat.bnb.techverxapps.com',
  stripeKey: "pk_test_51JjjR4IQmeuKTcwEUxVurdeswUrX0kjd0thsgPIYZpOiuPm7wf2XdKjWBjU2FtsT8PGjxmj7lCXU7QPA35qXuRPY00YGIKhP5f",
  Identity: {
    authority: "http://idv.bnb.techverxapps.com",
    redirectUrl: "http://client.bnb.techverxapps.com",
    postLogoutRedirectUri: "http://client.bnb.techverxapps.com",
    clientId: "BnBYachts_App",
    scope: "openid Core Booking Boat Payments Chat",
    responseType: 'code'
  }  
};
