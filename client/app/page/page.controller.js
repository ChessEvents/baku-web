( function () {
    'use strict';

    angular.module( 'app.page' )
        .controller( 'teamDetailsCtrl', [ '$scope', '$window', '$stateParams', '$http', teamDetailsCtrl ] )

    function teamDetailsCtrl( $scope, $window, $stateParams, $http ) {

        $scope.teamName = 'blank'

        $http.get('app/data/round-3/' + $stateParams.id + '.json').then( function ( team ) {

            $scope.teamName = team.data.teamName;
            $scope.players = team.data.players;
            $scope.score = team.data.score[0];

        });

    }


} )();
