var mainApplicationModuleName = 'afrique_annonce';

var mainApplicationModule = angular.module(mainApplicationModuleName, []);



angular.element(document).ready(function(){
	console.log('hi');
	angular.bootstrap(document, [mainApplicationModuleName]);
});


