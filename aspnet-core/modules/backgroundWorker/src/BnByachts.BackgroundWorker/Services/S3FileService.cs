﻿using System.IO;
using System.Threading.Tasks;
using Amazon.S3;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Amazon;

namespace BnByachts.BackgroundWorker.Services
{
    public class S3FileService :IS3FileService
    {
        private readonly AWSOptions _awsSettings;
        public S3FileService(IOptions<AWSOptions> awsSettings)
        {
            _awsSettings = awsSettings.Value;
        }
        public async Task UploadFile(byte[] file,string fileName="",string contentType="", string subFolder = "", string childFolder = "")
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
            keyName = keyName + "/" + fileName;
            var fs = new MemoryStream(file);

            var request = new Amazon.S3.Model.PutObjectRequest
            {
                BucketName = bucketName,
                Key = keyName,
                InputStream = fs,
                ContentType = contentType,
                CannedACL = S3CannedACL.PublicRead
            };
            await s3Client.PutObjectAsync(request);
        }
    }
}
