
using BnBYachts.Core.Dto;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace BnBYachts.Core.Interface
{
    public interface IS3FileService
    {
        Task<S3ResponseDTO> UploadFileToAWSAsync(IFormFile myfile, string subFolder = "", string childFolder = "");
    }
}
