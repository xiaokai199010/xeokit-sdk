/**
 An **EmphasisMaterial** is a {{#crossLink "Material"}}{{/crossLink}} that defines the appearance of attached
 {{#crossLink "Mesh"}}Meshes{{/crossLink}} when they are highlighted, selected or ghosted.

 ## Examples

 | <a href="../../examples/#effects_ghost"><img src="../../assets/images/screenshots/HighlightMaterial/teapot.png"></img></a> | <a href="../../examples/#effects_demo_housePlan"><img src="../../assets/images/screenshots/HighlightMaterial/house.png"></img></a> | <a href="../../examples/#effects_demo_gearbox"><img src="../../assets/images/screenshots/HighlightMaterial/gearbox.png"></img></a> | <a href="../../examples/#effects_demo_adam"><img src="../../assets/images/screenshots/HighlightMaterial/adam.png"></img></a>|
 |:------:|:------:|:----:|:-----:|:-----:|
 |[Example 1: Ghost effect](../../examples/#effects_ghost)|[Example 2: Ghost and highlight effects for architecture](../../examples/#effects_demo_housePlan)|[Example 3: Ghost and highlight effects for CAD](../../examples/#effects_demo_gearbox)| [Example 4: Ghost effect for CAD ](../../examples//#effects_demo_adam)|

 ## Overview

 * Ghost an {{#crossLink "Mesh"}}{{/crossLink}} by setting its {{#crossLink "Mesh/ghost:property"}}{{/crossLink}} property ````true````.
 * When ghosted, a Mesh's appearance is controlled by its EmphasisMaterial.
 * An EmphasisMaterial provides several preset configurations that you can set it to. Select a preset by setting {{#crossLink "EmphasisMaterial/preset:property"}}{{/crossLink}} to the preset's ID. A map of available presets is provided in {{#crossLink "EmphasisMaterial/presets:property"}}xeokit.EmphasisMaterial.presets{{/crossLink}}.
 * By default, a Mesh uses the {{#crossLink "Scene"}}{{/crossLink}}'s global EmphasisMaterials, but you can give each Mesh its own EmphasisMaterial when you want to customize the effect per-Mesh.
 * Ghost all Meshes in a {{#crossLink "Model"}}{{/crossLink}} by setting the Model's {{#crossLink "Model/ghost:property"}}{{/crossLink}} property ````true````. Note that all Meshes in a Model have the Scene's global EmphasisMaterial by default.
 * Modify the Scene's global EmphasisMaterial to customize it.

 ## Usage

 * [Ghosting](#ghosting)
 * [Highlighting](#highlighting)

 ### Ghosting

 In the usage example below, we'll create a Mesh with a ghost effect applied to it. The Mesh gets its own EmphasisMaterial for ghosting, and
 has its {{#crossLink "Mesh/ghost:property"}}{{/crossLink}} property set ````true```` to activate the effect.

 <a href="../../examples/#effects_ghost"><img src="../../assets/images/screenshots/HighlightMaterial/teapot.png"></img></a>

 ````javascript
 var mesh = new xeokit.Mesh({
    geometry: new xeokit.TeapotGeometry({
        edgeThreshold: 1
    }),
    material: new xeokit.PhongMaterial({
        diffuse: [0.2, 0.2, 1.0]
    }),
    ghostMaterial: new xeokit.EmphasisMaterial({
        fill: true,
        fillColor: [0, 0, 0],
        fillAlpha: 0.7,
        edges: true,
        edgeColor: [0.2, 1.0, 0.2],
        edgeAlpha: 1.0,
        edgeWidth: 2
    }),
    ghost: true
 });
 ````

 Note the **edgeThreshold** configuration on the {{#crossLink "Geometry"}}{{/crossLink}} we've created for our
 Mesh. Our EmphasisMaterial is configured to draw a wireframe representation of the Geometry, which will have inner edges (ie. edges between
 adjacent co-planar triangles) removed for visual clarity. The ````edgeThreshold```` configuration indicates
 that, for this particular Geometry, an inner edge is one where the angle between the surface normals of adjacent triangles is not
 greater than ````5```` degrees. That's set to ````2```` by default, but we can override it to tweak the effect as needed for particular Geometries.

 Here's the example again, this time using the Scene's global EmphasisMaterial by default. We'll also modify that EmphasisMaterial
 to customize the effect.

 ````javascript
 var mesh = new xeokit.Mesh({
    geometry: new xeokit.TeapotGeometry({
        edgeThreshold: 5
    }),
    material: new xeokit.PhongMaterial({
        diffuse: [0.2, 0.2, 1.0]
    }),
    ghost: true
 });

 var ghostMaterial = mesh.scene.ghostMaterial;

 ghostMaterial.fill = true;
 ghostMaterial.fillColor = [0, 0, 0];
 ghostMaterial.fillAlpha = 0.7;
 ghostMaterial.edges = true;
 ghostMaterial.edgeColor = [0.2, 1.0, 0.2];
 ghostMaterial.edgeAlpha = 1.0;
 ghostMaterial.edgeWidth = 2;
 ````

 ### Highlighting

 In the next example, we'll use a ghosting in conjunction with highlighting, to emphasise a couple of objects within
 a gearbox {{#crossLink "Model"}}{{/crossLink}}. We'll load the Model from glTF, then ghost all of its Meshes except for two gears, which we'll highlight instead. The ghosted
 Meshes have the Scene's global ghosting EmphasisMaterial, which we'll modify. The  highlighted Meshes also have the Scene's global highlighting EmphasisMaterial, which we'll modify as well.

 <a href="../../examples/#effects_demo_gearbox"><img src="../../assets/images/screenshots/HighlightMaterial/gearbox.png"></img></a>

 ````javascript
 var model = new xeokit.GLTFModel({
     src: "models/gltf/gearbox_conical/scene.gltf",
     edgeThreshold: 10
 });

 model.on("loaded", function() {

    model.ghost = true;

    model.meshes["gearbox#77.0"].ghost = false;
    model.meshes["gearbox#79.0"].ghost = false;

    model.meshes["gearbox#77.0"].highlight = true;
    model.meshes["gearbox#79.0"].highlight = true;

    var ghostMaterial = model.scene.ghostMaterial;

    ghostMaterial.fill = true;
    ghostMaterial.fillColor = [0.2, 0.2, 0.7];
    ghostMaterial.fillAlpha = 0.9;
    ghostMaterial.edges = true;
    ghostMaterial.edgeColor = [0.4, 0.4, 1.6];
    ghostMaterial.edgeAlpha = 0.8;
    ghostMaterial.edgeWidth = 3;

    var highlightMaterial = model.scene.highlightMaterial;

    highlightMaterial.color = [1.0, 1.0, 1.0];
    highlightMaterial.alpha = 1.0;
 });
 ````

 ## Presets

 For convenience, an EmphasisMaterial provides several preset configurations that you can set it to, which are provided in
 {{#crossLink "EmphasisMaterial/presets:property"}}xeokit.EmphasisMaterial.presets{{/crossLink}}:

 ````javascript
 var presets = xeokit.EmphasisMaterial.presets;
 ````

 The presets look something like this:

 ````json
 {
        "default": {
            fill: true,
            fillColor: [0.4, 0.4, 0.4],
            fillAlpha: 0.2,
            edges: true,
            edgeColor: [0.2, 0.2, 0.2],
            edgeAlpha: 0.5,
            edgeWidth: 1
        },

         "sepia": {
            fill: true,
            fillColor: [0.97, 0.79, 0.66],
            fillAlpha: 0.4,
            edges: true,
            edgeColor: [0.52, 0.45, 0.41],
            edgeAlpha: 1.0,
            edgeWidth: 1
        },

        //...
 }
 ````

 Let's switch the Scene's global default  EmphasisMaterial over to the "sepia" preset used in <a href="/examples/#effects_demo_adam">Example 4: Ghost effect for CAD</a>.

 ````javascript
 scene.ghostMaterial.preset = "sepia";
 ````

 You can also just create an EmphasisMaterial from a preset:

 ````javascript
 var mesh = new xeokit.Mesh({
    geometry: new xeokit.TeapotGeometry({
        edgeThreshold: 5
    }),
    material: new xeokit.PhongMaterial({
        diffuse: [0.2, 0.2, 1.0]
    }),
    ghostMaterial: new xeokit.EmphasisMaterial({
        preset: "sepia"
    });
    ghost: true
 });
 ````

 Note that applying a preset just sets the EmphasisMaterial's property values, which you are then free to modify afterwards.

 @class EmphasisMaterial
 @module xeokit
 @submodule materials
 @constructor
 @extends Material
 @param [owner] {Component} Owner component. When destroyed, the owner will destroy this component as well. Creates this component within the default {{#crossLink "Scene"}}{{/crossLink}} when omitted.
 @param [cfg] {*} The EmphasisMaterial configuration
 @param [cfg.id] {String} Optional ID, unique among all components in the parent {{#crossLink "Scene"}}Scene{{/crossLink}}, generated automatically when omitted.
 @param [cfg.meta=null] {String:Object} Metadata to attach to this EmphasisMaterial.
 @param [cfg.fill=true] {Boolean} Indicates whether or not ghost surfaces are filled with color.
 @param [cfg.fillColor=[0.4,0.4,0.4]] {Array of Number} EmphasisMaterial fill color.
 @param [cfg.fillAlpha=0.2] {Number}  Transparency of filled ghost faces. A value of 0.0 indicates fully transparent, 1.0 is fully opaque.
 @param [cfg.edges=true] {Boolean} Indicates whether or not ghost edges are visible.
 @param [cfg.edgeColor=[0.2,0.2,0.2]] {Array of Number}  RGB color of ghost edges.
 @param [cfg.edgeAlpha=0.5] {Number} Transparency of ghost edges. A value of 0.0 indicates fully transparent, 1.0 is fully opaque.
 @param [cfg.edgeWidth=1] {Number}  Width of ghost edges, in pixels.
 @param [cfg.backfaces=false] {Boolean} Whether to render {{#crossLink "Geometry"}}Geometry{{/crossLink}} backfaces.
 @param [cfg.preset] {String} Selects a preset EmphasisMaterial configuration - see {{#crossLink "EmphasisMaterial/preset:method"}}EmphasisMaterial#preset(){{/crossLink}}.
 */

