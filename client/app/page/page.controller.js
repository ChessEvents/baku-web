( function () {
    'use strict';

    angular.module( 'app.page' )
        .controller( 'teamDetailsCtrl', [ '$scope', '$window', '$stateParams', teamDetailsCtrl ] )

    function teamDetailsCtrl( $scope, $window, $stateParams ) {

        console.log( $stateParams.id );

    }


} )();
