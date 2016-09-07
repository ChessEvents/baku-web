( function () {
    'use strict';

    angular.module( 'app.page' )
        .controller( 'teamDetailsCtrl', [ '$scope', '$window', '$stateParams', '$http', teamDetailsCtrl ] )

    function teamDetailsCtrl( $scope, $window, $stateParams, $http ) {

        $scope.teamName = 'blank'
        $scope.random = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
        var womenUrl = 'http://chess-results.com/tnr232876.aspx?lan=1&art=9&flag=30&wi=821&snr=';
        var openUrl = 'http://chess-results.com/tnr232875.aspx?lan=1&art=9&flag=30&wi=821&snr=';


        $http.get( 'app/data/round-5/' + $stateParams.id + '.json' ).then( function ( team ) {

            $scope.teamName = team.data.teamName;
            $scope.score = team.data.score[ 0 ];
            $scope.country = team.data.country;

            if ( team.data.iso ) {
                $scope.iso = 'bower_components/flag-icon-css/flags/4x3/' + team.data.iso.toLowerCase() + '.svg';
                $scope.width = 100;
                $scope.height = 50;
            }

            if ( team.data.country === 'CHESS.COM' ) {
                $scope.iso = '/images/chessdotcomicon.png';
                $scope.width = 80;
                $scope.height = 80;
            }
            $scope.players = [];

            team.data.players.forEach( function ( player ) {

                var data = {
                    name: player.name,
                    rating: player.rating,
                    title: player.title,
                    team: player.team,
                    iso: player.iso
                };

                if ( player.eventType === 'women' ) {
                    data.url = womenUrl + player.rank;
                }

                if ( player.eventType === 'open' ) {
                    data.url = openUrl + player.rank;
                }

                player.roundResults.forEach( function ( result ) {
                    for ( var i = 1; i <= 11; i++ ) {
                        if ( result.round === i ) {
                            data[ 'r' + i ] = result.points;
                        }
                    }
                } );

                $scope.players.push( data );

            } );
            $scope.score = team.data.score[ 0 ];
        } );
    }
} )();
