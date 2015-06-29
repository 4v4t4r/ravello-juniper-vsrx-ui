'use strict';

angular.module('ravello.juniper.vsrx')
    .controller('appController', function($scope, appProperties, stringUtils, appProxy, $interval, $location) {

        //TODO: handle one place where result is returned
        //TODO: handle some errors

        $scope.blueprintId = appProperties.blueprintId;
        $scope.application = undefined;

        //TODO: refactor this
        $scope.initiateLab = function() {
            $scope.createApplicationFromBlueprint()
                .success(function(result) {
                    $scope.application = result;
                    if (!$scope.application) {
                        //TODO: throw some error
                    }
                    $scope.publishApplication($scope.application.id)
                        .success(function(result) {
                            $scope.enableScheduler();
                            //TODO: disable scheduler
                        });
            });
        };

        //TODO: handle some errors
        $scope.getApplication = function(applicationId) {
            appProxy.getApplication(applicationId).
                success(function(result) {
                    $scope.application = result;
                });
        };

        $scope.createApplicationFromBlueprint = function() {
            var blueprintName = 'juniper_vsrx_' + stringUtils.generateRandomString();
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

