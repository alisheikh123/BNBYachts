
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IdentityModel;
using IdentityServer4.Models;
namespace BnBYachts
{
    public class Config
    {
        public static IEnumerable<Client> Clients =>
    new List<Client>
    {
                    new Client
                    {
                         ClientName = "Client Application2",
                         ClientId = "BnBYachts_App",
                         AllowedGrantTypes = GrantTypes.Code,
                         ClientSecrets = { new Secret("1554db43-3015-47a8-a748-55bd76b6af48".Sha256()) },
                         AllowedScopes = { "openid", "BnBYachts", "app.api.weatherr" }
                    }
    };
        public static IEnumerable<ApiResource> Apis =>
          new List<ApiResource>
          {
                new ApiResource("app.api.weather","Weather Apis")
                {
                    UserClaims =
                {
                    JwtClaimTypes.Audience,
                    JwtClaimTypes.ClientId,
                    JwtClaimTypes.Name,
                    JwtClaimTypes.Email
                },
                     Scopes = new List<string>
                    {
                          "openid",
                          "BnBYachts"
                    },
                }
          };

        public static IEnumerable<IdentityResource> GetIdentityResources()
        {
            return new[]
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
                new IdentityResources.Email(),
                new IdentityResource
                {
                    Name = "role",
                    UserClaims = new List<string> {"role"}
                }
            };
        }
        public static IEnumerable<IdentityServer4.Models.ApiScope> GetApiScopes()
        {
            return new[]
            {
                new ApiScope("BnBYachts", "Read/Write Access to API"),
                                new ApiScope("openid", "Read/Write Access to API"),
                                new ApiScope("app.api.weatherr", "Read/Write Access to API")
            };
        }
    }
}