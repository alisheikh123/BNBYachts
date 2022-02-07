using BnBYachts.Core.Data.Model.VerifyPhoneNumber;
using BnBYachts.Core.Requestable;
using BnBYachts.Core.Shared;
using BnBYachts.Core.Shared.Interface;
using BnBYachts.EventBusShared;
using BnBYachts.EventBusShared.Contracts;
using BnBYachts.Shared.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;
using Volo.Abp.Data;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Domain.Services;
using Volo.Abp.Identity;
using Volo.Abp.ObjectMapping;
using Volo.Abp.Uow;

namespace BnBYachts.Core.Managers
{
    public class OnBoardingManager : DomainService, IOnBoardingManager
    {
        private readonly IRepository<IdentityUser, Guid> _repository;
        private readonly IRepository<OTPVerifierEntity> _repositoryOTPEntity;
        private readonly IObjectMapper<CoreDomainModule> _objectMapper;
        private readonly ILogger<IOnBoardingManager> _logger;
        private readonly EventBusDispatcher _eventBusDispatcher;
        private readonly IUnitOfWorkManager _unitOfWorkManager;
        public OnBoardingManager(IRepository<IdentityUser, Guid> repository,
            IRepository<OTPVerifierEntity> repositoryOTPEntity,
            IObjectMapper<CoreDomainModule> objectMapper,
            ILogger<IOnBoardingManager> logger,
            EventBusDispatcher eventBusDispatcher,
            IUnitOfWorkManager unitOfWorkManager)
        {
            _repository = repository;
            _repositoryOTPEntity = repositoryOTPEntity;
            _objectMapper = objectMapper;
            _logger = logger;
            _eventBusDispatcher = eventBusDispatcher;
            _unitOfWorkManager = unitOfWorkManager;
        }
        public async Task GenerateOTP(UserMobileVerificationRequestable mobileVerification)
        {
            var IsUser = await _repository.GetAsync(res => res.Id == Guid.Parse(mobileVerification.UserId)).ConfigureAwait(false);
            if (IsUser != null)
            {
                var random = new Random();
                mobileVerification.OtpCode = (random.Next(100000, 999999)).ToString();
                await _eventBusDispatcher.Publish<IOTPContract>(new OTPContract
                {
                    PhoneNumber = mobileVerification.Phone,
                    OTPCode = mobileVerification.OtpCode
                });
                _logger.LogInformation("Generate OTP and send the otp code to user mobile number against this user Id:" + _unitOfWorkManager.Current.Id.ToString());
                await _repositoryOTPEntity.InsertAsync(_objectMapper.Map<UserMobileVerificationRequestable, OTPVerifierEntity>(mobileVerification), true);

            }
        }

        public async Task<EntityResponseModel> VerifyOTP(long otpNumber, string userId)
        {
            var response = new EntityResponseModel();
            var OTPVerifierEntity = await _repositoryOTPEntity.FindAsync(x => x.UserId == userId && x.OTPCode == otpNumber.ToString()).ConfigureAwait(false);
            if (OTPVerifierEntity != null)
            {
                var userEntity = await _repository.FindAsync(res => res.Id == Guid.Parse(OTPVerifierEntity.UserId)).ConfigureAwait(false);
                if (userEntity != null)
                {
                    userEntity.SetPhoneNumber(OTPVerifierEntity.PhoneNumber, true);
                    userEntity.SetProperty(UserConstants.IsInitialLogin, false);
                    await _repository.UpdateAsync(userEntity, autoSave: true).ConfigureAwait(false);
                    _logger.LogInformation("Update the Phone Number of User:" + _unitOfWorkManager.Current.Id.ToString());
                    response.Data = OTPVerifierEntity;
                }
            }
            return response;
        }

        public async Task UploadProfileImage(IFormFile file, string userId)
        {
            var userEntity = await _repository.FindAsync(res => res.Id == Guid.Parse(userId)).ConfigureAwait(false);
            if (userEntity != null)
            {
                userEntity.SetProperty(UserConstants.ImagePath, file.FileName, true);
                await _repository.UpdateAsync(userEntity, autoSave: true).ConfigureAwait(false);
                _logger.LogInformation("Successfully Update the Profile Picture of:" + _unitOfWorkManager.Current.Id.ToString());
            }

        }
        public async Task ChangeInitialLoginStatus(string userId)
        {
            var userEntity = await _repository.FindAsync(res => res.Id == Guid.Parse(userId)).ConfigureAwait(false);
            if (userEntity != null)
            {
                userEntity.SetProperty(UserConstants.IsInitialLogin, false);
                await _repository.UpdateAsync(userEntity, autoSave: true).ConfigureAwait(false);
                _logger.LogInformation("Change Intial Login Status of :" + _unitOfWorkManager.Current.Id.ToString());
            }
        }



    }
}
