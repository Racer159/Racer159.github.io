var app = angular.module('main');

app.directive('clocksm', ['$interval', function($interval) {
	console.log('I am running');

	function link(scope, element, attrs) {
		var timeoutId;
	
		//get the canvas object
		var clock = document.getElementById('canvas');
		var ctx = clock.getContext('2d');

		//set the alarm variables
		scope.aonehour = 1;
		scope.aoneminute = 0;
		scope.aoneampm = "AM";
		scope.aoneon = "OFF";

		//set the alarm variables
		scope.atwohour = 1;
		scope.atwominute = 0;
		scope.atwoampm = "AM";
		scope.atwoon = "OFF";
	
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

			//background and style
			ctx.shadowBlur = 0;
			gradient = ctx.createRadialGradient(200, 200, 5, 200, 200, 220);
			gradient.addColorStop(0, '#DDEEFF');
			gradient.addColorStop(1, '#FFFFFF');
			ctx.fillStyle = gradient;
			ctx.fillRect(0, 0, 200, 200);

			ctx.strokeStyle = '#00CCFF';
			ctx.shadowColor = '#00CCFF';
			ctx.lineWidth = 14;
			ctx.lineCap = 'round';
			ctx.shadowBlur = 15;

			//hours
			ctx.beginPath();
			ctx.arc(200, 200, 150, -0.5*Math.PI, (hours*Math.PI)/12-0.5*Math.PI);
			ctx.stroke();

			//minutes
			ctx.beginPath();
			ctx.arc(200, 200, 120, -0.5*Math.PI, (minutes*Math.PI)/30-0.5*Math.PI);
			ctx.stroke();

			//seconds
			ctx.beginPath();
			ctx.arc(200, 200, 90, -0.5*Math.PI, (nowseconds*Math.PI)/30-0.5*Math.PI);
			ctx.stroke();

			//draw the text
			//date
			ctx.shadowColor = '#BCBCBC';
			ctx.font = "54px Segoe UI";
			ctx.fillStyle = '#121212';
			ctx.fillText(today, 100, 70);

			//time
			ctx.font = "42px Segoe UI";
			ctx.fillStyle = '#121212';
			ctx.fillText(time, 100, 120);

			//check the alarm
			//alarm one
			if (hours>11) {
				if (scope.aoneon == "ON" && scope.aonehour == hours-12 && scope.aoneminute == minutes && scope.aoneampm == "PM") {
					document.getElementById("asound").play();
				}
			} else {
				if (scope.aoneon == "ON" && scope.aonehour == hours && scope.aoneminute == minutes && scope.aoneampm == "AM") {
					document.getElementById("asound").play();
				}
			}

			//alarm two
			if (hours>11) {
				if (scope.atwoon == "ON" && scope.atwohour == hours-12 && scope.atwominute == minutes && scope.atwoampm == "PM") {
					document.getElementById("asound2").play();
				}
			} else {
				if (scope.atwoon == "ON" && scope.atwohour == hours && scope.atwominute == minutes && scope.atwoampm == "AM") {
					document.getElementById("asound2").play();
				}
			}
		}

		//snooze
		scope.snooze = function() {
			alarm1 = document.getElementById("asound");
			alarm2 = document.getElementById("asound2");
			
			if (!(alarm1.paused)) {
				var mins = 0;
				mins = scope.aoneminute;
				mins = parseInt(mins, 10) + 10;
				if (mins > 60) {
					mins = mins - 60;
					var hrs = parseInt(scope.aonehour);
					hrs = hrs + 1;
					if (hrs > 11) {
						hrs = hrs - 12;
						if (scope.aoneampm == "AM") {
							scope.aoneampm = "PM";
						} else {
							scope.aoneampm = "AM";
						}
					}
					scope.aonehour = hrs;
				}
				scope.aoneminute = addZero(mins);
				alarm1.pause();
			}
			
			if (!(alarm2.paused)) {
				var mins = 0;
				mins = scope.atwominute;
				mins = parseInt(mins, 10) + 10;
				if (mins > 60) {
					mins = mins - 60;
					var hrs = parseInt(scope.atwohour);
					hrs = hrs + 1;
					if (hrs > 11) {
						hrs = hrs - 12;
						if (scope.atwoampm == "AM") {
							scope.atwoampm = "PM";
						} else {
							scope.atwoampm = "AM";
						}
					}
					scope.atwohour = hrs;
				}
				scope.atwominute = addZero(mins);
				alarm2.pause();
			}
		}

		//alarm off
		scope.off = function() {
			alarm1 = document.getElementById("asound");
			alarm2 = document.getElementById("asound2");
			if (!(alarm1.paused)) {
				scope.aoneon = "OFF";
				alarm1.pause();
			}
			if (!(alarm2.paused)) {
				scope.atwoon = "OFF";
				alarm2.pause();
			}
		}

		//helper to zero pad a string
		function addZero(i) {
			var s = "";
			if (i<10) {
				s = "0" + i.toString();
			} else {
				s = i.toString();
			}
			return s;
		}

		element.on('$destroy', function() {
			$interval.cancel(timeoutId);
		});

		// start the UI update process; save the timeoutId for canceling
		timeoutId = $interval(function() {
			draw(); // update DOM
		}, 40);
	}

	return {
		restrict: 'AEC',
		link: link,
		templateUrl: 'js/alarmclock/clock-sm.html'
	};
}]);