using Microsoft.AspNet.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace Whiteboard
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();
            services.AddSignalR();
        }

        public void Configure(IApplicationBuilder app, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole();    
            app.UseIISPlatformHandler();
            app.UseStaticFiles();
            app.UseDeveloperExceptionPage();
            app.UseMvcWithDefaultRoute();
            app.UseSignalR();
        }
    }
}