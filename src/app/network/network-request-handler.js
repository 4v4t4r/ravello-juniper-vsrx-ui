'use strict';

angular.module('ravello.juniper.vsrx')
    .factory('customHeadersInterceptor', function(appProperties) {
            return {
                request: function(request) {
                    request.headers['X-LongToString'] = true;
                    request.headers['X-Ephemeral-Token-Authorization'] = appProperties.token;
                    return request;
                }
            };
        })
    .config(['$httpProvider', function($httpProvider) {
        $httpProvider.interceptors.push('customHeadersInterceptor');
    }]);



