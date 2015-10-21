
define(['angular', 'angularAnimate', 'angularUiRouter', 'angularStrap', 'angularStrapTpl', 'controllers'], function () {
    angular.module('routeApp', ['ngAnimate', 'ui.router', 'mgcrea.ngStrap', 'useManagerCtrls'])

        .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
            function ($stateProvider, $urlRouterProvider, $locationProvider) {
                $urlRouterProvider.otherwise('/');

                $stateProvider
                    .state('index', {
                        url: '/',
                        views: {
                            '': {
                                templateUrl: 'tpls/index.html'
                            },
                            'navBar@index': {
                                templateUrl: 'tpls/navbar.html',
                                controller: 'NavBarCtrl'
                            },
                            'mainView@index': {
                                templateUrl: 'tpls/main.html'
                            }
                        }
                    })
                    .state('index.usemanager', {
                        url: 'usemanager',
                        views: {
                            'mainView@index': {
                                templateUrl: 'tpls/usemanager.html',
                                controller: 'useManager'
                            }
                        }
                    })
                    .state('index.usemanager.superuser', {
                        url: '/superuser',
                        templateUrl: 'tpls/superuser.html'
                    })
                    .state('index.usemanager.miduser', {
                        url: '/miduser',
                        templateUrl: 'tpls/miduser.html'
                    })
                    .state('index.usemanager.lowuser', {
                        url: '/lowuser',
                        templateUrl: 'tpls/lowuser.html'
                    })
                    .state('index.usemanager.blackuser', {
                        url: '/blackuser',
                        templateUrl: 'tpls/blackuser.html'
                    })
                    .state('index.usemanager.addusertype', {
                        url: '/addusertype',
                        templateUrl: 'tpls/addusertype.html'
                    });

                $locationProvider.html5Mode(true).hashPrefix('!');
            }
        ]);
});