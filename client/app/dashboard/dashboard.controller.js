( function () {
    'use strict';

    angular.module( 'app' )
        .controller( 'DashboardCtrl', [ '$scope', '$http', DashboardCtrl ] )

    function DashboardCtrl( $scope, $http ) {

        $scope.countries = [];

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
