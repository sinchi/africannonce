angular.module('annonce').controller('AnnonceController', ['$scope', '$http', '$location', '$window','Authentification',
 function($scope, $http, $location, $window, Authentification){
		
	
 	$scope.authentification = Authentification;

	$scope.login = function(user){
		console.log(user);

		var req = {
			 method: 'POST',
			 url: '/api/annonceurs/signin',
			 headers: {
			   'Content-Type': 'application/json'
			 },
			 data: { username: user.username, password: user.password }
		}

$http(req).then(function(response){
	//console.log(JSON.stringify(response.data.username));
	//$window.user = response.data;
	//console.log($window.user);
	
	$scope.authentification.user = JSON.stringify(response.data);

	
	$location.path('/');
	
	


}, function(err){
	$scope.authentification = Authentification;
	console.log('data err : ' + err.data);
});
	
	};


	$scope.signout = function(){
		$http.get('/api/annonceurs/signout').success(
			function(data, status, headers, config){
				$window.user = null;
				$scope.authentification = null;
				console.log(data);
				$location.path('/');

		});

	}
	

}]);