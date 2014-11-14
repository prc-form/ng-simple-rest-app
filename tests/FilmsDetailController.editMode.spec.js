describe('Controller: FilmsDetailController in edit mode', function () {
    var controller,
        $location

    beforeEach(function () { module('simpleRestApp') });

    beforeEach(inject(function ($controller, $rootScope, $q) {
        var scope = $rootScope.$new();
        var mockFilmsService = {
            get: function (id) {
                var httpResponse =
                    {
                        data:
                        {
                            id: 1,
                            title: 'Film A',
                            rating: { 'id': 1 }
                        }
                    };
                var defer = $q.defer();

                defer.resolve(httpResponse);

                return defer.promise;
            },
            getRatings: function () {
                var httpResponse =
                    {
                        data:
                        [
                            {
                                id: 1,
                                name: 'Rating A'
                            }
                        ]
                    };
                var defer = $q.defer();
                defer.resolve(httpResponse);
                return defer.promise;
            }
        };
        controller = $controller('FilmsDetailController',
            {
                $scope: scope,
                $routeParams: { id: '1' },
                $location: $location,
                FilmsService: mockFilmsService
            }
        );
        scope.$digest();
    }));

    it('on startup should have populated film and ratings', function () {
        expect(controller.title).toEqual('Edit Film');
        expect(controller.film.id).toEqual(1);
        expect(controller.film.rating.id).toEqual(1);
        expect(controller.ratings.length).toEqual(1);
    });
});

// Yet to be tested...
//vm.cancelForm = cancelForm;
//vm.submitForm = submitForm;
//vm.deleteFilm = deleteFilm;
//vm.throwError = throwError;