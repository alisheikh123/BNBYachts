namespace BnByachts.NotificationHub.Services
{
    public interface IEmailTemplateProvider
    {
        string GetDefaultTemplate(int? tenantId=null, string EMAILLOGOURL = null);
    }
}
