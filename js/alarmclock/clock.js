var app = angular.module('main');

app.directive('clock', ['$interval', '$compile', function($interval, $compile) {

	function link(scope, element, attrs) {
		var timeoutId;
		
		//get the canvas object
		var clock = document.getElementById('canvas-' + attrs.size);
		var ctx = clock.getContext('2d');
		
		/*Draw the clock to the screen*/
		function draw() {
			//get the date
			var now = new Date();

			//get related information
			var today = now.toDateString();
			var time = now.toLocaleTimeString();
			var hours = now.getHours();
			var minutes = now.getMinutes();
			var seconds = now.getSeconds();
			var millis = now.getMilliseconds();
			var nowseconds = seconds + (millis/1000);
			
			if (attrs.size == 'xs') {
				//background and style xtra small
				ctx.shadowBlur = 2;
				ctx.fillStyle = '#005DA3';
				ctx.fillRect(0, 0, 300, 300);
				
				drawCommon(ctx, hours, minutes, nowseconds, 150, 112, 90, 67);
			} else if (attrs.size == 'sm') {
				//background and style small
				ctx.shadowBlur = 2;
				ctx.fillStyle = '#005DA3';
				ctx.fillRect(0, 0, 400, 400);
				
				drawCommon(ctx, hours, minutes, nowseconds, 200, 150, 120, 90);
			} else {
				//background and style large
				ctx.shadowBlur = 2;
				ctx.fillStyle = '#005DA3';
				ctx.fillRect(0, 0, 950, 400);
				
				ctx.shadowColor = '#CC0000';
				ctx.beginPath();
				ctx.arc(840, 170, 50, 0 , 2 * Math.PI);
				ctx.fillStyle = "#FF0000";
				ctx.fill();
				ctx.lineWidth = 1;
				ctx.strokeStyle = '#FF0000';
				ctx.stroke();
				
				ctx.shadowColor = '#CCA300';
				ctx.beginPath();
				ctx.arc(840, 305, 50, 0 , 2 * Math.PI);
				ctx.fillStyle = "#FFCC00";
				ctx.fill();
				ctx.lineWidth = 1;
				ctx.strokeStyle = '#FFCC00';
				ctx.stroke();

				drawCommon(ctx, hours, minutes, nowseconds, 200, 150, 120, 90);

				//draw the text
				//date
				ctx.shadowColor = '#D9D9D9';
				ctx.font = "54px Segoe UI, Helvetica Neue, Helvetica, Arial, sans-serif";
				ctx.fillStyle = '#FFFFFF';
				ctx.fillText(today, 410, 120);

				//time
				ctx.font = "42px Segoe UI, Helvetica Neue, Helvetica, Arial, sans-serif";
				ctx.fillStyle = '#FFFFFF';
				ctx.fillText(time, 410, 170);
			}
		}
		
		function drawCommon(ctx, hours, minutes, nowseconds, center, hoursize, minsize, secsize) {
			ctx.shadowColor = '#D9D9D9';
			ctx.beginPath();
			ctx.arc(center, center, hoursize, 0 , 2 * Math.PI);
			ctx.fillStyle = "#FFFFFF";
			ctx.fill();
			ctx.lineWidth = 1;
			ctx.strokeStyle = '#FFFFFF';
			ctx.stroke();
			
			ctx.strokeStyle = '#D9D9D9';
			ctx.shadowColor = '#C0C0C0';
			ctx.lineWidth = 14;
			ctx.lineCap = 'round';

			//hours
			ctx.beginPath();
			ctx.arc(center, center, hoursize, -0.5*Math.PI, (hours*Math.PI)/12-0.5*Math.PI);
			ctx.stroke();

			//minutes
			ctx.beginPath();
			ctx.arc(center, center, minsize, -0.5*Math.PI, (minutes*Math.PI)/30-0.5*Math.PI);
			ctx.stroke();

			//seconds
			ctx.beginPath();
			ctx.arc(center, center, secsize, -0.5*Math.PI, (nowseconds*Math.PI)/30-0.5*Math.PI);
			ctx.stroke();
		}

		element.on('$destroy', function() {
			$interval.cancel(timeoutId);
		});

		// start the UI update process; save the timeoutId for cancelling
		timeoutId = $interval(function() {
			draw(); // update DOM
		}, 100);
	}

	return {
		restrict: 'E',
		templateUrl: function (elem, attrs){
			return 'js/alarmclock/clock-' + attrs.size + '.html';
		},
		link: link
	};
}]);