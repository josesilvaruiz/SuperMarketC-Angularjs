using System.Text;
using SuperMarket.Lib.Core;
using SuperMarket.Lib.DA.EFCore;
using SuperMarket.Lib.DAL;
using SuperMarket.Lib.Services;
using SuperMarket.Web.Helpers;
using SuperMarket.Web.Security;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using SuperMarket.Lib.Models;

namespace SuperMarket.Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // configure strongly typed settings objects
            var appSettingsSection = Configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettingsSection);

            // configure jwt authentication
            var appSettings = appSettingsSection.Get<AppSettings>();

            services.AddDbContext<SuperMarketContext>(options => options.UseSqlServer(appSettings.DbConnection,
                b => b.MigrationsAssembly("SuperMarket.Web")));

            InjectDependencies(services);

            // configure jwt authentication
            var key = Encoding.ASCII.GetBytes(appSettings.Secret);
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
        }

        public void InjectDependencies(IServiceCollection services)
        {
            // DbSets
            services.AddScoped<IDbSet<Client>, ClientsDbSet>();
            services.AddScoped<IDbSet<Employee>, EmployeesDbSet>();
            services.AddScoped<IDbSet<Product>, ProductsDbSet>();
            services.AddScoped<IDbSet<User>, UsersDbSet>();
            services.AddScoped<IDbSet<Order>, OrdersDbSet>();
            services.AddScoped<IDbSet<OrderItem>, OrderItemsDbSet>();

            // Repositories
            services.AddScoped<IRepository<Client>, GenericRepository<Client>>();
            services.AddScoped<IRepository<Employee>, GenericRepository<Employee>>();
            services.AddScoped<IRepository<Product>, GenericRepository<Product>>();
            services.AddScoped<IRepository<User>, GenericRepository<User>>();
            services.AddScoped<IRepository<Order>, GenericRepository<Order>>();
            services.AddScoped<IRepository<OrderItem>, GenericRepository<OrderItem>>();

            // Crud Services
            services.AddScoped<ICrudService<Client>, GenericCrudService<Client>>();
            services.AddScoped<ICrudService<Employee>, GenericCrudService<Employee>>();
            services.AddScoped<ICrudService<Product>, GenericCrudService<Product>>();
            services.AddScoped<ICrudService<User>, GenericCrudService<User>>();
            services.AddScoped<ICrudService<Order>, GenericCrudService<Order>>();
            services.AddScoped<ICrudService<OrderItem>, GenericCrudService<OrderItem>>();

            // Other Services
            services.AddScoped<IRegisterService, RegisterService>();
            services.AddScoped<ILoginService, JwtLoginService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            // global cors policy
            app.UseCors(x => x
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader());

            app.UseAuthentication();

            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.UseMvc();
        }
    }
}
