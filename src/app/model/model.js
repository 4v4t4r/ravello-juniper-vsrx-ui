'use strict';

angular.module('ravello.juniper.vsrx')
    .service('model', function () {

        var data = {};

        this.setApplication = function(application) {
            data.application = application;
        };

        this.getApplication = function() {
            return data.application;
        };

    });