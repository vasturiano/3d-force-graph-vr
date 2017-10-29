import './3d-force-graph-vr.css';

import 'aframe';
import 'aframe-forcegraph-component';

import GamepadControls from 'aframe-gamepad-controls';
AFRAME.registerComponent('gamepad-controls', GamepadControls);

import Kapsule from 'kapsule';

//

export default Kapsule({

    props: {
        jsonUrl: {},
        graphData: { default: {
            nodes: [],
            links: []
        }},
        numDimensions: { default: 3 },
        nodeRelSize: { default: 4 }, // volume per val unit
        nodeResolution: { default: 8 }, // how many slice segments in the sphere's circumference
        lineOpacity: { default: 0.2 },
        autoColorBy: {},
        idField: { default: 'id' },
        valField: { default: 'val' },
        nameField: { default: 'name' },
        colorField: { default: 'color' },
        linkSourceField: { default: 'source' },
        linkTargetField: { default: 'target' },
        linkColorField: { default: 'color' },
        forceEngine: { default: 'd3' }, // d3 or ngraph
        warmupTicks: { default: 0 }, // how many times to tick the force engine at init before starting to render
        cooldownTicks: {},
        cooldownTime: { default: 15000 } // ms
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
        let sky;
        scene.appendChild(sky = document.createElement('a-sky'));
        sky.setAttribute('color', '#002');

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
        const passThroughProps = [
            'jsonUrl',
            'numDimensions',
            'nodeRelSize',
            'nodeResolution',
            'lineOpacity',
            'autoColorBy',
            'idField',
            'valField',
            'nameField',
            'colorField',
            'linkSourceField',
            'linkTargetField',
            'linkColorField',
            'forceEngine',
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