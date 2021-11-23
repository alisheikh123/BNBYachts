using System;
using Microsoft.AspNetCore.Mvc;
using Volo.Abp.AspNetCore.Mvc;

namespace BnBYachts.Core.Controllers
{
    public class HomeController : AbpController
    {
        public ActionResult Index()
        {
            Console.WriteLine("home");
            return Redirect("~/swagger");
        }
    }
}
