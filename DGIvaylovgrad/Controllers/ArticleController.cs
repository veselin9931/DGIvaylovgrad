using System.Collections.Generic;
using System.Threading.Tasks;
using DGIvaylovgrad.Services;
using DGIvaylovgrad.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DGIvaylovgrad.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticleController : ControllerBase
    {
        private readonly IArticleService articleService;

        public ArticleController(IArticleService articleService)
        {
            this.articleService = articleService;
        }


        // GET: api/<ArticleController>
        [HttpGet]
        public async Task<IEnumerable<ArticleViewModel>> Get()
        {
            return articleService.GetAllArticleAsync<ArticleViewModel>();
        }


        // POST api/<ArticleController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]ArticleViewModel model)
        {
            var result = await this.articleService.CreateArticle(model.Name, model.Description);

            if (result)
            {
                // TODO: Add mesage
                return this.Ok();
            }

            return this.BadRequest();
        }

        // DELETE api/<ArticleController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
           var article = await this.articleService.DeleteArticleByIdAsync(id);

            if (article)
            {
                return this.Ok(article);
            }

            return this.BadRequest($"Failed to delete article.");
        }
    }
}
