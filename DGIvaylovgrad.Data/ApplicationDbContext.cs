namespace DGIvaylovgrad.Data
{
    using System;
    using System.Linq;
    using System.Reflection;
    using System.Threading;
    using System.Threading.Tasks;

    using DGIvaylovgrad.Data.Common.Models;
    using DGIvaylovgrad.Data.Models;

    using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore;
    using DGIvaylovgrad.Data;
    using DGIvaylovgrad.Models;
    using Microsoft.AspNetCore.Identity;

    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Article> Articles { get; set; }

        public DbSet<Document> Documents { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

        }
    }
}
