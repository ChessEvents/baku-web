( function () {
    'use strict';

    angular.module( 'app.table' )
        .controller( 'TableCtrl', [ '$scope', '$filter', '$http', TableCtrl ] );

    function TableCtrl( $scope, $filter, $http) {
        var init;

        $scope.teams = [];
        $scope.searchKeywords = '';
        $scope.filteredTeams = [];
        $scope.row = '';
        $scope.select = select;
        $scope.onFilterChange = onFilterChange;
        $scope.onNumPerPageChange = onNumPerPageChange;
        $scope.onOrderChange = onOrderChange;
        $scope.search = search;
        $scope.order = order;
        $scope.numPerPageOpt = [ 3, 5, 10, 20 ];
        $scope.numPerPage = $scope.numPerPageOpt[ 2 ];
        $scope.currentPage = 1;
        $scope.currentPage = [];
        $scope.parseInt = function( num ) {
            return parseInt( num, 10)  || 0;
        }

        $http.get('app/data/teams.json').then( function( data ) {
            $scope.teams = data.data;
            $scope.order( '' );
        }, function ( error ) {
            console.log( error );
        });

        function select( page ) {
            var end, start;
            start = ( page - 1 ) * $scope.numPerPage;
            end = start + $scope.numPerPage;
            return $scope.currentPageTeams = $scope.filteredTeams.slice( start, end );
        };

        function onFilterChange() {
            $scope.select( 1 );
            $scope.currentPage = 1;
            return $scope.row = '';
        };

        function onNumPerPageChange() {
            $scope.select( 1 );
            return $scope.currentPage = 1;
        };

        function onOrderChange() {
            $scope.select( 1 );
            return $scope.currentPage = 1;
        };

        function search() {
            $scope.filteredTeams = $filter( 'filter' )( $scope.teams, $scope.searchKeywords );
            return $scope.onFilterChange();
        };

        function order( rowName ) {


            if ( $scope.row === rowName ) {
                return;
            }
            $scope.row = rowName;
            $scope.filteredTeams = $filter( 'orderBy' )( $scope.teams, rowName );
            return $scope.onOrderChange();
        };

        init = function () {
            $scope.search();
            return $scope.select( $scope.currentPage );
        };

        init();
    }

} )();
