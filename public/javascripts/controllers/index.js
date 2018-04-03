/**
 * Created by Raj Chandra on 03-04-2018.
 */
var app = angular.module("ims", ["ngRoute"]);

app.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl : '/ejs/login.ejs'
        })
        .when('/incidents/add', {
            templateUrl : '/ejs/createincidents.ejs',
            resolve: {
                "check": function ($rootScope, $location) {
                    console.log($rootScope.loggedIn);
                    if (!$rootScope.loggedIn) {
                        $location.path('/');
                        $scope.message = "Your Session has expired ! Please Login Again.";
                    }
                }
            }
        })
        .when('/incidents/all', {
            templateUrl : '/ejs/allincidents.ejs',
            resolve: {
                "check": function ($rootScope, $location) {
                    console.log($rootScope.loggedIn);
                    if (!$rootScope.loggedIn) {
                        $location.path('/');
                        $scope.message = "Your Session has expired ! Please Login Again.";
                    }
                }
            }
        })
        .when('/incidents/update', {
            templateUrl : '/ejs/updateincidents.ejs',
            resolve: {
                "check": function ($rootScope, $location) {
                    console.log($rootScope.loggedIn);
                    if (!$rootScope.loggedIn) {
                        $location.path('/');
                        $scope.message = "Your Session has expired ! Please Login Again.";
                    }
                }
            }
        })
        .otherwise({
            templateUrl : '/ejs/notfound.ejs'
        })

    // use the HTML5 History API
    $locationProvider.html5Mode(true);
});

app.controller('mainCtrl',['$scope','$http','$location','$rootScope',function ($scope,$http,$location,$rootScope) {
    $rootScope.loggedIn = false;
    $scope.verifyUser =function(){
        console.log($scope.user);
        if(user.username == 'admin' && user.password == 'admin') {
            $rootScope.loggedIn = true;
            $scope.response ={
                error : false,
                message : 'Logged In'
            };
            $location.path('/incidents/all');
        }else{
            $rootScope.loggedIn = false;
            $scope.response ={
                error : true,
                message : 'Couldn\'t login'
            };
        }
    }
    $scope.getGithubData = function () {
        console.log(config);
        $http.get('https://api.github.com/users/devil-coder/repos',config).then(successCallback, errorCallback);
        function successCallback(response) {
            $scope.git = response.data;
            console.log($scope.git);
        }
        function errorCallback(error) {
            console.log("Message could not be Obtained !" + error);
        }
    }
}]);