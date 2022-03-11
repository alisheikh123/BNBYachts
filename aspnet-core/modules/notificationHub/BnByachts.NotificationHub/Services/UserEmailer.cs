using System;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using BnByachts.NotificationHub.Templates;

namespace BnByachts.NotificationHub.Services
{
    public class UserEmailer : IUserEmailer
    {
        private readonly IEmailTemplateProvider _emailTemplateProvider;
        private readonly IMailer _mailer;
        // used for styling action links on email messages.
        private string _emailButtonStyle =
            "padding-left: 30px; padding-right: 30px; padding-top: 12px; padding-bottom: 12px; color: #ffffff; background-color: #00bb77; font-size: 14pt; text-decoration: none;";
        private string _emailButtonColor = "#00bb77";
        public UserEmailer(IEmailTemplateProvider emailTemplateProvider,
            IMailer mailer)
        {
            _emailTemplateProvider = emailTemplateProvider;
            _mailer = mailer;
        }
        public async Task SendPasswordResetLinkAsync(string link = null, string logUrl = null)
        {
           
            var emailTemplate = GetTitleAndSubTitle(1, "BNB password reset.", "This email is sent you to reset and re-create your password.", logUrl);
            var mailMessage = new StringBuilder();
            mailMessage.AppendLine("<b>" + "Name surname" + "</b>: " + "Ali" + "<br />");
            mailMessage.AppendLine("<b>" + "User name" + "</b>: " + "Az," + "<br />");
            if (!link.IsNullOrEmpty())
            {
                link = link.Replace("{userId}", "1");
                link = link.Replace("{resetCode}", Uri.EscapeDataString("Code"));
                link = EncryptQueryParameters(link);
                mailMessage.AppendLine("<br />");
                mailMessage.AppendLine("Please click the link below to reset your password:" + "<br /><br />");
                mailMessage.AppendLine("<a style=\"" + _emailButtonStyle + "\" bg-color=\"" + _emailButtonColor + "\" href=\"" + link + "\">" + "Reset" + "</a>");
                mailMessage.AppendLine("<br />");
                mailMessage.AppendLine("<br />");
                mailMessage.AppendLine("<br />");
                mailMessage.AppendLine("<span style=\"font-size: 9pt;\">" + "If the button above doesn't work, paste this into your browser:" + "</span><br />");
                mailMessage.AppendLine("<span style=\"font-size: 8pt;\">" + link + "</span>");
            }
            await ReplaceBodyAndSend("umar.draz@techverx.com", "BNB password reset", emailTemplate, mailMessage);
        }
        private StringBuilder GetTitleAndSubTitle(int? tenantId, string title, string subTitle, string logUrl)
        {
            var emailTemplate = new StringBuilder(_emailTemplateProvider.GetDefaultTemplate(tenantId, logUrl));
            emailTemplate.Replace("{EMAIL_TITLE}", title);
            emailTemplate.Replace("{EMAIL_SUB_TITLE}", subTitle);

            return emailTemplate;
        }
        private string EncryptQueryParameters(string link, string encrptedParameterName = "c")
        {
            if (!link.Contains("?"))
            {
                return link;
            }
            var basePath = link.Substring(0, link.IndexOf('?'));
            var query = link.Substring(link.IndexOf('?')).TrimStart('?');
            return basePath + "?" + encrptedParameterName + "=" + HttpUtility.UrlEncode(SimpleStringCipher.Instance.Encrypt(query));
        }
        private async Task ReplaceBodyAndSend(string emailAddress, string subject, StringBuilder emailTemplate, StringBuilder mailMessage)
        {
            emailTemplate.Replace("{EMAIL_BODY}", mailMessage.ToString());
            await _mailer.SendEmailAsync
                (
                 emailAddress, subject, emailTemplate.ToString(),
                  true
                );
        }
    }
}
