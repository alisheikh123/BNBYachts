
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
            var region = "";
            var s3Client = new AmazonS3Client("", "", region);
            var bucketName = "";
            var keyName = "";
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
            byte[] bytes = Convert.FromBase64String(fileContent);
            var request = new Amazon.S3.Model.PutObjectRequest
            {
                BucketName = bucketName,
                Key = keyName,
                InputStream = new MemoryStream(bytes),
                //ContentType = myfile.ContentType,
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
