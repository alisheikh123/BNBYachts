using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Volo.Abp.AspNetCore.Mvc;

namespace BnBYachts.Controllers
{
    public class HomeController : AbpController
    {
        public ActionResult Index()
        {
            return Redirect("~/swagger");
        }

        [HttpGet]
        //[Authorize]
        [Route("UserInfo/{userId}")]
        public async Task<object> UserInfo(string userId)
        {
            //var userInfo = await _ILoginservice.UserInfo(userId);
            //var user = await UserManager.FindByIdAsync(userId);

            return Ok("Success");
        }
    }
}
