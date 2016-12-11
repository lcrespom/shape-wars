import { Game, GameElement, ElementGroup } from './gamelib/game';

import jsonPew from './static/pew';
import jsonEnemyExplode from './static/enemy-explode';
import jsonShipExplode from './static/ship-explode';
import jsonGameOver from './static/tesla';
import jsonGameStart from './static/space';


interface Instrument {
	noteOn(midi: number, velocity?: number): void;
	noteOff(midi: number, velocity?: number): void;
}

declare class Window {
	AudioContext: any;
	webkitAudioContext: any;
	Modulator: {
		Instrument: any;
	};
}

declare let window: Window;


export class Sounds extends ElementGroup {
	iPew: Instrument;
	iEnemyExplode: Instrument;
	iShipExplode: Instrument;
	iGameStart: Instrument;
	iGameOver: Instrument;

	constructor() {
		super();
		let ac = this.createAudioContext();
		let MInstrument = window.Modulator.Instrument;
		this.iPew = new MInstrument(ac, jsonPew, 4);
		this.iEnemyExplode = new MInstrument(ac, jsonEnemyExplode, 4);
		this.iShipExplode = new MInstrument(ac, jsonShipExplode, 1);
		this.iGameStart = new MInstrument(ac, jsonGameStart, 3);
		this.iGameOver = new MInstrument(ac, jsonGameOver, 3);
	}

	createAudioContext(): AudioContext {
		const CtxClass: any = window.AudioContext || window.webkitAudioContext;
		return new CtxClass();
	}

	soundNote(instrument: Instrument, note = 57) {
		instrument.noteOff(57);
		instrument.noteOn(57);
	}

	pew() {
		this.soundNote(this.iPew);
	}

	enemyExplode() {
		this.soundNote(this.iEnemyExplode);
	}

	shipExplode() {
		this.soundNote(this.iShipExplode);
	}

	gameStart() {
		// this.sndGameStart.play();
	}

	gameOver() {
		this.add(new NoteSequence(this.iGameOver, [
			{ steps: 60, on: 57 },
			{ steps: 60, off: 57, on: 50 },
			{ steps: 0, off: 50 }
		]));
	}
}


interface NoteData {
	steps: number;
	on?: number;
	off?: number;
}


class NoteSequence implements GameElement {
	idx = -0;
	stepct = 0;
	dead = false;

	constructor(public instrument, public notes: NoteData[]) {}

	draw(game: Game) {}

	step(game: Game) {
		this.stepct--;
		if (this.stepct > 0) return;
		let note = this.notes[this.idx];
		if (note.off)
			this.instrument.noteOff(note.off);
		if (note.on)
			this.instrument.noteOn(note.on);
		this.stepct = note.steps;
		this.idx++;
		if (this.idx >= this.notes.length)
			this.dead = true;
	}
}
