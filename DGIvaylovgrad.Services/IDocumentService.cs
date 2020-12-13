
using DGIvaylovgrad.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DGIvaylovgrad.Services
{
    public interface IDocumentService
    {
        public Task<bool> CreateDocument(string name, IFormFile file);

        public Task<bool> DeleteAllDocuments();

        public Task<bool> DeleteDocumentByIdAsync(int id);

        public Task<IEnumerable<TViewModel>> GetAllDocumentAsync<TViewModel>();

        public Document DownloadDocumentByIdAsync(int id);


        public Task<TViewModel> GetDocumentByIdAsync<TViewModel>(int id);
    } 
}
