( function () {
    'use strict';

    angular.module( 'app.page' )
        .controller( 'teamDetailsCtrl', [ '$scope', '$window', '$stateParams', '$http', teamDetailsCtrl ] )

    function teamDetailsCtrl( $scope, $window, $stateParams, $http ) {

        $scope.teamName = 'blank'

        $http.get('app/data/round-3/' + $stateParams.id + '.json').then( function ( team ) {

            $scope.teamName = team.data.teamName;
            $scope.score = team.data.score[0];
            $scope.players = [];

            team.data.players.forEach( function( player ) {

                var data = {
                    name: player.name,
                    rating: player.rating,
                    title: player.title,
                    team: player.team
                };

                player.roundResults.forEach( function( result ) {

                    for (var i = 1; i <= 11; i++) {
                        if ( result.round === i ) {
                            data['r' + i] = result.points;
                        }
                    }
                } );
                $scope.players.push( data );

            } );

            $scope.score = team.data.score[0];

        });

    }


} )();
