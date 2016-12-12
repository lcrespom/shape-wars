const pew = {
	nodes: [
		{ id: 0, x: 460, y: 120, name: 'Out', inputs: [5], classes: 'node node-out' },
		{ id: 1, x: 121, y: 122, name: 'Osc', inputs: [2], classes: 'node node-src' },
		{ id: 2, x: 116, y: 311, name: 'ADSR', inputs: [], classes: 'node node-ctrl' },
		{ id: 4, x: 295, y: 322, name: 'ADSR', inputs: [], classes: 'node node-ctrl' },
		{ id: 5, x: 298, y: 122, name: 'Gain', inputs: [4, 1], classes: 'node node-effect' }
	],
	nodeData: [
		{ type: 'out', params: {} },
		{ type: 'Oscillator', params: { frequency: 1200, detune: 0, type: 'square' } },
		{ type: 'ADSR',
			params: { attack: 0, decay: 0.2, sustain: 0, release: 0, depth: 1 },
			controlParam: 'frequency', controlParams: ['frequency', 'detune']
		},
		{ type: 'ADSR',
			params: { attack: 0, decay: 0, sustain: 1, release: 0.05, depth: 1 },
			controlParam: 'gain', controlParams: ['gain'] },
		{ type: 'Gain', params: { gain: 1 } }
	],
	name: 'Pew!',
	modulatorType: 'synth',
	keyboard: {
		portamento: 0, octave: 4, arpeggio: { bpm: 60, mode: 0, octave: 1 }
	}
};

const enemyExplode = {
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

const shipExplode = {
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

const gameStart = {
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

const gameOver = {
	nodes: [
		{ id: 0, x: 520, y: 160, name: 'Out', inputs: [4], classes: 'node node-out' },
		{ id: 1, x: 320, y: 160, name: 'Filter', inputs: [2, 3, 5], classes: 'node node-effect' },
		{ id: 2, x: 140, y: 100, name: 'Osc', inputs: [], classes: 'node node-src' },
		{ id: 3, x: 140, y: 220, name: 'Osc', inputs: [], classes: 'node node-src' },
		{ id: 4, x: 420, y: 60, name: 'Gain', inputs: [1], classes: 'node node-effect' },
		{ id: 5, x: 320, y: 300, name: 'ADSR', inputs: [], classes: 'node node-ctrl' }
	],
	nodeData: [
		{ type: 'out', params: {} },
		{ type: 'Filter', params: { frequency: 3804.4, Q: 9.284, detune: 0, gain: 0, type: 'lowpass' } },
		{ type: 'Oscillator', params: { frequency: 140, detune: 0, type: 'sawtooth' } },
		{ type: 'Oscillator', params: { frequency: 140, detune: 10, type: 'sawtooth' } },
		{ type: 'Gain', params: { gain: 0.68 } },
		{ type: 'ADSR', params: { attack: 0.4022, decay: 0.5, sustain: 1, release: 1, depth: 0.99 },
			controlParam: 'frequency', controlParams: ['frequency', 'Q', 'detune', 'gain'] }
	],
	name: 'Tesla',
	modulatorType: 'synth',
	keyboard: { portamento: 0, octave: 3, arpeggio: { bpm: 60, mode: 0, octave: 1 } }
};


export default {
	pew, enemyExplode, shipExplode, gameStart, gameOver
};
