import './3d-force-graph-vr.css';

import 'aframe';
import 'aframe-forcegraph-component';

import GamepadControls from 'aframe-gamepad-controls';
AFRAME.registerComponent('gamepad-controls', GamepadControls);

import * as SWC from 'swc';

//

export default SWC.createComponent({

	props: [
		new SWC.Prop('jsonUrl'),
		new SWC.Prop('graphData', {
			nodes: [],
			links: []
		}),
		new SWC.Prop('numDimensions', 3),
		new SWC.Prop('nodeRelSize', 4), // volume per val unit
		new SWC.Prop('lineOpacity', 0.2),
		new SWC.Prop('autoColorBy'),
		new SWC.Prop('idField', 'id'),
		new SWC.Prop('valField', 'val'),
		new SWC.Prop('nameField', 'name'),
		new SWC.Prop('colorField', 'color'),
		new SWC.Prop('linkSourceField', 'source'),
		new SWC.Prop('linkTargetField', 'target'),
		new SWC.Prop('forceEngine', 'd3'), // d3 or ngraph
		new SWC.Prop('warmupTicks', 0), // how many times to tick the force engine at init before starting to render
		new SWC.Prop('cooldownTicks', Infinity),
		new SWC.Prop('cooldownTime', 15000) // ms
	],

	init: (domNode, state) => {
		// Wipe DOM
		domNode.innerHTML = '';

		// Add nav info section
		let navInfo;
		domNode.appendChild(navInfo = document.createElement('div'));
		navInfo.className = 'graph-nav-info';
		navInfo.textContent = 'Mouse drag: look, arrow/wasd keys: move';

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

	update: state => {
		const props = [
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
		].map(prop => [
			prop.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase(),	// camelCase to dash
			state[prop]
		]);

		props.push(['nodes', JSON.stringify(state.graphData.nodes)]);
		props.push(['links', JSON.stringify(state.graphData.links)]);

		state.forcegraph.setAttribute('forceGraph',
			props
				.filter(prop => prop[1] !== null)
				.map(([prop, val]) => `${prop}: ${val}`)
				.join('; ')
		);
	}
});