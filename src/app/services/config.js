'use strict';

angular.module('ravello.juniper.vsrx')
    .provider('appProperties', function () {

        var properties = {

        };

        var q = jQuery.ajax({
            type: 'GET',
            url: 'config/app-properties.json',
            cache: false,
            async: false,
            contentType: 'application/json',
            dataType: 'json'
        });

        if (q.status === 200) {
            angular.extend(properties, angular.fromJson(q.responseText));
        }

        this.$get = function() {
            return properties;
        };
    });
