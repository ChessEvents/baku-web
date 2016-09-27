(function () {
    'use strict';

    angular.module('app', [
        // Core modules
         'app.core'

        // Custom Feature modules
        ,'app.home'
        ,'app.page'
        ,'app.player',
        ,'app.main-event'
        ,'app.week-two-sprint'

        // 3rd party feature modules
        ,'mgo-angular-wizard'
        ,'ui.tree'
        ,'ngMap'
        ,'textAngular'
    ]);

})();
