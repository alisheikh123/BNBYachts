using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using Volo.Abp.Domain.Services;

namespace BnByachts.BackgroundWorker.Services
{
    public  interface IS3FileService:IDomainService
    {
        Task UploadFile(byte[] file, string fileName ="", string contentType = "", string subFolder = "", string childFolder = "");
    }
}
