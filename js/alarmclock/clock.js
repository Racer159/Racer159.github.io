var app = angular.module('main');

app.directive('clock', ['$interval', function($interval) {

	function link(scope, element, attrs) {
		var timeoutId;
	
		//get the canvas object
		var clock = element.getElementById('canvas');
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
			gradient.addColorStop(0, '#003D4C');
			gradient.addColorStop(1, '#000000');
			ctx.fillStyle = gradient;
			ctx.fillRect(0, 0, 950, 400);

			gradientred = ctx.createRadialGradient(835, 165, 5, 835, 165, 55);
			gradientred.addColorStop(0, '#4C0000');
			gradientred.addColorStop(1, '#000000');
			ctx.fillStyle = gradientred;
			ctx.fillRect(785, 115, 110, 110);

			gradientyel = ctx.createRadialGradient(835, 300, 5, 835, 300, 55);
			gradientyel.addColorStop(0, '#4C4C00');
			gradientyel.addColorStop(1, '#000000');
			ctx.fillStyle = gradientyel;
			ctx.fillRect(785, 250, 110, 110);

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

			//alarm1
			ctx.lineWidth = 10;
			ctx.strokeStyle = '#FF0000';
			ctx.shadowColor = '#FF0000';
			ctx.beginPath();
			if (aoneampm == "AM") {
				ctx.arc(840, 170, 50, -0.5*Math.PI, (aonehour*Math.PI)/12-0.5*Math.PI);
			} else {
				ctx.arc(840, 170, 50, -0.5*Math.PI, ((aonehour-12)*Math.PI)/12-0.5*Math.PI);
			}
			ctx.stroke();
			ctx.beginPath();
			ctx.arc(840, 170, 30, -0.5*Math.PI, (aoneminute*Math.PI)/30-0.5*Math.PI);
			ctx.stroke();
	
			//alarm2
			ctx.strokeStyle = '#FFCC00';
			ctx.shadowColor = '#FFCC00';
			ctx.beginPath();
			if (atwoampm == "AM") {
				ctx.arc(840, 305, 50, -0.5*Math.PI, (atwohour*Math.PI)/12-0.5*Math.PI);
			} else {
				ctx.arc(840, 305, 50, -0.5*Math.PI, ((atwohour-12)*Math.PI)/12-0.5*Math.PI);
			}
			ctx.stroke();
			ctx.beginPath();
			ctx.arc(840, 305, 30, -0.5*Math.PI, (atwominute*Math.PI)/30-0.5*Math.PI);
			ctx.stroke();

			//draw the text
			//date
			ctx.shadowColor = 'DEDEDE';
			ctx.font = "54px Trebuchet MS";
			ctx.fillStyle = '#DEDEDE';
			ctx.fillText(today, 410, 70);

			//time
			ctx.font = "42px Trebuchet MS";
			ctx.fillStyle = '#DEDEDE';
			ctx.fillText(time, 410, 120);

			//alarms
			ctx.font = "25px Trebuchet MS";
			ctx.fillStyle = '#DEDEDE';
			ctx.fillText("ALARM", 410, 190);
			ctx.fillText("ALARM", 410, 253);

			ctx.font = "25px Trebuchet MS";
			ctx.fillStyle = '#FF0000';
			ctx.fillText("1", 490, 190);

			ctx.fillStyle = '#FFCC00';
			ctx.fillText("2", 490, 253);

			//check the alarm
			//alarm one
			if (hours>11) {
				if (scope.aoneon == "ON" && scope.aonehour == hours-12 && scope.aoneminute == minutes && scope.aoneampm == "PM") {
					element.getElementById("asound").play();
				}
			} else {
				if (scope.aoneon == "ON" && scope.aonehour == hours && scope.aoneminute == minutes && scope.aoneampm == "AM") {
					element.getElementById("asound").play();
				}
			}

			//alarm two
			if (hours>11) {
				if (scope.atwoon == "ON" && scope.atwohour == hours-12 && scope.atwominute == minutes && scope.atwoampm == "PM") {
					element.getElementById("asound2").play();
				}
			} else {
				if (scope.atwoon == "ON" && scope.atwohour == hours && scope.atwominute == minutes && scope.atwoampm == "AM") {
					element.getElementById("asound2").play();
				}
			}
		}

		//snooze
		scope.snooze = function() {
			alarm1 = element.getElementById("asound");
			alarm2 = element.getElementById("asound2");
			
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
			alarm1 = element.getElementById("asound");
			alarm2 = element.getElementById("asound2");
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
		templateUrl: 'clock.html'
	};
}]);