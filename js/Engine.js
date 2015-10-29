(function(root) {
    'use strict';

    var Engine = root.Engine = function Engine() {
        this.mask = null;
        this.surface = null;

        this.warmUp();
        this.run();
    };

    Engine.prototype.warmUp = function() {
        this.mask = new Mask('.js-mask');
        this.surface = new Surface();
    };

    Engine.prototype.run = function() {
        this.update();
        this.render();

        window._RAF(this.run.bind(this));
    };
    Engine.prototype.update = function() {
        this.mask.update();
        this.surface.update();
        // TWEEN.update();
    };
    Engine.prototype.render = function() {
        this.mask.render(function(context) {
            this.surface.render(context);
        }.bind(this));

    };

}(window));
