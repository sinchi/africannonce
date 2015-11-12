var mainApplicationModuleName = 'afrique_annonce';

var mainApplicationModule = angular.module(mainApplicationModuleName, ['ui.router', 'ngFileUpload']);

mainApplicationModule.config(['$stateProvider', '$urlRouterProvider', 
	function($stateProvider,$urlRouterProvider){

	$stateProvider.state('addAnnonce', {
		url: '/api/annonces',
		controller: 'AnnonceController',
		templateUrl: 'annonces/views/annonces.client.add.html'
	});
	$stateProvider.state('home', {
		url: '/',
		controller: 'HomeController',
		templateUrl: 'index.client.layout.html'
	});

	$urlRouterProvider.otherwise('/');
}
	]);

mainApplicationModule.controller('HomeController', ['$scope', '$http','Upload' ,'$timeout',
	function($scope, $http, Upload, $timeout){
	$scope.name = "ayoub";

	$scope.uploadPic = function(file) {
    file.upload = Upload.upload({
      url: '/upload',
      data: {file: file, username: $scope.username},
    });

	
	file.upload.then(function (response) {
      $timeout(function () {
        file.result = response.data;
      });
    }, function (response) {
      if (response.status > 0)
        $scope.errorMsg = response.status + ': ' + response.data;
    }, function (evt) {
      // Math.min is to fix IE which reports 200% sometimes
      file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
    });
   }

   $scope.removeFile = function(index){
   	$scope.files.splice(index, 1);
   	console.log($scope.files[index].filename + " is deleted");
   	
   }
	
   	$scope.selectFiles = function(files, errFiles){
   		$scope.files = files;
   		$scope.errFiles = errFiles;
   	};
	
     $scope.uploadFiles = function() {       
        angular.forEach($scope.files, function(file) {
            file.upload = Upload.upload({
                url: '/upload',
                data: {file: file}
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 * 
                                         evt.loaded / evt.total));
            });
        });
    }






	$scope.uploadFile = function(){
		
	}
}]);

angular.element(document).ready(function(){
		
	/*	var socket = io();
		var that = this;
		that.message = '';

		socket.on('chatMessage', function(message){			
			console.log('reception de message depuis le serveur '+JSON.stringify(message));								
		});

		var commentaire = {
				titre: 'reponde moi',
				texte: 'hadak s6',
				annonce: '5624e77b0771cb0b0a83a976',
				createur: '5624e4ef0771cb0b0a83a972'
			};

			socket.emit('commentaire', commentaire);
		

		socket.on('allComments', function(comments){
			console.log('allcomment by annonceID: 562a0bd997ed7adb10a014a2 '+ JSON.stringify(comments));
		});



		socket.on('commentaireCreated', function(commentaire){
			console.log(JSON.stringify(commentaire));
		});

		socket.emit('annonceID', '562a0bd997ed7adb10a014a2');
		*/




	angular.bootstrap(document, [mainApplicationModuleName]);


});


