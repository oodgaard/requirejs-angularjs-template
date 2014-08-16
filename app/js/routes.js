define(['./app'], function (app) {
    'use strict';
    return app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'app/views/example.html',
            controller: 'exampleController'
        }).
            otherwise({
                redirectTo: '/'
            });
    }]);
});
