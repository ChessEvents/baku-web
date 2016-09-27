( function () {
    'use strict';

    angular.module( 'app.page' )
        .controller( 'teamDetailsCtrl', [ '$scope', '$window', '$stateParams', '$http', '$sce', '$location', teamDetailsCtrl ] )
        .filter( 'rankPosition', [ rankPosition ] );

    function teamDetailsCtrl( $scope, $window, $stateParams, $http, $sce, $location ) {

        $scope.line1 = {};
        $scope.eventPage = 'main-event';
        $scope.isW2S = $location.search().competitions === 'w2s';

        if ( $scope.isW2S ) {
            $scope.eventPage = 'week-two-sprint';
        }

        $scope.teamName = 'blank';
        $scope.random = 1; //Math.floor( Math.random() * ( 5 - 1 + 1 ) ) + 1;
        var womenUrl = 'http://chess-results.com/tnr232876.aspx?lan=1&art=9&flag=30&wi=821&snr=';
        var openUrl = 'http://chess-results.com/tnr232875.aspx?lan=1&art=9&flag=30&wi=821&snr=';
        var chess24Url = 'https://chess24.com/en/watch/live-tournaments/42nd-chess-olympiad-baku-2016-'


        $http.get( 'app/data/round-11-bonus/' + $stateParams.id + '.json' ).then( function ( team ) {

            $scope.teamName = team.data.teamName;
            $scope.score = team.data.score[ 0 ];
            $scope.country = team.data.country;
            $scope.bonusScore = team.data.bonusScore;

            // bonus point questions:
            $scope.openGold = team.data.openGold;
            $scope.openSilver = team.data.openSilver;
            $scope.openBronze = team.data.openBronze;
            $scope.openIndGold = team.data.openIndGold;
            $scope.womenGold = team.data.womenGold;
            $scope.womenSilver = team.data.womenSilver;
            $scope.womenBronze = team.data.womenBronze;
            $scope.womenIndGold = team.data.womenIndGold;

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
            $scope.barPlayerNames = [];
            $scope.barPlayerPoints = [];

            team.data.players.forEach( function ( player ) {

                var data = {
                    name: player.name,
                    rating: player.rating,
                    title: player.title,
                    team: player.team,
                    iso: player.iso
                };

                data.url = '#/player/' + player._id;

                player.roundResults.forEach( function ( result ) {
                    for ( var i = 1; i <= 11; i++ ) {
                        if ( result.round === i ) {
                            data[ 'r' + i ] = {
                                points: result.points,
                                opponent: $sce.trustAsHtml( 'Colour: ' + result.colour + '<br>Result: ' + result.result + '<br>Vs. ' + result.opponent + ' (' + result.opponentRating + ')<br><a href="' + chess24Url + player.eventType + result.chess24Url + '" target="_blank">view game</a>' )
                            };
                        }
                    }
                } );
                $scope.players.push( data );
            } );



            $scope.rank = team.data.roundRank;
            $scope.chartData = [];
            $scope.rank.forEach( function ( rank ) {
                if ( rank.total !== 0 ) {
                    $scope.chartData.push( rank.roundRank );
                }
            } );


            // Line Chart

            $scope.lineLabels = [ "round 1", "round 2", "round 3", "round 4", "round 5", "round 6", "round 7", "round 8", "round 9", "round 10", "round 11" ];
            $scope.scaleMax = 1371;
            if ( $scope.isW2S ) {
                $scope.lineLabels = [ "round 1", "round 2", "round 3", "round 4", "round 5", "round 6" ];
                $scope.scaleMax = 183;
            }

            $scope.lineSeries = [ 'Place' ];
            $scope.lineData = [ $scope.chartData ];
            $scope.datasetOverride = [ {
                yAxisID: 'y-axis-1'
            } ];

            $scope.options = {
                scales: {
                    yAxes: [ {
                        id: 'y-axis-1',
                        type: 'linear',
                        ticks: {
                            min: 1,
                            max: $scope.scaleMax,
                            reverse: true,
                            beginAtZero: false
                        },
                        display: true,
                        position: 'left'
                    } ]
                }
            };

            // END

        } );
    }

    function rankPosition() {

        return function ( input ) {

            if ( !input ) return 0;

            var lastNumber = String( input );

            if ( lastNumber.length > 1 ) {
                lastNumber = lastNumber.substring( input.length - 1 );
            }
            if ( lastNumber === "1" ) {
                return input + 'st';
            }
            if ( lastNumber === "2" ) {
                return input + 'nd';
            }
            if ( lastNumber === "3" ) {
                return input + 'rd';
            }
            return input + 'th';
        }
    }

} )();