import {Material} from './Material.js';
import {RenderState} from '../webgl/RenderState.js';

const PRESETS = {
    "default": {
        fill: true,
        fillColor: [0.4, 0.4, 0.4],
        fillAlpha: 0.2,
        edges: true,
        edgeColor: [0.2, 0.2, 0.2],
        edgeAlpha: 0.5,
        edgeWidth: 1
    },
    "defaultWhiteBG": {
        fill: true,
        fillColor: [1, 1, 1],
        fillAlpha: 0.6,
        edgeColor: [0.2, 0.2, 0.2],
        edgeAlpha: 1.0,
        edgeWidth: 1
    },
    "defaultLightBG": {
        fill: true,
        fillColor: [0.4, 0.4, 0.4],
        fillAlpha: 0.2,
        edges: true,
        edgeColor: [0.2, 0.2, 0.2],
        edgeAlpha: 0.5,
        edgeWidth: 1
    },
    "defaultDarkBG": {
        fill: true,
        fillColor: [0.4, 0.4, 0.4],
        fillAlpha: 0.2,
        edges: true,
        edgeColor: [0.5, 0.5, 0.5],
        edgeAlpha: 0.5,
        edgeWidth: 1
    },
    "phosphorous": {
        fill: true,
        fillColor: [0.0, 0.0, 0.0],
        fillAlpha: 0.4,
        edges: true,
        edgeColor: [0.9, 0.9, 0.9],
        edgeAlpha: 0.5,
        edgeWidth: 2
    },
    "sunset": {
        fill: true,
        fillColor: [0.9, 0.9, 0.6],
        fillAlpha: 0.2,
        edges: true,
        edgeColor: [0.9, 0.9, 0.9],
        edgeAlpha: 0.5,
        edgeWidth: 1
    },
    "vectorscope": {
        fill: true,
        fillColor: [0.0, 0.0, 0.0],
        fillAlpha: 0.7,
        edges: true,
        edgeColor: [0.2, 1.0, 0.2],
        edgeAlpha: 1,
        edgeWidth: 2
    },
    "battlezone": {
        fill: true,
        fillColor: [0.0, 0.0, 0.0],
        fillAlpha: 1.0,
        edges: true,
        edgeColor: [0.2, 1.0, 0.2],
        edgeAlpha: 1,
        edgeWidth: 3
    },
    "sepia": {
        fill: true,
        fillColor: [0.970588207244873, 0.7965892553329468, 0.6660899519920349],
        fillAlpha: 0.4,
        edges: true,
        edgeColor: [0.529411792755127, 0.4577854573726654, 0.4100345969200134],
        edgeAlpha: 1.0,
        edgeWidth: 1
    },
    "yellowHighlight": {
        fill: true,
        fillColor: [1.0, 1.0, 0.0],
        fillAlpha: 0.5,
        edges: true,
        edgeColor: [0.529411792755127, 0.4577854573726654, 0.4100345969200134],
        edgeAlpha: 1.0,
        edgeWidth: 1
    },
    "greenSelected": {
        fill: true,
        fillColor: [0.0, 1.0, 0.0],
        fillAlpha: 0.5,
        edges: true,
        edgeColor: [0.4577854573726654, 0.529411792755127, 0.4100345969200134],
        edgeAlpha: 1.0,
        edgeWidth: 1
    },
    "gamegrid": {
        fill: true,
        fillColor: [0.2, 0.2, 0.7],
        fillAlpha: 0.9,
        edges: true,
        edgeColor: [0.4, 0.4, 1.6],
        edgeAlpha: 0.8,
        edgeWidth: 3
    }
};

