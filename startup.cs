using Microsoft.AspNet.Builder;
using Microsoft.Framework.DependencyInjection;
using Microsoft.AspNet.StaticFiles;

namespace Whiteboard
{
    public class Startup
    {
        public void Configure(IApplicationBuilder app)
        {
            app.UseServices(services =>
            {
				services.AddSignalR();
            });
			app.UseFileServer();
			app.UseSignalR();
        }
    }
}