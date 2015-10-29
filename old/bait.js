
function Logo() {
    var e = {},
        t, n, r = false,
        i = null;
    e.setup = function() {
        t = document.getElementById("bait");
        n = t.getContext("2d")
    };
    e.update = function() {};
    e.getDimensions = function() {
        return {
            width: t.width,
            height: t.height
        }
    };
    e.enableMask = function(e) {
        r = true;
        i = e
    };
    e.disableMask = function() {
        r = false;
        i = null
    };
    e.draw = function() {
        n.clearRect(0, 0, t.width, t.height);
        i ? n.save() : n.fillStyle = "rgb(255,255,255)";
        var e = 20;
        n.beginPath();
        if (!0) {
            n.moveTo(300, 310 + e);
            n.bezierCurveTo(410, 450, 200, 520, 200, 360 + e);
            n.bezierCurveTo(200, 300, 250, 200, 330, 152 + e);
            n.bezierCurveTo(380, 279, 510, 274, 480, 480 + e);
            n.bezierCurveTo(538, 281, 383, 279, 388, 0 + e);
            n.bezierCurveTo(130, 239, 171, 448, 100, 500 + e);
            n.bezierCurveTo(169, 456, 237, 552, 330, 477 + e);
            n.bezierCurveTo(367, 444, 365, 343, 300, 310 + e)
        } else {
            n.moveTo(317, 316);
            n.bezierCurveTo(360, 450, 300, 520, 180, 460);
            n.bezierCurveTo(200, 300, 250, 200, 310, 160);
            n.bezierCurveTo(380, 279, 510, 274, 480, 480);
            n.bezierCurveTo(538, 281, 383, 279, 388, 0);
            n.bezierCurveTo(130, 239, 171, 448, 100, 500);
            n.bezierCurveTo(169, 456, 237, 552, 330, 477);
            n.bezierCurveTo(367, 444, 365, 343, 318, 317)
        }
        n.strokeStyle = "#333";
        n.lineWidth = 2;
        n.shadowColor = "#2f2f2f";
        n.shadowBlur = 80;
        n.shadowOffsetX = 0;
        n.shadowOffsetY = 0;
        n.fill();
        n.stroke();
        if (i) {
            n.clip();
            i(n)
        }
        n.restore()
    };
    return e
}

////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

