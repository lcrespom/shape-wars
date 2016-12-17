import { Game, GameElement, ElementGroup } from './gamelib/game';
import sounds from './static/sounds';


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
		this.iPew = new MInstrument(ac, sounds.pew, 4);
		this.iEnemyExplode = new MInstrument(ac, sounds.enemyExplode, 4);
		this.iShipExplode = new MInstrument(ac, sounds.shipExplode, 1);
		this.iGameStart = new MInstrument(ac, sounds.gameStart, 3);
		this.iGameOver = new MInstrument(ac, sounds.gameOver, 3);
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

	waveStart() {
		this.add(new NoteSequence(this.iGameOver, [
			{ steps: 20, on: 48 },
			{ steps: 20, on: 55 },
			{ steps: 20, on: 60 },
			{ steps: 0, off: 48 },
			{ steps: 0, off: 55 },
			{ steps: 0, off: 60 }
		]));
	}

	gameOver() {
		this.add(new NoteSequence(this.iGameOver, [
			{ steps: 30, on: 47 },
			{ steps: 30, off: 47 },
			{ steps: 30, on: 41 },
			{ steps: 30, off: 41 },
			{ steps: 30, on: 36 },
			{ steps: 0, off: 36 }
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
		// ToDo: if stepct == 0, immediately play next note
		// ToDo: investigante incorrect notes
		this.idx++;
		if (this.idx >= this.notes.length)
			this.dead = true;
	}
}