class EmphasisMaterial extends Material {

    /**
     JavaScript class name for this Component.

     For example: "AmbientLight", "MetallicMaterial" etc.

     @property type
     @type String
     @final
     */
    get type() {
        return "EmphasisMaterial";
    }

    /**
     Available EmphasisMaterial presets.

     @property presets
     @type {Object}
     @static
     */
    static get presets() {
        return PRESETS;
    };

    init(cfg) {

        super.init(cfg);

        this._state = new RenderState({
            type: "EmphasisMaterial",
            fill: null,
            fillColor: null,
            fillAlpha: null,
            edges: null,
            edgeColor: null,
            edgeAlpha: null,
            edgeWidth: null,
            backfaces: true
        });

        this._preset = "default";

        if (cfg.preset) { // Apply preset then override with configs where provided
            this.preset = cfg.preset;
            if (cfg.fill !== undefined) {
                this.fill = cfg.fill;
            }
            if (cfg.fillColor) {
                this.fillColor = cfg.fillColor;
            }
            if (cfg.fillAlpha !== undefined) {
                this.fillAlpha = cfg.fillAlpha;
            }
            if (cfg.edges !== undefined) {
                this.edges = cfg.edges;
            }
            if (cfg.edgeColor)  {
                this.edgeColor = cfg.edgeColor;
            }
            if (cfg.edgeAlpha !== undefined) {
                this.edgeAlpha = cfg.edgeAlpha;
            }
            if (cfg.edgeWidth !== undefined) {
                this.edgeWidth = cfg.edgeWidth;
            }
            if (cfg.backfaces !== undefined) {
                this.backfaces = cfg.backfaces;
            }
        } else {
            this.fill = cfg.fill;
            this.fillColor = cfg.fillColor;
            this.fillAlpha = cfg.fillAlpha;
            this.edges = cfg.edges;
            this.edgeColor = cfg.edgeColor;
            this.edgeAlpha = cfg.edgeAlpha;
            this.edgeWidth = cfg.edgeWidth;
            this.backfaces = cfg.backfaces;
        }
    }

