$(function () {
	var whiteboard;
	var x, y, x1, y1;
	var isdrawing = false;
	whiteboard = $.connection.whiteboardHub;
	if ($("#mycanvas")[0].getContext) {
		var context = $("#mycanvas")[0].getContext('2d')
		context.drawShape = function (shape, fillColor, color, size, x, y, x1, y1) {
			this.lineWidth = size;
			this.strokeStyle = color;
			this.fillStyle = fillColor;
			this.beginPath();
			switch (shape) {
				case 1:
					this.lineCap = "round";
					this.moveTo(x, y);
					this.lineTo(x1, y1);
					this.stroke();
					break;
				case 2:
					var width = x > x1 ? x - x1 : x1 - x;
					var height = y > y1 ? y - y1 : y1 - y;
					this.rect(x > x1 ? x1 : x, y > y1 ? y1 : y, width, height);
					this.stroke();
					this.fill();
					break;
				case 3:
					var width = x > x1 ? x - x1 : x1 - x;
					var height = y > y1 ? y - y1 : y1 - y;
					this.arc(x > x1 ? x1 : x, y > y1 ? y1 : y, (width + height) / 2, 0, 2 * Math.PI);
					this.stroke();
					this.fill();
					break;
				case 4:
					this.lineCap = "round";
					this.moveTo(x, y);
					this.lineTo(x1, y1);
					this.stroke();
					break;
				case 5:
					this.lineWidth = 20;
					this.lineCap = "square";
					this.strokeStyle = "#fff";
					this.moveTo(x, y);
					this.lineTo(x1, y1);
					this.stroke();
					break;
			}

			this.closePath();
		};
	}

	whiteboard.client.Draw = function (shape, fillColor, color, size, x, y, x1, y1) {
		//whiteboard.server.drawShape(shape, fillColor, color, size, x, y, x1, y1);
		//console.log("server calling...");
		var context = $("#mycanvas")[0].getContext('2d');
		context.drawShape(shape, fillColor, color, size, x, y, x1, y1);
	}

	$.connection.hub.start().done(function(){
		$("#mycanvas").mousedown(function (e) {
			isdrawing = true;
			x1 = x = e.pageX - this.offsetLeft;
			y1 = y = e.pageY - this.offsetTop;
		});

		$("#mycanvas").mousemove(function (e) {
			var shape = $("#ddlShape").val();
			if (isdrawing && (shape == 4 || shape == 5)) {
				x = e.pageX - this.offsetLeft;
				y = e.pageY - this.offsetTop;
				var size = $("#ddlSize").val();
				var color = $("#ddlColor").val();
				var fillColor = $("#ddlFillColor").val();
				whiteboard.server.drawShape(shape, fillColor, color, size, x, y, x1, y1);
				x1 = x;
				y1 = y;
			}
		});

		$("#mycanvas").mouseup(function (e) {
			isdrawing = false;
			x1 = e.pageX - this.offsetLeft;
			y1 = e.pageY - this.offsetTop;
			var size = $("#ddlSize").val();
			var color = $("#ddlColor").val();
			var shape = $("#ddlShape").val();
			var fillColor = $("#ddlFillColor").val();
			whiteboard.server.drawShape(shape, fillColor, color, size, x, y, x1, y1);
		});
	});
});