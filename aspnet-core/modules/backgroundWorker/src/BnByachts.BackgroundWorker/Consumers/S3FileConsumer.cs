using System.IO;
using System.Threading.Tasks;
using BnByachts.BackgroundWorker.Services;
using BnBYachts.EventBusShared.Contracts;
using MassTransit;

namespace BnByachts.BackgroundWorker.Consumers
{
    public class S3FileConsumer  : IConsumer<IS3FileContract>
    {
        private readonly IS3FileService _is3FileService;
        public S3FileConsumer(IS3FileService is3FileService)
        {
            _is3FileService = is3FileService;
        }
        public async Task Consume(ConsumeContext<IS3FileContract> context) 
            =>
         await _is3FileService.UploadFile(
             new MemoryStream(context.Message.File),
             context.Message.FileName,context.Message.ContentType,
                 context.Message.SubFolder,
                context.Message.ChildFolder);
        
    }
}
