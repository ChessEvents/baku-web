( function () {
    'use strict';

    angular.module( 'app' )
        .controller( 'DashboardCtrl', [ '$scope', '$http', '$sce', DashboardCtrl ] )
        .filter( 'calculateScore', [ calculateScore ] );


     function calculateScore() {

        return function ( input ) {

            var score = "";

            input.forEach( function( result ) {
                for ( var i = 1; i <= 11; i++ ) {

                    if ( result.round === i ) {
                        if ( result.result === "1" ) {
                            if( result.colour === "b" ) {
                                score += " W ";
                            } else {
                                score += " <span class='text-danger'>W</span> ";
                            }
                        }
                        if ( result.result === "0" ) {
                            score += " L ";
                        }
                        if ( result.result === "½" ) {
                            score += " <span class='text-primary'>D</span> ";
                        }
                    }
                }
            });

            return score;
        }
    }

    function DashboardCtrl( $scope, $http, $sce ) {

        $scope.countries = [];

        $http.get( 'app/data/top-players/open.json' ).then( function ( players ) {
            $scope.topOpen = players.data;
        } );

        $http.get( 'app/data/top-players/women.json' ).then( function ( players ) {
            $scope.topWomen = players.data;
        } );

        $http.get( 'app/data/countries/count.json' )
            .success( function ( countries ) {

                countries.forEach( function ( item ) {

                    var iso = item.iso;
                    var setImage = false;
                    var imageUrl = '';
                    var imageName = '';


                    if ( item._id.country === 'CHESS.COM' ) {
                        setImage = true;
                        imageUrl = '/images/chessdotcomico.png';
                        imageName = 'chess.dom';
                    }

                    if ( iso ) {
                        iso = iso.toLowerCase();
                    } else {
                        iso = item.country;
                    }

                    var country = {
                        name: item._id.country,
                        iso: iso,
                        count: item.countryCount,
                        setImage: setImage,
                        imageUrl: imageUrl,
                        imageName: imageName
                    };

                    $scope.countries.push( country );

                } )

            } );
    }


} )();
