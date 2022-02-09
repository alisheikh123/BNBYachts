using BnBYachts.Core.Requestable;
using BnBYachts.Shared.Model;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Services;

namespace BnBYachts.Core.Shared.Interface
{
    public interface IOnBoardingManager : IDomainService
    {
        Task GenerateOTP(UserMobileVerificationRequestable mobileVerification);
        Task<EntityResponseModel> VerifyOTP(long otpNumber, string userId);
        Task UploadProfileImage(IFormFile file, string userId);
        Task ChangeInitialLoginStatus(string userId);
    }
}
