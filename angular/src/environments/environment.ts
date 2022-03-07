export const environment = {
  production: false,
  BOAT_API_URL: 'https://localhost:44387',
  BOOKING_API_URL: 'https://localhost:44337',
  CORE_API_URL: 'https://localhost:44347',
  IDENTITY_API_URL: 'https://localhost:44311',
  PAYMENTS_API_URL: 'https://localhost:44366',
  CHAT_API_URL:'https://localhost:44363',
  S3BUCKET_URL:'https://bnbyachts.s3.amazonaws.com',
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

