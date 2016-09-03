( function () {
    'use strict';

    angular.module( 'app' )
        .config( [ '$stateProvider', '$urlRouterProvider', function ( $stateProvider, $urlRouterProvider, $http ) {
            var routes, setRoutes;

            routes = [
                'ui/cards', 'ui/typography', 'ui/buttons', 'ui/icons', 'ui/grids', 'ui/widgets', 'ui/components', 'ui/timeline', 'ui/lists', 'ui/pricing-tables',
                'map/maps',
                'table/main-event', 'table/week-two-sprint',
                'form/elements', 'form/layouts', 'form/validation', 'form/wizard',
                'chart/echarts', 'chart/echarts-line', 'chart/echarts-bar', 'chart/echarts-pie', 'chart/echarts-scatter', 'chart/echarts-more',
                'page/404', 'page/500', 'page/blank', 'page/forgot-password', 'page/invoice', 'page/lock-screen', 'page/profile', 'page/signin', 'page/signup',
                'app/calendar'
            ]

            setRoutes = function ( route ) {
                var config, url;
                url = '/' + route;
                config = {
                    url: url,
                    templateUrl: 'app/' + route + '.html'
                };

                // if ( route.indexOf( 'table/main-event' ) > -1 ) {
                //     console.log( 'Addeding resolver! ');
                //     config.resolve = {
                //         teams: function ( $http ) {
                //             return $http.get( 'app/data/teams.json' ).then( function ( data ) {
                //                 return data.data;
                //             });
                //         }
                //     }
                // }

                $stateProvider.state( route, config );
                return $stateProvider;
            };

            routes.forEach( function ( route ) {
                return setRoutes( route );
            } );

            $urlRouterProvider
                .when( '/', '/main-event' )
                .otherwise( '/main-event' );


            $stateProvider.state( 'dashboard', {
                url: '/dashboard',
                templateUrl: 'app/dashboard/dashboard.html'
            } );

        } ] );

} )();
