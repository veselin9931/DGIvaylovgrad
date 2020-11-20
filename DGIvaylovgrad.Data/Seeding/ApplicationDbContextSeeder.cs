namespace ODZ.Data.Seeding
{
    using System;
    using System.Linq;

    using Microsoft.AspNetCore.Identity;
    using Microsoft.Extensions.DependencyInjection;
    using System.Threading.Tasks;
    using Microsoft.Extensions.Logging;
    using System.Collections.Generic;
    using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
    using DGIvaylovgrad.Data;
    using DGIvaylovgrad.Data.Models;
    using DGIvaylovgrad.Common;

    public class ApplicationDbContextSeeder
    {
        public static void Seed(ApplicationDbContext dbContext, IServiceProvider serviceProvider)
        {
            if (dbContext == null)
            {
                throw new ArgumentNullException(nameof(dbContext));
            }

            if (serviceProvider == null)
            {
                throw new ArgumentNullException(nameof(serviceProvider));
            }


            var roleManager = serviceProvider.GetRequiredService<RoleManager<ApplicationRole>>();
            Seed(dbContext, roleManager);
        }


        public static void Seed(ApplicationDbContext dbContext, RoleManager<ApplicationRole> roleManager)
        {
            if (dbContext == null)
            {
                throw new ArgumentNullException(nameof(dbContext));
            }

            if (roleManager == null)
            {
                throw new ArgumentNullException(nameof(roleManager));
            }

            SeedRoles(roleManager);
        }

        private static void SeedRoles(RoleManager<ApplicationRole> roleManager)
        {
            SeedRole(GlobalConstants.AdministratorRoleName, roleManager);
        }

        private static void SeedRole(string roleName, RoleManager<ApplicationRole> roleManager)
        {
            var role = roleManager.FindByNameAsync(roleName).GetAwaiter().GetResult();
            if (role == null)
            {
                var result = roleManager.CreateAsync(new ApplicationRole(roleName)).GetAwaiter().GetResult();

                if (!result.Succeeded)
                {
                    throw new Exception(string.Join(Environment.NewLine, result.Errors.Select(e => e.Description)));
                }
            }
        }

    }
}
