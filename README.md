# 3D Force-Directed Graph in VR

<p align="center">
     <a href="https://bl.ocks.org/vasturiano/972ca4f3e8e074dacf14d7071aad8ef9"><img width="80%" src="http://gist.github.com/vasturiano/972ca4f3e8e074dacf14d7071aad8ef9/raw/preview.png"></a>
</p>

A web component to represent a graph data structure in virtual reality using a force-directed iterative layout.
Uses [A-Frame](https://aframe.io/) for VR rendering and [d3-force-3d](https://github.com/vasturiano/d3-force-3d) for the layout physics engine.

See also the [WebGL 3D version](https://github.com/vasturiano/3d-force-graph).

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
<script src="/path/to/dist/3d-force-graph-vr.js"></script>
```
then
```
var myGraph = ForceGraphVR();
myGraph(<myDOMElement>);
```

## API reference

```
ForceGraphVR()
     .width(<px>)
     .height(<px>)
     .graphData(<data>)
     .nodeRelSize(<(number) node volume per value unit>)
     .lineOpacity(<between [0,1]>)
     .valAccessor(<function(node) to extract numeric value. default: node.val>)
     .nameAccessor(<function(node) to extract name string. default: node.name>)
     .colorAccessor(<function(node) to extract color hex number. default: node.color>)
     .warmUpTicks(<number of layout engine cycles to run before start rendering. default: 0>)
     .coolDownTicks(<# frames to stop engine. default: Infinity>)
     .coolDownTime(<ms to stop engine. default: 15000>)
     .resetState()
```

## Data syntax

```
{
    nodes: { 
        id1: { 
          name: "name1",
          val: 1 
        },
        id2: { 
          name: "name2",
          val: 10 
        },
        (...)
    },
    links: [
        ['id1', 'id2'], // [from, to]
        (...)
    ]
}
```