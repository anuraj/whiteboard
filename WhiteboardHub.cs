using Microsoft.AspNet.SignalR;
namespace Whiteboard
{
	public class WhiteboardHub: Hub
	{
		public void DrawShape(int shape, string fillColor, string color, 
			int size, int x, int y, int x1, int y1)
		{
			Clients.All.Draw(shape, fillColor, color, size, x, y, x1, y1);
		}
	}
}