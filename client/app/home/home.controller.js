( function () {
    'use strict';

    angular.module( 'app.home' )
        .controller( 'HomeCtrl', [ '$scope', '$state', '$window', HomeCtrl ] );

    function HomeCtrl( $scope, $state, $window ) {

        $scope.fco = function() {
            $state.go('main-event');
        }

        $scope.w2s = function() {
            $state.go('week-two-sprint');
        }

        $scope.survey = function() {
            $window.open('https://www.surveymonkey.com/r/GR5V5L5','_blank');
        }
    }

} )();
