'use strict';

angular.module('ravello.juniper.vsrx')
    .constant('CONSTANTS', {
        applicationNamePrefix: 'juniper_vsrx_'
    })
    .controller('appController', function($scope, appProperties, stringUtils, appProxy, $interval, $location, CONSTANTS) {

        //TODO: handle one place where result is returned
        //TODO: handle some errors

        $scope.blueprintId = appProperties.blueprintId;
        $scope.application = undefined;

        //TODO: refactor this
        $scope.initiateLab = function() {
            $scope.createApplicationFromBlueprint().then(function(response) {
                $scope.application = response.data;
                if (!$scope.application) {
                    //TODO: throw some error
                }
                $scope.publishApplication($scope.application.id)
                    .success(function(response) {
                        $scope.enableScheduler();
                        //TODO: disable scheduler
                    });
            });
        };

        //TODO: handle some errors
        $scope.getApplication = function(applicationId) {
            appProxy.getApplication(applicationId).then(function(result) {
                $scope.application = result.data;
            });
        };

        $scope.createApplicationFromBlueprint = function() {
            var blueprintName = CONSTANTS.applicationNamePrefix + stringUtils.generateRandomString();
            var blueprint =  {
                name: blueprintName,
                baseBlueprintId: $scope.blueprintId
            };
            return appProxy.createApplicationFromBlueprint(blueprint);
        };

        $scope.publishApplication = function(applicationId) {
            return appProxy.publishApplication(applicationId);
        };

        $scope.disableScheduler = function() {
            if (angular.isDefined($scope.stop)){
                $interval.cancel($scope.stop);
                $scope.stop = undefined;
            }
        };

        $scope.enableScheduler = function() {
            if (!angular.isDefined($scope.stop)) {
                $scope.stop = $interval(function() {
                    if (!$scope.isStarted()) {
                        $scope.getApplication($scope.application.id);
                    } else {
                        $scope.disableScheduler();
                        $location.path("/ready");
                    }
                }, 15 * 1000);
            }
        };

        //TODO: handle errors
        $scope.isStarted = function() {
            if (!$scope.application.deployment) {
                return false;
            }
            var vms = $scope.application.deployment.vms;
            var startedVms = _(vms).filter(function(vm) {
                    return vm.state == 'STARTED';
                }).pluck('id').value();
            return startedVms.length == 2
        };

});

