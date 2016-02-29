var app = angular.module('main');

app.controller('ProjectsController', function($scope, $state, $log) {
	$scope.gotoProject = function(project) {
		$state.go('.' + project);
	};
});