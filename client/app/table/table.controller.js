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
        $scope.numPerPageOpt = [ 3, 5, 10, 20, 100 ];
        $scope.numPerPage = $scope.numPerPageOpt[ 3 ];
        $scope.currentPage = 1;
        $scope.currentPage = [];

        $http.get('app/data/teams.json').then( function( data ) {

            data.data.forEach( item => {

              if( typeof item.score !== 'undefined' ) {
                  $scope.teams.push({
                    name: item.teamName,
                    country: null,
                    roundOne: item.score[0].r1,
                    roundTwo: item.score[0].r2,
                    roundThree: item.score[0].r3,
                    roundFour: item.score[0].r4,
                    roundFive: item.score[0].r5,
                    roundSix: item.score[0].r6,
                    roundSeven: item.score[0].r7,
                    roundEight: item.score[0].r8,
                    roundNine: item.score[0].r9,
                    roundTen: item.score[0].r10,
                    roundEleven: item.score[0].r11,
                    total: item.score[0].total
                  });
                } else {
                  $scope.teams.push({
                    name: item.teamName + " *",
                    country: null,
                    roundOne: 0,
                    roundTwo: 0,
                    roundThree: 0,
                    roundFour: 0,
                    roundFive: 0,
                    roundSix: 0,
                    roundSeven: 0,
                    roundEight: 0,
                    roundNine: 0,
                    roundTen: 0,
                    roundEleven: 0,
                    total: 0
                  });
                }
            });

            $scope.order( '-total' );

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
