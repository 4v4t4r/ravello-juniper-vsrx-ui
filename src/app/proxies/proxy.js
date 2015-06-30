'use strict';

angular.module('ravello.juniper.vsrx')
    .service('appProxy', function ($http) {

        var BASE_PATH = '/api/v1/';

        this.getApplication = function (applicationId) {
            return $http.get(BASE_PATH + 'applications/' + applicationId);
        };

        this.createApplicationFromBlueprint = function (blueprintDto) {
            return $http.post(BASE_PATH + 'applications', blueprintDto);
        };

        this.publishApplication = function (applicationId) {
            var config = { headers:  {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }};
            return $http.post(BASE_PATH + 'applications/' + applicationId + '/publish', config);
        };
    });