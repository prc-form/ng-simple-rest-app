
describe('Controller: FilmsListController', function () {
    var controller,
        scope,
        mockFilmsService,
        $location;

    beforeEach(function () { module('simpleRestApp') });

    beforeEach(inject(function ($controller, $rootScope, _$location_, $q) {
        scope = $rootScope.$new();
        $location = _$location_;
        mockFilmsService = {
            getAll: function () {
                var httpResponse =
                    {
                        data:
                        [
                            {
                                id: 1,
                                title: 'Film A'
                            },
                            {
                                id: 2,
                                title: 'Film B'
                            },
                            {
                                id: 3,
                                title: 'Film C'
                            }
                        ]
                    };
                var defer = $q.defer();

                defer.resolve(httpResponse);

                return defer.promise;
            }
        };

        controller = $controller('FilmsListController',
            {
                $scope: scope,
                $location: $location,
                FilmsService: mockFilmsService
            }
        );
        scope.$digest();
    }));

    it('should contain all the films at startup', function () {
        expect(controller.films.length).toEqual(3);
    });

    it('should redirect us to a films details add page', function () {
        spyOn($location, 'path');
        controller.gotoFilmAdd();
        expect($location.path).toHaveBeenCalledWith('/films/add');
    });

    it('should redirect us to a films details edit page', function () {
        spyOn($location, 'path');
        var film = controller.films[0];
        controller.gotoFilmEdit(film);
        expect($location.path).toHaveBeenCalledWith('/films/1');
    });
});