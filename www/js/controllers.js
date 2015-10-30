
define(['angular'], function () {
    angular.module('useManagerCtrls', [])

        .controller('useManager', ['$scope', '$state', function ($scope, $state) {
            $scope.addUserType = function() {
                $state.go("index.usemanager.addusertype");
            };
        }])
        .controller('NavBarCtrl', ['$scope', '$q', '$http', '$alert', function ($scope, $q, $http, $alert) {
            $scope.popover = {
                title: 'Title',
                content: 'Hello Popover<br/>This is a multiline message!'
            };

            $scope.testPOST = function () {
                postFn().then(function (data) {
                    $alert({
                        title: 'POST:',
                        content: data,
                        placement: 'top',
                        container: 'body',
                        type: 'info',
                        show: true,
                        animation: 'am-fade-and-slide-top',
                        templateUrl: 'tpls/alert.html'
                    });
                });
            };

            $scope.testGET = function () {
                getFn().then(function (data) {
                    $alert({
                        title: 'GET:',
                        content: data,
                        placement: 'top',
                        container: 'body',
                        type: 'info',
                        show: true,
                        animation: 'am-fade-and-slide-top'
                    });
                });
            };

            function postFn () {
                var defer = $q.defer();

                $http({
                    method: 'POST',
                    url: '/admin/?method=test',//'http://10.1.38.34:8081/admin',
                    timeout: 5000,
                    data: {
                        param1: 'param1--POST',
                        param2: '中文'
                    }
                }).success(function (data) {
                    defer.resolve(data);
                }).error(function () {
                    defer.reject();
                });

                return defer.promise;
            }

            function getFn () {
                var defer = $q.defer();

                $http({
                    method: 'GET',
                    url: '/api/?method=test',//'http://10.1.38.34:8081/api',
                    timeout: 5000,
                    params: {
                        param1: 'param1--GET'
                    }
                }).success(function (data) {
                    defer.resolve(data);
                }).error(function () {
                    defer.reject();
                });

                return defer.promise;
            }
        }])
        .controller('AuthenticationController', ['$scope', '$state', '$http', '$location', '$window', '$alert', 'PasswordValidator', 'AuthenticationService',
            function ($scope, $state, $http, $location, $window, $alert, PasswordValidator, AuthenticationService) {
                $scope.credentials = {
                    email: '',
                    password: ''
                };
                $scope.popoverMsg = PasswordValidator.getPopoverMsg();

                $scope.signup = function (isValid) {

                    if (!isValid) {
                        $scope.$broadcast('show-errors-check-validity', 'userForm');
                        return false;
                    }

                    $http.post('/api/auth/signup', $scope.credentials).success(function (response) {
                        // If successful we assign the response to the global user model
                        //$scope.authentication.user = response;

                        // And redirect to the previous or home page
                        //$state.go($state.previous.state.name || 'home', $state.previous.params);
                        $alert({
                            title: '注册成功:',
                            content: angular.toJson(response),
                            placement: 'top',
                            container: 'body',
                            type: 'info',
                            show: true,
                            animation: 'am-fade-and-slide-top'
                        });
                    }).error(function (response) {
                        //$scope.error = response.message;
                        $alert({
                            title: '注册失败:',
                            content: response.message,
                            placement: 'top',
                            container: 'body',
                            type: 'info',
                            show: true,
                            animation: 'am-fade-and-slide-top'
                        });
                    });
                };

                $scope.signin = function (isValid) {

                    if (!isValid) {
                        //$scope.$broadcast('show-errors-check-validity', 'userForm');

                        return false;
                    }

                    $http.post('/api/auth/signin', {
                        username: 'test@test.com',
                        password: 'Xxxl123456!'
                    }).success(function (response) {
                        // If successful we assign the response to the global user model
                        //$scope.authentication.user = response;

                        // And redirect to the previous or home page
                        //$state.go($state.previous.state.name || 'home', $state.previous.params);
                        $alert({
                            title: '登录成功:',
                            content: angular.toJson(response),
                            placement: 'top',
                            container: 'body',
                            type: 'info',
                            show: true,
                            animation: 'am-fade-and-slide-top'
                        });
                        AuthenticationService.isAuthenticated = true;
                        $window.sessionStorage.token = response.token;
                    }).error(function (response) {
                        //$scope.error = response.message;
                        $alert({
                            title: '登录失败:',
                            content: response.message,
                            placement: 'top',
                            container: 'body',
                            type: 'info',
                            show: true,
                            animation: 'am-fade-and-slide-top'
                        });
                    });
                };
            }
        ]);

});