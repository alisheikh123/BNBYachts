using System.IO;
using System.Threading.Tasks;
using Volo.Abp.Domain.Services;

namespace BnByachts.BackgroundWorker.Services
{
    public  interface IS3FileService:IDomainService
    {
        Task UploadFile(MemoryStream file, string fileName = "", string contentType = "", string subFolder = "", string childFolder = "");
    }
}
