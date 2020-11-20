using DGIvaylovgrad.Models;
using DGIvaylovgrad.Services.Mapping;
using System.ComponentModel.DataAnnotations;

namespace DGIvaylovgrad.ViewModels { 

    public class DocumentViewModel : IMapFrom<Document>
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public byte[] Bytes { get; set; }

        [Required]
        public long Size { get; set; }
    }
}
