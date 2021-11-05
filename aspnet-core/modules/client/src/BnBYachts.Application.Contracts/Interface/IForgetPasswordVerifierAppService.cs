using BnBYachts.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace BnBYachts.Interface
{
    public interface IForgetPasswordVerifierAppService: ICrudAppService<ForgetPasswordVerifierDto,Guid, PagedAndSortedResultRequestDto,ForgetPasswordVerifierDto> 
    {
        Task<string> ForgotPassword(string Email);

    }
}
