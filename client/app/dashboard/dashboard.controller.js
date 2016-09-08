( function () {
    'use strict';

    angular.module( 'app' )
        .controller( 'DashboardCtrl', [ '$scope', '$http', '$sce', DashboardCtrl ] )
        .filter( 'calculateScore', [ calculateScore ] );

    function DashboardCtrl( $scope, $http, $sce ) {

        $scope.countries = [];
        $scope.allCountries = false;
        $scope.getCountries = getCountries;

        $scope.topOpen = [];
        $scope.allTopOpen = false;
        $scope.getTopOpen = getTopOpen;
        $scope.topMenCount = 10;

        $scope.topWomen = [];
        $scope.allTopWomen = false;
        $scope.topWomenCount = 10;
        $scope.getTopWomen = getTopWomen;


        getCountries( 20 );
        getTopOpen( $scope.topMenCount );
        getTopWomen( $scope.topWomenCount );

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
                $scope.topMenCount = $scope.topOpen.length;

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