    /**
     Indicates whether or not ghost surfaces are filled with color.

     @property fill
     @default true
     @type Boolean
     */
    set fill(value) {
        value = value !== false;
        if (this._state.fill === value) {
            return;
        }
        this._state.fill = value;
        this.glRedraw();
    }

    get fill() {
        return this._state.fill;
    }

    /**
     RGB color of filled ghost faces.

     @property fillColor
     @default [0.4, 0.4, 0.4]
     @type Float32Array
     */
    set fillColor(value) {
        let fillColor = this._state.fillColor;
        if (!fillColor) {
            fillColor = this._state.fillColor = new Float32Array(3);
        } else if (value && fillColor[0] === value[0] && fillColor[1] === value[1] && fillColor[2] === value[2]) {
            return;
        }
        if (value) {
            fillColor[0] = value[0];
            fillColor[1] = value[1];
            fillColor[2] = value[2];
        } else {
            fillColor[0] = 0.4;
            fillColor[1] = 0.4;
            fillColor[2] = 0.4;
        }
        this.glRedraw();
    }

    get fillColor() {
        return this._state.fillColor;
    }

    /**
     Transparency of filled ghost faces.

     A value of 0.0 indicates fully transparent, 1.0 is fully opaque.

     @property fillAlpha
     @default 0.2
     @type Number
     */
    set fillAlpha(value) {
        value = (value !== undefined && value !== null) ? value : 0.2;
        if (this._state.fillAlpha === value) {
            return;
        }
        this._state.fillAlpha = value;
        this.glRedraw();
    }

