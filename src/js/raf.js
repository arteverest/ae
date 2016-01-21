(function(root) {
    'use strict';


    window._RAF = function() {
        return  window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                function(e) {
                    window.setTimeout(e, 1000 / 60);
                };
    }();


}(window));
