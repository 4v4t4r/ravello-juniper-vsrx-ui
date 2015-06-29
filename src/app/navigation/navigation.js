'use strict';

angular.module('ravello.juniper.vsrx')
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('wizard', {
                url: '',
                templateUrl: 'app/pages/welcome.html',
                controller: 'appController'
            })
            .state('init', {
                url: '/init',
                templateUrl: 'app/pages/initiate-lab.html',
                controller: 'appController'
            })
            .state('ready', {
                url: '/ready',
                templateUrl: 'app/pages/ready-lab.html',
                controller: 'appController'
            })
    });

