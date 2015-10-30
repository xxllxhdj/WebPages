
requirejs.config({
    baseUrl: 'js',
    paths: {
        app: 'app',
        controllers: 'controllers',
        directives: 'directives',
        servers: 'servers',
        jquery: '../lib/jquery/dist/jquery',
        angular: '../lib/angular/angular',
        angularAnimate: '../lib/angular-animate/angular-animate',
        angularUiRouter: '../lib/angular-ui-router/release/angular-ui-router',
        angularMessages: '../lib/angular-messages/angular-messages',
        angularStrap: '../lib/angular-strap/dist/angular-strap',
        angularStrapTpl: '../lib/angular-strap/dist/angular-strap.tpl',
        owaspPasswordStrengthTest: '../lib/owasp-password-strength-test/owasp-password-strength-test'
    },
    shim: {
        //angular: {
        //    deps: ['jquery']
        //},
        angularAnimate: {
            deps: ['angular']
        },
        angularUiRouter: {
            deps: ['angular']
        },
        angularMessages: {
            deps: ['angular']
        },
        angularStrap: {
            deps: ['angular']
        },
        angularStrapTpl: {
            deps: ['angular', 'angularStrap']
        }
    }
});

// Start the main app logic.
requirejs(['app'], function () {
    angular.element(document).ready(function() {
        angular.bootstrap(document, ['routeApp']);
    });
});