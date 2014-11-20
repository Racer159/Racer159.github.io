var app = angular.module('main');

app.controller('ProjectsController', function($scope, $log) {
	$scope.gotoProject = function(project) {
		$location.path('/projects/' + project);
	};
});