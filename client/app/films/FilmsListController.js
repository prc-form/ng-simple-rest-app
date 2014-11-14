(function () {
    'use strict';

    angular
        .module('simpleRestApp')
        .controller('FilmsListController', ['$location', 'FilmsService', FilmsListController]);

    function FilmsListController($location, FilmsService) {
        /* jshint validthis: true */
        var vm = this;

        vm.title = 'Films';
        vm.films = [];
        vm.getAll = getAll;
        vm.gotoFilmAdd = gotoFilmAdd;
        vm.gotoFilmEdit = gotoFilmEdit;

        activate();

        function activate() {
            return getAll();
        }

        function getAll() {
            return FilmsService.getAll()
                .then(function(data){
                    return vm.films = data.data;
                });
        }

        function gotoFilmAdd() {
           $location.path('/films/add');
        }

        function gotoFilmEdit(film) {
            if (typeof film !== "undefined") {
                $location.path('/films/' + film.id);
            }
        }
    }
})();