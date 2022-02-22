using System;
using System.Collections.Concurrent;
using System.IO;
using System.Reflection;
using System.Text;
namespace BnByachts.NotificationHub.Templates
{
    public class EmailTemplateProvider : IEmailTemplateProvider
    {

        private readonly ConcurrentDictionary<string, string> _defaultTemplates;

        public EmailTemplateProvider()
        {

            _defaultTemplates = new ConcurrentDictionary<string, string>();
        }

        public string GetDefaultTemplate(int? tenantId, string EMAILLOGOURL = null)
        {
            var assembly = Assembly.GetExecutingAssembly();
            var tenancyKey = tenantId.HasValue ? tenantId.Value.ToString() : "host";
            return _defaultTemplates.GetOrAdd(tenancyKey, key =>
            {
                using (var stream = assembly.GetManifestResourceStream("BnByachts.NotificationHub.Templates.EmailTemplates.default.html"))
                {
                    var bytes = stream.GetAllBytes();
                    var template = Encoding.UTF8.GetString(bytes, 3, bytes.Length - 3);
                    template = template.Replace("{THIS_YEAR}", DateTime.Now.Year.ToString());
                    return template.Replace("{EMAIL_LOGO_URL}", EMAILLOGOURL);
                }
            });

        }
    }

    public static class StreamExtensions
    {
        public static byte[] GetAllBytes(this Stream stream)
        {
            using (var memoryStream = new MemoryStream())
            {
                stream.CopyTo(memoryStream);
                return memoryStream.ToArray();
            }
        }
    }
}
