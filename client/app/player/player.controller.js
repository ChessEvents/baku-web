( function () {
    'use strict';

    angular.module( 'app.player' )
        .controller( 'PlayerCtrl', [ '$scope', '$window', '$stateParams',
            '$http', '$sce', '$location', PlayerCtrl
        ] );

    function PlayerCtrl( $scope, $window, $stateParams, $http, $sce, $location ) {

        var womenUrl = 'http://chess-results.com/tnr232876.aspx?lan=1&art=9&flag=30&wi=821&snr=';
        var openUrl = 'http://chess-results.com/tnr232875.aspx?lan=1&art=9&flag=30&wi=821&snr=';

        $http.get( 'app/data/players/' + $stateParams.playerId + '.json' ).then( function ( player ) {

            $scope.player = player.data;

            if ( $scope.player.eventType === 'women' ) {
                $scope.chessResultsUrl = womenUrl + $scope.player.rank;
            }
            if ( $scope.player.eventType === 'open' ) {
                $scope.chessResultsUrl = openUrl + $scope.player.rank;
            }

        } );
    }

} )();
