using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using DGIvaylovgrad.Services;
using DGIvaylovgrad.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DGIvaylovgrad.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DocumentController : ControllerBase
    {
        private readonly IDocumentService documentService;

        public DocumentController(IDocumentService documentService)
        {
            this.documentService = documentService;
        }

        // 0) Action Method
        [HttpGet]
        [Route("download/{id}")]
        public IActionResult GetDogPic(int id)
        {
            var result =
                new HttpResponseMessage(HttpStatusCode.OK);

            // 1) Get file bytes
            var file =  this.documentService.DownloadDocumentByIdAsync(id);

            if (file != null)
            {
        
                // 3) Add memory stream to response
                result.Content  = new ByteArrayContent(file.Bytes);

                // 4) build response headers
                var headers = result.Content.Headers;

                headers.ContentDisposition =
                    new ContentDispositionHeaderValue("attachment");
                headers.ContentDisposition.FileName = file.Name;

                headers.ContentType =
                    //new MediaTypeHeaderValue("application/jpg");
                    new MediaTypeHeaderValue("application/pdf");
                result.Content.Headers.Add("x-filename", "OrderActivity.pdf");

                //Set MIME type.
                result.Content.Headers.ContentType = new MediaTypeHeaderValue("application/pdf");
            }

            this.HttpContext.Response.RegisterForDispose(result);

            return new HttpResponseMessageResult(result);
        }
        

        // POST api/<DocumentController>
        [HttpPost("{fileName}")]
        public async Task<IActionResult> Upload(string fileName)
        {
            IFormFile file = Request.Form.Files[0];

            if (file == null || file.Length > 8388608)
            {
                return this.UnprocessableEntity(new { err = "Качения файл трябва да бъде не по-голям от 8МБ. Ако искате да качите по-голям файл свържете се с вашия администратор." });
            }

            bool result = await this.documentService.CreateDocument(fileName, file);

            if (!result)
                return this.BadRequest();

            return Ok(new { err = $"Качването е успешно. Вие създадохте файл с име {fileName}" });
        }

        // GET api/<DocumentController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var documents = await this.documentService.GetAllDocumentAsync<DocumentViewModel>();

            var allDocuments = new AllDocumentsViewModel()
            {
                AllDocuments = documents
            };
            if (allDocuments != null)
            {
                return this.Ok(allDocuments);
            }

            return this.BadRequest("Failed to load documents from db");
        }

        // GET api/<DocumentController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var document = await this.documentService.GetDocumentByIdAsync<DocumentViewModel>(id);

            if (document != null)
            {
                return this.Ok(document);
            }

            return this.BadRequest($"Failed to load document with id={id} from db");
        }

        // DELETE api/<DocumentController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var document = await this.documentService.DeleteDocumentByIdAsync(id);

            if (document)
            {
                return this.Ok(document);
            }

            return this.BadRequest($"Failed to delete document with id={id} from db");
        }

        // DELETE api/<DocumentController>/
        [HttpDelete()]
        public async Task<IActionResult> Delete()
        {
            var document = await this.documentService.DeleteAllDocuments();

            if (document)
            {
                return this.Ok(document);
            }

            return this.BadRequest($"Failed to delete documents.");
        }

      
    }
}