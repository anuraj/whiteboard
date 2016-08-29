using Microsoft.AspNetCore.Mvc;

namespace Whiteboard.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}