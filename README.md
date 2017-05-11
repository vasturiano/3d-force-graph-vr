# 3D Force-Directed Graph in VR

<p align="center">
     <a href="https://bl.ocks.org/vasturiano/972ca4f3e8e074dacf14d7071aad8ef9"><img width="80%" src="http://gist.github.com/vasturiano/972ca4f3e8e074dacf14d7071aad8ef9/raw/preview.png"></a>
</p>

A web component to represent a graph data structure in virtual reality using a force-directed iterative layout.
Uses [A-Frame](https://aframe.io/) for VR rendering and [d3-force-3d](https://github.com/vasturiano/d3-force-3d) for the layout physics engine.

See also the [WebGL 3D version](https://github.com/vasturiano/3d-force-graph), and the [A-Frame component version (aframe-forcegraph-component)](https://github.com/vasturiano/aframe-forcegraph-component).

Live example: https://bl.ocks.org/vasturiano/972ca4f3e8e074dacf14d7071aad8ef9

[![NPM](https://nodei.co/npm/3d-force-graph-vr.png?compact=true)](https://nodei.co/npm/3d-force-graph-vr/)

## Quick start

```
npm install
npm run build
```

### How to instantiate

```
import { default as ForceGraphVR } from '3d-force-graph-vr';
```
or
```
var ForceGraphVR = require('3d-force-graph-vr');
```
or even
```
<script src="//unpkg.com/3d-force-graph-vr/dist/3d-force-graph-vr.min.js"></script>
```
then
```
var myGraph = ForceGraphVR();
myGraph(<myDOMElement>)
    .graphData(<myData>);
```

## API reference

| Method | Description | Default |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------- | ------------- |
| <b>jsonUrl</b>([<i>url</i>]) | URL of JSON file to load graph data directly from, as an alternative to specifying graphData directly ||
| <b>graphData</b>([<i>data</i>]) | Getter/setter for graph data structure (see below for syntax details) | { nodes: [], links: [] } |
| <b>numDimensions</b>([<i>int</i>]) | Getter/setter for number of dimensions to run the force simulation, between [1,3] | 3 |
| <b>nodeRelSize</b>([<i>num</i>]) | Getter/setter for ratio of the node sphere volume (cubic px) per value unit | 4 |
| <b>lineOpacity</b>([<i>num</i>]) | Getter/setter for line opacity of links, between [0,1] | 0.2 |
| <b>autoColorBy</b>([<i>str</i>]) | Node object accessor attribute to automatically color group nodes by, only affects nodes without a color field ||
| <b>idField</b>([<i>str</i>]) | Node object accessor attribute for node id | id |
| <b>valField</b>([<i>str</i>]) | Node object accessor attribute for node numeric value (translates to sphere volume) | val |
| <b>nameField</b>([<i>str</i>]) | Node object accessor attribute for node name used in label | name |
| <b>colorField</b>([<i>str</i>]) | Node object accessor attribute for node color | color |
| <b>linkSourceField</b>([<i>str</i>]) | Link object accessor attribute for source node id | source |
| <b>linkTargetField</b>([<i>str</i>]) | Link object accessor attribute for target node id | target |
| <b>forceEngine</b>([<i>str</i>]) | Getter/setter for which force-simulation engine to use: 'd3' or 'ngraph' | d3 |
| <b>warmupTicks</b>([<i>int</i>]) | Getter/setter for the number of layout engine cycles to dry-run before start rendering | 0 |
| <b>cooldownTicks</b>([<i>int</i>]) | Getter/setter for how many build-in frames to render before stopping the layout engine iteration | Infinity |
| <b>cooldownTime</b>([<i>num</i>]) | Getter/setter for how long (ms) to render before stopping the layout engine iteration | 15000 |
| <b>resetProps() | Reset all component properties to their default value ||

## Input JSON syntax

```
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
        (...)
    ],
    "links": [
        {
            "source": "id1",
            "target": "id2"
        },
        (...)
    ]
}
```