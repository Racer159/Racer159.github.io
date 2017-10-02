var app = angular.module('main');

app.controller('HomeController', function($scope, $log) {
	
	$scope.maryHadALittleLamb = [3,2,1,2,3,3,3,2,2,2,3,3,3,3,2,1,2,3,3,3,3,2,2,3,2,1]
	$scope.currentPattern = [];
	
	$scope.playDTMF1 = function(e) {
		var evt = e || window.event;
		var dtmf = document.getElementById("dtmf-1");
		dtmf.pause();
		dtmf.play();
		$scope.currentPattern.push(1);
		checkPattern();
	}
	
	$scope.playDTMF2 = function(e) {
		var evt = e || window.event;
		var dtmf = document.getElementById("dtmf-2");
		dtmf.pause();
		dtmf.play();
		$scope.currentPattern.push(2);
		checkPattern();
	}
	
	$scope.playDTMF3 = function(e) {
		var evt = e || window.event;
		var dtmf = document.getElementById("dtmf-3");
		dtmf.pause();
		dtmf.play();
		$scope.currentPattern.push(3);
		checkPattern();
	}
	
	var checkPattern = function() {
		console.log($scope.maryHadALittleLamb)
		console.log($scope.currentPattern)
		console.log(angular.equals($scope.maryHadALittleLamb, $scope.currentPattern))
		if (angular.equals($scope.maryHadALittleLamb, $scope.currentPattern)) {
			console.log('here');
			document.getElementById("image1").src = "images/sheep.png";
			document.getElementById("image2").src = "images/sheep.png";
			document.getElementById("image3").src = "images/sheep.png";
		}
	}
});