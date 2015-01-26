var app = angular.module('main');

app.controller('HomeController', function($scope, $log) {
	ga('send', 'pageview');
});