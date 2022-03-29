using Volo.Abp.DependencyInjection;

namespace BnByachts.NotificationHub.Templates
{
    public interface IEmailTemplateProvider: ITransientDependency
    {
        string GetDefaultTemplate(int? tenantId, string EMAILLOGOURL = null);
    }
}
