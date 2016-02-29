var app = angular.module('main');

/*PROVIDES URL ROUTING FOR THE APP*/
app.config(function ($stateProvider, $urlRouterProvider) {
	// DEFAULT ROUTE
	$urlRouterProvider.otherwise("/home");
  
  $stateProvider
    .state('state1', {
      url: "/state1",
      templateUrl: "partials/state1.html"
    })
    .state('state1.list', {
      url: "/list",
      templateUrl: "partials/state1.list.html",
      controller: function($scope) {
        $scope.items = ["A", "List", "Of", "Items"];
      }
    })

	
	$stateProvider.state('home', {
		url: '/home',
		templateUrl: 'partials/home.html',
		controller: 'HomeController'
	}).state('resume', {
		url: '/resume',
		templateUrl: 'partials/resume.html',
		controller: 'ResumeController'
	}).state('projects', {
		url: '/projects',
		templateUrl: 'partials/projects.html',
		controller: 'ProjectsController'
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