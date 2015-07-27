var app = angular.module('main');

app.directive('clock', ['$interval', '$compile', function($interval, $compile) {

	function link(scope, element, attrs) {
		var timeoutId;
		
		//get the canvas object
		var clock = document.getElementById('canvas-' + attrs.size);
		var ctx = clock.getContext('2d');

		// set the selectable values
		scope.hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
		scope.minutes = [{value: 0, label: "00"}, {value: 5, label: "05"}, {value: 10, label: "10"}, {value: 15, label: "15"},
			{value: 20, label: "20"}, {value: 25, label: "25"}, {value: 30, label: "30"}, {value: 35, label: "35"},
			{value: 40, label: "40"}, {value: 45, label: "45"}, {value: 50, label: "50"}, {value: 55, label: "55"}];
		scope.ampms = ["AM", "PM"];
		scope.onoffs = ["ON", "OFF"];
		
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
			
			if (attrs.size == 'xs') {
				//background and style small
				ctx.shadowBlur = 2;
				ctx.fillStyle = '#FFFFFF';
				ctx.fillRect(0, 0, 300, 300);
				
				drawCommon(ctx, hours, minutes, nowseconds, 150, 112, 90, 67);
			} else if (attrs.size == 'sm') {
				//background and style small
				ctx.shadowBlur = 2;
				ctx.fillStyle = '#FFFFFF';
				ctx.fillRect(0, 0, 400, 400);
				
				drawCommon(ctx, hours, minutes, nowseconds, 200, 150, 120, 90);
			} else {
				//background and style large
				ctx.shadowBlur = 2;
				ctx.fillStyle = '#FFFFFF';
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

				//alarm1
				ctx.lineWidth = 10;
				ctx.strokeStyle = '#B30000';
				ctx.shadowColor = '#800000';
				ctx.beginPath();
				if (scope.aoneampm == "AM") {
					ctx.arc(840, 170, 50, -0.5*Math.PI, (scope.aonehour*Math.PI)/12-0.5*Math.PI);
				} else {
					ctx.arc(840, 170, 50, -0.5*Math.PI, ((scope.aonehour-12)*Math.PI)/12-0.5*Math.PI);
				}
				ctx.stroke();
				ctx.beginPath();
				ctx.arc(840, 170, 30, -0.5*Math.PI, (scope.aoneminute*Math.PI)/30-0.5*Math.PI);
				ctx.stroke();

				//alarm2
				ctx.strokeStyle = '#B38F00';
				ctx.shadowColor = '#806600';
				ctx.beginPath();
				if (scope.atwoampm == "AM") {
					ctx.arc(840, 305, 50, -0.5*Math.PI, (scope.atwohour*Math.PI)/12-0.5*Math.PI);
				} else {
					ctx.arc(840, 305, 50, -0.5*Math.PI, ((scope.atwohour-12)*Math.PI)/12-0.5*Math.PI);
				}
				ctx.stroke();
				ctx.beginPath();
				ctx.arc(840, 305, 30, -0.5*Math.PI, (scope.atwominute*Math.PI)/30-0.5*Math.PI);
				ctx.stroke();

				//draw the text
				//date
				ctx.shadowColor = '#BCBCBC';
				ctx.font = "54px Segoe UI, Helvetica Neue, Helvetica, Arial, sans-serif";
				ctx.fillStyle = '#121212';
				ctx.fillText(today, 410, 70);

				//time
				ctx.font = "42px Segoe UI, Helvetica Neue, Helvetica, Arial, sans-serif";
				ctx.fillStyle = '#121212';
				ctx.fillText(time, 410, 120);

				//alarms
				ctx.font = "25px Segoe UI, Helvetica Neue, Helvetica, Arial, sans-serif";
				ctx.fillStyle = '#121212';
				ctx.fillText("Alarm", 410, 190);
				ctx.fillText("Alarm", 410, 263);

				ctx.font = "25px Segoe UI, Helvetica Neue, Helvetica, Arial, sans-serif";
				ctx.fillStyle = '#FF0000';
				ctx.fillText("1", 495, 190);

				ctx.fillStyle = '#FFCC00';
				ctx.fillText("2", 495, 263);
			}
			
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
		
		function drawCommon(ctx, hours, minutes, nowseconds, center, hoursize, minsize, secsize) {
			ctx.shadowColor = '#73b92d';
			ctx.beginPath();
			ctx.arc(center, center, hoursize, 0 , 2 * Math.PI);
			ctx.fillStyle = "#99D75B";
			ctx.fill();
			ctx.lineWidth = 1;
			ctx.strokeStyle = '#99D75B';
			ctx.stroke();
			
			ctx.strokeStyle = '#4d7b1e';
			ctx.shadowColor = '#335214';
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