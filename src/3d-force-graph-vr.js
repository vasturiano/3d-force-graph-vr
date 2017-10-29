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
        lineOpacity: { default: 0.2 },
        autoColorBy: {},
        idField: { default: 'id' },
        valField: { default: 'val' },
        nameField: { default: 'name' },
        colorField: { default: 'color' },
        linkSourceField: { default: 'source' },
        linkTargetField: { default: 'target' },
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
        const newProps = {
            nodes: JSON.stringify(state.graphData.nodes),
            links: JSON.stringify(state.graphData.links)
        };

        [
            'jsonUrl',
            'numDimensions',
            'nodeRelSize',
            'lineOpacity',
            'autoColorBy',
            'idField',
            'valField',
            'nameField',
            'colorField',
            'linkSourceField',
            'linkTargetField',
            'forceEngine',
            'warmupTicks',
            'cooldownTicks',
            'cooldownTime'
        ]
        .filter(p => state[p] !== undefined && state[p] !== null)
        .forEach(prop => {
            newProps[prop] = state[prop];
        });

        props.push(['nodes', JSON.stringify(state.graphData.nodes)]);
        props.push(['links', JSON.stringify(state.graphData.links)]);

        state.forcegraph.setAttribute('forcegraph', newProps, true);
    }
});