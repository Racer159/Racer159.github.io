var app = angular.module('main');

app.controller('ProjectsController', function($scope, $location, $log) {
	ga('send', 'pageview');
	$scope.gotoProject = function(project) {
		$location.path('/projects/' + project);
	};
});