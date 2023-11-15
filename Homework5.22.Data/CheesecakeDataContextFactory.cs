using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace Homework5._22.Data
{
    public class CheesecakeDataContextFactory: IDesignTimeDbContextFactory<CheesecakeDbContext>
    {       
            public CheesecakeDbContext CreateDbContext(string[] args)
            {
                var config = new ConfigurationBuilder()
                   .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), $"..{Path.DirectorySeparatorChar}Homework5.22.Web"))
                   .AddJsonFile("appsettings.json")
                   .AddJsonFile("appsettings.local.json", optional: true, reloadOnChange: true).Build();

                return new CheesecakeDbContext(config.GetConnectionString("ConStr"));
            }        
    }
}
