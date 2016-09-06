( function () {
    'use strict';

    angular.module( 'app.layout' )
        .controller( 'sideBarCtrl', [ '$scope', '$cookies', '$rootScope', '$timeout', sideBarCtrl ] )


    function sideBarCtrl( $scope, $cookies, $rootScope, $timeout ) {

        $scope.setFavourites = false;
        $rootScope.$on( 'cookieUpdates', function ( event ) {
            runCookieFavs();
        } );
        $scope.favourites = [];

        function runCookieFavs() {

            var colours = [
                'color-info',
                'color-success',
                'color-warning',
                'color-danger'
            ];

            $scope.setFavourites = true;
            $scope.favourites.length = 0;

            var cookies = $cookies.getAll();

            Object.keys( cookies ).forEach( function ( key, index ) {
                if ( key !== '_ga' && key !== '_gat' ) {

                    var cookie = String( cookies[ key ] );
                    var colorIndex = index - 1;

                    if ( colorIndex > 4 ) colorIndex = 0;
                    var color = ', "color" : "' + colours[ colorIndex ] + '"}]';

                    var newCookie = cookie.replace( '}]', color );

                    $scope.favourites.push( JSON.parse( newCookie ) );
                }
            } );
            if ( $scope.favourites.length > 0 ) {
                $scope.setFavourites = true;
            } else {
                $scope.setFavourites = false;
            }


        }

        runCookieFavs();
    };




} )();
