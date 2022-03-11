using System.IO;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using Volo.Abp.Domain.Services;
using BnBYachts.Core.Dto;
using BnBYachts.Core.Interface;
using BnBYachts.EventBusShared;
using BnBYachts.EventBusShared.Contracts;

namespace BnBYachts.Core.Services.HelpingService
{
   public class S3FileService: DomainService,IS3FileService
    {
        private readonly EventBusDispatcher _eventBusDispatcher;
        public S3FileService(EventBusDispatcher eventBusDispatcher)
        {
            _eventBusDispatcher = eventBusDispatcher;
        }
        public async Task<S3ResponseDTO> UploadFileToAWSAsync(IFormFile file, string subFolder = "", string childFolder = "")
        {
            var ms = new MemoryStream(new byte[file.Length]);
            await file.CopyToAsync(ms);
            await _eventBusDispatcher.Publish<IS3FileContract>(new S3FileContract
            {
                ChildFolder = childFolder,
                File = ms.ToArray(),
                FileName = file.FileName,
                ContentType = file.ContentType,
                SubFolder = subFolder
            }).ConfigureAwait(false);

            return new S3ResponseDTO
                {
                    KeyName = file.FileName
                };
        }
    }
}
