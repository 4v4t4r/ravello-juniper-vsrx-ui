'use strict';

angular.module('ravello.juniper.vsrx')
    .service('stringUtils', function () {

        this.generateRandomString = function() {
            return Math.random().toString(36).slice(2);
        };

    });