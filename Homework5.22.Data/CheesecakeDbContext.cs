using Microsoft.EntityFrameworkCore;

namespace Homework5._22.Data
{
    public class CheesecakeDbContext : DbContext
    {
        private readonly string _connectionString;

        public CheesecakeDbContext(string connectionString)
        {
            _connectionString = connectionString;
        }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Customer> Customers { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connectionString);
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            foreach (var relationship in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
            {
                relationship.DeleteBehavior = DeleteBehavior.Restrict;
            }
        }
    }
}