( function () {
    'use strict';

    angular.module( 'app' )
        .controller( 'DashboardCtrl', [ '$scope', '$http', '$sce', DashboardCtrl ] )
        .filter( 'calculateScore', [ calculateScore ] );

    function DashboardCtrl( $scope, $http, $sce ) {

        $scope.countries = [];
        $scope.allCountries = false;
        $scope.getCountries = getCountries;

        getCountries( 20 );

        // top players in the Olympiad:
        $scope.topOpen = [];
        $scope.allTopOpen = false;
        $scope.getTopOpen = getTopOpen;
        $scope.topOpenCount = 10;

        $scope.topWomen = [];
        $scope.allTopWomen = false;
        $scope.topWomenCount = 10;
        $scope.getTopWomen = getTopWomen;

        getTopOpen( $scope.topOpenCount );
        getTopWomen( $scope.topWomenCount );
        //

        // most picked players in the olympiad:
        $scope.mostPickedOpen = [];
        $scope.allMostPickedOpen = false;
        $scope.getMostPickedOpen = getMostPickedOpen;
        $scope.mostPickedOpenCount = 10;

        $scope.mostPickedWomen = [];
        $scope.allMostPickedWomen = false;
        $scope.getMostPickedWomen = getMostPickedWomen;
        $scope.mostPickedWomenCount = 10;

        getMostPickedOpen( $scope.mostPickedOpenCount );
        getMostPickedWomen( $scope.mostPickedWomenCount );
        //

        function getMostPickedOpen( count ) {
            var total = 0;
            if( ! count ) $scope.allMostPickedOpen = true;
            $scope.mostPickedOpen.length = 0;

            $http.get( 'app/data/most-picked/open.json' ).then( function( players ) {

                players.data.forEach( function( player ) {
                    if( total === count ) return;
                    $scope.mostPickedOpen.push( player )
                    total++;
                });
                $scope.mostPickedOpenCount = $scope.mostPickedOpen.length;
            });
        }

        function getMostPickedWomen( count ) {
            var total = 0;
            if( ! count ) $scope.allMostPickedWomen = true;
            $scope.mostPickedWomen.length = 0;

            $http.get( 'app/data/most-picked/women.json' ).then( function( players ) {

                players.data.forEach( function( player ) {
                    if( total === count ) return;
                    $scope.mostPickedWomen.push( player )
                    total++;
                });
                $scope.mostPickedWomenCount = $scope.mostPickedWomen.length;
            });
        }

        function getTopOpen( count ) {
            var total = 0;

            if( ! count ) $scope.allTopOpen = true;

            $scope.topOpen.length = 0;

            $http.get( 'app/data/top-players/open.json' ).then( function ( players ) {
                players.data.forEach( function( player )  {
                    if( total === count ) return;
                    $scope.topOpen.push( player );
                    total++;
                });
                $scope.topOpenCount = $scope.topOpen.length;

            } );
        }

        function getTopWomen( count ) {
            var total = 0;
            if( ! count ) $scope.allTopWomen = true;
            $scope.topWomen.length = 0;

            $http.get( 'app/data/top-players/women.json' ).then( function ( players ) {

                players.data.forEach( function( player ) {
                    if( total === count ) return;
                    $scope.topWomen.push( player );
                    total++;
                })
                $scope.topWomenCount = $scope.topWomen.length;
            } );
        }

        function getCountries( count ) {
            var total = 0;
            if( ! count ) $scope.allCountries = true;

            $scope.countries.length = 0;

            $http.get( 'app/data/countries/count.json' )
                .success( function ( countries ) {

                    countries.forEach( function ( item ) {

                        if( total === count ) return;

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
                        total++;

                    } );
                } );
        }
    }

    function calculateScore() {
        return function ( input ) {
            var score = "";
            input.forEach( function ( result ) {
                for ( var i = 1; i <= 11; i++ ) {
                    if ( result.round === i ) {
                        if ( result.result === "1" || result.result === "+" ) {
                            if ( result.colour === "b" ) {
                                score += " W ";
                            } else {
                                score += " <span class='text-danger'>W</span> ";
                            }
                        }
                        if ( result.result === "0" || result.result === '-' ) {
                            score += " L ";
                        }
                        if ( result.result === "½" ) {
                            score += " <span class='text-primary'>D</span> ";
                        }
                    }
                }
            } );
            return score;
        }
    }

} )();
