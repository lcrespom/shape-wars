(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*-------------------- Stars --------------------*/
var NUM_STARS = 100;
function initStar(w, h, star) {
    if (star === void 0) { star = { x: 0, y: 0, speed: 0 }; }
    star.x = Math.random() * w;
    star.y = star.y > 0 ? 0 : Math.random() * h;
    star.speed = 0.1 + Math.random() * 0.9;
    return star;
}
function initStars(w, h) {
    var stars = [];
    for (var i = 0; i < NUM_STARS; i++) {
        stars.push(initStar(w, h));
    }
    return stars;
}
function setupStars(canvas, gc) {
    var imgData = gc.createImageData(1, 1);
    var pixel = imgData.data;
    return {
        stars: initStars(canvas.width, canvas.height),
        pixel: pixel,
        putPixel: function (x, y, r, g, b, a) {
            this.pixel[0] = r;
            this.pixel[1] = g;
            this.pixel[2] = b;
            this.pixel[3] = a;
            gc.putImageData(imgData, x, y);
        },
        step: function () {
            for (var _i = 0, _a = this.stars; _i < _a.length; _i++) {
                var star = _a[_i];
                var f = 255 << 0;
                this.putPixel(star.x, star.y, f, f, f, f);
                star.y += star.speed;
                if (star.y > canvas.height)
                    initStar(canvas.width, canvas.height, star);
            }
        }
    };
}
/*-------------------- Main game engine --------------------*/
function gameSetup() {
    var canvas = $('#game-canvas')[0];
    var ctx = canvas.getContext('2d');
    if (!ctx)
        throw Error('Could not setup canvas');
    return {
        elements: {
            stars: setupStars(canvas, ctx)
        },
        canvas: canvas,
        gc: ctx,
        time: Date.now()
    };
}
function gameStep(game) {
    game.gc.clearRect(0, 0, game.canvas.width, game.canvas.height);
    for (var _i = 0, _a = Object.keys(game.elements); _i < _a.length; _i++) {
        var key = _a[_i];
        game.elements[key].step(game);
    }
}
function gameLoop(game) {
    window.requestAnimationFrame(function (_) {
        //ToDo: measure FPS
        gameStep(game);
        gameLoop(game);
    });
}
$(function () {
    var game = gameSetup();
    gameLoop(game);
});

},{}]},{},[1])
//# sourceMappingURL=bundle.js.map
