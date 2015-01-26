var app = angular.module('main', ['ngRoute', 'ngAnimate', 'ui.bootstrap']);

app.controller('AppController', function($scope, $log, $location, $window) {
	$scope.home = 'active';
	$scope.isCollapsed = true;
	
	$scope.gotoGitHub = function() {
		$window.location.href = 'https://github.com/Racer159';
		ga('send', 'pageview');
	};
	
	$scope.gotoHome = function() {
		$location.path('/home');
		ga('send', 'pageview');
	};
	
	$scope.gotoResume = function() {
		$location.path('/resume');
		ga('send', 'pageview');
	};
	
	$scope.gotoProjects = function() {
		$location.path('/projects');
		ga('send', 'pageview');
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
		} else if ($location.path().indexOf('/projects') > -1) {
			$scope.projects = 'active';
		} else {
			$scope.github = 'active';
		}
    });
});