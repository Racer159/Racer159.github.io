var app = angular.module('main', ['ui.router', 'ngAnimate', 'ui.bootstrap']);

app.controller('AppController', function($scope, $log, $location, $window) {
	$scope.home = 'active';
	$scope.isCollapsed = true;
	
	$scope.$on('$viewContentLoaded', function(event) {
		$window.ga('send', 'pageview', { page: $location.path() });
	});
	
	$scope.activateNet = function(e) {
		if (!e) e = window.event;
		if (e.shiftKey && e.ctrlKey) {
			alert("You've stumbled on something interesting! More to come.");
		}
	}
	
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