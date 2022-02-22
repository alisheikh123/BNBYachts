namespace BnByachts.NotificationHub.Templates
{
    public interface IEmailTemplateProvider
    {
        string GetDefaultTemplate(int? tenantId, string EMAILLOGOURL = null);
    }
}
