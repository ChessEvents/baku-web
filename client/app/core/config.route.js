( function () {
    'use strict';

    angular.module( 'app' )
        .config( [ '$stateProvider', '$urlRouterProvider', function ( $stateProvider, $urlRouterProvider, $http ) {
            var routes, setRoutes;

            routes = [
                'table/main-event', 'table/week-two-sprint'
            ]

            setRoutes = function ( route ) {
                var config, url;
                url = '/' + route;
                config = {
                    url: url,
                    templateUrl: 'app/' + route + '.html'
                };

                $stateProvider.state( route, config );
                return $stateProvider;
            };

            routes.forEach( function ( route ) {
                return setRoutes( route );
            } );

            $stateProvider.state( 'team', {
                url: '/team/:id',
                templateUrl: 'app/page/team-details.html'
            });

            $stateProvider.state( 'dashboard', {
                url: '/dashboard',
                templateUrl: 'app/dashboard/dashboard.html'
            } );

            $urlRouterProvider
                .when( '/', '/table/main-event' )
                .otherwise( '/table/main-event' );

        } ] );

} )();
