(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var keyboard_1 = require('./keyboard');
function gameSetup() {
    keyboard_1.setupKeyboard();
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

},{"./keyboard":2}],2:[function(require,module,exports){
"use strict";
var pressedKeys = {};
function setupKeyboard(kbTarget) {
    if (kbTarget === void 0) { kbTarget = 'body'; }
    $(kbTarget)
        .on('keydown', function (evt) {
        // Skip repetitions
        if (pressedKeys[evt.keyCode])
            return;
        // Skip browser shortcuts
        if (evt.metaKey || evt.altKey || evt.ctrlKey)
            return;
        pressedKeys[evt.keyCode] = true;
    })
        .on('keyup', function (evt) {
        pressedKeys[evt.keyCode] = false;
    });
}
exports.setupKeyboard = setupKeyboard;
function isKeyPressed(keyCode) {
    return pressedKeys[keyCode];
}
exports.isKeyPressed = isKeyPressed;

},{}],3:[function(require,module,exports){
"use strict";
var game_1 = require('./game');
var stars_1 = require('./stars');
var ship_1 = require('./ship');
function initGame() {
    var game = game_1.gameSetup();
    game.elements.stars = stars_1.setupStars(game.canvas);
    game.elements.ship = ship_1.setupShip(game.canvas);
    return game;
}
$(function () {
    game_1.gameLoop(initGame());
});

},{"./game":1,"./ship":5,"./stars":6}],4:[function(require,module,exports){
"use strict";
function createShape(paths) {
    return {
        paths: paths,
        draw: function (gc, x, y) {
            for (var _i = 0, paths_1 = paths; _i < paths_1.length; _i++) {
                var path = paths_1[_i];
                gc.beginPath();
                gc.fillStyle = path.fillStyle;
                gc.moveTo(x + path.points[0].x, y + path.points[0].y);
                for (var i = 1; i < path.points.length; i++)
                    gc.lineTo(x + path.points[i].x, y + path.points[i].y);
                gc.closePath();
                gc.fill();
            }
        }
    };
}
exports.createShape = createShape;

},{}],5:[function(require,module,exports){
"use strict";
var shape_1 = require('./shape');
var keyboard_1 = require('./keyboard');
var KEY_LEFT = 90;
var KEY_RIGHT = 88;
var CURSOR_LEFT = 37;
var CURSOR_RIGHT = 39;
var KEY_FIRE = 77;
var FIRE_TIME = 30;
var shipPaths = [{
        fillStyle: 'rgb(0, 192, 128)',
        points: [
            { x: 0, y: 50 },
            { x: 25, y: 0 },
            { x: 50, y: 50 }
        ]
    }];
function setupShip(canvas) {
    var shape = shape_1.createShape(shipPaths);
    return {
        speedY: 1,
        speedX: 2,
        x: canvas.width / 2 - 25,
        y: canvas.height - 120,
        fireTime: 0,
        step: function (game) {
            this.move();
            this.fire(game);
            shape.draw(game.gc, this.x, this.y);
        },
        move: function () {
            if ((keyboard_1.isKeyPressed(KEY_LEFT) || keyboard_1.isKeyPressed(CURSOR_LEFT))
                && this.x > 5)
                this.x -= this.speedX;
            if ((keyboard_1.isKeyPressed(KEY_RIGHT) || keyboard_1.isKeyPressed(CURSOR_RIGHT))
                && this.x < canvas.width - 55)
                this.x += this.speedX;
        },
        fire: function (game) {
            if (this.fireTime > 0)
                this.fireTime--;
            if (!keyboard_1.isKeyPressed(KEY_FIRE) || this.fireTime > 0)
                return;
            this.fireTime = FIRE_TIME;
            // ToDo: create bullet & add it to game
        }
    };
}
exports.setupShip = setupShip;

},{"./keyboard":2,"./shape":4}],6:[function(require,module,exports){
"use strict";
var NUM_STARS = 150;
function initStar(w, h, str) {
    if (str === void 0) { str = { y: 0 }; }
    var star = str;
    star.x = Math.random() * w;
    star.y = star.y > 0 ? 0 : Math.random() * h;
    star.speed = 0.1 + Math.random() * 0.9;
    var randomColor = function () { return Math.round(128 + 127 * Math.random() * star.speed); };
    star.r = randomColor();
    star.g = randomColor();
    star.b = randomColor() & 252; // Background objects have 2 last bits to 0
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
            gc.fillRect(star.x, star.y, 2, 2);
        },
        step: function (game) {
            for (var _i = 0, _a = this.stars; _i < _a.length; _i++) {
                var star = _a[_i];
                this.drawStar(game.gc, star);
                star.y += star.speed * game.elements.ship.speedY;
                if (star.y > canvas.height)
                    initStar(canvas.width, canvas.height, star);
            }
        }
    };
}
exports.setupStars = setupStars;

},{}]},{},[3])
//# sourceMappingURL=bundle.js.map
