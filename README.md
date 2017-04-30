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
<script src="//unpkg.com/3d-force-graph-vr/dist/3d-force-graph-vr.js"></script>
```
then
```
var myGraph = ForceGraphVR();
myGraph(<myDOMElement>);
```

## API reference

```
ForceGraphVR()
     .jsonUrl(<URL of JSON file to load graph data directly from, as an alternative to specifying graphData directly>)
     .graphData(<data>)
     .numDimensions(<number of dimensions, between [1,3]. default: 3>)
     .nodeRelSize(<(number) node volume per value unit>)
     .lineOpacity(<between [0,1]>)
     .autoColorBy(<node object accessor property name, only affects nodes without a color field>)
     .idField(<node object accessor property name. default: 'id'>)
     .valField(<node object accessor property name. default: 'val'>)
     .nameField(<node object accessor property name. default: 'name'>)
     .colorField(<node object accessor property name. default: 'color'>)
     .linkSourceField(<link object accessor property name. default: 'source'>)
     .linkTargetField(<link object accessor property name. default: 'target'>)
     .forceEngine(<which force-simulation engine to use: 'd3' (default) or 'ngraph'>)
     .warmupTicks(<number of layout engine cycles to run before start rendering. default: 0>)
     .cooldownTicks(<# frames to stop engine. default: Infinity>)
     .cooldownTime(<ms to stop engine. default: 15000>)
     .resetProps()
```

## Data syntax

```
{
    nodes: [ 
        { 
          id: 'id1',
          name: "name1",
          val: 1 
        },
        { 
          id: 'id2',
          name: "name2",
          val: 10 
        },
        (...)
    ],
    links: [
        {
            source: 'id1',
            target: 'id2'
        },
        (...)
    ]
}
```
