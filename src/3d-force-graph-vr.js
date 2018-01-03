import 'aframe';
import 'aframe-forcegraph-component';

import GamepadControls from 'aframe-gamepad-controls';
AFRAME.registerComponent('gamepad-controls', GamepadControls);

import Kapsule from 'kapsule';

//

export default Kapsule({

  props: {
    jsonUrl: {},
    graphData: { default: { nodes: [], links: [] }},
    numDimensions: { default: 3 },
    backgroundColor: { default: '#002' },
    nodeRelSize: { default: 4 }, // volume per val unit
    autoColorBy: {},
    nodeId: { default: 'id' },
    nodeLabel: { default: 'name' },
    nodeDesc: { default: 'desc' },
    nodeVal: { default: 'val' },
    nodeResolution: { default: 8 }, // how many slice segments in the sphere's circumference
    nodeColor: { default: 'color' },
    nodeThreeObject: {},
    linkSource: { default: 'source' },
    linkTarget: { default: 'target' },
    linkLabel: { default: 'name' },
    linkHoverPrecision: { default: 2 },
    linkColor: { default: 'color' },
    linkOpacity: { default: 0.2 },
    forceEngine: { default: 'd3' }, // d3 or ngraph
    d3AlphaDecay: { default: 0.0228 },
    d3VelocityDecay: { default: 0.4 },
    warmupTicks: { default: 0 }, // how many times to tick the force engine at init before starting to render
    cooldownTicks: {},
    cooldownTime: { default: 15000 } // ms
  },

  aliases: { // Prop names supported for backwards compatibility
    nameField: 'nodeLabel',
    idField: 'nodeId',
    valField: 'nodeVal',
    colorField: 'nodeColor',
    linkSourceField: 'linkSource',
    linkTargetField: 'linkTarget',
    linkColorField: 'linkColor',
    lineOpacity: 'linkOpacity'
  },

  init(domNode, state) {
    // Wipe DOM
    domNode.innerHTML = '';

    // Add nav info section
    let navInfo;
    domNode.appendChild(navInfo = document.createElement('div'));
    navInfo.className = 'graph-nav-info';
    navInfo.textContent = 'Mouse drag: look, gamepad/arrow/wasd keys: move';

    // Add scene
    let scene;
    domNode.appendChild(scene = document.createElement('a-scene'));
    //scene.setAttribute('stats', null);

    scene.appendChild(state.sky = document.createElement('a-sky'));

    // Add camera and cursor
    let cameraG;
    scene.appendChild(cameraG = document.createElement('a-entity'));
    cameraG.setAttribute('position', '0 0 300');

    let camera;
    cameraG.appendChild(camera = document.createElement('a-camera'));
    camera.setAttribute('user-height', '0');
    camera.setAttribute('reverse-mouse-drag', true);
    camera.setAttribute('wasd-controls', 'fly: true; acceleration: 3000');
    camera.setAttribute('gamepad-controls', 'flyEnabled: true; acceleration: 3000;');

    let cursor;
    camera.appendChild(cursor = document.createElement('a-cursor'));
    cursor.setAttribute('color', 'lavender');
    cursor.setAttribute('opacity', 0.5);

    // Add forcegraph entity
    scene.appendChild(state.forcegraph = document.createElement('a-entity'));
    state.forcegraph.setAttribute('forcegraph', null);
  },

  update(state) {
    state.sky.setAttribute('color', state.backgroundColor);

    const passThroughProps = [
      'jsonUrl',
      'numDimensions',
      'nodeRelSize',
      'autoColorBy',
      'nodeId',
      'nodeLabel',
      'nodeDesc',
      'nodeVal',
      'nodeResolution',
      'nodeColor',
      'linkSource',
      'linkTarget',
      'linkLabel',
      'linkHoverPrecision',
      'linkColor',
      'linkOpacity',
      'forceEngine',
      'd3AlphaDecay',
      'd3VelocityDecay',
      'warmupTicks',
      'cooldownTicks',
      'cooldownTime'
    ];

    const newProps = Object.assign({},
      ...Object.entries(state)
        .filter(([prop, val]) => passThroughProps.indexOf(prop) != -1 && val !== undefined && val !== null)
        .map(([key, val]) => ({ [key]: serialize(val) })),
      ...Object.entries(state.graphData)
        .map(([key, val]) => ({ [key]: JSON.stringify(val) })) // convert nodes & links to strings
    );

    state.forcegraph.setAttribute('forcegraph', newProps, true);

    //

    function serialize(p) {
      return p instanceof Function ? p.toString() : p; // convert functions to strings
    }
  }
});