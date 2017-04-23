import './3d-force-graph-vr.css';

import 'aframe';
import 'aframe-line-component';

import * as d3Core from 'd3';
import * as d3Force from 'd3-force-3d';
import { default as extend } from 'lodash/assign';
let d3 = {};
extend(d3, d3Core, d3Force);

import * as SWC from 'swc';

//

export default SWC.createComponent({

	props: [
		new SWC.Prop('width', window.innerWidth),
		new SWC.Prop('height', window.innerHeight),
		new SWC.Prop('graphData', {
			nodes: {},
			links: [] // [from, to]
		}),
		new SWC.Prop('numDimensions', 3),
		new SWC.Prop('nodeRelSize', 4), // volume per val unit
		new SWC.Prop('lineOpacity', 0.2),
		new SWC.Prop('valAccessor', node => node.val),
		new SWC.Prop('nameAccessor', node => node.name),
		new SWC.Prop('colorAccessor', node => node.color),
		new SWC.Prop('warmUpTicks', 0), // how many times to tick the force engine at init before starting to render
		new SWC.Prop('coolDownTicks', Infinity),
		new SWC.Prop('coolDownTime', 15000), // ms
		new SWC.Prop('alphaDecay', 0.0228), // cool-down curve
		new SWC.Prop('velocityDecay', 0.4) // atmospheric friction
	],

	init: (domNode, state) => {
		// Wipe DOM
		domNode.innerHTML = '';

		// Add nav info section
		d3.select(domNode).append('div')
			.classed('graph-nav-info', true)
			.text('Mouse drag: look, arrow/wasd keys: move');

		// Add scene
		state.scene = d3.select(domNode).append('a-scene'); //.attr('stats', '');
		state.scene.append('a-sky').attr('color', '#002');

		// Add camera and cursor
		const camera = state.scene.append('a-entity')
			.attr('position', '0 0 300')
			.append('a-camera')
			.attr('user-height', '0')
			.attr('reverse-mouse-drag', true)
			.attr('wasd-controls', 'fly: true; acceleration: 3000');

		camera.append('a-cursor')
			.attr('color', 'lavender')
			.attr('opacity', 0.5);

		// Setup tooltip (attached to camera)
		state.tooltipElem = camera.append('a-text')
			.attr('position', '0 -0.7 -1') // Aligned to canvas bottom
			.attr('width', 2)
			.attr('align', 'center')
			.attr('color', 'lavender')
			.attr('value', '');

		// Add force-directed layout
		state.forceLayout = d3.forceSimulation()
			.force('link', d3.forceLink().id(d => d._id))
			.force('charge', d3.forceManyBody())
			.force('center', d3.forceCenter())
			.stop();
	},

	update: state => {
		// Build graph with data
		const d3Nodes = [];
		for (let nodeId in state.graphData.nodes) { // Turn nodes into array
			const node = state.graphData.nodes[nodeId];
			node._id = nodeId;
			d3Nodes.push(node);
		}
		const d3Links = state.graphData.links.map(link => {
			return { _id: link.join('>'), source: link[0], target: link[1] };
		});

		// Add A-frame objects
		let nodes = state.scene.selectAll('a-sphere.node')
			.data(d3Nodes, d => d._id);

		nodes.exit().remove();

		nodes = nodes.merge(
			nodes.enter()
				.append('a-sphere')
				.classed('node', true)
				.attr('segments-width', 8)	// Lower geometry resolution to improve perf
				.attr('segments-height', 8)
				.attr('radius', d => Math.cbrt(state.valAccessor(d) || 1) * state.nodeRelSize)
				.attr('color', d => '#' + (state.colorAccessor(d) || 0xffffaa).toString(16))
				.attr('opacity', 0.75)
				.on('mouseenter', d => {
					state.tooltipElem.attr('value', state.nameAccessor(d) || '');
				})
				.on('mouseleave', () => {
					state.tooltipElem.attr('value', '');
				})
		);

		let links = state.scene.selectAll('a-entity.link')
			.data(d3Links, d => d._id);

		links.exit().remove();

		links = links.merge(
			links.enter()
				.append('a-entity')
				.classed('link', true)
				.attr('line', `color: #f0f0f0; opacity: ${state.lineOpacity}`)
		);

		// Feed data to force-directed layout
		state.forceLayout
			.stop()
			.alpha(1)// re-heat the simulation
			.alphaDecay(state.alphaDecay)
			.velocityDecay(state.velocityDecay)
			.numDimensions(state.numDimensions)
			.nodes(d3Nodes)
			.force('link').links(d3Links);

		for (let i=0; i<state.warmUpTicks; i++) { state.forceLayout.tick(); } // Initial ticks before starting to render

		let cntTicks = 0;
		const startTickTime = new Date();
		state.forceLayout.on("tick", layoutTick).restart();

		//

		function layoutTick() {
			if (cntTicks++ > state.coolDownTicks || (new Date()) - startTickTime > state.coolDownTime) {
				state.forceLayout.stop(); // Stop ticking graph
			}

			// Update nodes position
			nodes.attr('position', d => `${d.x} ${d.y || 0} ${d.z || 0}`);

			//Update links position
			links.attr('line', d => `start: ${d.source.x} ${d.source.y || 0} ${d.source.z || 0};  end: ${d.target.x} ${d.target.y || 0} ${d.target.z || 0}`);
		}
	}
});