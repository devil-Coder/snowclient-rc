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
            templateUrl : '/ejs/createincident.ejs',
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
    // $locationProvider.html5Mode(true);
});

app.controller('mainCtrl',['$scope','$http','$location','$rootScope',function ($scope,$http,$location,$rootScope) {
    $rootScope.loggedIn = true;
    $scope.verifyUser =function(){
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
    $scope.getAllIncidents = function () {
        $http.get('https://dev45450.service-now.com/api/now/table/incident',config).then(successCallback, errorCallback);
        function successCallback(response) {
            $scope.incidents = response.data;
            console.log($scope.incidents);
        }
        function errorCallback(error) {
            console.log("Message could not be Obtained !" + error);
        }
    }

    $scope.showIncidentDetail = function () {
        var config = {
            headers : {
                'Accept' : 'application/json',
                'Content-Type':'application/json',
                'Authorization' : 'admin:me2@Servicenow'
            }
        }
        $http.get('https://dev45450.service-now.com/api/now/table/incidents/'+$scope.incidentNumber,config).then(successCallback, errorCallback);
        function successCallback(response) {
            $scope.data = response.data;
            console.log($scope.data);
        }
        function errorCallback(error) {
            console.log("Message could not be Obtained !" + error);
        }
    }
    $scope.addNewIncident = function () {
        $http.post('https://dev45450.service-now.com/api/now/table/incident',$scope.newIncident).then(successCallback, errorCallback);
        function successCallback(response) {
            $scope.data = response.data;
            console.log($scope.data);
        }
        function errorCallback(error) {
            console.log("Message could not be Obtained !" + error);
        }
    }
    $scope.updateIncident = function () {
        // axios.get('https://dev45450.service-now.com/api/now/table/incident', config)
        //     .then(function (response) {
        //         console.log(response);
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });
        $http.get('https://dev45450.service-now.com/api/now/table/incident',config).then(successCallback, errorCallback);
        function successCallback(response) {
            $scope.data = response.data;
            console.log($scope.data);
        }
        function errorCallback(error) {
            console.log("Message could not be Obtained !" + error);
        }
    }
    $scope.deleteIncident = function () {
        var config = {
            headers : {
                'Accept' : 'application/json',
                'Content-Type':'application/json',
                'Authorization' : 'admin:me2@Servicenow'
            }
        };
        // axios.get('https://dev45450.service-now.com/api/now/table/incident', config)
        //     .then(function (response) {
        //         console.log(response);
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });
        $http.get('https://dev45450.service-now.com/api/now/table/incident',config).then(successCallback, errorCallback);
        function successCallback(response) {
            $scope.data = response.data;
            console.log($scope.data);
        }
        function errorCallback(error) {
            console.log("Message could not be Obtained !" + error);
        }
    }
}]);