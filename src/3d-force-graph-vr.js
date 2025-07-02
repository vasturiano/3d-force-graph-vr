import 'aframe-extras';
import 'aframe-forcegraph-component';

import Kapsule from 'kapsule';
import accessorFn from 'accessor-fn';
import { parseToRgb, opacify } from 'polished';

//

export default Kapsule({

  props: {
    width: { default: window.innerWidth, triggerUpdate: false, onChange(width, state) { if(state.container) state.container.style.width = `${width}px` }},
    height: { default: window.innerHeight, triggerUpdate: false, onChange(height, state) { if(state.container) state.container.style.height = `${height}px` }},
    jsonUrl: {},
    graphData: { default: { nodes: [], links: [] }},
    numDimensions: { default: 3 },
    dagMode: {},
    dagLevelDistance: {},
    dagNodeFilter: { default: () => true },
    onDagError: { default: undefined },
    backgroundColor: { default: '#002' },
    showNavInfo: { default: true },
    nodeRelSize: { default: 4 }, // volume per val unit
    nodeId: { default: 'id' },
    nodeLabel: { default: 'name' },
    nodeDesc: { default: 'desc' },
    onNodeHover: {},
    onNodeClick: {},
    nodeVal: { default: 'val' },
    nodeResolution: { default: 8 }, // how many slice segments in the sphere's circumference
    nodeVisibility: { default: true },
    nodeColor: { default: 'color' },
    nodeAutoColorBy: {},
    nodeOpacity: { default: 0.75 },
    nodeThreeObject: {},
    nodeThreeObjectExtend: { default: false },
    linkSource: { default: 'source' },
    linkTarget: { default: 'target' },
    linkLabel: { default: 'name' },
    linkDesc: { default: 'desc' },
    onLinkHover: {},
    onLinkClick: {},
    linkVisibility: { default: true },
    linkColor: { default: 'color' },
    linkAutoColorBy: {},
    linkOpacity: { default: 0.2 },
    linkWidth: { default: 0 },
    linkResolution: { default: 6 }, // how many radial segments in each line cylinder's geometry
    linkCurvature: { default: 0 },
    linkCurveRotation: { default: 0 },
    linkMaterial: {},
    linkThreeObject: {},
    linkThreeObjectExtend: { default: false },
    linkPositionUpdate: {},
    linkDirectionalArrowLength: { default: 0 },
    linkDirectionalArrowColor: {},
    linkDirectionalArrowRelPos: { default: 0.5 }, // value between 0<>1 indicating the relative pos along the (exposed) line
    linkDirectionalArrowResolution: { default: 8 }, // how many slice segments in the arrow's conic circumference
    linkDirectionalParticles: { default: 0 }, // animate photons travelling in the link direction
    linkDirectionalParticleSpeed: { default: 0.01 }, // in link length ratio per frame
    linkDirectionalParticleOffset: { default: 0 },
    linkDirectionalParticleWidth: { default: 0.5 },
    linkDirectionalParticleColor: {},
    linkDirectionalParticleResolution: { default: 4 }, // how many slice segments in the particle sphere's circumference
    linkDirectionalParticleThreeObject: {},
    forceEngine: { default: 'd3' }, // d3 or ngraph
    d3AlphaMin: { default: 0 },
    d3AlphaDecay: { default: 0.0228 },
    d3VelocityDecay: { default: 0.4 },
    ngraphPhysics: {},
    warmupTicks: { default: 0 }, // how many times to tick the force engine at init before starting to render
    cooldownTicks: {},
    cooldownTime: { default: 15000 }, // ms
    onEngineTick: {},
    onEngineStop: {}
  },

  methods: {
    // pass-through methods
    ...Object.assign({}, ...[
      'getGraphBbox',
      'emitParticle',
      'd3Force',
      'd3ReheatSimulation',
      'refresh'
    ].map(method => ({
      [method]: function (state, ...args) {
        const aframeComp = state.forcegraph.components.forcegraph;
        const returnVal = aframeComp[method](...args);

        return returnVal === aframeComp
          ? this // chain based on this object, not the inner aframe component
          : returnVal;
      }
    }))),
    _destructor: function() {
      this.graphData({ nodes: [], links: [] });
    }
  },

  init(domNode, state) {
    // Wipe DOM
    domNode.innerHTML = '';

    state.container = document.createElement('div');
    domNode.appendChild(state.container);
    state.container.style.position = 'relative';
    state.container.style.width = `${state.width}px`;
    state.container.style.height = `${state.height}px`;

    // Add nav info section
    state.container.appendChild(state.navInfo = document.createElement('div'));
    state.navInfo.className = 'graph-nav-info';
    state.navInfo.textContent = 'Mouse drag: look, gamepad/arrow/wasd keys: move';

    // Create scene
    const scene = document.createElement('a-scene');
    scene.setAttribute('embedded', '');
    //scene.setAttribute('stats', null);

    scene.appendChild(state.sky = document.createElement('a-sky'));
    state.sky.setAttribute('radius', 3000);

    // Add camera
    let cameraG;
    scene.appendChild(cameraG = document.createElement('a-entity'));
    cameraG.setAttribute('position', '0 0 300');
    cameraG.setAttribute('movement-controls', 'controls: gamepad, touch; fly: true; speed: 7');

    let camera;
    cameraG.appendChild(camera = document.createElement('a-entity'));
    camera.setAttribute('camera', '');
    camera.setAttribute('position', '0 0 0');
    camera.setAttribute('look-controls', 'pointerLockEnabled: false');
    camera.setAttribute('wasd-controls', 'fly: true; acceleration: 700');


    // display cursor in middle of screen
    // let cursor;
    // camera.appendChild(cursor = document.createElement('a-cursor'));
    // cursor.setAttribute('color', 'lavender');
    // cursor.setAttribute('opacity', 0.5);
    // cursor.setAttribute('raycaster', 'objects: ----none----'); // disable cursor raycaster

    // Setup tooltip
    let tooltipEl;
    camera.appendChild(tooltipEl = document.createElement('a-text'));
    tooltipEl.setAttribute('position', '0 -0.3 -1');
    tooltipEl.setAttribute('width', 2);
    tooltipEl.setAttribute('align', 'center');
    tooltipEl.setAttribute('color', 'lavender');
    tooltipEl.setAttribute('value', '');

    // Setup sub-tooltip
    let subTooltipEl;
    camera.appendChild(subTooltipEl = document.createElement('a-text'));
    subTooltipEl.setAttribute('position', '0 -0.4 -1');
    subTooltipEl.setAttribute('width', 1.3);
    subTooltipEl.setAttribute('align', 'center');
    subTooltipEl.setAttribute('color', 'lavender');
    subTooltipEl.setAttribute('value', '');

    // Setup mouse cursor and laser raycasting controls
    state.raycasterEls = [];
    let mouseCursor;
    scene.appendChild(mouseCursor = document.createElement('a-entity'));
    mouseCursor.setAttribute('cursor', 'rayOrigin: mouse; mouseCursorStylesEnabled: true');
    mouseCursor.setAttribute('raycaster', 'objects: [forcegraph]; interval: 100');
    state.raycasterEls.push(mouseCursor);

    ['left', 'right'].forEach(hand => {
      let laser;
      cameraG.appendChild(laser = document.createElement('a-entity'));
      laser.setAttribute('laser-controls', `hand: ${hand}; model: false;`); // Oculus touch offsets are slightly off
      laser.setAttribute('raycaster', 'objects: [forcegraph]; interval: 100; lineColor: steelblue; lineOpacity: 0.85');
      state.raycasterEls.push(laser);
    });

    // Add forcegraph entity
    scene.appendChild(state.forcegraph = document.createElement('a-entity'));
    state.forcegraph.setAttribute('forcegraph', null);

    // attach scene
    state.container.appendChild(scene);

    // update tooltips
    state.forcegraph.setAttribute('forcegraph', Object.assign(...['node', 'link'].map(t => {
      const cct = { node: 'Node', link: 'Link' }[t]; // camel-case version
      return {[`on${cct}Hover`]: (obj, prevObj) => {
        const label = obj ? accessorFn(state[`${t}Label`])(obj) || '' : '';
        const subLabel = obj ? accessorFn(state[`${t}Desc`])(obj) || '' : '';
        tooltipEl.setAttribute('value', label);
        subTooltipEl.setAttribute('value', subLabel);
        state[`on${cct}Hover`] && state[`on${cct}Hover`](obj, prevObj);
      }};
    })));
  },

  update(state, changedProps) {
    if (changedProps.hasOwnProperty('backgroundColor')) {
      let alpha = parseToRgb(state.backgroundColor).alpha;
      if (alpha === undefined) alpha = 1;
      state.sky.setAttribute('color', opacify(1, state.backgroundColor));
      state.sky.setAttribute('opacity', alpha);
    }
    changedProps.hasOwnProperty('showNavInfo') && (state.navInfo.style.display = state.showNavInfo ? null : 'none');

    // deactivate raycasting against the forcegraph if no interaction props are set
    const isInteractive = ['onNodeHover', 'onLinkHover', 'onNodeClick', 'onLinkClick'].some(p => state[p])
      || ['nodeLabel', 'linkLabel'].some(p => state[p] !== 'name')
      || ['nodeDesc', 'linkDesc'].some(p => state[p] !== 'desc');
    state.raycasterEls.forEach(el => el.setAttribute('raycaster',
      isInteractive ? 'objects: [forcegraph]; interval: 100' : 'objects: __none__')
    );

    const passThroughProps = [
      'jsonUrl',
      'numDimensions',
      'dagMode',
      'dagLevelDistance',
      'dagNodeFilter',
      'onDagError',
      'nodeRelSize',
      'nodeId',
      'onNodeClick',
      'nodeVal',
      'nodeResolution',
      'nodeVisibility',
      'nodeColor',
      'nodeAutoColorBy',
      'nodeOpacity',
      'nodeThreeObject',
      'nodeThreeObjectExtend',
      'linkSource',
      'linkTarget',
      'onLinkClick',
      'linkVisibility',
      'linkColor',
      'linkAutoColorBy',
      'linkOpacity',
      'linkWidth',
      'linkResolution',
      'linkCurvature',
      'linkCurveRotation',
      'linkMaterial',
      'linkThreeObject',
      'linkThreeObjectExtend',
      'linkPositionUpdate',
      'linkDirectionalArrowLength',
      'linkDirectionalArrowColor',
      'linkDirectionalArrowRelPos',
      'linkDirectionalArrowResolution',
      'linkDirectionalParticles',
      'linkDirectionalParticleSpeed',
      'linkDirectionalParticleOffset',
      'linkDirectionalParticleWidth',
      'linkDirectionalParticleColor',
      'linkDirectionalParticleResolution',
      'linkDirectionalParticleThreeObject',
      'forceEngine',
      'd3AlphaMin',
      'd3AlphaDecay',
      'd3VelocityDecay',
      'ngraphPhysics',
      'warmupTicks',
      'cooldownTicks',
      'cooldownTime',
      'onEngineTick',
      'onEngineStop'
    ];

    const newProps = Object.assign({},
      ...Object.entries(state)
        .filter(([prop, val]) => changedProps.hasOwnProperty(prop) && passThroughProps.indexOf(prop) !== -1 && val !== undefined && val !== null)
        .map(([key, val]) => ({ [key]: val })),
      ...Object.entries(state.graphData)
        .map(([key, val]) => ({ [key]: val })) // pass nodes & links as separate props
    );

    state.forcegraph.setAttribute('forcegraph', newProps);
  }
});
