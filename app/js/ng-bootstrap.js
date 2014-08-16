define([
    'require',
    'angular',
    'angular-route',
    './app',
    './routes',
    'domReady'
], function (require, ng) {
    'use strict';

    require(['domReady!'], function (document) {
        ng.bootstrap(document, ['app']);
    });
});
