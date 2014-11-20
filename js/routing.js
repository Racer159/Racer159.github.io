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
	}).when('/projects/template', {
		templateUrl: 'partials/projects/template.html',
	}).when('/projects/raspi', {
		templateUrl: 'partials/projects/raspi.html',
	}).when('/projects/snes', {
		templateUrl: 'partials/projects/snes.html',
	}).when('/projects/tigercenter', {
		templateUrl: 'partials/projects/tigercenter.html',
	}).otherwise({ redirectTo: '/home' });
});