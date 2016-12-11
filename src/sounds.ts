import { ElementGroup } from './gamelib/game';
import jsonPew from './static/pew';


declare class Window {
	AudioContext: any;
	webkitAudioContext: any;
	Modulator: any;
}

declare let window: Window;


export class Sounds extends ElementGroup {
	sndPew: SoundEffect;

	constructor() {
		super();
		let ac = this.createAudioContext();
		this.sndPew = new SoundEffect(ac, jsonPew, 8);
	}

	createAudioContext(): AudioContext {
		const CtxClass: any = window.AudioContext || window.webkitAudioContext;
		return new CtxClass();
	}

	pew() {
		this.sndPew.play();
	}
}


class SoundEffect {
	i: any;

	constructor(ac, json: any, voices: number) {
		this.i = new window.Modulator.Instrument(ac, json, voices);
	}

	play() {
		//this.i.noteOff(57);
		this.i.noteOn(57);
	}
}