    get fillAlpha() {
        return this._state.fillAlpha;
    }

    /**
     Indicates whether or not ghost edges are visible.

     @property edges
     @default true
     @type Boolean
     */
    set edges(value) {
        value = value !== false;
        if (this._state.edges === value) {
            return;
        }
        this._state.edges = value;
        this.glRedraw();
    }

    get edges() {
        return this._state.edges;
    }

    /**
     RGB color of ghost edges.

     @property edgeColor
     @default [0.2, 0.2, 0.2]
     @type Float32Array
     */
    set edgeColor(value) {
        let edgeColor = this._state.edgeColor;
        if (!edgeColor) {
            edgeColor = this._state.edgeColor = new Float32Array(3);
        } else if (value && edgeColor[0] === value[0] && edgeColor[1] === value[1] && edgeColor[2] === value[2]) {
            return;
        }
        if (value) {
            edgeColor[0] = value[0];
            edgeColor[1] = value[1];
            edgeColor[2] = value[2];
        } else {
            edgeColor[0] = 0.2;
            edgeColor[1] = 0.2;
            edgeColor[2] = 0.2;
        }
        this.glRedraw();
    }

    get edgeColor() {
        return this._state.edgeColor;
    }

    /**
     Transparency of ghost edges.

     A value of 0.0 indicates fully transparent, 1.0 is fully opaque.

     @property edgeAlpha
     @default 0.5
     @type Number
     */
    set edgeAlpha(value) {
        value = (value !== undefined && value !== null) ? value : 0.5;
        if (this._state.edgeAlpha === value) {
            return;
        }
        this._state.edgeAlpha = value;
        this.glRedraw();
    }

    get edgeAlpha() {
        return this._state.edgeAlpha;
    }

    /**
     Width of ghost edges, in pixels.

     @property edgeWidth
     @default 1.0
     @type Number
     */
    set edgeWidth(value) {
        this._state.edgeWidth = value || 1.0;
        this.glRedraw();
    }

    get edgeWidth() {
        return this._state.edgeWidth;
    }

    /**
     Whether backfaces are visible on attached {{#crossLink "Mesh"}}Meshes{{/crossLink}}.

     The backfaces will belong to {{#crossLink "Geometry"}}{{/crossLink}} components that are also attached to
     the {{#crossLink "Mesh"}}Meshes{{/crossLink}}.

     @property backfaces
     @default false
     @type Boolean
     */
    set backfaces(value) {
        value = !!value;
        if (this._state.backfaces === value) {
            return;
        }
        this._state.backfaces = value;
        this.glRedraw();
    }

    get backfaces() {
        return this._state.backfaces;
    }

    /**
     Selects a preset EmphasisMaterial configuration.

     Available presets are:

     * "default" - grey wireframe with translucent fill, for light backgrounds.
     * "defaultLightBG" - grey wireframe with grey translucent fill, for light backgrounds.
     * "defaultDarkBG" - grey wireframe with grey translucent fill, for dark backgrounds.
     * "vectorscope" - green wireframe and black translucent fill.
     * "battlezone" - green wireframe with black opaque fill, giving a solid hidden-lines-removed effect.
     * "sepia" - light red-grey wireframe with light sepia translucent fill - easy on the eyes.
     * "gamegrid" - light blue wireframe with dark blue translucent fill - reminiscent of Tron.
     * "yellowHighlight" - light yellow translucent fill - highlights while allowing underlying detail to show through.

     @property preset
     @default "default"
     @type String
     */
    set preset(value) {
        value = value || "default";
        if (this._preset === value) {
            return;
        }
        const preset = PRESETS[value];
        if (!preset) {
            this.error("unsupported preset: '" + value + "' - supported values are " + Object.keys(PRESETS).join(", "));
            return;
        }
        this.fill = preset.fill;
        this.fillColor = preset.fillColor;
        this.fillAlpha = preset.fillAlpha;
        this.edges = preset.edges;
        this.edgeColor = preset.edgeColor;
        this.edgeAlpha = preset.edgeAlpha;
        this.edgeWidth = preset.edgeWidth;
        this._preset = value;
    }

    get preset() {
        return this._preset;
    }

    destroy() {
        super.destroy();
        this._state.destroy();
    }
}

export {EmphasisMaterial};