( function () {
    'use strict';

    angular.module( 'app.week-two-sprint' )
        .controller( 'W2SCtrl', [ '$scope', '$filter', '$http', '$mdToast',
            '$cookies', '$rootScope', '$window', '$stateParams', W2SCtrl
        ] )
        .filter( 'rankPosition', [ rankPosition ] );

    function W2SCtrl( $scope, $filter, $http, $mdToast, $cookies, $rootScope, $window, $stateParams ) {
        var init;

        var now = new $window.Date(),
            // this will set the expiration to 6 months
            exp = new $window.Date( now.getFullYear(), now.getMonth() + 6, now.getDate() );

        $window.mobilecheck = function () {
            var check = false;
            ( function ( a ) {
                if ( /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test( a ) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test( a.substr( 0, 4 ) ) ) check = true;
            } )( navigator.userAgent || navigator.vendor || window.opera );
            return check;
        };

        $scope.start = function () {
            $rootScope.$broadcast( 'preloader:active' );
        }
        $scope.complete = function () {
            $rootScope.$broadcast( 'preloader:hide' );
        }

        $scope.isMobile = $window.mobilecheck();

        $scope.start();
        $scope.loading = true;

        $scope.countryFilter;
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
        $scope.numPerPageOpt = [ 5, 10, 20, 50, 100 ];
        $scope.numPerPage = $scope.numPerPageOpt[ 1 ];
        $scope.currentPage = 1;
        $scope.currentPage = [];

        var last = {
            bottom: true,
            top: false,
            left: false,
            right: true
        };

        $scope.toastPosition = angular.extend( {}, last );

        $scope.getToastPosition = function () {
            sanitizePosition();
            return Object.keys( $scope.toastPosition )
                .filter( function ( pos ) {
                    return $scope.toastPosition[ pos ];
                } )
                .join( ' ' );
        };

        if ( !$scope.isMobile ) {

            $scope.favouriteTeamToast = function ( team, show ) {

                if ( show === 1 ) {

                    var cookies = Object.keys( $cookies.getAll() );

                    if ( cookies.length > 6 ) {
                        console.log( 'Max cookies reached!' );
                        team.favourite = false;
                        return;
                    } else {

                        $mdToast.show(
                            $mdToast.simple()
                            .content( 'You\'ve made ' + team.name + ' a favourite!' )
                            .position( $scope.getToastPosition() )
                            .hideDelay( 3000 )
                        );

                        $cookies.putObject( team.id, [ {
                            team: team.name,
                            id: team.id
                        } ],{
                            expires: exp
                        } );

                        console.log( 'cookie added.', team.id, cookies.length );
                    }

                } else {
                    console.log( 'cookie removed.', team.id );
                    $cookies.remove( team.id );
                }

                $rootScope.$broadcast( 'cookieUpdates' );
            };
        }

        function sanitizePosition() {
            var current = $scope.toastPosition;

            if ( current.bottom && last.top ) current.top = false;
            if ( current.top && last.bottom ) current.bottom = false;
            if ( current.right && last.left ) current.left = false;
            if ( current.left && last.right ) current.right = false;

            last = angular.extend( {}, current );
        }

        var url = "app/data/teams-w2s.json";
        $scope.title = "Week 2 Sprint";



        $http.get( url ).then( function ( data ) {

            $scope.complete();
            $scope.loading = false;

            var onLoadCookies = Object.keys( $cookies.getAll() );

            data.data.forEach( function ( item ) {

                var favourite = false;
                var iso = item.iso;
                var teamName = item.teamName;
                var setImage = false;
                var imageUrl = '';
                var imageName = '';

                onLoadCookies.forEach( function ( cookie ) {
                    if ( cookie === item._id ) {
                        favourite = true;
                    }
                } );

                if ( item.country === 'CHESS.COM' ) {
                    setImage = true;
                    imageUrl = '/images/chessdotcomico.png';
                    imageName = 'chess.dom';
                }

                if ( iso ) {
                    iso = iso.toLowerCase();
                } else {
                    iso = item.country;
                }

                if ( item.teamName.length > 20 ) {
                    teamName = item.teamName.substring( 0, 20 ) + ' ...';
                }

                if ( item.score ) {

                    $scope.teams.push( {
                        id: item._id,
                        rank: item.roundRank[ 11 ].roundRank,
                        name: teamName,
                        country: item.country,
                        setImage: setImage,
                        imageUrl: imageUrl,
                        imageName: imageName,
                        iso: iso,
                        roundOne: item.score[ 0 ].r1.score,
                        roundTwo: item.score[ 0 ].r2.score,
                        roundThree: item.score[ 0 ].r3.score,
                        roundFour: item.score[ 0 ].r4.score,
                        roundFive: item.score[ 0 ].r5.score,
                        roundSix: item.score[ 0 ].r6.score,
                        roundSeven: item.score[ 0 ].r7.score,
                        roundEight: item.score[ 0 ].r8.score,
                        roundNine: item.score[ 0 ].r9.score,
                        roundTen: item.score[ 0 ].r10.score,
                        roundEleven: item.score[ 0 ].r11.score,
                        bonusPoints: item.bonusScore.total,
                        total: item.score[ 0 ].total,
                        favourite: favourite
                    } );
                }

            } );
            $scope.order( '-total' );

        }, function ( error ) {
            $scope.complete();
        } );

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

    function rankPosition() {

        return function ( input ) {

            if( !input ) return 0;

            var lastNumber = String( input );

            if( lastNumber.length > 1 ){
                lastNumber = lastNumber.substring( input.length - 1 );
            }
            if ( lastNumber === "1" ) {
                return input + 'st';
            }
            if( lastNumber === "2" ) {
                return input + 'nd';
            }
            if( lastNumber === "3" ) {
                return input + 'rd';
            }
            return input + 'th';
        }
    }
} )();
