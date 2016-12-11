export default {
	nodes: [
		{ id: 0, x: 600, y: 200, name: 'Out', inputs: [4], classes: 'node node-out' },
		{ id: 1, x: 300, y: 200, name: 'Filter', inputs: [2, 3, 5, 7], classes: 'node node-effect' },
		{ id: 2, x: 140, y: 160, name: 'Osc', inputs: [], classes: 'node node-src' },
		{ id: 3, x: 140, y: 260, name: 'Osc', inputs: [], classes: 'node node-src' },
		{ id: 4, x: 460, y: 200, name: 'Gain', inputs: [1], classes: 'node node-effect' },
		{ id: 5, x: 300, y: 300, name: 'ADSR', inputs: [], classes: 'node node-ctrl' },
		{ id: 6, x: 460, y: 60, name: 'Delay', inputs: [4], classes: 'node node-effect' },
		{ id: 7, x: 300, y: 60, name: 'Pan', inputs: [6, 9], classes: 'node node-effect' },
		{ id: 9, x: 140, y: 60, name: 'LFO', inputs: [], classes: 'node node-ctrl' }
	],
	nodeData: [
		{ type: 'out', params: {} },
		{ type: 'Filter', params: { frequency: 3500, Q: 7.5, detune: 0, gain: 0, type: 'lowpass' } },
		{ type: 'Oscillator', params: { frequency: 140, detune: 0, type: 'sawtooth' } },
		{ type: 'Oscillator', params: { frequency: 140, detune: 10, type: 'sawtooth' } },
		{ type: 'Gain', params: { gain: 0.32 } },
		{ type: 'ADSR', params: { attack: 0, decay: 0.5, sustain: 1, release: 2, depth: 0.999 },
			controlParam: 'frequency', controlParams: ['frequency', 'Q', 'detune', 'gain'] },
		{ type: 'Delay', params: { delayTime: 0.05 } },
		{ type: 'StereoPan', params: { pan: 0 } },
		{ type: 'LFO', params: { frequency: 0.44422, detune: 0, type: 'sine' }, controlParam: 'pan', controlParams: ['pan'] }
	],
	name: 'Space',
	modulatorType: 'synth',
	keyboard: { portamento: 0, octave: 3, arpeggio: { bpm: 60, mode: 0, octave: 1 } }
};
