angular.module('annonce').config(['$routeProvider', function($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl: 'index.client.view.html'
	}).
	when('/ayoub', {
		templateUrl: 'annonces/views/annonces.client.view.html'
	}).
	otherwise({
		redirectTo: '/'
	})
}])