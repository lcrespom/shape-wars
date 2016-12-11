export default {
	"nodes": [
		{ "id": 0, "x": 460, "y": 120, "name": "Out", "inputs": [5], "classes": "node node-out" },
		{ "id": 1, "x": 121, "y": 122, "name": "Osc", "inputs": [2], "classes": "node node-src" },
		{ "id": 2, "x": 116, "y": 311, "name": "ADSR", "inputs": [], "classes": "node node-ctrl" },
		{ "id": 4, "x": 295, "y": 322, "name": "ADSR", "inputs": [], "classes": "node node-ctrl" },
		{ "id": 5, "x": 298, "y": 122, "name": "Gain", "inputs": [4, 1], "classes": "node node-effect" }
	],
	"nodeData": [
		{ "type": "out", "params": {} },
		{ "type": "Oscillator", "params": { "frequency": 1200, "detune": 0, "type": "square" } },
		{ "type": "ADSR", "params": { "attack": 0, "decay": 0.2, "sustain": 0, "release": 0, "depth": 1 }, "controlParam": "frequency", "controlParams": ["frequency", "detune"] },
		{ "type": "ADSR", "params": { "attack": 0, "decay": 0, "sustain": 1, "release": 0.05, "depth": 1 }, "controlParam": "gain", "controlParams": ["gain"] },
		{ "type": "Gain", "params": { "gain": 1 } }
	],
	"name": "Pew!",
	"modulatorType": "synth",
	"keyboard": {
		"portamento": 0, "octave": 4, "arpeggio": { "bpm": 60, "mode": 0, "octave": 1 }
	}
}