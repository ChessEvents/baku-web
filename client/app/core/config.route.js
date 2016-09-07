( function () {
    'use strict';

    angular.module( 'app' )
        .config( [ '$stateProvider', '$urlRouterProvider', function ( $stateProvider, $urlRouterProvider, $http ) {
            var routes, setRoutes;

            $stateProvider.state( 'team', {
                url: '/team/:id',
                templateUrl: 'app/page/team-details.html'
            });

            $stateProvider.state( 'dashboard', {
                url: '/dashboard',
                templateUrl: 'app/dashboard/dashboard.html'
            } );

            $stateProvider.state( 'main-event', {
                url: '/table/main-event',
                templateUrl: 'app/table/main-event.html'
            });

            $stateProvider.state( 'week-two-sprint', {
                url: '/table/week-two-sprint',
                templateUrl: 'app/table/week-two-sprint.html'
            });

            $stateProvider.state( 'country', {
                url: '/table/main-event/:country',
                templateUrl: 'app/table/main-event.html'
            } );

            $urlRouterProvider
                .when( '/', '/dashboard' )
                .otherwise( '/dashboard' );

        } ] );

} )();
