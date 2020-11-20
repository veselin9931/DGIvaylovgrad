﻿namespace DGIvaylovgrad.Data
{
    using System;

    using DGIvaylovgrad.Data.Common;
    using Microsoft.EntityFrameworkCore;

    public class DbQueryRunner : IDbQueryRunner
    {
        public DbQueryRunner(ApplicationDbContext context)
        {
            this.Context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public ApplicationDbContext Context { get; set; }

        public void RunQuery(string query, params object[] parameters)
        {
            this.Context.Database.ExecuteSqlRaw(query, parameters);
        }

        public void Dispose()
        {
            this.Context?.Dispose();
        }
    }
}