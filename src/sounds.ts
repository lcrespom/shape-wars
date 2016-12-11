import { ElementGroup } from './gamelib/game';

import jsonPew from './static/pew';
import jsonEnemyExplode from './static/enemy-explode';
import jsonShipExplode from './static/ship-explode';


declare class Window {
	AudioContext: any;
	webkitAudioContext: any;
	Modulator: any;
}

declare let window: Window;


export class Sounds extends ElementGroup {
	sndPew: SoundEffect;
	sndEnemyExplode: SoundEffect;
	sndShipExplode: SoundEffect;

	constructor() {
		super();
		let ac = this.createAudioContext();
		this.sndPew = new SoundEffect(ac, jsonPew, 4);
		this.sndEnemyExplode = new SoundEffect(ac, jsonEnemyExplode, 4);
		this.sndShipExplode = new SoundEffect(ac, jsonShipExplode, 1);
	}

	createAudioContext(): AudioContext {
		const CtxClass: any = window.AudioContext || window.webkitAudioContext;
		return new CtxClass();
	}

	pew() {
		this.sndPew.play();
	}

	enemyExplode() {
		this.sndEnemyExplode.play();
	}

	shipExplode() {
		this.sndShipExplode.play();
	}
}


class SoundEffect {
	i: any;

	constructor(ac, json: any, voices: number) {
		this.i = new window.Modulator.Instrument(ac, json, voices);
	}

	play() {
		this.i.noteOff(57);
		this.i.noteOn(57);
	}
}
