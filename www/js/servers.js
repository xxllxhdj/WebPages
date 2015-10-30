
define(['owaspPasswordStrengthTest', 'angular'], function (owaspPasswordStrengthTest) {
    angular.module('routeAppServers', [])
        .factory('PasswordValidator', ['$window',
            function ($window) {
                return {
                    getResult: function (password) {
                        var result = owaspPasswordStrengthTest.test(password);
                        return result;
                    },
                    getPopoverMsg: function () {
                        var popoverMsg = 'Please enter a passphrase or password with greater than 10 characters, numbers, lowercase, upppercase, and special characters.';
                        return popoverMsg;
                    }
                };
            }
        ]);
});