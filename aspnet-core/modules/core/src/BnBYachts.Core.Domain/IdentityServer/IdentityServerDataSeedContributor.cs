using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using IdentityServer4.Models;
using Microsoft.Extensions.Configuration;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Guids;
using Volo.Abp.IdentityServer.ApiResources;
using Volo.Abp.IdentityServer.ApiScopes;
using Volo.Abp.IdentityServer.Clients;
using Volo.Abp.IdentityServer.IdentityResources;
using Volo.Abp.MultiTenancy;
using Volo.Abp.PermissionManagement;
using Volo.Abp.Uow;
using ApiResource = Volo.Abp.IdentityServer.ApiResources.ApiResource;
using ApiScope = Volo.Abp.IdentityServer.ApiScopes.ApiScope;
using Client = Volo.Abp.IdentityServer.Clients.Client;

namespace BnBYachts.Core.IdentityServer
{
    public class IdentityServerDataSeedContributor : IDataSeedContributor, ITransientDependency
    {
        private readonly IApiResourceRepository _apiResourceRepository;
        private readonly IApiScopeRepository _apiScopeRepository;
        private readonly IClientRepository _clientRepository;
        private readonly IIdentityResourceDataSeeder _identityResourceDataSeeder;
        private readonly IGuidGenerator _guidGenerator;
        private readonly IPermissionDataSeeder _permissionDataSeeder;
        private readonly IConfiguration _configuration;
        private readonly ICurrentTenant _currentTenant;

        public IdentityServerDataSeedContributor(
            IClientRepository clientRepository,
            IApiResourceRepository apiResourceRepository,
            IApiScopeRepository apiScopeRepository,
            IIdentityResourceDataSeeder identityResourceDataSeeder,
            IGuidGenerator guidGenerator,
            IPermissionDataSeeder permissionDataSeeder,
            IConfiguration configuration,
            ICurrentTenant currentTenant)
        {
            _clientRepository = clientRepository;
            _apiResourceRepository = apiResourceRepository;
            _apiScopeRepository = apiScopeRepository;
            _identityResourceDataSeeder = identityResourceDataSeeder;
            _guidGenerator = guidGenerator;
            _permissionDataSeeder = permissionDataSeeder;
            _configuration = configuration;
            _currentTenant = currentTenant;
        }

        [UnitOfWork]
        public virtual async Task SeedAsync(DataSeedContext context)
        {
            using (_currentTenant.Change(context?.TenantId))
            {
                await _identityResourceDataSeeder.CreateStandardResourcesAsync();
                await CreateApiResourcesAsync();
                await CreateApiScopesAsync();
                await CreateClientsAsync();
            }
        }

        private async Task CreateApiScopesAsync()
        {
            await CreateApiScopeAsync(new[] { "Core", "Payments", "Booking", "Boat", "HostGateway", "Chat", "Admin", "Captain", "Management", "Cleaning"});
        }

        private async Task CreateApiResourcesAsync()
        {
            var commonApiUserClaims = new[]
            {
                "email",
                "email_verified",
                "name",
                "phone_number",
                "phone_number_verified",
                "role"
            };

            await CreateApiResourceAsync(new[] { "Core","Payments","Booking","Boat", "HostGateway", "Chat", "Admin" , "Captain", "Management", "Cleaning" }, commonApiUserClaims);
        }

        private async Task<ApiResource> CreateApiResourceAsync(string[] item, IEnumerable<string> claims)
        {
            foreach (var name in item)
            {
                var apiResource = await _apiResourceRepository.FindByNameAsync(name) ??
                                  await _apiResourceRepository.InsertAsync(
                                      new ApiResource(
                                          _guidGenerator.Create(),
                                          name,
                                          name + " API"
                                      ),
                                      autoSave: true
                                  );

                foreach (var claim in claims)
                {
                    if (apiResource.FindClaim(claim) == null)
                    {
                        apiResource.AddUserClaim(claim);
                    }
                }

                await _apiResourceRepository.UpdateAsync(apiResource);
            }

            return null;
        }

        private async Task<ApiScope> CreateApiScopeAsync(string[] name)
        {
            foreach (var item in name)
            {
                if (await _apiScopeRepository.GetByNameAsync(item) != null)
                {
                    continue;
                }

                await _apiScopeRepository.InsertAsync(
                    new ApiScope(
                        _guidGenerator.Create(),
                        item,
                        item + " API"
                    ),
                    autoSave: true
                );
            }

            return null;
        }

