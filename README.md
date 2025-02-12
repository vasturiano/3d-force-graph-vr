3D Force-Directed Graph in VR
========

[![NPM package][npm-img]][npm-url]
[![Build Size][build-size-img]][build-size-url]
[![NPM Downloads][npm-downloads-img]][npm-downloads-url]

<p align="center">
     <a href="https://vasturiano.github.io/3d-force-graph-vr/example/large-graph/"><img width="80%" src="https://vasturiano.github.io/3d-force-graph-vr/example/preview.png"></a>
</p>

A web component to represent a graph data structure in virtual reality using a force-directed iterative layout.
Uses [A-Frame](https://aframe.io/) for VR rendering and [d3-force-3d](https://github.com/vasturiano/d3-force-3d) for the layout physics engine.

See also the [AR version](https://github.com/vasturiano/3d-force-graph-ar), [WebGL 3D version](https://github.com/vasturiano/3d-force-graph), and the [A-Frame component version (aframe-forcegraph-component)](https://github.com/vasturiano/aframe-forcegraph-component).

And check out the [React bindings](https://github.com/vasturiano/react-force-graph).

## Examples

* [Basic](https://vasturiano.github.io/3d-force-graph-vr/example/basic/) ([source](https://github.com/vasturiano/3d-force-graph-vr/blob/master/example/basic/index.html))
* [Asynchronous load](https://vasturiano.github.io/3d-force-graph-vr/example/async-load/) ([source](https://github.com/vasturiano/3d-force-graph-vr/blob/master/example/async-load/index.html))
* [Larger graph (~4k elements)](https://vasturiano.github.io/3d-force-graph-vr/example/large-graph/) ([source](https://github.com/vasturiano/3d-force-graph-vr/blob/master/example/large-graph/index.html))
* [Directional arrows](https://vasturiano.github.io/3d-force-graph-vr/example/directional-links-arrows/) ([source](https://github.com/vasturiano/3d-force-graph-vr/blob/master/example/directional-links-arrows/index.html))
* [Directional moving particles](https://vasturiano.github.io/3d-force-graph-vr/example/directional-links-particles/) ([source](https://github.com/vasturiano/3d-force-graph-vr/blob/master/example/directional-links-particles/index.html))
* [Curved lines and self links](https://vasturiano.github.io/3d-force-graph-vr/example/curved-links/) ([source](https://github.com/vasturiano/3d-force-graph-vr/blob/master/example/curved-links/index.html))
* [Auto-colored nodes/links](https://vasturiano.github.io/3d-force-graph-vr/example/auto-colored/) ([source](https://github.com/vasturiano/3d-force-graph-vr/blob/master/example/auto-colored/index.html))
* [Text as nodes](https://vasturiano.github.io/3d-force-graph-vr/example/text-nodes/) ([source](https://github.com/vasturiano/3d-force-graph-vr/blob/master/example/text-nodes/index.html))
* [Images as nodes](https://vasturiano.github.io/3d-force-graph-vr/example/img-nodes/) ([source](https://github.com/vasturiano/3d-force-graph-vr/blob/master/example/img-nodes/index.html))
* [Custom node geometries](https://vasturiano.github.io/3d-force-graph-vr/example/custom-node-geometry/) ([source](https://github.com/vasturiano/3d-force-graph-vr/blob/master/example/custom-node-geometry/index.html))
* [Text in links](https://vasturiano.github.io/3d-force-graph-vr/example/text-links/) ([source](https://github.com/vasturiano/3d-force-graph-vr/blob/master/example/text-links/index.html))
* [Dynamic data changes](https://vasturiano.github.io/3d-force-graph-vr/example/updating/) ([source](https://github.com/vasturiano/3d-force-graph-vr/blob/master/example/updating/index.html))
* [Node collision detection](https://vasturiano.github.io/3d-force-graph-vr/example/collision-detection/) ([source](https://github.com/vasturiano/3d-force-graph-vr/blob/master/example/collision-detection/index.html))
* [Emit link particles on demand](https://vasturiano.github.io/3d-force-graph-vr/example/emit-particles/) ([source](https://github.com/vasturiano/3d-force-graph-vr/blob/master/example/emit-particles/index.html))

## Quick start

```js
import ForceGraphVR from '3d-force-graph-vr';
```
or using a *script* tag
```html
<script src="//unpkg.com/3d-force-graph-vr"></script>
```
then
```js
const myGraph = new ForceGraphVR(myDOMElement)
  .graphData(myData);
```

Make sure to load this script tag in your application, required for `A-frame` to function properly:
```html
<script src="//unpkg.com/aframe"></script>
```

## API reference

### Data input

| Method | Description | Default |
| --- | --- | :--: |
| <b>graphData</b>([<i>data</i>]) | Getter/setter for graph data structure (see below for syntax details). | `{ nodes: [], links: [] }` |
| <b>jsonUrl</b>([<i>url</i>]) | URL of JSON file to load graph data directly from, as an alternative to specifying <i>graphData</i> directly. | |
| <b>nodeId</b>([<i>str</i>]) | Node object accessor attribute for unique node id (used in link objects source/target). | `id` |
| <b>linkSource</b>([<i>str</i>]) | Link object accessor attribute referring to id of source node. | `source` |
| <b>linkTarget</b>([<i>str</i>]) | Link object accessor attribute referring to id of target node. | `target` |

### Container layout

| Method | Description | Default |
| --- | --- | :--: |
| <b>width</b>([<i>px</i>]) | Getter/setter for the canvas width. | *&lt;window width&gt;* |
| <b>height</b>([<i>px</i>]) | Getter/setter for the canvas height. | *&lt;window height&gt;* |
| <b>backgroundColor</b>([<i>str</i>]) | Getter/setter for the chart background color. | `#000011` |
| <b>showNavInfo</b>([<i>boolean</i>]) | Getter/setter for whether to show the navigation controls footer info. | `true` |

### Node styling

| Method | Description | Default |
| --- | --- | :--: |
| <b>nodeRelSize</b>([<i>num</i>]) | Getter/setter for the ratio of node sphere volume (cubic px) per value unit. | 4 |
| <b>nodeVal</b>([<i>num</i>, <i>str</i> or <i>fn</i>]) | Node object accessor function, attribute or a numeric constant for the node numeric value (affects sphere volume). | `val` |
| <b>nodeLabel</b>([<i>str</i> or <i>fn</i>]) | Node object accessor function or attribute for name (shown in label). | `name` |
| <b>nodeDesc</b>([<i>str</i> or <i>fn</i>]) | Node object accessor function or attribute for description (shown under label). | `desc` |
| <b>nodeVisibility</b>([<i>boolean</i>, <i>str</i> or <i>fn</i>]) | Node object accessor function, attribute or a boolean constant for whether to display the node. | `true` |
| <b>nodeColor</b>([<i>str</i> or <i>fn</i>]) | Node object accessor function or attribute for node color (affects sphere color). | `color` |
| <b>nodeAutoColorBy</b>([<i>str</i> or <i>fn</i>]) | Node object accessor function (`fn(node)`) or attribute (e.g. `'type'`) to automatically group colors by. Only affects nodes without a color attribute. | |
| <b>nodeOpacity</b>([<i>num</i>]) | Getter/setter for the nodes sphere opacity, between [0,1]. | 0.75 |
| <b>nodeResolution</b>([<i>num</i>]) | Getter/setter for the geometric resolution of each node, expressed in how many slice segments to divide the circumference. Higher values yield smoother spheres. | 8 |
| <b>nodeThreeObject</b>([<i>Object3d</i>, <i>str</i> or <i>fn</i>]) | Node object accessor function or attribute for generating a custom 3d object to render as graph nodes. Should return an instance of [ThreeJS Object3d](https://threejs.org/docs/index.html#api/core/Object3D). If a <i>falsy</i> value is returned, the default 3d object type will be used instead for that node.  | *default node object is a sphere, sized according to `val` and styled according to `color`.* |
| <b>nodeThreeObjectExtend</b>([<i>bool</i>, <i>str</i> or <i>fn</i>]) | Node object accessor function, attribute or a boolean value for whether to replace the default node when using a custom `nodeThreeObject` (`false`) or to extend it (`true`).  | `false` |

### Link styling

| Method | Description | Default |
| --- | --- | :--: |
| <b>linkLabel</b>([<i>str</i> or <i>fn</i>]) | Link object accessor function or attribute for name (shown in label). | `name` |                                                     | name          |
| <b>linkDesc</b>([<i>str</i> or <i>fn</i>]) | Link object accessor function or attribute for description (shown under label). | `desc` |
| <b>linkVisibility</b>([<i>boolean</i>, <i>str</i> or <i>fn</i>]) | Link object accessor function, attribute or a boolean constant for whether to display the link line. A value of `false` maintains the link force without rendering it. | `true` |
| <b>linkColor</b>([<i>str</i> or <i>fn</i>]) | Link object accessor function or attribute for line color. | `color` |
| <b>linkAutoColorBy</b>([<i>str</i> or <i>fn</i>]) | Link object accessor function (`fn(link)`) or attribute (e.g. `'type'`) to automatically group colors by. Only affects links without a color attribute. | |
| <b>linkOpacity</b>([<i>num</i>]) | Getter/setter for line opacity of links, between [0,1]. | 0.2 |
| <b>linkWidth</b>([<i>num</i>, <i>str</i> or <i>fn</i>]) | Link object accessor function, attribute or a numeric constant for the link line width. A value of zero will render a [ThreeJS Line](https://threejs.org/docs/#api/objects/Line) whose width is constant (`1px`) regardless of distance. Values are rounded to the nearest decimal for indexing purposes. | 0 |
| <b>linkResolution</b>([<i>num</i>]) | Getter/setter for the geometric resolution of each link, expressed in how many radial segments to divide the cylinder. Higher values yield smoother cylinders. Applicable only to links with positive width. | 6 |
| <b>linkCurvature</b>([<i>num</i>, <i>str</i> or <i>fn</i>]) | Link object accessor function, attribute or a numeric constant for the curvature radius of the link line. Curved lines are represented as 3D bezier curves, and any numeric value is accepted. A value of `0` renders a straight line. `1` indicates a radius equal to half of the line length, causing the curve to approximate a semi-circle. For self-referencing links (`source` equal to `target`) the curve is represented as a loop around the node, with length proportional to the curvature value. Lines are curved clockwise for positive values, and counter-clockwise for negative values. Note that rendering curved lines is purely a visual effect and does not affect the behavior of the underlying forces. | 0 |
| <b>linkCurveRotation</b>([<i>num</i>, <i>str</i> or <i>fn</i>]) | Link object accessor function, attribute or a numeric constant for the rotation along the line axis to apply to the curve. Has no effect on straight lines. At `0` rotation, the curve is oriented in the direction of the intersection with the `XY` plane. The rotation angle (in radians) will rotate the curved line clockwise around the "start-to-end" axis from this reference orientation. | 0 |
| <b>linkMaterial</b>([<i>Material</i>, <i>str</i> or <i>fn</i>]) | Link object accessor function or attribute for specifying a custom material to style the graph links with. Should return an instance of [ThreeJS Material](https://threejs.org/docs/#api/materials/Material). If a <i>falsy</i> value is returned, the default material will be used instead for that link. | *default link material is [MeshLambertMaterial](https://threejs.org/docs/#api/materials/MeshLambertMaterial) styled according to `color` and `opacity`.* |
| <b>linkThreeObject</b>([<i>Object3d</i>, <i>str</i> or <i>fn</i>]) | Link object accessor function or attribute for generating a custom 3d object to render as graph links. Should return an instance of [ThreeJS Object3d](https://threejs.org/docs/index.html#api/core/Object3D). If a <i>falsy</i> value is returned, the default 3d object type will be used instead for that link.  | *default link object is a line or cylinder, sized according to `width` and styled according to `material`.* |
| <b>linkThreeObjectExtend</b>([<i>bool</i>, <i>str</i> or <i>fn</i>]) | Link object accessor function, attribute or a boolean value for whether to replace the default link when using a custom `linkThreeObject` (`false`) or to extend it (`true`).  | `false` |
| <b>linkPositionUpdate</b>([<i>fn(linkObject, { start, end }, link)</i>]) | Getter/setter for the custom function to call for updating the position of links at every render iteration. It receives the respective link `ThreeJS Object3d`, the `start` and `end` coordinates of the link (`{x,y,z}` each), and the link's `data`. If the function returns a truthy value, the regular position update function will not run for that link. | |
| <b>linkDirectionalArrowLength</b>([<i>num</i>, <i>str</i> or <i>fn</i>]) | Link object accessor function, attribute or a numeric constant for the length of the arrow head indicating the link directionality. The arrow is displayed directly over the link line, and points in the direction of `source` > `target`. A value of `0` hides the arrow. | 0 |
| <b>linkDirectionalArrowColor</b>([<i>str</i> or <i>fn</i>]) | Link object accessor function or attribute for the color of the arrow head. | `color` |
| <b>linkDirectionalArrowRelPos</b>([<i>num</i>, <i>str</i> or <i>fn</i>]) | Link object accessor function, attribute or a numeric constant for the longitudinal position of the arrow head along the link line, expressed as a ratio between `0` and `1`, where `0` indicates immediately next to the `source` node, `1` next to the `target` node, and `0.5` right in the middle. | 0.5 |
| <b>linkDirectionalArrowResolution</b>([<i>num</i>]) | Getter/setter for the geometric resolution of the arrow head, expressed in how many slice segments to divide the cone base circumference. Higher values yield smoother arrows. | 8 |
| <b>linkDirectionalParticles</b>([<i>num</i>, <i>str</i> or <i>fn</i>]) | Link object accessor function, attribute or a numeric constant for the number of particles (small spheres) to display over the link line. The particles are distributed equi-spaced along the line, travel in the direction `source` > `target`, and can be used to indicate link directionality. | 0 |
| <b>linkDirectionalParticleSpeed</b>([<i>num</i>, <i>str</i> or <i>fn</i>]) | Link object accessor function, attribute or a numeric constant for the directional particles speed, expressed as the ratio of the link length to travel per frame. Values above `0.5` are discouraged. | 0.01 |
| <b>linkDirectionalParticleWidth</b>([<i>num</i>, <i>str</i> or <i>fn</i>]) | Link object accessor function, attribute or a numeric constant for the directional particles width. Values are rounded to the nearest decimal for indexing purposes. | 0.5 |
| <b>linkDirectionalParticleColor</b>([<i>str</i> or <i>fn</i>]) | Link object accessor function or attribute for the directional particles color. | `color` |
| <b>linkDirectionalParticleResolution</b>([<i>num</i>]) | Getter/setter for the geometric resolution of each directional particle, expressed in how many slice segments to divide the circumference. Higher values yield smoother particles. | 4 |
| <b>emitParticle</b>(<i>link</i>) | An alternative mechanism for generating particles, this method emits a non-cyclical single particle within a specific link. The emitted particle shares the styling (speed, width, color) of the regular particle props. A valid `link` object that is included in `graphData` should be passed as a single parameter. ||

### Interaction

| Method | Description | Default |
| --- | --- | :--: |
| <b>onNodeHover</b>([<i>fn</i>]) | Callback function for node hover events. The node object (or `null` if there's no node directly under the pointer line of sight) is included as the first argument, and the previous node object (or `null`) as second argument. | - |
| <b>onLinkHover</b>([<i>fn</i>]) | Callback function for link hover events. The link object (or `null` if there's no link directly under the pointer line of sight) is included as the first argument, and the previous link object (or `null`) as second argument. | - |
| <b>onNodeClick</b>([<i>fn</i>]) | Callback function for node click events. The node object is included as sole argument. | - |
| <b>onLinkClick</b>([<i>fn</i>]) | Callback function for link click events. The link object is included as sole argument. | - |

### Force engine configuration

| Method | Description | Default |
| --- | --- | :--: |
| <b>forceEngine</b>([<i>str</i>]) | Getter/setter for which force-simulation engine to use ([*d3*](https://github.com/vasturiano/d3-force-3d) or [*ngraph*](https://github.com/anvaka/ngraph.forcelayout)). | `d3` |
| <b>numDimensions</b>([<i>int</i>]) | Getter/setter for number of dimensions to run the force simulation on (1, 2 or 3). | 3 |
| <b>dagMode</b>([<i>str</i>]) | Apply layout constraints based on the graph directionality. Only works correctly for [DAG](https://en.wikipedia.org/wiki/Directed_acyclic_graph) graph structures (without cycles). Choice between `td` (top-down), `bu` (bottom-up), `lr` (left-to-right), `rl` (right-to-left), `zout` (near-to-far), `zin` (far-to-near), `radialout` (outwards-radially) or `radialin` (inwards-radially). | |
| <b>dagLevelDistance</b>([<i>num</i>]) | If `dagMode` is engaged, this specifies the distance between the different graph depths. | *auto-derived from the number of nodes* |
| <b>dagNodeFilter</b>([<i>fn</i>]) | Node accessor function to specify nodes to ignore during the DAG layout processing. This accessor method receives a node object and should return a `boolean` value indicating whether the node is to be included. Excluded nodes will be left unconstrained and free to move in any direction. | `node => true` |
| <b>onDagError</b>([<i>fn</i>]) | Callback to invoke if a cycle is encountered while processing the data structure for a DAG layout. The loop segment of the graph is included for information, as an array of node ids. By default an exception will be thrown whenever a loop is encountered. You can override this method to handle this case externally and allow the graph to continue the DAG processing. Strict graph directionality is not guaranteed if a loop is encountered and the result is a best effort to establish a hierarchy. | *throws exception* |
| <b>d3AlphaMin</b>([<i>num</i>]) | Getter/setter for the [simulation alpha min](https://github.com/vasturiano/d3-force-3d#simulation_alphaMin) parameter, only applicable if using the d3 simulation engine. | `0` |
| <b>d3AlphaDecay</b>([<i>num</i>]) | Getter/setter for the [simulation intensity decay](https://github.com/vasturiano/d3-force-3d#simulation_alphaDecay) parameter, only applicable if using the d3 simulation engine. | `0.0228` |
| <b>d3VelocityDecay</b>([<i>num</i>]) | Getter/setter for the nodes' [velocity decay](https://github.com/vasturiano/d3-force-3d#simulation_velocityDecay) that simulates the medium resistance, only applicable if using the d3 simulation engine. | `0.4` |
| <b>d3Force</b>(<i>str</i>, [<i>fn</i>]) | Getter/setter for the internal forces that control the d3 simulation engine. Follows the same interface as `d3-force-3d`'s [simulation.force](https://github.com/vasturiano/d3-force-3d#simulation_force). Three forces are included by default: `'link'` (based on [forceLink](https://github.com/vasturiano/d3-force-3d#forceLink)), `'charge'` (based on [forceManyBody](https://github.com/vasturiano/d3-force-3d#forceManyBody)) and `'center'` (based on [forceCenter](https://github.com/vasturiano/d3-force-3d#forceCenter)). Each of these forces can be reconfigured, or new forces can be added to the system. This method is only applicable if using the d3 simulation engine. | |
| <b>d3ReheatSimulation</b>() | Reheats the force simulation engine, by setting the `alpha` value to `1`. Only applicable if using the d3 simulation engine. | |
| <b>ngraphPhysics</b>([<i>object</i>]) | Specify custom physics configuration for ngraph, according to its [configuration object](https://github.com/anvaka/ngraph.forcelayout#configuring-physics) syntax. This method is only applicable if using the ngraph simulation engine. | *ngraph default* |
| <b>warmupTicks</b>([<i>int</i>]) | Getter/setter for number of layout engine cycles to dry-run at ignition before starting to render. | 0 |
| <b>cooldownTicks</b>([<i>int</i>]) | Getter/setter for how many build-in frames to render before stopping and freezing the layout engine. | Infinity |
| <b>cooldownTime</b>([<i>num</i>]) | Getter/setter for how long (ms) to render for before stopping and freezing the layout engine. | 15000 |
| <b>onEngineTick</b>(<i>fn</i>) | Callback function invoked at every tick of the simulation engine. | - |
| <b>onEngineStop</b>(<i>fn</i>) | Callback function invoked when the simulation engine stops and the layout is frozen. | - |
| <b>refresh</b>() | Redraws all the nodes/links. |

### Utility

| Method | Description |
| --- | --- |
| <b>getGraphBbox</b>([<i>nodeFilterFn</i>]) | Returns the current bounding box of the nodes in the graph, formatted as `{ x: [<num>, <num>], y: [<num>, <num>], z: [<num>, <num>] }`. If no nodes are found, returns `null`. Accepts an optional argument to define a custom node filter: `node => <boolean>`, which should return a truthy value if the node is to be included. This can be useful to calculate the bounding box of a portion of the graph. |

### Input JSON syntax
```json
{
    "nodes": [ 
        { 
          "id": "id1",
          "name": "name1",
          "val": 1 
        },
        { 
          "id": "id2",
          "name": "name2",
          "val": 10 
        },
        ...
    ],
    "links": [
        {
            "source": "id1",
            "target": "id2"
        },
        ...
    ]
}
```

## Giving Back

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=L398E7PKP47E8&currency_code=USD&source=url) If this project has helped you and you'd like to contribute back, you can always [buy me a ☕](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=L398E7PKP47E8&currency_code=USD&source=url)!

[npm-img]: https://img.shields.io/npm/v/3d-force-graph-vr
[npm-url]: https://npmjs.org/package/3d-force-graph-vr
[build-size-img]: https://img.shields.io/bundlephobia/minzip/3d-force-graph-vr
[build-size-url]: https://bundlephobia.com/result?p=3d-force-graph-vr
[npm-downloads-img]: https://img.shields.io/npm/dt/3d-force-graph-vr
[npm-downloads-url]: https://www.npmtrends.com/3d-force-graph-vr
