describe('Controller: FilmsDetailController in add mode', function () {
    var controller,
        $location

    beforeEach(function () { module('simpleRestApp') });

    beforeEach(inject(function ($controller, $rootScope, $q) {
        var scope = $rootScope.$new();
        var mockFilmsService = {
            getRatings: function () {
                var httpResponse =
                    {
                        data:
                        [
                            {
                                id: 1,
                                name: 'Rating A'
                            },
                            {
                                id: 2,
                                name: 'Rating B'
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
                $routeParams: { id: 'add'},
                $location: $location,
                FilmsService: mockFilmsService
            }
        );
        scope.$digest();
    }));

    it('on startup should have blank film with ratings', function () {
        expect(controller.title).toEqual('Add Film');
        expect(controller.film.id).toEqual(-1);
        expect(controller.film.rating).not.toBeDefined();
        expect(controller.ratings.length).toEqual(2);
    });
});




