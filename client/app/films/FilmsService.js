(function () {
    'use strict';

    angular
        .module('simpleRestApp')
        .service('FilmsService', ['$http', 'logger', FilmsService]);

    function FilmsService($http, logger) {

//        var _PREFIX = '/api';
        var _PREFIX = 'http://localhost:3000';

        var service = {
            getAll: getAll,
            get: get,
            insert: insert,
            update: update,
            getRatings: getRatings,
            deleteFilm: deleteFilm
        };

        return service;

        function getAll() {
            return $http({method: 'GET', url: _PREFIX + '/films'})
                .success(function (data, status, headers, config) {
                    logger.info('getAll(): http get successful');
                    return data;
                })
                .error(function(data, status, headers, config) {
                    logger.error(data);
                });
        }

        function get(id) {
            return $http({ method: 'GET', url: _PREFIX + '/films/' + id })
                .success(function (data, status, headers, config) {
                    logger.info('get(id): http get successful');
                    return data;
                })
                .error(function (data, status, headers, config) {
                    logger.error(data);
                });
        }

        function getRatings() {
            return $http({ method: 'GET', url: _PREFIX + '/ratings/' })
                .success(function (data, status, headers, config) {
                    logger.info('getRatings(): http get successful');
                    return data;
                })
                .error(function (data, status, headers, config) {
                    logger.error(data);
                });
        }

        function insert(film) {
            film.id = undefined;
            return $http({ method: 'POST', url: _PREFIX + '/films/', data: film })
                .success(function (data, status, headers, config) {
                    logger.info('insert(film): http post successful');
                    return data;
                })
                .error(function (data, status, headers, config) {
                    logger.error(data);
                });
        }

        function update(film) {
            return $http({ method: 'PUT', url: _PREFIX + '/films/' + film.id, data: film })
                .success(function (data, status, headers, config) {
                    logger.info('update(film): http put successful');
                    return data;
                })
                .error(function (data, status, headers, config) {
                    logger.error(data);
                });
        }

        function deleteFilm(id) {
            return $http({ method: 'DELETE', url: _PREFIX + '/films/' + id })
                .success(function (data, status, headers, config) {
                    logger.info('deleteFilm(id): http delete successful');
                    return data;
                })
                .error(function (data, status, headers, config) {
                    logger.error(data);
                });
        }
    }
})();
