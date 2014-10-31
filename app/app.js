'use strict'

angular.module('app', [])
    .controller('MainController', function ($scope) {
        var rolls = [],
            currentRoll = 0;

        $scope.roll = function (pins) {
            rolls[currentRoll++] = pins;
        };

        function isSpare(frameIndex) {
            return rolls[frameIndex] + rolls[frameIndex + 1] == 10;
        }

        function strikeBonus(frameIndex) {
            return rolls[frameIndex + 1] + rolls[frameIndex + 2];
        }

        function spareBonus(frameIndex) {
            return rolls[frameIndex + 2];
        }

        function sumOfBallsInFrame(frameIndex) {
            return rolls[frameIndex] + rolls[frameIndex + 1];
        }

        function isStrike(frameIndex) {
            return rolls[frameIndex] == 10;
        }

        $scope.score = function () {
            var score = 0,
                frameIndex = 0;

            for (var frame = 0; frame < 10; frame++) {
                if (isStrike(frameIndex)) { //strike
                    score += 10 + strikeBonus(frameIndex);
                    frameIndex++;
                } else if (isSpare(frameIndex)) {
                    score += 10 + spareBonus(frameIndex);
                    frameIndex += 2;
                } else {
                    score += sumOfBallsInFrame(frameIndex);
                    frameIndex += 2;
                }
            }
            return score;
        }
    })