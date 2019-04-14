using Microsoft.EntityFrameworkCore;
using BuffetApi.Entities;

namespace BuffetApi.Helpers
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Blog> Blogs { get; set; }
        public DbSet<Language> Languages { get; set; }
    }
}