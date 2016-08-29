using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.SignalR.Hubs;

namespace Whiteboard.Hubs
{
    public class WhiteboardHub : Hub
    {
        public void DrawShape(int shape, string fillColor, string color,
            int size, int x, int y, int x1, int y1)
        {
            Clients.All.Draw(shape, fillColor, color, size, x, y, x1, y1);
        }
    }
}