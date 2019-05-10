using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace BuffetApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadController : Controller
    {
        private readonly IHostingEnvironment _hostingEnvironment;

        public UploadController(IHostingEnvironment hostingEnvironment)
        {
        _hostingEnvironment = hostingEnvironment;
        }
        
        [HttpPost("UploadFiles")]
        [Produces("application/json")]
        public async Task<IActionResult> Post(List<IFormFile> files)
        {
            // Get the file from the POST request
            var theFile = HttpContext.Request.Form.Files[0];

            // Get the server path, wwwroot
           //  string webRootPath = _hostingEnvironment.WebRootPath;

            // Building the path to the uploads directory
            // var fileRoute = Path.Combine(webRootPath, "uploads");
            // Get the server path, wwwroot
            string webRootPath = _hostingEnvironment.WebRootPath;

            // Building the path to the uploads directory
            var fileRoute = Path.Combine(webRootPath, "uploads");

            // Get the mime type
            var mimeType = HttpContext.Request.Form.Files[0].ContentType;

            // Get File Extension
            string extension = System.IO.Path.GetExtension(theFile.FileName);

            // Generate Random name.
            string name = Guid.NewGuid().ToString().Substring(0, 8) + extension;

            // Build the full path inclunding the file name
            string link = Path.Combine(fileRoute, name);

            // Create directory if it does not exist.
            FileInfo dir = new FileInfo(fileRoute);
            dir.Directory.Create();

            // Basic validation on mime types and file extension
            string[] imageMimetypes = { "image/gif", "image/jpeg", "image/pjpeg", "image/x-png", "image/png", "image/svg+xml" };
            string[] imageExt = { ".gif", ".jpeg", ".jpg", ".png", ".svg", ".blob" };

            try
            {
            if (Array.IndexOf(imageMimetypes, mimeType) >= 0 && (Array.IndexOf(imageExt, extension) >= 0))
            {
                // Copy contents to memory stream.
                Stream stream;
                stream = new MemoryStream();
                theFile.CopyTo(stream);
                stream.Position = 0;
                String serverPath = link;

                // Save the file
                using (FileStream writerFileStream = System.IO.File.Create(serverPath))
                {
                await stream.CopyToAsync(writerFileStream);
                writerFileStream.Dispose();
                }

                // Return the file path as json
                Hashtable imageUrl = new Hashtable();
                imageUrl.Add("link", "http://localhost:4000/Uploads/" + name);

                return Json(imageUrl);
            }
            throw new ArgumentException("The image did not pass the validation");
            }

            catch (ArgumentException ex)
            {
            return Json(ex.Message);
            }
        }
        [HttpPost, DisableRequestSizeLimit]
        public IActionResult Upload()
        {
            try
            {
                var file = Request.Form.Files[0];
                string webRootPath = _hostingEnvironment.WebRootPath;
                var folderName = Path.Combine(webRootPath, "Images");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

                if (file.Length > 0)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fullPath = Path.Combine(pathToSave, fileName);
                    var dbPath = Path.Combine(folderName, fileName);

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }

                    return Ok(new { dbPath });
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception )
            {
                return StatusCode(500, "Internal server error");
            }
        }
        [HttpGet("LoadImages")]
         public ActionResult LoadImages()
        {
            string[] listFiles = Directory.GetFiles(Path.Combine(_hostingEnvironment.WebRootPath, "uploads"));
            List<object> jsonListFiles = new List<object>();

            foreach (var item in listFiles)
            {
                var fileName = item.Substring(item.LastIndexOf("\\") + 1);
                jsonListFiles.Add(new
                {
                    name = fileName,
                    url = "http://localhost:4000/Uploads/"+fileName,
                    thumb = "http://localhost:4000/Uploads/"+fileName,
                    tag = "uploads"
                });
            }
            //var jsonObj = JsonConvert.SerializeObject(jsonListFiles);
            try
            {
                return Json(jsonListFiles);
            }
            catch (Exception e)
            {
                return Json(e);
            }
        }

        [HttpDelete("DeleteImages")]
         public ActionResult DeleteImages()
        {
            Microsoft.Extensions.Primitives.StringValues values;
            var k = HttpContext.Request.Form.TryGetValue("name",out values); 
            string getName = values[0];
            string webRootPath = _hostingEnvironment.WebRootPath;

            // Building the path to the uploads directory
            var fileRoute = Path.Combine(webRootPath, "uploads");

            string link = Path.Combine(fileRoute, getName);
            if ((System.IO.File.Exists(link)))
                {
                    System.IO.File.Delete(link);
                }
            return Ok();
        }

        
    }
}