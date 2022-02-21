using BnBYachts.Shared.Interface;
using BnBYachts.Shared.Model;
using Microsoft.Extensions.Options;


namespace BnByachts.NotificationHub.Services
{
    public class AppUrlServiceBase : IAppUrlService
    {

        private readonly BaseURLModel _baseURLModel;

        public AppUrlServiceBase(IOptions<BaseURLModel> baseURLModel)
        {
            _baseURLModel = baseURLModel.Value;
        }
        public string CreatePasswordResetUrlFormat(int? tenantId)
        {
            return CreatePasswordResetUrlFormat("");
        }
        public string CreatePasswordResetUrlFormat(string tenancyName)
        {
            var resetLink = _baseURLModel.ClientUrl + "/" + _baseURLModel.PasswordResetRoute + "?userId={userId}&resetCode={resetCode}";
            return resetLink;
        }

    }
}
