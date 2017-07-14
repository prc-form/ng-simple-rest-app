(function () {
    'use strict';

    angular
        .module('simpleRestApp', ['ngAnimate', 'ngRoute', 'ui.bootstrap'])
        .config(['$routeProvider', '$locationProvider', routeConfig])
        .config(['$httpProvider', httpConfig])
        .run(['$route', function ($route) {
            $route.reload();
        }]);

    function routeConfig($routeProvider, $locationProvider) {
        $routeProvider
            .when('/films', {
                templateUrl: 'app/films/FilmsList.html',
                controller: 'FilmsListController',
                controllerAs: 'vm'
            })
            .when('/films/:id', {
                templateUrl: 'app/films/FilmsDetail.html',
                controller: 'FilmsDetailController',
                controllerAs: 'vm'
            })
            .otherwise({
                redirectTo: '/films'
            });

        // use the HTML5 History API - to remove # from url
        //$locationProvider.html5Mode(true);
    }

    function httpConfig($httpProvider) {
        $httpProvider.defaults.transformResponse.push(function (responseData) {
            convertDateStringsToDates(responseData);
            return responseData;
        });
    }

    var regexIso8601 = /^(\d{4}|\+\d{6})(?:-(\d{2})(?:-(\d{2})(?:T(\d{2}):(\d{2}):(\d{2})\.(\d{1,})(Z|([\-+])(\d{2}):(\d{2}))?)?)?)?$/;

    function convertDateStringsToDates(input) {
        // Ignore things that aren't objects.
        if (typeof input !== "object") return input;

        for (var key in input) {
            if (!input.hasOwnProperty(key)) continue;

            var value = input[key];
            var match;
            // Check for string properties which look like dates.
            if (typeof value === "string" && (match = value.match(regexIso8601))) {
                var milliseconds = Date.parse(match[0])
                if (!isNaN(milliseconds)) {
                    input[key] = new Date(milliseconds);
                }
            } else if (typeof value === "object") {
                // Recurse into object
                convertDateStringsToDates(value);
            }
        }
    }
})();
