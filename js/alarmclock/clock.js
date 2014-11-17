var app = angular.module('main');

app..directive('clock', ['$interval', function($interval) {

	function link(scope, element, attrs) {
		var timeoutId;
	
		//get the canvas object
		var clock = document.getElementById('canvas');
		var ctx = clock.getContext('2d');

		//set the alarm variables
		var aonehour = 1;
		var aoneminute = 0;
		var aoneampm = "AM";

		//set the alarm variables
		var atwohour = 1;
		var atwominute = 0;
		var atwoampm = "AM";
	
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
				if (document.getElementById("onoff1").value == "ON" && aonehour == hours-12 && aoneminute == minutes && aoneampm == "PM") {
					document.getElementById("asound").play();
				}
			} else {
				if (document.getElementById("onoff1").value == "ON" && aonehour == hours && aoneminute == minutes && aoneampm == "AM") {
					document.getElementById("asound").play();
				}
			}

			//alarm two
			if (hours>11) {
				if (document.getElementById("onoff2").value == "ON" && atwohour == hours-12 && atwominute == minutes && atwoampm == "PM") {
					document.getElementById("asound2").play();
				}
			} else {
				if (document.getElementById("onoff2").value == "ON" && atwohour == hours && atwominute == minutes && atwoampm == "AM") {
					document.getElementById("asound2").play();
				}
			}
		}

		//update alarm variables
		function updateAlarm() {
			aonehour = document.getElementById("hour1").value;
			aoneminute = document.getElementById("minute1").value;
			aoneampm = document.getElementById("ampm1").value;
	
			atwohour = document.getElementById("hour2").value;
			atwominute = document.getElementById("minute2").value;
			atwoampm = document.getElementById("ampm2").value;
		}

		//snooze
		function snooze() {
			alarm1 = document.getElementById("asound");
			alarm2 = document.getElementById("asound2");
			if (!(alarm1.paused)) {
				var mins = 0;
				mins = document.getElementById("minute1").value;
				mins = parseInt(mins, 10) + 10;
				if (mins > 60) {
					mins = mins - 60;
					var hrs = parseInt(document.getElementById("hour1").value);
					hrs = hrs + 1;
					if (hrs > 11) {
						hrs = hrs - 12;
						if (document.getElementById("ampm1").value == "AM") {
							document.getElementById("ampm1").value = "PM";
						} else {
							document.getElementById("ampm1").value = "AM";
						}
					}
					document.getElementById("hour1").value = hrs;
				}
				document.getElementById("minute1").value = addZero(mins);
				updateAlarm();
				alarm1.pause();
			}
			if (!(alarm2.paused)) {
				var mins = 0;
				mins = document.getElementById("minute2").value;
				mins = parseInt(mins, 10) + 10;
				if (mins > 60) {
					mins = mins - 60;
					var hrs = parseInt(document.getElementById("hour2").value);
					hrs = hrs + 1;
					if (hrs > 11) {
						hrs = hrs - 12;
						if (document.getElementById("ampm2").value == "AM") {
							document.getElementById("ampm2").value = "PM";
						} else {
							document.getElementById("ampm2").value = "AM";
						}
					}
					document.getElementById("hour2").value = hrs;
				}
				document.getElementById("minute2").value = addZero(mins);
				updateAlarm();
				alarm2.pause();
			}
		}

		//alarm off
		function off() {
			alarm1 = document.getElementById("asound");
			alarm2 = document.getElementById("asound2");
			if (!(alarm1.paused)) {
				document.getElementById("onoff1").value = "OFF";
				alarm1.pause();
			}
			if (!(alarm2.paused)) {
				document.getElementById("onoff2").value = "OFF";
				alarm2.pause();
			}
		}

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
		link: link
		templateUrl: 'clock.html'
	};
}]);