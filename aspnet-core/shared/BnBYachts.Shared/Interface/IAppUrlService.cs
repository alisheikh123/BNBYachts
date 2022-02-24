namespace BnBYachts.Shared.Interface
{

    public interface IAppUrlService
    {
        string CreatePasswordResetUrlFormat(int? tenantId);
    }
}
