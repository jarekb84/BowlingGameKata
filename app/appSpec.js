'use strict'

describe('BowlingGameTest', function () {

    // load module
    beforeEach(module('app'));

    var ctrl, scope;
    // inject the $controller and $rootScope services
    // in the beforeEach block
    beforeEach(inject(function ($controller, $rootScope) {
        // Create a new scope that's a child of the $rootScope
        scope = $rootScope.$new();
        // Create the controller
        ctrl = $controller('MainController', {
            $scope: scope
        });
    }));

    function rollMany(n, pins) {
        for (var i = 0; i < n; i++) {
            scope.roll(pins);
        }
    }

    function rollSpare() {
        scope.roll(5);
        scope.roll(5); // spare
    }

    function rollStrike() {
        scope.roll(10);
    }

    it('test Gutter Game', function () {
        rollMany(20, 0);
        expect(0).toEqual(scope.score());
    });

    it('test all ones', function () {
        rollMany(20, 1);
        expect(20).toEqual(scope.score());
    });

    it('test one spare', function () {
        rollSpare();
        scope.roll(3);
        rollMany(17, 0);

        expect(16).toEqual(scope.score());
    });

    it('test one strike', function () {
        rollStrike();
        scope.roll(3);
        scope.roll(4);
        rollMany(17, 0);

        expect(24).toEqual(scope.score());
    });

    it('test perfect game', function () {
        rollMany(12, 10);
        expect(300, scope.score());
    });
});
