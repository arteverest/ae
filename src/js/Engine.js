(function(root) {
  'use strict';

  var CANVAS_DOM_SELECTOR = '.js-mask';
  var BREAKPOINT = 480;

  var Engine = root.Engine = function Engine() {
    this.surface = null;
    this.canvas = null;
    this.context = null;
    this.warmedUp = false;

    if (!this.maybeStart()) {
      window.addEventListener('resize', this.maybeStart.bind(this));
    }
  };

  Engine.prototype.maybeStart = function() {
    if (!this.warmedUp && this.check()) {
      this.warmUp();
      this.run();

      return true;
    }
    return false;
  };

  Engine.prototype.check = function() {
    var valid = false;

    if (window.innerWidth > BREAKPOINT) {
      valid = true;
    }

    return valid;
  };

  Engine.prototype.warmUp = function() {
    this.surface = new Surface();
    this.canvas = document.querySelector(CANVAS_DOM_SELECTOR);
    this.context = this.canvas.getContext('2d');

    this.warmedUp = true;
  };

  Engine.prototype.run = function() {
    this.update();
    this.render();

    window._RAF(this.run.bind(this));
  };
  Engine.prototype.update = function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.save();
    this.surface.update(this.context);
    this.context.restore();
  };
  Engine.prototype.render = function() {
    this.surface.render(this.context);
  };

}(window));
