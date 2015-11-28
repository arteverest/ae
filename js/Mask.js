(function(root) {
    'use strict';

    var Mask = root.Mask = function Mask(selector) {
        this.canvas = null;
        this.context = null;
        this.logo = null;

        this.warmUp(selector);
    };

    Mask.prototype.warmUp = function(selector) {
        this.canvas = document.querySelector(selector);
        this.context = this.canvas.getContext('2d');
        this.logo = new AELogo(2, 30);
    };
    Mask.prototype.update = function() {};
    Mask.prototype.render = function(callback) {

        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        callback ? this.context.save() : this.context.fillStyle = "rgb(255,255,255)";

        this.context.beginPath();
        this.logo.render(this.context);

        this.context.strokeStyle = "#550000";
        this.context.lineWidth = 2;
        this.context.shadowColor = "#ff1111";
        this.context.shadowBlur = 10;
        this.context.shadowOffsetX = 0;
        this.context.shadowOffsetY = 0;
        this.context.fill();

        if (callback) {
            //this.context.clip();
            callback(this.context);
        }


        // this.context.stroke();
        this.context.restore();
    };

}(window));
