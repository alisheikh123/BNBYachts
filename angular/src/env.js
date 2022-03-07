(function (window) {
    window.__env = window.__env || {};
    // API url
      window.__env.BOOKING_API_URL= 'https://localhost:44337',
      window.__env.CORE_API_URL= 'https://localhost:44347',
      window.__env.IDENTITY_API_URL= 'https://localhost:44311',
      window.__env.PAYMENTS_API_URL= 'https://localhost:44366',
      window.__env.CHAT_API_URL='https://localhost:44363',
      window.__env.S3BUCKET_URL='https://bnbyachts.s3.amazonaws.com',
      window.__env.CAPTAIN_APP_URL='http://localhost:4201/',
      window.__env.MANAGEMENT_APP_URL='http://localhost:4202/',
      window.__env.CLEANING_APP_URL='http://localhost:4203/',
      window.__env.stripeKey= "pk_test_51JjjR4IQmeuKTcwEUxVurdeswUrX0kjd0thsgPIYZpOiuPm7wf2XdKjWBjU2FtsT8PGjxmj7lCXU7QPA35qXuRPY00YGIKhP5f",
      window.__env.identity_authority= "https://localhost:44311",
      window.__env.identity_redirectUrl= "http://localhost:4200",
      window.__env.identity_postLogoutRedirectUri= "http://localhost:4200",
      window.__env.identity_clientId= "BnBYachts_App",
      window.__env.identity_scope= "openid Core Booking Boat Payments HostGateway Chat",
      window.__env.identity_responseType= 'code'
      window.__env.enableDebug = false;
  }(this));