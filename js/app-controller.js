var app = angular.module('main', ['ngRoute', 'ngAnimate', 'ui.bootstrap']);

app.controller('AppController', function($scope, $log, $location, $window) {
	$scope.home = 'active';
	
	$scope.gotoGitHub = function() {
		$window.location.href = 'https://github.com/Racer159';
	};
	
	$scope.gotoHome = function() {
		$location.path('/home');
	};
	$scope.gotoResume = function() {
		$location.path('/resume');
	};
	
	$scope.gotoProjects = function() {
		$location.path('/projects');
	};
	
	$scope.$on("$locationChangeSuccess", function(event){
    	$scope.home = '';
		$scope.resume = '';
		$scope.projects = '';
		$scope.github = '';
		$log.info($location.path());
		if ($location.path() == '/home') {
			$scope.home = 'active';
		} else if ($location.path() == '/resume') {
			$scope.resume = 'active';
		} else if ($location.path() == '/projects') {
			$scope.projects = 'active';
		} else {
			$scope.github = 'active';
		}
    });
});