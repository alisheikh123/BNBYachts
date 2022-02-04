using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using BnBYachts.Core;
using BnBYachts.Core.Requestable;
using BnBYachts.Shared.Model;
using Microsoft.AspNetCore.Http;

namespace BnBYachts.Core.Interface
{
    public interface IOnBoardingService
    {
        Task GenerateOTP(UserMobileVerificationRequestable mobileVerification);
        Task<EntityResponseModel> VerifyOTP(long otpNumber);
        Task UploadProfileImage(IFormFile file);
        Task ChangeInitialLoginStatus();

    }
}
