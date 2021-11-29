using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using System;
using System.Threading.Tasks;
using BnByachts.NotificationHub.Configuration;

namespace BnByachts.NotificationHub.Services
{
    public class Mailer : IMailer
    {
        private SmtpSettings SmtpSettings { get; set; }
        public Mailer(IOptions<SmtpSettings> smtpSettings)
        {
            SmtpSettings = smtpSettings.Value;
        }
        [Obsolete]
        public async Task SendEmailAsync(string email, string subject, string body, bool IsBodyHtml)
        {
            try
            {
                var message = new MimeMessage();
                message.From.Add(new MailboxAddress(SmtpSettings.SenderName, SmtpSettings.SenderEmail));
                message.To.Add(address: new MailboxAddress(email));
                message.Subject = subject;
                message.Body = new TextPart("html")
                {
                    Text = body
                };
                using var client = new SmtpClient();
                client.ServerCertificateValidationCallback = (s, c, h, e) => true;
                await client.ConnectAsync(SmtpSettings.Server, Convert.ToInt32(SmtpSettings.Port), SecureSocketOptions.StartTls);
                await client.AuthenticateAsync(SmtpSettings.Username, SmtpSettings.Password);
                await client.SendAsync(message);
                await client.DisconnectAsync(true);
                Console.WriteLine("Email send");
            }
            catch (Exception e)
            {

                Console.WriteLine(e.Message);
                throw new InvalidOperationException(e.Message);
            }
        }
    }
}