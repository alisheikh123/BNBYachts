using BnBYachts.Core.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace BnBYachts.Core.Interface
{
    public interface IForgetService : ICrudAppService<ForgetPasswordVerifierDto, Guid, PagedAndSortedResultRequestDto, ForgetPasswordVerifierDto>
    {
        Task<bool> ForgotPassword(string Email);
        Task<string> VerifyLink(string uniqueId);
        Task<bool> ResetPassword(string userId, string Password);

    }
}
