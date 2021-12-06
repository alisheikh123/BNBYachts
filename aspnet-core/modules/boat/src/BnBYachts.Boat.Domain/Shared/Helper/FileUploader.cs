
using Amazon;
using Amazon.S3;
using Microsoft.Extensions.Configuration;
using System;
using System.IO;
using System.Threading.Tasks;

namespace BnBYachts.Boat.Shared.Helper
{
    public static class FileUploader
    {
        public static async Task<bool> UploadFileToAWSAsync(string fileName, string fileContent, string subFolder = "", string childFolder = "")
        {
            try
            {
                //var configurationBuilder = new ConfigurationBuilder()
                //                .SetBasePath(Directory.GetCurrentDirectory())
                //                .AddJsonFile("appsettings.json", optional: false).Build();

                var accessKey = "AKIA6M3C2QK343O5JL4U";//configurationBuilder.GetSection("S3Amazon")["AccessKey"].ToString();
                var secretKey = "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";//configurationBuilder.GetSection("S3Amazon")["SecretKey"].ToString();
                var s3Client = new AmazonS3Client(accessKey, secretKey, RegionEndpoint.USEast1);
                var bucketName = "bnbyachts";
                var keyName = "";
                if (!string.IsNullOrEmpty(subFolder))
                {
                    if (!string.IsNullOrEmpty(childFolder))
                    {
                        keyName = subFolder.Trim() + "/" + childFolder.Trim();
                    }
                    else
                    {
                        keyName = subFolder.Trim();
                    }

                }
                keyName = keyName + "/" + fileName;
                byte[] bytes = Convert.FromBase64String(fileContent.Split("base64,")[1]);
                var request = new Amazon.S3.Model.PutObjectRequest
                {
                    BucketName = bucketName,
                    Key = keyName,
                    InputStream = new MemoryStream(bytes),
                    ContentType = "image/png",
                    CannedACL = S3CannedACL.PublicRead
                };
                var response = await s3Client.PutObjectAsync(request);
                if (response.HttpStatusCode == System.Net.HttpStatusCode.OK)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public static string UploadFilesLocal(string fileName, string fileData)
        {
            var configurationBuilder = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory()).Build();
            byte[] bytes = Convert.FromBase64String(fileData.Split("base64,")[1]);
            fileName = DateTime.Now.Ticks.ToString() + "__" + fileName;
            var uploads = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot\\BoatGallery", fileName);
            using (var imageFile = new FileStream(uploads, FileMode.Create))
            {
                imageFile.Write(bytes, 0, bytes.Length);
                imageFile.Flush();
            }
            return fileName;
        }
    }
}
