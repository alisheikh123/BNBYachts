//using Volo.Abp.Settings;

//namespace BnByachts.NotificationHub.Configuration
//{
//    public class EmailSettingProvider : SettingDefinitionProvider
//    {
//        private readonly ISettingEncryptionService encryptionService;

//        public EmailSettingProvider(ISettingEncryptionService encryptionService)
//        {
//            this.encryptionService = encryptionService;
//        }

//        public override void Define(ISettingDefinitionContext context)
//        {

//            //var passSetting = context.GetOrNull("Abp.Mailing.Smtp.Password");
//            //if (passSetting != null)
//            //{
//            //    string debug = encryptionService.Encrypt(passSetting, "");
//            //    //2+ZoW+hD6zxL2bAR+ueyug==
//            //    //2+ZoW+hD6zxL2bAR+ueyug==
//            //    //"/A216osbfhtgDapo289U9w=="
//            //}
//            //context.Add(
//            ////new SettingDefinition("Smtp.Host", "smtp.mailgun.org"),
//            ////new SettingDefinition("Smtp.Port", "587"),
//            ////new SettingDefinition("Smtp.UseDefaultCredentials", "false"),
//            ////new SettingDefinition("Smtp.UserName", "postmaster@sandboxba9cb4bdb1b647ffbf73d275ed7182b2.mailgun.org"),
//            ////   new SettingDefinition("Smtp.Password", isEncrypted:true)
//            ////    new SettingDefinition("Smtp.EnableSsl", "true"),
//            ////    new SettingDefinition("Smtp.Domain", "smtp.mailgun.org"),
//            ////new SettingDefinition("Smtp.DefaultFromAddress", "ostmaster@sandboxba9cb4bdb1b647ffbf73d275ed7182b2.mailgun.org"),
//            ////    new SettingDefinition("Smtp.DefaultFromDisplayName", "test")
//            //);
//        }
//    }
//}
