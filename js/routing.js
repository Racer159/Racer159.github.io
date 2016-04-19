var app = angular.module('main');

/*PROVIDES URL ROUTING FOR THE APP*/
app.config(function ($stateProvider, $urlRouterProvider) {
	// DEFAULT ROUTE
	$urlRouterProvider.otherwise("/home");
	
	$stateProvider.state('home', {
		url: '/home',
		templateUrl: 'partials/home.html',
		controller: 'HomeController'
	}).state('resume', {
		url: '/resume',
		templateUrl: 'partials/resume.html',
		controller: 'ResumeController'
	}).state('projects', {
		abstract: true,
		url: '/projects',
		templateUrl: 'partials/projects.html',
		controller: 'ProjectsController'
	}).state('projects.overview', {
		url: '/overview',
		templateUrl: 'partials/projects/overview.html',
	}).state('projects.template', {
		url: '/template',
		templateUrl: 'partials/projects/template.html',
	}).state('projects.raspi', {
		url: '/raspi',
		templateUrl: 'partials/projects/raspi.html',
	}).state('projects.snes', {
		url: '/snes',
		templateUrl: 'partials/projects/snes.html',
	}).state('projects.tigercenter', {
		url: '/tigercenter',
		templateUrl: 'partials/projects/tigercenter.html',
	});
});