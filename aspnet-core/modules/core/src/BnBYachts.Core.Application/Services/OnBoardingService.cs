using BnBYachts.Core.Interface;
using BnBYachts.Core.Requestable;
using BnBYachts.Core.Shared.Interface;
using BnBYachts.Shared.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace BnBYachts.Core.Services
{
    public class OnBoardingService: ApplicationService,IOnBoardingService
    {
        private readonly IOnBoardingManager _onbordingManager;
        private readonly IS3FileService _s3Service;
        public OnBoardingService(IOnBoardingManager onbordingManager, IS3FileService s3Service)
        {
            _onbordingManager = onbordingManager;
            _s3Service = s3Service;
        }
        public async Task<EntityResponseModel> GenerateOTP(UserMobileVerificationRequestable mobileVerification)
        {
            mobileVerification.UserId = CurrentUser.Id.ToString();
            return await _onbordingManager.GenerateOTP(mobileVerification);
        }
        [HttpGet]
        public async Task<EntityResponseModel> VerifyOTP(long otpNumber)
        {
            return await _onbordingManager.VerifyOTP(otpNumber, CurrentUser.Id.ToString());
        }

        public async Task UploadProfileImage(IFormFile file)
        {
            await _onbordingManager.UploadProfileImage(file, CurrentUser.Id.ToString());
            await _s3Service.UploadFileToAWSAsync(file, "", "");
        }
        [HttpGet]
        public async  Task ChangeInitialLoginStatus()
        {
            await _onbordingManager.ChangeInitialLoginStatus(CurrentUser.Id.ToString());
        }
    }
}
