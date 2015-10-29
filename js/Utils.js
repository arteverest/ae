(function(root) {
    'use strict';

    var Utils = root.Utils = {
        randomInt: function(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        randomFloat: function(min, max) {
            return Math.random() * (max - min) + min;
        }
    };

}(window));