        private async Task CreateClientsAsync()
        {
            var commonScopes = new[]
            {
                "email",
                "openid",
                "profile",
                "role",
                "phone",
                "address",
                "Core",
                "Payments",
                "Booking",
                "Boat",
                "BnBYachts",
                "HostGateway",
                "Chat",
                "Admin",
                "Captain", 
                "Management",
                "Cleaning"

            };

            var configurationSection = _configuration.GetSection("IdentityServer:Clients");


            //Console Test / Angular Client
            var consoleAndAngularClientId = configurationSection["BnBYachts_App:ClientId"];
            if (!consoleAndAngularClientId.IsNullOrWhiteSpace())
            {
                var webClientRootUrl = configurationSection["BnBYachts_App:RootUrl"]?.TrimEnd('/');
                await CreateClientAsync(
                    name: consoleAndAngularClientId,
                    scopes: commonScopes,
                    grantTypes: new[] { "password", "client_credentials", "authorization_code" },
                    secret: (configurationSection["BnBYachts_App:ClientSecret"] ?? "1q2w3e*").Sha256(),
                    requireClientSecret: false,
                    redirectUri: webClientRootUrl,
                    postLogoutRedirectUri: webClientRootUrl,
                    corsOrigins: new[] { webClientRootUrl.RemovePostFix("/") }
                );
            }

            //Console Test / Angular Admin
            var consoleAndAngularAdminClientId = configurationSection["BnBYachts_Admin:ClientId"];
            if (!consoleAndAngularAdminClientId.IsNullOrWhiteSpace())
            {
                var webClientRootUrl = configurationSection["BnBYachts_Admin:RootUrl"]?.TrimEnd('/');
                await CreateClientAsync(
                    name: consoleAndAngularAdminClientId,
                    scopes: commonScopes,
                    grantTypes: new[] { "password", "client_credentials", "authorization_code" },
                    secret: (configurationSection["BnBYachts_Admin:ClientSecret"] ?? "1q2w3e*").Sha256(),
                    requireClientSecret: false,
                    redirectUri: webClientRootUrl,
                    postLogoutRedirectUri: webClientRootUrl,
                    corsOrigins: new[] { webClientRootUrl.RemovePostFix("/") }
                );
            }
            //Console Test / Angular Captain
            var consoleAndAngularCaptainClientId = configurationSection["BnBYachts_Captain:ClientId"];
            if (!consoleAndAngularCaptainClientId.IsNullOrWhiteSpace())
            {
                var webClientRootUrl = configurationSection["BnBYachts_Captain:RootUrl"]?.TrimEnd('/');
                await CreateClientAsync(
                    name: consoleAndAngularCaptainClientId,
                    scopes: commonScopes,
                    grantTypes: new[] { "password", "client_credentials", "authorization_code" },
                    secret: (configurationSection["BnBYachts_Captain:ClientSecret"] ?? "1q2w3e*").Sha256(),
                    requireClientSecret: false,
                    redirectUri: webClientRootUrl,
                    postLogoutRedirectUri: webClientRootUrl,
                    corsOrigins: new[] { webClientRootUrl.RemovePostFix("/") }
                );
            }

            //Console Test / Angular Management
            var consoleAndAngularManagementClientId = configurationSection["BnBYachts_Management:ClientId"];
            if (!consoleAndAngularManagementClientId.IsNullOrWhiteSpace())
            {
                var webClientRootUrl = configurationSection["BnBYachts_Management:RootUrl"]?.TrimEnd('/');
                await CreateClientAsync(
                    name: consoleAndAngularManagementClientId,
                    scopes: commonScopes,
                    grantTypes: new[] { "password", "client_credentials", "authorization_code" },
                    secret: (configurationSection["BnBYachts_Management:ClientSecret"] ?? "1q2w3e*").Sha256(),
                    requireClientSecret: false,
                    redirectUri: webClientRootUrl,
                    postLogoutRedirectUri: webClientRootUrl,
                    corsOrigins: new[] { webClientRootUrl.RemovePostFix("/") }
                );
            }
            //Console Test / Angular Cleaning
            var consoleAndAngularCleaningClientId = configurationSection["BnBYachts_Cleaning:ClientId"];
            if (!consoleAndAngularCleaningClientId.IsNullOrWhiteSpace())
            {
                var webClientRootUrl = configurationSection["BnBYachts_Cleaning:RootUrl"]?.TrimEnd('/');
                await CreateClientAsync(
                    name: consoleAndAngularCleaningClientId,
                    scopes: commonScopes,
                    grantTypes: new[] { "password", "client_credentials", "authorization_code" },
                    secret: (configurationSection["BnBYachts_Cleaning:ClientSecret"] ?? "1q2w3e*").Sha256(),
                    requireClientSecret: false,
                    redirectUri: webClientRootUrl,
                    postLogoutRedirectUri: webClientRootUrl,
                    corsOrigins: new[] { webClientRootUrl.RemovePostFix("/") }
                );
            }

            // Swagger Core Client
            var swaggerClientId = configurationSection["Core_Swagger:ClientId"];
            if (!swaggerClientId.IsNullOrWhiteSpace())
            {
                var swaggerRootUrl = configurationSection["Core_Swagger:RootUrl"].TrimEnd('/');

                await CreateClientAsync(
                    name: swaggerClientId,
                    scopes: commonScopes,
                    grantTypes: new[] { "authorization_code" },
                    secret: configurationSection["Core_Swagger:ClientSecret"]?.Sha256(),
                    requireClientSecret: false,
                    redirectUri: $"{swaggerRootUrl}/swagger/oauth2-redirect.html",
                    corsOrigins: new[] { swaggerRootUrl.RemovePostFix("/") }
                );
            }


            // Swagger Boat Client

            var swaggerBoatClientId = configurationSection["Boat_Swagger:ClientId"];
            if (!swaggerBoatClientId.IsNullOrWhiteSpace())
            {
                var swaggerRootUrl = configurationSection["Boat_Swagger:RootUrl"].TrimEnd('/');

                await CreateClientAsync(
                    name: swaggerBoatClientId,
                    scopes: commonScopes,
                    grantTypes: new[] { "authorization_code" },
                    secret: configurationSection["Boat_Swagger:ClientSecret"]?.Sha256(),
                    requireClientSecret: false,
                    redirectUri: $"{swaggerRootUrl}/swagger/oauth2-redirect.html",
                    corsOrigins: new[] { swaggerRootUrl.RemovePostFix("/") }
                );
            }

            // Swagger Booking Client

            var swaggerBookingClientId = configurationSection["Booking_Swagger:ClientId"];
            if (!swaggerBookingClientId.IsNullOrWhiteSpace())
            {
                var swaggerRootUrl = configurationSection["Booking_Swagger:RootUrl"].TrimEnd('/');

                await CreateClientAsync(
                    name: swaggerBookingClientId,
                    scopes: commonScopes,
                    grantTypes: new[] { "authorization_code" },
                    secret: configurationSection["Booking_Swagger:ClientSecret"]?.Sha256(),
                    requireClientSecret: false,
                    redirectUri: $"{swaggerRootUrl}/swagger/oauth2-redirect.html",
                    corsOrigins: new[] { swaggerRootUrl.RemovePostFix("/") }
                );
            }
            // Swagger Payment Client

            var swaggerPaymentsClientId = configurationSection["Payments_Swagger:ClientId"];
            if (!swaggerPaymentsClientId.IsNullOrWhiteSpace())
            {
                var swaggerRootUrl = configurationSection["Payments_Swagger:RootUrl"].TrimEnd('/');
                await CreateClientAsync(
                    name: swaggerPaymentsClientId,
                    scopes: commonScopes,
                    grantTypes: new[] { "authorization_code" },
                    secret: configurationSection["Payments_Swagger:ClientSecret"]?.Sha256(),
                    requireClientSecret: false,
                    redirectUri: $"{swaggerRootUrl}/swagger/oauth2-redirect.html",
                    corsOrigins: new[] { swaggerRootUrl.RemovePostFix("/") }
                );
            }

            //gateway
            var swaggerGatewayClientId = configurationSection["gateway_Swagger:ClientId"];
            if (!swaggerPaymentsClientId.IsNullOrWhiteSpace())
            {
                var swaggerRootUrl = configurationSection["gateway_Swagger:RootUrl"].TrimEnd('/');
                await CreateClientAsync(
                    name: swaggerGatewayClientId,
                    scopes: commonScopes,
                    grantTypes: new[] { "authorization_code" },
                    secret: configurationSection["gateway_Swagger:ClientSecret"]?.Sha256(),
                    requireClientSecret: false,
                    redirectUri: $"{swaggerRootUrl}/swagger/oauth2-redirect.html",
                    corsOrigins: new[] { swaggerRootUrl.RemovePostFix("/") }
                );
            }
            // Swagger Chat Client

            var swaggerChatClientId = configurationSection["Chat_Swagger:ClientId"];
            if (!swaggerChatClientId.IsNullOrWhiteSpace())
            {
                var swaggerRootUrl = configurationSection["Chat_Swagger:RootUrl"].TrimEnd('/');
                await CreateClientAsync(
                    name: swaggerChatClientId,
                    scopes: commonScopes,
                    grantTypes: new[] { "authorization_code" },
                    secret: configurationSection["Chat_Swagger:ClientSecret"]?.Sha256(),
                    requireClientSecret: false,
                    redirectUri: $"{swaggerRootUrl}/swagger/oauth2-redirect.html",
                    corsOrigins: new[] { swaggerRootUrl.RemovePostFix("/") }
                );
            }

            //Swagger Admin

            var swaggerAdminClientId = configurationSection["Admin_Swagger:ClientId"];
            if (!swaggerAdminClientId.IsNullOrWhiteSpace())
            {
                var swaggerRootUrl = configurationSection["Admin_Swagger:RootUrl"].TrimEnd('/');
                await CreateClientAsync(
                    name: swaggerAdminClientId,
                    scopes: commonScopes,
                    grantTypes: new[] { "authorization_code" },
                    secret: configurationSection["Admin_Swagger:ClientSecret"]?.Sha256(),
                    requireClientSecret: false,
                    redirectUri: $"{swaggerRootUrl}/swagger/oauth2-redirect.html",
                    corsOrigins: new[] { swaggerRootUrl.RemovePostFix("/") }
                );
            }
        }

