# 3D Force-Directed Graph in VR

[![NPM](https://nodei.co/npm/3d-force-graph-vr.png?compact=true)](https://nodei.co/npm/3d-force-graph-vr/)

<p align="center">
     <a href="https://bl.ocks.org/vasturiano/972ca4f3e8e074dacf14d7071aad8ef9"><img width="80%" src="http://gist.github.com/vasturiano/972ca4f3e8e074dacf14d7071aad8ef9/raw/preview.png"></a>
</p>

A web component to represent a graph data structure in virtual reality using a force-directed iterative layout.
Uses [A-Frame](https://aframe.io/) for VR rendering and [d3-force-3d](https://github.com/vasturiano/d3-force-3d) for the layout physics engine.

See also the [WebGL 3D version](https://github.com/vasturiano/3d-force-graph), and the [A-Frame component version (aframe-forcegraph-component)](https://github.com/vasturiano/aframe-forcegraph-component).

Live example: https://bl.ocks.org/vasturiano/972ca4f3e8e074dacf14d7071aad8ef9

## Quick start

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
| <b>graphData</b>([<i>data</i>]) | Getter/setter for graph data structure (see below for syntax details) | { nodes: [], links: [] } |
| <b>jsonUrl</b>([<i>url</i>]) | URL of JSON file to load graph data directly from, as an alternative to specifying <i>graphData</i> directly ||
| <b>numDimensions</b>([<i>int</i>]) | Getter/setter for number of dimensions to run the force simulation on (1, 2 or 3) | 3 |
| <b>nodeRelSize</b>([<i>num</i>]) | Getter/setter for the ratio of node sphere volume (cubic px) per value unit | 4 |
| <b>lineOpacity</b>([<i>num</i>]) | Getter/setter for line opacity of links, between [0,1] | 0.2 |
| <b>autoColorBy</b>([<i>str</i>]) | Node object accessor attribute to automatically group colors by, only affects nodes without a color attribute ||
| <b>idField</b>([<i>str</i>]) | Node object accessor attribute for unique node id (used in link objects source/target) | id |
| <b>valField</b>([<i>str</i>]) | Node object accessor attribute for node numeric value (affects sphere volume) | val |
| <b>nameField</b>([<i>str</i>]) | Node object accessor attribute for name (shown in label) | name |
| <b>colorField</b>([<i>str</i>]) | Node object accessor attribute for node color (affects sphere color) | color |
| <b>linkSourceField</b>([<i>str</i>]) | Link object accessor attribute referring to id of source node | source |
| <b>linkTargetField</b>([<i>str</i>]) | Link object accessor attribute referring to id of target node | target |
| <b>forceEngine</b>([<i>str</i>]) | Getter/setter for which force-simulation engine to use ([*d3*](https://github.com/vasturiano/d3-force-3d) or [*ngraph*](https://github.com/anvaka/ngraph.forcelayout)) | d3 |
| <b>warmupTicks</b>([<i>int</i>]) | Getter/setter for number of layout engine cycles to dry-run at ignition before starting to render | 0 |
| <b>cooldownTicks</b>([<i>int</i>]) | Getter/setter for how many build-in frames to render before stopping and freezing the layout engine | Infinity |
| <b>cooldownTime</b>([<i>num</i>]) | Getter/setter for how long (ms) to render for before stopping and freezing the layout engine | 15000 |
| <b>resetProps() | Reset all component properties to their default value ||

### Input JSON syntax

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

## Local development

```
npm install
npm run watch
```
