/*angular.module('components', [])
	.directive('helloWorld', function () {
		return {
			restrict: 'E',
			templete: '<span>Hello World</span>'
		}
	})

angular.module('HelloApp', ['components'])*/

var app = angular.module('HelloApp', [])

app.directive('helloWorld', function () {
	return {
		restrict: 'E',
		scope: {
			helloWorld: '=name'
		},
		templete: '<span>Hello {{helloWorld.name}}</span>'
	}
});


app.controller('helloCtrl', function($scope) {
	$scope.Usman = {};
	$scope.Usman.name = "Usman Akram";
});