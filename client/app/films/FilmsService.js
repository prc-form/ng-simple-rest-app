(function () {
    'use strict';

    angular
        .module('simpleRestApp')
        .factory('FilmsService', ['$http', 'logger', FilmsService]);

    function FilmsService($http, logger) {

        var service = {
            getAll: getAll,
            get: get,
            insert: insert,
            update: update,
            getRatings: getRatings,
            deleteFilm: deleteFilm,
            throwError: throwError
        };

        return service;

        function getAll() {
            return $http({method: 'GET', url: '/api/films'})
                .success(function (data, status, headers, config) {
                    logger.info('getAll(): http get successful');
                    return data;
                })
                .error(function(data, status, headers, config) {
                    logger.error(data);
                });
        }

        function get(id) {
            return $http({ method: 'GET', url: '/api/films/' + id })
                .success(function (data, status, headers, config) {
                    logger.info('get(id): http get successful');
                    return data;
                })
                .error(function (data, status, headers, config) {
                    logger.error(data);
                });
        }

        function getRatings() {
            return $http({ method: 'GET', url: '/api/ratings/' })
                .success(function (data, status, headers, config) {
                    logger.info('getRatings(): http get successful');
                    return data;
                })
                .error(function (data, status, headers, config) {
                    logger.error(data);
                });
        }

        function insert(film) {
            return $http({ method: 'POST', url: '/api/films/', data: film })
                .success(function (data, status, headers, config) {
                    logger.info('insert(film): http post successful');
                    return data;
                })
                .error(function (data, status, headers, config) {
                    logger.error(data);
                });
        }

        function update(film) {
            return $http({ method: 'PUT', url: '/api/films/' + film.id, data: film })
                .success(function (data, status, headers, config) {
                    logger.info('update(film): http put successful');
                    return data;
                })
                .error(function (data, status, headers, config) {
                    logger.error(data);
                });
        }

        function deleteFilm(id) {
            return $http({ method: 'DELETE', url: '/api/films/' + id })
                .success(function (data, status, headers, config) {
                    logger.info('deleteFilm(id): http delete successful');
                    return data;
                })
                .error(function (data, status, headers, config) {
                    logger.error(data);
                });
        }

        function throwError() {
            return $http({ method: 'GET', url: '/api/timbuktu/' })
                .success(function (data, status, headers, config) {
                    logger.info('throwError(): http get timbuktu successful');
                    return data;
                })
                .error(function (data, status, headers, config) {
                    logger.error(data);
                });
        }
    }
})();