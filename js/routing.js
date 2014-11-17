var app = angular.module('main');

/*PROVIDES URL ROUTING FOR THE APP*/
app.config(function ($routeProvider) {
	$routeProvider.when('/home', {
		templateUrl: 'partials/home.html',
		controller: 'HomeController'
	}).when('/resume', {
		templateUrl: 'partials/resume.html',
		controller: 'ResumeController'
	}).when('/projects', {
		templateUrl: 'partials/projects.html',
		controller: 'ProjectsController'
	}).otherwise({ redirectTo: '/home' });
});