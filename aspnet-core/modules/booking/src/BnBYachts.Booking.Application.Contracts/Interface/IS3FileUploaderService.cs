using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace BnBYachts.Booking.Interface
{
    public interface IS3FileUploaderService
    {
        Task UploadFileToAWSAsync(IFormFile myfile, string parentFolder = "",string subFolder = "", string childFolder = "");
    }
}
