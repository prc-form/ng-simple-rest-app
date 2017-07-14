(function () {
    'use strict';

    angular
    .module('simpleRestApp')
    .controller('FilmsDetailController', ['$routeParams', '$window', '$timeout', 'FilmsService', FilmsDetailController]);

    function FilmsDetailController($routeParams, $window, $timeout, FilmsService) {
        /* jshint validthis: true */
        var vm = this;

        vm.title = "";
        vm.film = {};
        vm.ratings = [];
        vm.isBusy = false;
        vm.errorMessage = "";
        vm.get = get;
        vm.getRatings = getRatings;
        vm.cancelForm = cancelForm;
        vm.submitForm = submitForm;
        vm.deleteFilm = deleteFilm;

        activate();

        function activate() {
            getRatings();

            if (isNaN($routeParams.id)) {
                vm.title = "Add Film";
                vm.film.id = -1;
            } else {
                vm.title = "Edit Film";
                get(vm.id);
            }
        }

        function get(id) {
            return FilmsService.get($routeParams.id)
            .then(function (data) {
                vm.film = data.data;
                fixReferences();
                return vm.film;
            });
        }

        function getRatings() {
            return FilmsService.getRatings()
            .then(function (data) {
                vm.ratings = data.data;
                fixReferences();
                return vm.ratings;
            });
        }

        function fixReferences() {
            if (typeof vm.film.rating === "undefined")
                return;

            for (var i = 0; i < vm.ratings.length; i++) {
                if (vm.film.rating.id == vm.ratings[i].id) {
                    vm.film.rating = vm.ratings[i];
                    break;
                }
            }
        }

        function deleteFilm(film) {
            return FilmsService.deleteFilm(film.id)
            .then(function (data) {
                $window.history.back();
            }, function (data) {
                vm.errorMessage = "Error: " + data.data;
            });
        }

        function cancelForm() {
            $window.history.back();
        };

        function submitForm(valid) {
            if (!valid) return;

            vm.isBusy = true;

            if (vm.film.id === -1) {
                // fake two second delay
                $timeout(function () {
                    insertFilm();
                }, 2000)
            } else {
                // fake two second delay
                $timeout(function () {
                    updateFilm();
                }, 2000)
            }
        };

        function insertFilm() {
            FilmsService.insert(vm.film)
            .then(function (data) {
                $window.history.back();
            },
            function (data) {
                vm.errorMessage = "Error: " + data.data;
                vm.isBusy = false;
            });
        }

        function updateFilm() {
            FilmsService.update(vm.film)
            .then(function (data) {
                $window.history.back();

            }, function (data) {
                vm.errorMessage = "Error: " + data.data;
                vm.isBusy = false;
            });
        }
    }
})();
