(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
function gameSetup() {
    var canvas = $('#game-canvas')[0];
    var ctx = canvas.getContext('2d');
    if (!ctx)
        throw Error('Could not setup canvas');
    return {
        elements: {},
        canvas: canvas,
        gc: ctx,
        time: Date.now(),
        fps: 0,
        cpu: 0
    };
}
exports.gameSetup = gameSetup;
function gameStep(game) {
    game.gc.clearRect(0, 0, game.canvas.width, game.canvas.height);
    for (var _i = 0, _a = Object.keys(game.elements); _i < _a.length; _i++) {
        var key = _a[_i];
        game.elements[key].step(game);
    }
}
var fpsCT = 0;
function gameTiming(game, tBefore) {
    var now = Date.now();
    var elapsed = now - game.time;
    game.time = now;
    game.fps = 1000 / elapsed;
    game.cpu = (now - tBefore) / elapsed;
    if ((++fpsCT) == 25) {
        fpsCT = 0;
        $('#fps').text(Math.round(game.fps));
        $('#cpu').text(Math.round(game.cpu * 100));
    }
}
function gameLoop(game) {
    window.requestAnimationFrame(function (_) {
        var tBefore = Date.now();
        gameStep(game);
        gameTiming(game, tBefore);
        gameLoop(game);
    });
}
exports.gameLoop = gameLoop;

},{}],2:[function(require,module,exports){
"use strict";
var game_1 = require('./game');
var stars_1 = require('./stars');
var ship_1 = require('./ship');
function initGame() {
    var game = game_1.gameSetup();
    game.elements.stars = stars_1.setupStars(game.canvas);
    game.elements.ship = ship_1.setupShip();
    return game;
}
$(function () {
    game_1.gameLoop(initGame());
});

},{"./game":1,"./ship":3,"./stars":4}],3:[function(require,module,exports){
"use strict";
function setupShip() {
    return {
        speed: 0.5,
        step: function (game) { }
    };
}
exports.setupShip = setupShip;

},{}],4:[function(require,module,exports){
"use strict";
var NUM_STARS = 150;
function initStar(w, h, str) {
    if (str === void 0) { str = { y: 0 }; }
    var star = str;
    star.x = Math.random() * w;
    star.y = star.y > 0 ? 0 : Math.random() * h;
    star.speed = 0.1 + Math.random() * 0.9;
    var randomColor = function () { return Math.round(64 + 191 * Math.random() * star.speed); };
    star.r = randomColor();
    star.g = randomColor();
    star.b = randomColor();
    return star;
}
function initStars(w, h) {
    var stars = [];
    for (var i = 0; i < NUM_STARS; i++) {
        stars.push(initStar(w, h));
    }
    return stars;
}
function setupStars(canvas) {
    return {
        stars: initStars(canvas.width, canvas.height),
        drawStar: function (gc, star) {
            gc.fillStyle = "rgb(" + star.r + ", " + star.g + ", " + star.b + ")";
            gc.fillRect(star.x, star.y, 2, 1);
        },
        step: function (game) {
            for (var _i = 0, _a = this.stars; _i < _a.length; _i++) {
                var star = _a[_i];
                this.drawStar(game.gc, star);
                star.y += star.speed * game.elements.ship.speed;
                if (star.y > canvas.height)
                    initStar(canvas.width, canvas.height, star);
            }
        }
    };
}
exports.setupStars = setupStars;

},{}]},{},[2])
//# sourceMappingURL=bundle.js.map