        private async Task<Client> CreateClientAsync(
            string name,
            IEnumerable<string> scopes,
            IEnumerable<string> grantTypes,
            string secret = null,
            string redirectUri = null,
            string postLogoutRedirectUri = null,
            string frontChannelLogoutUri = null,
            bool requireClientSecret = true,
            bool requirePkce = false,
            IEnumerable<string> permissions = null,
            IEnumerable<string> corsOrigins = null)
        {
            var client = await _clientRepository.FindByClientIdAsync(name);
            if (client == null)
            {
                client = await _clientRepository.InsertAsync(
                    new Client(
                        _guidGenerator.Create(),
                        name
                    )
                    {
                        ClientName = name,
                        ProtocolType = "oidc",
                        Description = name,
                        AlwaysIncludeUserClaimsInIdToken = true,
                        AllowOfflineAccess = true,
                        AbsoluteRefreshTokenLifetime = 31536000, //365 days
                        AccessTokenLifetime = 31536000, //365 days
                        AuthorizationCodeLifetime = 300,
                        IdentityTokenLifetime = 300,
                        RequireConsent = false,
                        FrontChannelLogoutUri = frontChannelLogoutUri,
                        RequireClientSecret = requireClientSecret,
                        RequirePkce = requirePkce
                    },
                    autoSave: true
                );
            }

            foreach (var scope in scopes)
            {
                if (client.FindScope(scope) == null)
                {
                    client.AddScope(scope);
                }
            }

            foreach (var grantType in grantTypes)
            {
                if (client.FindGrantType(grantType) == null)
                {
                    client.AddGrantType(grantType);
                }
            }

            if (!secret.IsNullOrEmpty())
            {
                if (client.FindSecret(secret) == null)
                {
                    client.AddSecret(secret);
                }
            }

            if (redirectUri != null)
            {
                if (client.FindRedirectUri(redirectUri) == null)
                {
                    client.AddRedirectUri(redirectUri);
                }
            }

            if (postLogoutRedirectUri != null)
            {
                if (client.FindPostLogoutRedirectUri(postLogoutRedirectUri) == null)
                {
                    client.AddPostLogoutRedirectUri(postLogoutRedirectUri);
                }
            }

            if (permissions != null)
            {
                await _permissionDataSeeder.SeedAsync(
                    ClientPermissionValueProvider.ProviderName,
                    name,
                    permissions,
                    null
                );
            }

            if (corsOrigins != null)
            {
                foreach (var origin in corsOrigins)
                {
                    if (!origin.IsNullOrWhiteSpace() && client.FindCorsOrigin(origin) == null)
                    {
                        client.AddCorsOrigin(origin);
                    }
                }
            }

            return await _clientRepository.UpdateAsync(client);
        }
    }
}
