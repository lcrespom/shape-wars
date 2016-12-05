const pressedKeys = {};

export function setupKeyboard(kbTarget = 'body') {
	$(kbTarget)
	.on('keydown', evt => {
		// Skip repetitions
		if (pressedKeys[evt.keyCode]) return;
		// Skip browser shortcuts
		if (evt.metaKey || evt.altKey || evt.ctrlKey) return;
		pressedKeys[evt.keyCode] = true;
	})
	.on('keyup', evt => {
		pressedKeys[evt.keyCode] = false;
	});
}

export function isKeyPressed(keyCode) {
	return pressedKeys[keyCode];
}
