(function(root) {
    'use strict';

    // config
    var MESH_SPEED = 3e-3;
    var MESH_DEPTH = 10;
    var MESH_X_RANGE = 0.2;
    var MESH_Y_RANGE = 0.2;
    var MESH_Z_RANGE = 0.05;

    var MESH_SEGMENTS = 10;
    var MESH_SLICES = 30;

    var Surface = root.Surface = function Surface() {
        this.scene = null;
        this.mesh = null;
        this.light = null;
        this.renderer = null;
        this.now = null;

        return this.warmUp();
    };

    Surface.prototype.warmUp = function() {

        this.renderer = new FSS.CanvasRenderer();
        this.scene = new FSS.Scene();
        this.light = new FSS.Light('#000000', '#ff0000');
        this.geometry = new FSS.Plane(300, 300, MESH_SEGMENTS, MESH_SLICES);
        this.material = new FSS.Material('#ff0000');
        this.mesh = new FSS.Mesh(this.geometry, this.material);
        this.now = Date.now();
        this.start = Date.now();

        this.scene.add(this.mesh);
        this.scene.add(this.light);

        var v, vertex;
        for (v = this.geometry.vertices.length - 1; v >= 0; v--) {
            vertex = this.geometry.vertices[v];
            vertex.anchor = FSS.Vector3.clone(vertex.position);
            vertex.step = FSS.Vector3.create(
                Math.randomInRange(0.2, 1.0),
                Math.randomInRange(0.2, 1.0),
                Math.randomInRange(0.2, 1.0)
            );
            vertex.time = Math.randomInRange(0, Math.PIM2);
        }
    };
    Surface.prototype.update = function() {};

    Surface.prototype.render = function(context) {

        var attractor = FSS.Vector3.create();

        this.now = Date.now() - this.start;
        this.light.setPosition(150 * Math.sin(this.now * 0.001), 150 * Math.cos(this.now * 0.0005), 60);
        this.renderer.render(this.scene);

        context.drawImage(this.renderer.element, 0, 0, this.renderer.width, this.renderer.height, 0, 0, 500, 500);

        var ox, oy, oz, l, light, v, vertex,
            offset = MESH_DEPTH / 2;

        // Animate Vertices
        for (v = this.geometry.vertices.length - 1; v >= 0; v--) {

            vertex = this.geometry.vertices[v];
            ox = Math.sin(vertex.time + vertex.step[0] * this.now * MESH_SPEED);
            oy = Math.cos(vertex.time + vertex.step[1] * this.now * MESH_SPEED);
            oz = Math.sin(vertex.time + vertex.step[2] * this.now * MESH_SPEED);

            FSS.Vector3.set(vertex.position,
                MESH_X_RANGE * this.geometry.segmentWidth * ox,
                MESH_Y_RANGE * this.geometry.sliceHeight * oy,
                MESH_Z_RANGE * offset * oz - offset);

            FSS.Vector3.add(vertex.position, vertex.anchor);
        }

        // Set the Geometry to dirty
        this.geometry.dirty = true;
    };

}(window));

