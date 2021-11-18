﻿using BnBYachts.Controller;
using BnBYachts.Interfaces.IdentityInterface;
using BnBYachts.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace BnBYachts
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddApplication<BnBYachtsIdentityServerModule>();
            
          
           

        }

        public void Configure(IApplicationBuilder app)
        {
            app.UseCookiePolicy(new CookiePolicyOptions { MinimumSameSitePolicy = SameSiteMode.Strict });
            app.InitializeApplication();
        }
    }
}
