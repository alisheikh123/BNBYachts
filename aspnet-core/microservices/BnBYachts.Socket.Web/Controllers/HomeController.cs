using Microsoft.AspNetCore.Mvc;
using Volo.Abp.AspNetCore.Mvc;

namespace BnBYachts.Socket.Web.Controllers
{
    public class HomeController : AbpController
    {
        public ActionResult Index()
        {
            return Json("Application is running");
        }
    }
}
