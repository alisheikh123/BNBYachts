using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using Amazon.S3;
using Amazon;
using Volo.Abp.Domain.Services;
using Microsoft.Extensions.Options;
using BnBYachts.Core.Dto;
using BnBYachts.Core.Interface;

namespace BnBYachts.Core.Services.HelpingService
{
   public class S3FileService: DomainService,IS3FileService
    {
        private readonly AWSOptions _awsSettings;
        public S3FileService(IOptions<AWSOptions> awsSettings)
        {
            _awsSettings = awsSettings.Value;
        }
        public async Task<S3ResponseDTO> UploadFileToAWSAsync(IFormFile myfile, string subFolder = "", string childFolder = "")
        {
                var s3Client = new AmazonS3Client(_awsSettings.AWSAccessKey, _awsSettings.AWSSecretKey, RegionEndpoint.USEast1);
                var bucketName = _awsSettings.AWSBucketName;
                var keyName = _awsSettings.AWSDefaultFolder;
                if (!string.IsNullOrEmpty(subFolder))
                {
                    if (!string.IsNullOrEmpty(childFolder))
                    {
                        keyName = keyName + "/" + subFolder.Trim() + "/" + childFolder.Trim();
                    }
                    else
                    {
                        keyName = keyName + "/" + subFolder.Trim();
                    }

                }
                keyName = keyName + "/" + myfile.FileName;
                var fs = myfile.OpenReadStream();
                
                var request = new Amazon.S3.Model.PutObjectRequest
                {
                    BucketName = bucketName,
                    Key = keyName,
                    InputStream =fs,
                    ContentType = myfile.ContentType,
                    CannedACL = S3CannedACL.PublicRead
                };
                var response = await s3Client.PutObjectAsync(request);
                return new S3ResponseDTO
                {
                    FullPath = keyName,
                    BucketName = bucketName,
                    KeyName = myfile.FileName
                };
        }
    }
}
