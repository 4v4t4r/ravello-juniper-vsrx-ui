'use strict';

angular.module('ravello.juniper.vsrx')
    .constant('CONSTANTS', {
        applicationNamePrefix: 'juniper_vsrx_',
        samplingInterval: 15,
        started: 'STARTED',
        error: 'ERROR'
    })
    .controller('appController',
    function($scope, model, appProperties, stringUtils, appProxy, $interval, $location, CONSTANTS) {


        $scope.blueprintId = appProperties.blueprintId;
        $scope.application = undefined;

        $scope.initiateLab = function() {
            $scope.createApplicationFromBlueprint().then(function(response) {
                model.setApplication(response.data);
                if (!$scope.getModelApplication()) {
                    $scope.redirect('/error');
                }
                $scope.publishApplication($scope.getModelApplication().id);
            });
        };

        $scope.getApplication = function(applicationId) {
            appProxy.getApplication(applicationId).then(function(result) {
                model.setApplication(result.data);
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
            appProxy.publishApplication(applicationId).then(function () {
                $scope.enablePoller();
            });
        };

        $scope.disablePoller = function() {
            if (angular.isDefined($scope.stop)){
                $interval.cancel($scope.stop);
                $scope.stop = undefined;
            }
        };

        $scope.enablePoller = function() {
            if (!angular.isDefined($scope.stop)) {
                $scope.stop = $interval(function() {
                    if (!$scope.isVmsAtState(CONSTANTS.started, 2)) {
                        $scope.getApplication($scope.getModelApplication().id);
                    } else {
                        $scope.disablePoller();
                        if ($scope.isVmsAtState(CONSTANTS.started, 2)) {
                            $scope.redirect('/ready');
                        } else if ($scope.isVmsAtState(CONSTANTS.error, 0)) {
                            $scope.redirect('/error');
                        }
                    }
                }, CONSTANTS.samplingInterval * 1000);
            }
        };

        $scope.isVmsAtState = function(state, amount) {
            if (!$scope.getModelApplication().deployment) {
                return false;
            }
            var vms = $scope.getModelApplication().deployment.vms;
            var vmsState = _(vms).filter(function(vm) {
                    return _.startsWith(vm.state, state);
                }).pluck('id').value();
            return vmsState.length >= amount;
        };

        $scope.redirect = function(url) {
            $location.path(url);
        };

        $scope.getModelApplication = function() {
            return model.getApplication();
        };
    });

