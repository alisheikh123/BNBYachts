using System.IO;
using System.Threading.Tasks;
using Amazon.S3;
using Microsoft.Extensions.Options;
using Amazon;

namespace BnByachts.BackgroundWorker.Services
{
    public class S3FileService : IS3FileService
    {
        private readonly AWSOptions _awsSettings;
        public S3FileService(IOptions<AWSOptions> awsSettings)
        {
            _awsSettings = awsSettings.Value;
        }


        public async Task UploadFile(MemoryStream file, string fileName = "", string contentType = "", string subFolder = "", string childFolder = "")
        =>  await new
                AmazonS3Client(_awsSettings.AWSAccessKey, _awsSettings.AWSSecretKey, RegionEndpoint.USEast1)
                .PutObjectAsync(new Amazon.S3.Model.PutObjectRequest
                {
                    BucketName = _awsSettings.AWSBucketName,
                    Key = AwsKeysGenerator(_awsSettings.AWSDefaultFolder, fileName, subFolder, childFolder),
                    InputStream = file,
                    ContentType = contentType,
                    CannedACL = S3CannedACL.PublicRead
                });


        private static string AwsKeysGenerator(string keyName, string fileName = "", string subFolder = "", string childFolder = "")
        {
            if(!string.IsNullOrEmpty(subFolder))
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
            return keyName + "/" + fileName;
        }
    }
}