function Surface() {
    function s() {
        r.remove(p);
        n.clear();
        i = new FSS.Plane(1.2 * n.width, 1.2 * n.height, 8, 8);
        h = new FSS.Material("#ffffff", y);
        p = new FSS.Mesh(i, h);
        var e, t;
        for (e = i.vertices.length - 1; e >= 0; e--) {
            t = i.vertices[e];
            t.anchor = FSS.Vector3.clone(t.position);
            t.step = FSS.Vector3.create(Utils.randomFloat(.4, 1), Utils.randomFloat(.4, 1), Utils.randomFloat(.4, 1));
            t.time = Utils.randomFloat(0, Math.PIM2)
        }
        r.add(p)
    }

    function o() {
        d = new FSS.Light("#111122", "#ffffff");
        r.add(d)
    }
    var e = document.createElement("canvas");
    var t = e.getContext("2d");
    var n = new FSS.CanvasRenderer;
    var r = new FSS.Scene;
    var i;
    var u = this,
        a = {},
        f = {},
        l, c, i, h, p, d, m, g = Date.now(),
        y, b, w, E, S, x;
    f.hsl = null;
    f.hsl1 = null;
    f.hsl2 = null;
    a.setup = function(e, t) {
        b = e;
        w = t;
        y = b;
        f.hsl = tinycolor(b).toHsl();
        f.hsl1 = tinycolor(b).toHsl();
        f.hsl2 = tinycolor(w).toHsl();
        s();
        o();
        n.element.style.position = "absolute";
        n.element.style.top = "0";
        n.element.style.right = "0";
        n.element.style.zIndex = "1000";
        x = (new TWEEN.Tween(f.hsl)).to({
            h: f.hsl2.h,
            s: f.hsl2.s,
            l: f.hsl2.l
        }, 5e3).repeat(Infinity).yoyo(!0).delay(5e3).easing(TWEEN.Easing.Cubic.InOut).onUpdate(function() {
            var e = tinycolor(f.hsl).toHexString();
            y = e;
            h.diffuse.set(e, h.diffuse.opacity)
        }).start()
    };
    a.setSize = function(t) {
        n.setSize(t.width, t.height);
        e.width = t.width;
        e.height = t.height;
        i.width = t.width;
        i.height = t.height;
        s()
    };
    a.update = function() {
        t.beginPath();
        t.rect(0, 0, e.width, e.height);
        t.fillStyle = y;
        t.fill();
        m = Date.now() - g;
        d.setPosition(n.width * .6 * Math.sin(m * .001), 25, n.height * .24 + Math.sin(m * .005) * 35);
        var r = MESH.depth / 2;
        for (v = i.vertices.length - 1; v >= 0; v--) {
            vertex = i.vertices[v];
            ox = Math.sin(vertex.time + vertex.step[0] * m * MESH.speed);
            oy = Math.cos(vertex.time + vertex.step[1] * m * MESH.speed);
            oz = Math.sin(vertex.time + vertex.step[2] * m * MESH.speed);
            FSS.Vector3.set(vertex.position, MESH.xRange * i.segmentWidth * ox, MESH.yRange * i.sliceHeight * oy, MESH.zRange * r * oz - r);
            FSS.Vector3.add(vertex.position, vertex.anchor)
        }
        i.dirty = !0
    };
    a.draw = function(t, i) {
        var s = e.width,
            o = e.height;
        if (i) {
            s *= 550 / s;
            o *= 650 / o
        }
        n.render(r);
        t.drawImage(e, 0, 0);
        t.drawImage(n.element, 0, 0, n.width, n.height, 0, 0, s, o)
    };
    return a
}

////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////


if (!Function.prototype.bind) {
    Function.prototype.bind = function(e) {
        if (typeof this !== "function") {
            throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable")
        }
        var t = Array.prototype.slice.call(arguments, 1),
            n = this,
            r = function() {},
            i = function() {
                return n.apply(this instanceof r && e ? this : e, t.concat(Array.prototype.slice.call(arguments)))
            };
        r.prototype = this.prototype;
        i.prototype = new r;
        return i
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

window.requestAnimFrame = function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(e) {
            window.setTimeout(e, 1000 / 60)
        }
}();


////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

var MESH = {};
MESH.speed = 3e-4;
MESH.xRange = .2;
MESH.yRange = .2;
MESH.zRange = 0;
MESH.depth = 10;

////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////


var Utils = {
    randomInt: function(e, t) {
        return Math.floor(Math.random() * (t - e + 1)) + e
    },
    randomFloat: function(e, t) {
        return Math.random() * (t - e) + e
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

function Bait() {
    this.init()
}

Bait.prototype = {
    init: function() {
        this.setup();
        this.canvas = document.getElementById("bait");
        window.addEventListener("resize", this.handleWindowResize.bind(this), !1);
        this.handleWindowResize();
        this.setup();
        this.update()
    },
    update: function() {
        this.logo.update();
        this.surface.update();
        TWEEN.update();
        this.draw();
        requestAnimFrame(this.update.bind(this))
    },
    draw: function(e, t) {
        this.logo.draw()
    },
    setup: function() {
        var e = this;
        this.logo = new Logo;
        this.logo.setup();
        this.logo.enableMask(function(t) {
            e.surface.draw(t, !0)
        });
        this.surface = new Surface;
        this.surface.setup(COLOR1, COLOR2);
        var t = this.logo.getDimensions();
        this.surface.setSize(t)
    },
    handleWindowResize: function() {
        var e = window.innerWidth,
            t = window.innerHeight
    }
};
new Bait;
