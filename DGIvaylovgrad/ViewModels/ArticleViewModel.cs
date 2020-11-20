using DGIvaylovgrad.Common;
using DGIvaylovgrad.Models;
using DGIvaylovgrad.Services.Mapping;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace DGIvaylovgrad.ViewModels
{
    public class ArticleViewModel : IMapFrom<Article>
    {
        public int Id { get; set; }


        [Required]
        [StringLength(GlobalConstants.MaxLenghtName, MinimumLength = GlobalConstants.MinLenghtName, ErrorMessage = GlobalConstants.NameErrorMsg)]
        public string Name { get; set; }

        [Required]
        [StringLength(GlobalConstants.MaxLenghtDescription, ErrorMessage = GlobalConstants.DescriptionErrorMsg, MinimumLength = GlobalConstants.MinLenghDescription)]
        public string Description { get; set; }




        public string ImagePath { get; set; }
    }
}
