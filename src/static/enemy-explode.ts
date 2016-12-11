export default {
	nodes: [
		{ id: 0, x: 500, y: 120, name: 'Out', inputs: [2], classes: 'node node-out' },
		{ id: 1, x: 100, y: 120, name: 'Noise', inputs: [], classes: 'node node-src' },
		{ id: 2, x: 300, y: 120, name: 'Filter', inputs: [1, 5], classes: 'node node-effect' },
		{ id: 5, x: 302, y: 260, name: 'ADSR', inputs: [], classes: 'node node-ctrl' }
	],
	nodeData: [
		{ type: 'out', params: {} },
		{ type: 'Noise', params: { gain: 0.5 } },
		{ type: 'Filter', params: { frequency: 2916, Q: 20.82, detune: 0, gain: 0, type: 'lowpass' } },
		{ type: 'ADSR', params: { attack: 0, decay: 0.3723466750715221, sustain: 0, release: 0, depth: 1 },
			controlParam: 'frequency', controlParams: ['frequency', 'Q', 'detune', 'gain']
		}
	],
	name: 'enemy-explode',
	modulatorType: 'synth',
	keyboard: { portamento: 0, octave: 3, arpeggio: { bpm: 60, mode: 0, octave: 1 } }
};
