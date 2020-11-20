using DGIvaylovgrad.Data.Common.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DGIvaylovgrad.Models
{
    public class Document : BaseDeletableModel<int>
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public byte[] Bytes { get; set; }

        [Required]
        public long Size { get; set; }

    }
}
