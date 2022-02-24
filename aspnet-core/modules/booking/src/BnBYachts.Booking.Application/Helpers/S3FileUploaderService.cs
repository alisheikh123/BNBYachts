using Amazon;
using Amazon.S3;
using BnBYachts.Booking.DTO;
using BnBYachts.Booking.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;
using Volo.Abp.Domain.Services;

namespace BnBYachts.Booking.Helpers
{
        public class S3FileUploaderService : DomainService,IS3FileUploaderService
    {
            private readonly AWSOptions _awsSettings;
            public S3FileUploaderService(IOptions<AWSOptions> awsSettings)
            {
                _awsSettings = awsSettings.Value;
            }
            public async Task UploadFileToAWSAsync(IFormFile myfile, string parentFolder="",string subFolder = "", string childFolder = "")
            {
                var s3Client = new AmazonS3Client(_awsSettings.AWSAccessKey, _awsSettings.AWSSecretKey, RegionEndpoint.USEast1);
                var bucketName = _awsSettings.AWSBucketName;
                var keyName = parentFolder != "" ? parentFolder :_awsSettings.AWSDefaultFolder;
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
                    InputStream = fs,
                    ContentType = myfile.ContentType,
                    CannedACL = S3CannedACL.PublicRead
                };
                var response = await s3Client.PutObjectAsync(request);
            }
        }
    }