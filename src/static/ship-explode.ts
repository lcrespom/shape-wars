export default {
	nodes: [
		{ id: 0, x: 501, y: 119, name: 'Out', inputs: [2], classes: 'node node-out' },
		{ id: 1, x: 92, y: 118, name: 'Noise', inputs: [], classes: 'node node-src' },
		{ id: 2, x: 311, y: 114, name: 'Gain', inputs: [3, 4], classes: 'node node-effect' },
		{ id: 3, x: 312, y: 267, name: 'ADSR', inputs: [], classes: 'node node-ctrl' },
		{ id: 4, x: 176, y: 216, name: 'Filter', inputs: [1], classes: 'node node-effect' }
	],
	nodeData: [
		{ type: 'out', params: {} },
		{ type: 'Noise', params: { gain: 1 } },
		{ type: 'Gain', params: { gain: 10 } },
		{ type: 'ADSR', params: { attack: 0, decay: 2, sustain: 0, release: 0, depth: 1 }, controlParam: 'gain', controlParams: ['gain'] },
		{ type: 'Filter', params: { frequency: 322, Q: 3.259, detune: 0, gain: 0, type: 'lowpass' } }
	],
	name: 'ship-explode',
	modulatorType: 'synth',
	keyboard: {
		portamento: 0, octave: 3, arpeggio: { bpm: 60, mode: 0, octave: 1 }
	}
};
