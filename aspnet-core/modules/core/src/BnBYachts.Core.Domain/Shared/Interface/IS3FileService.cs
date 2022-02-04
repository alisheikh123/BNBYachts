using BnBYachts.Core.Shared.DTO;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BnBYachts.Core.Shared.Interface
{
    public interface IS3FileService
    {
        Task<S3ResponseDTO> UploadFileToAWSAsync(IFormFile myfile, string subFolder = "", string childFolder = "");
    }
}
