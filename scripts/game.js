(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _GameState = require('states/GameState');

var _GameState2 = _interopRequireDefault(_GameState);

var _Scene = require('states/Scene2');

var _Scene2 = _interopRequireDefault(_Scene);

var _Scene3 = require('states/Scene3');

var _Scene4 = _interopRequireDefault(_Scene3);

var _Scene5 = require('states/Scene4');

var _Scene6 = _interopRequireDefault(_Scene5);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

function _possibleConstructorReturn(self, call) {
	if (!self) {
		throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	}return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Game = function (_Phaser$Game) {
	_inherits(Game, _Phaser$Game);

	function Game() {
		_classCallCheck(this, Game);

		if (window.innerWidth > window.innerHeight) {
			window.landscape = true;
			window.w = window.innerWidth;
			window.h = window.innerHeight;
			var ratio = window.innerHeight / 768;

			var _this = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, window.innerWidth / ratio, 768, Phaser.CANVAS, 'content'));
		} else {
			window.landscape = false;
			window.w = window.innerHeight;
			window.h = window.innerWidth;
			var _ratio = window.innerWidth / 768;

			var _this = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, 768, window.innerHeight / _ratio, Phaser.CANVAS, 'content'));
		}

		_this.preserveDrawingBuffer = true;
		_this.state.add('GameState', _GameState2.default, false);
		_this.state.add('Scene2', _Scene2.default, false);
		_this.state.add('Scene3', _Scene4.default, false);
		_this.state.add('Scene4', _Scene6.default, false);
		_this.state.start('GameState');

		//	this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL; 

		return _possibleConstructorReturn(_this);
	}

	return Game;
}(Phaser.Game);

window.game = new Game();

var attachFastClick = Origami.fastclick;
attachFastClick(document.body);

},{"states/GameState":2,"states/Scene2":3,"states/Scene3":4,"states/Scene4":5}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
		}
	}return function (Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	};
}();

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

function _possibleConstructorReturn(self, call) {
	if (!self) {
		throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	}return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var GameState = function (_Phaser$State) {
	_inherits(GameState, _Phaser$State);

	function GameState() {
		_classCallCheck(this, GameState);

		return _possibleConstructorReturn(this, (GameState.__proto__ || Object.getPrototypeOf(GameState)).apply(this, arguments));
	}

	_createClass(GameState, [{
		key: 'preload',
		value: function preload() {
			console.log("preload");
			this.game.load.bitmapFont('font', 'images/font.png', 'images/font.fnt');
			this.game.load.json("transform", "images/scene1.json");
			this.game.load.atlasJSONHash("pack", "images/main.png", "images/main.json");
			this.game.load.script('BlurX', 'https://cdn.rawgit.com/photonstorm/phaser/master/v2/filters/BlurX.js');
			this.game.load.script('BlurY', 'https://cdn.rawgit.com/photonstorm/phaser/master/v2/filters/BlurY.js');
			this.game.load.audio('welcome', 'sounds/welcome.mp3');
			this.game.load.audio('select', 'sounds/select.mp3');
			this.game.load.audio('runAmbient', 'sounds/runAmbient.mp3');
			this.game.load.audio('earn', 'sounds/earn.mp3');
			this.game.load.audio('jump', 'sounds/jump.mp3');
			this.game.load.audio('cockroach', 'sounds/cockroach.mp3');
			this.game.load.audio('hit', 'sounds/hit.mp3');
			this.game.load.audio('end', 'sounds/end.mp3');
			//this.game.load.audio('buttonTap', 'sounds/.mp3');
		}
	}, {
		key: 'create',
		value: function create() {
			//	let center = { x: this.game.world.centerX, y: this.game.world.centerY }
			//	let text = new RainbowText(this.game, center.x, center.y, "- phaser -\nwith a sprinkle of\nES6 dust!");
			//	text.anchor.set(0.5);

			this.game.firstPlay = false;
			this.game.renderer.renderSession.roundPixels = true;
			this.game.stage.backgroundColor = "#d9f6fc";
			this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			this.objArr = {};
			var jsonData = this.game.cache.getJSON("transform");
			for (var i in jsonData) {
				this.objArr[i] = this.game.add.sprite(0, 0, 'pack', i);
				this.setTrasform(this.objArr[i]);
			}

			this.createStreet();
			this.createCity();
			this.centerObjects();
			//	console.log(this.game.canvas.clientWidth);
			this.titleAnim();
			this.createEvents();
			this.soundSetup();
			if (!window.landscape) {
				this.game.world.setBounds(-this.game.width, 0, this.game.width, this.game.height);
				//this.game.world.pivot.set(0.5,0.5);
				this.game.world.angle = 90;
				//this.game.world.updateTransform();
			}
		}
	}, {
		key: 'soundSetup',
		value: function soundSetup() {
			this.game.welcomeSound = this.game.add.audio('welcome');
			this.game.selectSound = this.game.add.audio('select');
			this.game.runSound = this.game.add.audio('runAmbient');
			this.game.runSound.volume = 0.5;
			this.game.earnSound = this.game.add.audio('earn');
			this.game.earnSound.volume = 0.3;
			this.game.jumpSound = this.game.add.audio('jump');
			this.game.cockroachSound = this.game.add.audio('cockroach');
			this.game.cockroachSound.volume = 0.5;
			this.game.hitSound = this.game.add.audio('hit');
			this.game.endSound = this.game.add.audio('end');
			this.game.sound.setDecodedCallback([this.game.endSound, this.game.cockroachSound, this.game.hitSound, this.game.earnSound, this.game.jumpSound, this.game.welcomeSound, this.game.selectSound, this.game.runSound], this.startSound, this);
		}
	}, {
		key: 'startSound',
		value: function startSound() {
			this.game.welcomeSound.loopFull();
		}
	}, {
		key: 'centerObjects',
		value: function centerObjects() {
			var g = this.game.add.group(this.game.world, 'title', false);
			g.add(this.objArr["title.png"]);
			g.add(this.objArr["logo.png"]);
			g.add(this.objArr["red.png"]);
			g.add(this.objArr["green.png"]);
			g.add(this.objArr["gift1.png"]);
			g.add(this.objArr["gift2.png"]);
			g.add(this.objArr["button.png"]);
			g.add(this.objArr["play_txt.png"]);
			//g.pivot.set(0.5);
			if (window.landscape) {
				g.x = this.game.world.centerX - g.getLocalBounds().width / 2 - g.getLocalBounds().x; //- g.getBounds().x;
			} else {
				g.x = this.game.world.centerY - g.getLocalBounds().width / 2 - g.getLocalBounds().x;
			}
		}
	}, {
		key: 'createEvents',
		value: function createEvents() {
			this.objArr["button.png"].inputEnabled = true;
			this.objArr["button.png"].events.onInputDown.add(this.onStartTouch, this);
		}
	}, {
		key: 'onStartTouch',
		value: function onStartTouch() {
			console.log("start");
			this.game.selectSound.play();
			this.game.state.start('Scene2', true);
		}
	}, {
		key: 'createStreet',
		value: function createStreet() {
			var streetW = void 0;
			if (window.landscape) {
				streetW = this.game.width;
			} else {
				streetW = this.game.height;
			}
			this.objArr["street.png"].visible = false;
			var _y = this.objArr["street.png"].y - this.objArr["street.png"].height / 2;
			this.street = this.game.add.tileSprite(0, _y, streetW, this.objArr["street.png"].height, 'pack', 'street.png');
			this.street.parent.setChildIndex(this.street, 0);

			var streetHeight = 768 - this.objArr["house1.png"].y + this.objArr["house1.png"].height / 2;

			var bmd = this.game.add.bitmapData(streetW, streetHeight);
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, streetW, streetHeight);
			bmd.ctx.fillStyle = '#abadb0';
			bmd.ctx.fill();
			var drawnObject = this.game.add.sprite(0, this.objArr["house1.png"].y + this.objArr["house1.png"].height / 2, bmd);
			drawnObject.parent.setChildIndex(drawnObject, 0);
		}
	}, {
		key: 'createCity',
		value: function createCity() {
			this.houseGroup = this.game.add.group(this.game.world, 'houses', false);
			this.houseGroup.add(this.objArr["house1.png"]);
			this.houseGroup.add(this.objArr["house2.png"]);
			var _y = this.objArr["city1.png"].y - this.objArr["city1.png"].height / 2 - 10;
			this.bg1 = this.game.add.tileSprite(0, _y, this.game.width * 2, this.objArr["city1.png"].height, 'pack', 'city1.png');
			this.bg1.parent.setChildIndex(this.bg1, 0);
			var _y2 = this.objArr["city2.png"].y - this.objArr["city2.png"].height / 2 - 10;
			this.bg2 = this.game.add.tileSprite(0, _y2, this.game.width * 2, this.objArr["city2.png"].height, 'pack', 'city2.png');
			this.bg2.parent.setChildIndex(this.bg2, 1);
			var _y3 = this.objArr["city3.png"].y - this.objArr["city3.png"].height / 2;
			this.bg3 = this.game.add.tileSprite(0, _y3, this.game.width * 2, this.objArr["city3.png"].height, 'pack', 'city3.png');
			this.bg3.parent.setChildIndex(this.bg3, 2);
			this.objArr["city1.png"].visible = false;
			this.objArr["city2.png"].visible = false;
			this.objArr["city3.png"].visible = false;
			for (var i = 0; i < 5; i++) {
				var houseBase;
				if (i % 2 == 0) {
					houseBase = this.objArr["house1.png"];
				} else {
					houseBase = this.objArr["house2.png"];
				}
				var cloneHouse = this.game.add.sprite(this.objArr["house2.png"].x + this.objArr["house2.png"].width / 2 + this.objArr["house2.png"].width * i, houseBase.y - houseBase.height / 2, houseBase.key, houseBase.frameName, this.houseGroup);
			}
		}
	}, {
		key: 'titleAnim',
		value: function titleAnim() {
			TweenMax.from(this.objArr["title.png"].scale, 1, { delay: 0.5, ease: Elastic.easeOut, x: 0, y: 0 });
			TweenMax.from(this.objArr["logo.png"], 1, { ease: Back.easeOut, y: this.game.canvas.height });
			TweenMax.from(this.objArr["red.png"], 1, { ease: Back.easeOut, y: this.game.canvas.height });
			TweenMax.from(this.objArr["green.png"], 1, { ease: Back.easeOut, y: this.game.canvas.height });
			TweenMax.from(this.objArr["gift1.png"], 1, { delay: 0.5, ease: Back.easeOut, y: this.game.canvas.height });
			TweenMax.from(this.objArr["gift2.png"], 1, { delay: 0.5, ease: Back.easeOut, y: this.game.canvas.height });
			TweenMax.from(this.objArr["button.png"].scale, 1, { delay: 0.5, ease: Elastic.easeOut, x: 0, y: 0 });
			TweenMax.from(this.objArr["play_txt.png"].scale, 1, { delay: 0.5, ease: Elastic.easeOut, x: 0, y: 0 });
		}
	}, {
		key: 'update',
		value: function update() {}
	}, {
		key: 'setTrasform',
		value: function setTrasform(s) {
			//console.log(s.frameName);
			var f = s.frameName; //.replace(".png","");
			var jsonData = this.game.cache.getJSON("transform");
			s.position.set(jsonData[f].x, jsonData[f].y);
			s.scale.set(jsonData[f].sx, jsonData[f].sy);
			s.angle = jsonData[f].r;
			s.anchor.set(0.5);
		}
	}]);

	return GameState;
}(Phaser.State);

exports.default = GameState;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
		}
	}return function (Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	};
}();

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

function _possibleConstructorReturn(self, call) {
	if (!self) {
		throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	}return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Scene2 = function (_Phaser$State) {
	_inherits(Scene2, _Phaser$State);

	function Scene2() {
		_classCallCheck(this, Scene2);

		return _possibleConstructorReturn(this, (Scene2.__proto__ || Object.getPrototypeOf(Scene2)).apply(this, arguments));
	}

	_createClass(Scene2, [{
		key: "preload",
		value: function preload() {
			console.log("preload");
			this.game.load.json("transform", "images/scene2.json");
			//this.game.load.atlasJSONHash("pack","images/textureImage.png","images/textureData.json");
			//this.game.load.script('BlurX', 'https://cdn.rawgit.com/photonstorm/phaser/master/v2/filters/BlurX.js');
			//	this.game.load.script('BlurY', 'https://cdn.rawgit.com/photonstorm/phaser/master/v2/filters/BlurY.js');
		}
	}, {
		key: "create",
		value: function create() {
			//	let center = { x: this.game.world.centerX, y: this.game.world.centerY }
			//	let text = new RainbowText(this.game, center.x, center.y, "- phaser -\nwith a sprinkle of\nES6 dust!");
			//	text.anchor.set(0.5);
			this.game.stage.backgroundColor = "#d9f6fc";
			this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			this.objArr = {};
			var jsonData = this.game.cache.getJSON("transform");
			for (var i in jsonData) {
				this.objArr[i] = this.game.add.sprite(0, 0, 'pack', i);
				this.setTrasform(this.objArr[i]);
			}
			this.g = null;
			this.createStreet();
			this.createCity();
			this.centerObjects();
			this.game.world.bringToTop(this.objArr["red2.png"]);
			this.game.world.bringToTop(this.objArr["green2.png"]);
			this.createGlowFilter();
			this.animObjects();
			this.game.chilliName = "red2.png";
			this.createChoosingText();
			if (this.game.firstPlay) {
				this.game.welcomeSound.fadeIn(500, true);
			}
			//console.log(this.game.welcomeSound.volume);
		}
	}, {
		key: "createChoosingText",
		value: function createChoosingText() {
			this.chooseTxt = this.game.add.bitmapText(524, 246, 'font', 'CHỌN NHÂN VẬT BẠN THÍCH', 64);
			this.chooseTxt.anchor.set(0.5);
			this.chooseTxt.tint = 0x140474;
			for (var i = 0; i < this.chooseTxt.children.length; i++) {
				this.chooseTxt.getChildAt(i).scale.set(0);
				this.chooseTxt.getChildAt(i).anchor.set(0.5);
				this.chooseTxt.updateTransform();
				TweenMax.to(this.chooseTxt.getChildAt(i).scale, 1, { delay: i / 30, y: 0.8, x: 0.8, ease: Elastic.easeOut });
				TweenMax.to(this.chooseTxt.getChildAt(i).anchor, 1, { delay: i / 30, y: 0, x: 0, ease: Elastic.easeOut });
			}
			if (window.landscape) {
				this.chooseTxt.x = this.game.width / 2;
			} else {
				this.chooseTxt.x = this.game.height / 2;
			}
		}
	}, {
		key: "animObjects",
		value: function animObjects() {

			this.houseGroup.filters = [this.blurX, this.blurY];
			var self = this;
			self.currentChoice = self.objArr["red2.png"];
			self.chooseChilli(self.currentChoice.frameName);
			TweenMax.from(this.objArr["red2.png"], 1, { ease: Back.easeOut, x: 0, onUpdate: function onUpdate() {
					//self.currentChoice.glowClone.x = self.currentChoice.x;
				} });
			TweenMax.from(this.objArr["green2.png"], 1, { ease: Back.easeOut, x: this.game.width });
			var red = this.objArr["red2.png"];
			var green = this.objArr["green2.png"];
			red.inputEnabled = green.inputEnabled = true;
			red.events.onInputDown.add(this.onChoose, this);
			green.events.onInputDown.add(this.onChoose, this);
			this.objArr["button.png"].inputEnabled = true;
			this.objArr["button.png"].events.onInputDown.add(this.onPlayNow, this);
			//this.objArr["button1.png"].inputEnabled = true;
			//this.objArr["button1.png"].events.onInputDown.add(this.onDiscover, this);
			//console.log(this.objArr["button.png"]);
		}
	}, {
		key: "onDiscover",
		value: function onDiscover() {
			console.log("discover");
		}
	}, {
		key: "onPlayNow",
		value: function onPlayNow() {
			this.game.selectSound.play();
			this.game.state.start("Scene3", true);
		}
	}, {
		key: "onChoose",
		value: function onChoose(e) {
			this.game.selectSound.play();
			if (this.currentChoice) {
				this.currentChoice.scale.set(1);
			}
			//this.currentChoice.glowClone.filters = null;
			this.chooseChilli(e.frameName);
			this.game.chilliName = e.frameName;
			this.currentChoice = e;
		}
	}, {
		key: "chooseChilli",
		value: function chooseChilli(name) {
			/*if(!this.objArr[name].glowClone){
   	let w = this.objArr[name].width;
   	let h = this.objArr[name].height;
   	let bmd = this.game.make.bitmapData(w+40,h+40);
   	bmd.draw(this.objArr[name],w/2+20,h/2+20,w,h);
   	let s = this.game.make.sprite(this.objArr[name].x,this.objArr[name].y,bmd);
   	s.anchor.set(0.5);
   	s.x = this.objArr[name].x;
   	s.y = this.objArr[name].y;
   	this.objArr[name].glowClone = s;
   	this.g.add(s);
   	//console.log('clone')
   }
   this.objArr[name].glowClone.filters=[this.glowFilter,this.blurX,this.blurY];
   this.objArr[name].bringToTop();*/
			this.objArr[name].scale.set(1.1);
			//var self = this;
			//TweenMax.to(this,1,{delay:2,glowAmount:1/150});
			//	this.objArr[name].x = -100;

			//this.objArr[name].filters=[this.glowFilter,this.blurX,this.blurY];
			//let r = this.objArr[name];
			//var clone = this.game.add.sprite(r.x,r.y,r.key,r.frameName,this.g);
			//clone.anchor.set(0.5);
		}
	}, {
		key: "createGlowFilter",
		value: function createGlowFilter() {
			this.blurX = this.game.add.filter('BlurX');
			this.blurY = this.game.add.filter('BlurY');
			this.blurX.blur = 12;
			this.blurY.blur = 12;
			this.glowAmount = 1 / 150;
			var fragmentSrc = ['precision lowp float;', 'varying vec2 vTextureCoord;', 'uniform float offset;', 'uniform sampler2D uSampler;', 'void main() {', 'vec4 col = texture2D(uSampler, vTextureCoord);', 'if (col.a > 0.5)', 'gl_FragColor = col;', 'else {', 'float a = texture2D(uSampler, vec2(vTextureCoord.x + offset, vTextureCoord.y)).a +', 'texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y - offset)).a +', 'texture2D(uSampler, vec2(vTextureCoord.x - offset, vTextureCoord.y)).a +', 'texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y + offset)).a;', 'if (col.a < 1.0 && a > 0.0)', 'gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0)*1.0;', 'else', 'gl_FragColor = col;', '}', '}'];
			this.glowFilter = new Phaser.Filter(this.game, { offset: { type: '1f', value: this.glowAmount } }, fragmentSrc);
			this.glowFilter.setResolution(128, 128);
		}
	}, {
		key: "centerObjects",
		value: function centerObjects() {
			this.g = this.game.add.group(this.game.world, 'title', false);
			this.g.add(this.objArr["title.png"]);
			//g.add(this.objArr["logo.png"]);
			this.g.add(this.objArr["red.png"]);
			this.g.add(this.objArr["green.png"]);
			this.g.add(this.objArr["red2.png"]);
			this.g.add(this.objArr["green2.png"]);
			this.g.add(this.objArr["gift1.png"]);
			this.g.add(this.objArr["gift2.png"]);
			this.g.add(this.objArr["button.png"]);
			this.g.add(this.objArr["play_txt.png"]);
			//this.g.add(this.objArr["button1.png"]);
			//this.g.add(this.objArr["discover_txt.png"]);
			//g.pivot.set(0.5);
			if (window.landscape) {
				this.g.x = this.game.world.centerX - this.g.getLocalBounds().width / 2 - this.g.getLocalBounds().x; //- g.getBounds().x;
			} else {
				this.g.x = this.game.world.centerY - this.g.getLocalBounds().width / 2 - this.g.getLocalBounds().x;
			}
		}
	}, {
		key: "createStreet",
		value: function createStreet() {
			var streetW = void 0;
			if (window.landscape) {
				streetW = this.game.width;
			} else {
				streetW = this.game.height;
			}
			this.objArr["street.png"].visible = false;
			var _y = this.objArr["street.png"].y - this.objArr["street.png"].height / 2;
			this.street = this.game.add.tileSprite(0, _y, streetW, this.objArr["street.png"].height, 'pack', 'street.png');
			this.street.parent.setChildIndex(this.street, 0);

			var streetHeight = 768 - this.objArr["house1.png"].y + this.objArr["house1.png"].height / 2;

			var bmd = this.game.add.bitmapData(streetW, streetHeight);
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, streetW, streetHeight);
			bmd.ctx.fillStyle = '#abadb0';
			bmd.ctx.fill();
			var drawnObject = this.game.add.sprite(0, this.objArr["house1.png"].y + this.objArr["house1.png"].height / 2, bmd);
			drawnObject.parent.setChildIndex(drawnObject, 0);
		}
	}, {
		key: "createCity",
		value: function createCity() {
			this.houseGroup = this.game.add.group(this.game.world, 'houses', false);
			this.houseGroup.add(this.objArr["house1.png"]);
			this.houseGroup.add(this.objArr["house2.png"]);
			var _y = this.objArr["city1.png"].y - this.objArr["city1.png"].height / 2 - 10;
			this.bg1 = this.game.add.tileSprite(0, _y, this.game.width * 2, this.objArr["city1.png"].height, 'pack', 'city1.png');
			this.bg1.parent.setChildIndex(this.bg1, 0);
			var _y2 = this.objArr["city2.png"].y - this.objArr["city2.png"].height / 2 - 10;
			this.bg2 = this.game.add.tileSprite(0, _y2, this.game.width * 2, this.objArr["city2.png"].height, 'pack', 'city2.png');
			this.bg2.parent.setChildIndex(this.bg2, 1);
			var _y3 = this.objArr["city3.png"].y - this.objArr["city3.png"].height / 2;
			this.bg3 = this.game.add.tileSprite(0, _y3, this.game.width * 2, this.objArr["city3.png"].height, 'pack', 'city3.png');
			this.bg3.parent.setChildIndex(this.bg3, 2);
			this.objArr["city1.png"].visible = false;
			this.objArr["city2.png"].visible = false;
			this.objArr["city3.png"].visible = false;
			for (var i = 0; i < 5; i++) {
				var houseBase;
				if (i % 2 == 0) {
					houseBase = this.objArr["house1.png"];
				} else {
					houseBase = this.objArr["house2.png"];
				}
				var cloneHouse = this.game.add.sprite(this.objArr["house2.png"].x + this.objArr["house2.png"].width / 2 + this.objArr["house2.png"].width * i, houseBase.y - houseBase.height / 2, houseBase.key, houseBase.frameName, this.houseGroup);
			}
		}
	}, {
		key: "update",
		value: function update() {
			//this.glowFilter.update();
		}
	}, {
		key: "setTrasform",
		value: function setTrasform(s) {
			//console.log(s.frameName);
			var f = s.frameName; //.replace(".png","");
			var jsonData = this.game.cache.getJSON("transform");
			s.position.set(jsonData[f].x, jsonData[f].y);
			s.scale.set(jsonData[f].sx, jsonData[f].sy);
			s.angle = jsonData[f].r;
			s.anchor.set(0.5);
		}
	}]);

	return Scene2;
}(Phaser.State);

exports.default = Scene2;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
		}
	}return function (Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	};
}();

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

function _possibleConstructorReturn(self, call) {
	if (!self) {
		throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	}return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Scene3 = function (_Phaser$State) {
	_inherits(Scene3, _Phaser$State);

	function Scene3() {
		_classCallCheck(this, Scene3);

		return _possibleConstructorReturn(this, (Scene3.__proto__ || Object.getPrototypeOf(Scene3)).apply(this, arguments));
	}

	_createClass(Scene3, [{
		key: "preload",
		value: function preload() {
			console.log("preload");
			this.game.load.json("transform", "images/scene3.json");
			//this.game.load.atlasJSONHash("pack","images/textureImage.png","images/textureData.json");
		}
	}, {
		key: "create",
		value: function create() {
			//	let center = { x: this.game.world.centerX, y: this.game.world.centerY }
			//	let text = new RainbowText(this.game, center.x, center.y, "- phaser -\nwith a sprinkle of\nES6 dust!");
			//	text.anchor.set(0.5);
			this.chilliFall = false;
			this.speed = 1;
			this.game.score = 0;
			this.game.physics.startSystem(Phaser.Physics.ARCADE);
			this.game.physics.setBoundsToWorld();
			this.game.stage.backgroundColor = "#36d6fc";
			this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			this.objArr = {};
			var jsonData = this.game.cache.getJSON("transform");
			for (var i in jsonData) {
				this.objArr[i] = this.game.add.sprite(0, 0, 'pack', i);
				this.setTrasform(this.objArr[i]);
			}
			this.g = null;this.onFloor = true;
			this.createStreet();
			this.createCity();
			this.centerObjects();
			this.game.world.bringToTop(this.objArr["red2.png"]);
			this.createChilli();
			this.createTapEvents();
			this.createGift();
			this.createCockroach();
			this.createScoreBoard();
			//console.log(this.game.chilliName);
			this.game.welcomeSound.fadeOut(500);
			this.game.runSound.fadeIn(500, true);
		}
	}, {
		key: "createTapEvents",
		value: function createTapEvents() {
			this.game.input.enabled = true;
			this.game.input.onTap.add(onScreenTap, this);
			var self = this;
			function onScreenTap(p, d) {
				//console.log('tap');
				if (this.onFloor) {
					this.onFloor = false;
					TweenMax.to(this.chilli, 0.4, { repeat: 1, yoyo: true, y: "-=250", onComplete: function onComplete() {
							self.chilli.animations.play('run');
							self.onFloor = true;
						} });
					this.chilli.animations.play('jump');
					this.game.jumpSound.play();
				}
			}
		}
	}, {
		key: "createChilli",
		value: function createChilli() {
			var chilliName;
			if (this.game.chilliName) {
				chilliName = String(this.game.chilliName).replace("2.png", "");
			} else {
				chilliName = "red";
			}
			this.chilli = this.game.add.sprite(this.objArr["red2.png"].x, this.objArr["red2.png"].y, 'pack', chilliName + '_run0001.png');
			this.chilli.autoCull = true;
			this.chilli.checkWorldBounds = true;
			this.chilli.animations.add('fall', Phaser.Animation.generateFrameNames(chilliName + '_fall', 1, 2, '.png', 4), 60, false, false);
			this.chilli.animations.add('run', Phaser.Animation.generateFrameNames(chilliName + '_run', 1, 15, '.png', 4), 60, true, false);
			this.chilli.animations.add('jump', Phaser.Animation.generateFrameNames(chilliName + '_jump', 1, 20, '.png', 4), 60, false, false);
			this.chilli.animations.play('run');

			this.chilli.anchor.set(0.5);
			this.game.physics.arcade.enable(this.chilli);

			var nw = this.chilli.body.width / 2;
			var nh = this.chilli.body.height;
			if (window.landscape) {
				this.chilli.body.setSize(nw, nh, nw, 0);
			} else {
				this.chilli.body.setSize(nh, nw, -nh / 4, nw);
			}
			this.objArr["red2.png"].visible = false;
			this.objArr["hit_star.png"].visible = false;
		}
	}, {
		key: "createCockroach",
		value: function createCockroach() {
			this.cockroach = this.game.add.sprite(this.game.canvas.width * 3, this.chilli.y + 20, 'pack', 'cockroach_run0001.png');
			this.cockroach.animations.add('run', Phaser.Animation.generateFrameNames('cockroach_run', 1, 11, '.png', 4), 60, true, false);
			this.cockroach.animations.play('run');
			this.game.physics.arcade.enable(this.cockroach);
			var nw, nh;

			nw = this.cockroach.body.width / 4;
			nh = this.cockroach.body.height / 2;
			if (window.landscape) {
				this.cockroach.body.setSize(nw, nh, nw, nh * 2);
			} else {
				this.cockroach.body.setSize(nh, nw, -nh * 2, nw);
			}

			this.cockroach.checkWorldBounds = true;
			this.cockroach.events.onEnterBounds.add(this.onCockroachinBounds, this);
		}
	}, {
		key: "onCockroachinBounds",
		value: function onCockroachinBounds() {
			//console.log("I'm cockroach")
			this.game.cockroachSound.play();
		}
	}, {
		key: "createScoreBoard",
		value: function createScoreBoard() {
			if (window.landscape) {
				this.objArr['giftico.png'].x = this.game.canvas.width - this.objArr['giftico.png'].width;
			} else {
				this.objArr['giftico.png'].x = this.game.canvas.height - this.objArr['giftico.png'].width;
			}

			this.scoreBoard = this.game.add.bitmapText(12, -12, 'font', this.game.score, 30);
			this.objArr['giftico.png'].addChild(this.scoreBoard);
		}
	}, {
		key: "createGift",
		value: function createGift() {
			//	this.giftGroup = this.game.add.group(this.game.world,'gifts',true,true,new Phaser.physics.ARCADE());
			this.giftGroup = this.game.add.physicsGroup();
			for (var i = 0; i < 5; i++) {
				var rd = Math.floor(Math.random() * 3); //console.log(rd);
				//	let gift = this.game.add.sprite(i*(200+Math.random()*300),Math.random()*200,'pack','gift'+(rd+1)+'.png');
				var gift = this.giftGroup.create(i * (200 + Math.random() * 300), Math.random() * 200, 'pack', 'gift' + (rd + 1) + '.png');
				//let gift = this.game.add.sprite(i*(200+Math.random()*300),Math.random()*200,'pack','gift'+(rd+1)+'.png')
				gift.checkWorldBounds = true;
				gift.events.onOutOfBounds.add(this.giftOutBounds, this);
				var score = void 0;
				if (rd == 2) {
					score = 2;
				} else {
					score = 1;
				}
				var scoreText = this.game.add.bitmapText(0, 0, 'font', "+" + score.toString(), 40);
				gift.addChild(scoreText);
				scoreText.visible = false;
				scoreText.gift = gift;
				gift.scoreText = scoreText;
				gift.score = score;
			}
			this.giftGroup.x += this.game.canvas.width / 2;
			this.giftGroup.y = this.chilli.y - 300;
		}
	}, {
		key: "giftOutBounds",
		value: function giftOutBounds(gift) {
			if (gift.x <= 0) {
				var limitW = void 0;
				if (window.landscape) {
					limitW = this.game.width;
				} else {
					limitW = this.game.height;
				}
				gift.x += limitW + Math.random() * limitW;
			}
		}
	}, {
		key: "createStreet",
		value: function createStreet() {
			var streetW = void 0;
			if (window.landscape) {
				streetW = this.game.width;
			} else {
				streetW = this.game.height;
			}
			this.objArr["street.png"].visible = false;
			var _y = this.objArr["street.png"].y - this.objArr["street.png"].height / 2;
			this.street = this.game.add.tileSprite(0, _y, streetW, this.objArr["street.png"].height, 'pack', 'street.png');
			this.street.parent.setChildIndex(this.street, 0);

			var streetHeight = 768 - this.objArr["house1.png"].y + this.objArr["house1.png"].height / 2;

			var bmd = this.game.add.bitmapData(streetW, streetHeight);
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, streetW, streetHeight);
			bmd.ctx.fillStyle = '#abadb0';
			bmd.ctx.fill();
			var drawnObject = this.game.add.sprite(0, this.objArr["house1.png"].y + this.objArr["house1.png"].height / 2, bmd);
			drawnObject.parent.setChildIndex(drawnObject, 0);
		}
	}, {
		key: "createCity",
		value: function createCity() {
			//this.game.paused = true; 
			this.houseGroup = this.game.make.group(this.game.world, 'houses', false);
			this.houseGroup.add(this.objArr["house1.png"]);
			this.houseGroup.add(this.objArr["house2.png"]);
			this.objArr["house1.png"].anchor.set(0.5);
			this.objArr["house2.png"].anchor.set(0.5);
			//this.houseGroup.angle = -45;
			//this.houseGroup.updateTransform();
			var w = this.objArr["house1.png"].width + this.objArr["house2.png"].width;
			var h = this.objArr["house1.png"].height;
			var houseBmd = this.game.make.bitmapData(this.houseGroup.width, this.game.width);
			houseBmd.drawGroup(this.houseGroup);
			//	this.b = houseBmd.addToWorld();
			//	this.b.angle = -90;
			//	this.b.y+=this.game.width;
			//	console.log(this.b.x+" "+this.b.y);
			this.objArr["house1.png"].visible = this.objArr["house2.png"].visible = false;
			this.houses = this.game.add.tileSprite(0, 0, w * 20, this.game.height, houseBmd);

			var _y = this.objArr["city1.png"].y - this.objArr["city1.png"].height / 2 - 10;
			this.bg1 = this.game.add.tileSprite(0, _y, this.game.width * 2, this.objArr["city1.png"].height, 'pack', 'city1.png');
			this.bg1.parent.setChildIndex(this.bg1, 0);
			var _y2 = this.objArr["city2.png"].y - this.objArr["city2.png"].height / 2 - 10;
			this.bg2 = this.game.add.tileSprite(0, _y2, this.game.width * 2, this.objArr["city2.png"].height, 'pack', 'city2.png');
			this.bg2.parent.setChildIndex(this.bg2, 1);
			var _y3 = this.objArr["city3.png"].y - this.objArr["city3.png"].height / 2;
			this.bg3 = this.game.add.tileSprite(0, _y3, this.game.width * 2, this.objArr["city3.png"].height, 'pack', 'city3.png');
			this.bg3.parent.setChildIndex(this.bg3, 2);

			this.objArr["city1.png"].visible = false;
			this.objArr["city2.png"].visible = false;
			this.objArr["city3.png"].visible = false;
		}
	}, {
		key: "centerObjects",
		value: function centerObjects() {
			this.g = this.game.add.group(this.game.world, 'title', false);
			//this.g.add(this.objArr["title.png"]);
			//g.add(this.objArr["logo.png"]);
			//this.g.add(this.objArr["red.png"]);
			//this.g.add(this.objArr["green.png"]);
			//this.g.add(this.objArr["red2.png"]);
			//this.g.add(this.objArr["green2.png"]);
			//this.g.add(this.objArr["gift1.png"]);
			//this.g.add(this.objArr["gift2.png"]);
			//this.g.add(this.objArr["button.png"]);
			//this.g.add(this.objArr["play_txt.png"]);
			//this.g.add(this.objArr["button1.png"]);
			//this.g.add(this.objArr["discover_txt.png"]);
			//g.pivot.set(0.5);
			if (window.landscape) {
				this.g.x = this.game.world.centerX - this.g.getLocalBounds().width / 2 - this.g.getLocalBounds().x; //- g.getBounds().x;
			} else {
				this.g.x = this.game.world.centerY - this.g.getLocalBounds().width / 2 - this.g.getLocalBounds().x;
			}
		}
	}, {
		key: "update",
		value: function update() {
			//	this.b.angle++;
			//	console.log(this.b.angle);
			this.houses.x -= 1 * this.speed;

			this.bg1.x -= 0.1 * this.speed;
			this.bg2.x -= 0.2 * this.speed;
			this.bg3.x -= 0.3 * this.speed;
			this.street.x -= 4 * this.speed;
			//this.giftGroup.x-=5*this.speed;
			this.cockroach.x -= 10 * this.speed;
			if (this.cockroach.x < -100) {
				var limitW = void 0;
				if (window.landscape) {
					limitW = this.game.width;
				} else {
					limitW = this.game.height;
				}
				this.cockroach.x = limitW + Math.random() * (limitW * 4);
			}
			if (this.street.x < -40) {
				this.street.x = 0;
			}

			this.giftGroup.forEachExists(this.onGiftMoving, this);
			if (!this.chilliFall) {
				this.game.physics.arcade.overlap(this.chilli, this.giftGroup, this.onGiftCollide, null, this);
				this.game.physics.arcade.collide(this.chilli, this.cockroach, this.onHitCockroach, null, this);
			}
		}
	}, {
		key: "onGiftMoving",
		value: function onGiftMoving(gift) {
			gift.x -= 5 * this.speed;
		}
	}, {
		key: "onHitCockroach",
		value: function onHitCockroach(chilli, cockroach) {
			this.chilliFall = true;
			this.game.input.onTap.removeAll();
			//this.chilli.animations.paused = true;

			this.cockroach.animations.paused = true;
			//this.speed = 0;
			TweenMax.killAll();
			//this.objArr["hit_star.png"].visible = true;
			//this.objArr["hit_star.png"].x = chilli.x;
			//this.objArr["hit_star.png"].y = (chilli.y+cockroach.y)/2;
			//this.objArr["hit_star.png"].bringToTop();
			//this.game.state.start("Scene4",true);
			//this.game.paused = true;
			TweenMax.to(this, 1, { speed: 0 });
			TweenMax.to(this.chilli, 0.5, { angle: 280 });
			TweenMax.to(this.chilli, 1, { bezier: { type: "soft", values: [{ y: "-=100" }, { y: "+=100" }] }, ease: Bounce.easeOut });
			this.chilli.animations.play("fall");
			this.game.hitSound.play();
			this.game.runSound.fadeOut(500);
			this.game.time.events.add(Phaser.Timer.SECOND * 3, this.endGame, this).autoDestroy = true;
		}
	}, {
		key: "endGame",
		value: function endGame() {
			this.game.state.start("Scene4", true);
		}
	}, {
		key: "onGiftCollide",
		value: function onGiftCollide(chilli, gift) {
			//	gift.destroy();
			//if(gift.visible === true){
			this.world.addChild(gift.scoreText);
			gift.scoreText.visible = true;
			TweenMax.to(gift.scoreText, 0.5, { y: "-=200", onComplete: function onComplete() {
					gift.addChild(gift.scoreText);
					gift.scoreText.x = gift.scoreText.y = 0;
					gift.scoreText.visible = false;
				} });
			gift.scoreText.x = chilli.x;
			gift.scoreText.y = chilli.y;
			this.game.score += gift.score;
			//console.log(gift.score);
			this.scoreBoard.setText(this.game.score);
			var limitW = void 0;
			if (window.landscape) {
				limitW = this.game.width;
			} else {
				limitW = this.game.height;
			}
			gift.x += limitW + Math.random() * limitW;
			this.speed += 0.05;

			this.game.earnSound.play();
			//	}
		}
	}, {
		key: "render",
		value: function render() {
			//this.game.debug.cameraInfo(this.game.camera, 32, 32);
			//this.game.debug.body(this.chilli);
			//this.game.debug.body(this.cockroach);
		}
	}, {
		key: "setTrasform",
		value: function setTrasform(s) {
			//console.log(s.frameName);
			var f = s.frameName; //.replace(".png","");
			var jsonData = this.game.cache.getJSON("transform");
			//s.pivot.set(0.5,0.5);
			s.position.set(jsonData[f].x, jsonData[f].y);
			s.scale.set(jsonData[f].sx, jsonData[f].sy);
			s.angle = jsonData[f].r;
			s.anchor.set(0.5);
		}
	}]);

	return Scene3;
}(Phaser.State);

exports.default = Scene3;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
		}
	}return function (Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	};
}();

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

function _possibleConstructorReturn(self, call) {
	if (!self) {
		throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	}return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Scene4 = function (_Phaser$State) {
	_inherits(Scene4, _Phaser$State);

	function Scene4() {
		_classCallCheck(this, Scene4);

		return _possibleConstructorReturn(this, (Scene4.__proto__ || Object.getPrototypeOf(Scene4)).apply(this, arguments));
	}

	_createClass(Scene4, [{
		key: "preload",
		value: function preload() {
			console.log("preload");
			this.game.load.json("transform", "images/scene4.json");
			//this.game.load.atlasJSONHash("pack","images/textureImage.png","images/textureData.json");
		}
	}, {
		key: "create",
		value: function create() {
			//	let center = { x: this.game.world.centerX, y: this.game.world.centerY }
			//	let text = new RainbowText(this.game, center.x, center.y, "- phaser -\nwith a sprinkle of\nES6 dust!");
			//	text.anchor.set(0.5);
			this.print = false;
			this.game.stage.backgroundColor = "#d9f6fc";
			this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			this.objArr = {};
			var jsonData = this.game.cache.getJSON("transform");
			for (var i in jsonData) {
				this.objArr[i] = this.game.add.sprite(0, 0, 'pack', i);
				this.setTrasform(this.objArr[i]);
			}
			this.createStreet();
			this.createCity();
			this.centerObjects();
			//this.game.swapChildren(this.objArr["red2.png"],this.houseGroup);
			this.g.bringToTop(this.objArr["red2.png"]);
			this.g.bringToTop(this.objArr["green2.png"]);
			this.createScoreBoard();
			//console.log(this.objArr["red2.png"].parent.name+" "+this.houseGroup.parent.name);
			this.game.endSound.play();
			
		}
	}, {
		key: "createStreet",
		value: function createStreet() {
			var streetW = void 0;
			if (window.landscape) {
				streetW = this.game.width;
			} else {
				streetW = this.game.height;
			}
			this.objArr["street.png"].visible = false;
			var _y = this.objArr["street.png"].y - this.objArr["street.png"].height / 2;
			this.street = this.game.add.tileSprite(0, _y, streetW, this.objArr["street.png"].height, 'pack', 'street.png');
			this.street.parent.setChildIndex(this.street, 0);

			var streetHeight = 768 - this.objArr["house1.png"].y + this.objArr["house1.png"].height / 2;

			var bmd = this.game.add.bitmapData(streetW, streetHeight);
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, streetW, streetHeight);
			bmd.ctx.fillStyle = '#abadb0';
			bmd.ctx.fill();
			var drawnObject = this.game.add.sprite(0, this.objArr["house1.png"].y + this.objArr["house1.png"].height / 2, bmd);
			drawnObject.parent.setChildIndex(drawnObject, 0);
		}
	}, {
		key: "createCity",
		value: function createCity() {
			this.houseGroup = this.game.add.group(this.game.world, 'houses', false);
			this.houseGroup.add(this.objArr["house1.png"]);
			this.houseGroup.add(this.objArr["house2.png"]);
			var _y = this.objArr["city1.png"].y - this.objArr["city1.png"].height / 2 - 10;
			this.bg1 = this.game.add.tileSprite(0, _y, this.game.width * 2, this.objArr["city1.png"].height, 'pack', 'city1.png');
			this.bg1.parent.setChildIndex(this.bg1, 0);
			var _y2 = this.objArr["city2.png"].y - this.objArr["city2.png"].height / 2 - 10;
			this.bg2 = this.game.add.tileSprite(0, _y2, this.game.width * 2, this.objArr["city2.png"].height, 'pack', 'city2.png');
			this.bg2.parent.setChildIndex(this.bg2, 1);
			var _y3 = this.objArr["city3.png"].y - this.objArr["city3.png"].height / 2;
			this.bg3 = this.game.add.tileSprite(0, _y3, this.game.width * 2, this.objArr["city3.png"].height, 'pack', 'city3.png');
			this.bg3.parent.setChildIndex(this.bg3, 2);
			this.objArr["city1.png"].visible = false;
			this.objArr["city2.png"].visible = false;
			this.objArr["city3.png"].visible = false;
			for (var i = 0; i < 5; i++) {
				var houseBase;
				if (i % 2 == 0) {
					houseBase = this.objArr["house1.png"];
				} else {
					houseBase = this.objArr["house2.png"];
				}
				var cloneHouse = this.game.add.sprite(this.objArr["house2.png"].x + this.objArr["house2.png"].width / 2 + this.objArr["house2.png"].width * i, houseBase.y - houseBase.height / 2, houseBase.key, houseBase.frameName, this.houseGroup);
			}
			//this.objArr["red2.png"].parent.setChildIndex(this.objArr["red2.png"],20);
		}
	}, {
		key: "update",
		value: function update() {
			//this.houseGroup.x--;
		}
	}, {
		key: "createScoreBoard",
		value: function createScoreBoard() {
			//Thử lại nhé? Lượt chơi vừa rồi bạn được...điểm!
			if (window.landscape) {
				this.objArr["board.png"].x = this.game.width / 2;
				this.boardTxt = this.game.add.bitmapText(this.game.width / 2, this.game.height / 2 - 50, 'font', 'THỬ LẠI NHÉ\nBẠN VỪA ĐƯỢC ' + this.game.score + ' ĐIỂM!', 60);
			} else {
				this.objArr["board.png"].x = this.game.height / 2;
				this.boardTxt = this.game.add.bitmapText(this.game.height / 2, this.game.width / 2 - 50, 'font', 'THỬ LẠI NHÉ\nBẠN VỪA ĐƯỢC ' + this.game.score + ' ĐIỂM!', 60);
			}
			this.world.bringToTop(this.objArr["board.png"]);
			//this.game.cache.getBitmapFont('font').font.lineHeight = 80;

			this.boardTxt.align = "center";
			
			//this.boardTxt.scale.set(0.8);
			//this.boardTxt.updateTransform();
			//this.boardTxt.y-=this.boardTxt.textHeight/2+50;
			//this.objArr["board.png"].addChild(this.boardTxt);
			this.objArr["board.png"].alpha = 0.5;
			//this.boardTxt.x -= this.boardTxt.getBounds().width*0.8/2;
			this.boardTxt.anchor.set(0.5);
			this.boardTxt.parent.bringToTop(this.boardTxt);
			TweenMax.from(this.objArr["board.png"], 1, { y: "+=" + this.game.height / 2, ease: Elastic.easeOut });
			TweenMax.from(this.objArr["red2.png"], 1, { x: "-=" + this.game.width / 2 });
			TweenMax.from(this.objArr["green2.png"], 1, { x: "+=" + this.game.width / 2 });

			TweenMax.from(this.objArr["button.png"], 1, { y: "+=" + this.game.height / 2 });
			//	TweenMax.from(this.objArr["button1.png"],1,{y:"+="+this.game.height/2});
			TweenMax.from(this.objArr["button3.png"], 1, { y: "+=" + this.game.height / 2 });
			TweenMax.from(this.objArr["replay_txt.png"], 1, { y: "+=" + this.game.height / 2 });
			TweenMax.from(this.objArr["share_txt.png"], 1, { y: "+=" + this.game.height / 2 });
			TweenMax.from(this.objArr["cha_friends.png"], 1, { y: "+=" + this.game.height / 2 });

			this.boardTxt.tint = 0x140474;
			for (var i = 0; i < this.boardTxt.children.length; i++) {
				this.boardTxt.getChildAt(i).scale.set(0);
				this.boardTxt.getChildAt(i).anchor.set(0.5);
				this.boardTxt.updateTransform();
				TweenMax.from(this.boardTxt.getChildAt(i), 1, { delay: 0.5 + i / 30, alpha: 0 });
				TweenMax.to(this.boardTxt.getChildAt(i).scale, 1, { delay: 0.5 + i / 30, y: 0.9, x: 0.9, ease: Elastic.easeOut });
				TweenMax.to(this.boardTxt.getChildAt(i).anchor, 1, { delay: 0.5 + i / 30, y: 0, x: 0, ease: Elastic.easeOut });
			}
			this.objArr["button3.png"].inputEnabled = true;
			this.objArr["button3.png"].events.onInputDown.add(this.onReplayTouch, this);
			this.objArr["button.png"].inputEnabled = true;
			this.objArr["button.png"].events.onInputDown.add(this.onShareTouch, this);
			this.objArr["cha_friends.png"].inputEnabled = true;
			this.objArr["cha_friends.png"].events.onInputDown.add(this.onChallengeTouch, this);
			var hidShareBtn = document.getElementById("btn_share");
			hidShareBtn.onclick = function() { window.onShareClick(); }; 
		}
	}, {
		key: "onChallengeTouch",
		value: function onChallengeTouch() {
			if (window.landscape) {
				this.objArr["logo.png"].x = this.game.width / 2;
			} else {
				this.objArr["logo.png"].x = this.game.height / 2;
			}
			this.objArr["logo.png"].y = this.objArr["red2.png"].y;
			this.game.world.bringToTop(this.objArr["logo.png"]);
			this.objArr["logo.png"].scale.set(1.5);
			this.objArr["red2.png"].visible = this.objArr["green2.png"].visible = false;
			this.boardTxt.text = 'BẠN VỪA ĐƯỢC ' + this.game.score + ' ĐIỂM!';
			this.objArr["button.png"].visible = false;
			//this.g.add(this.objArr["button1.png"]);
			this.objArr["button3.png"].visible = false;
			this.objArr["replay_txt.png"].visible = false;
			this.objArr["share_txt.png"].visible = false;
			this.objArr["cha_friends.png"].visible = false;
			this.game.selectSound.play();
			window.onChallengeClick();
			//this.game.world.pivot.set(0.5,0.5);
			//this.game.world.scale.set(-1);
			// this.print = true;
		}
	}, {
		key: "render",
		value: function render() {
			if (this.print) {
				this.print = false;
				window.onShareClick();
				// var hidShareBtn = document.getElementsByClassName("btn_share");
				// hidShareBtn.addEventListener('click', window.onShareClick());

				console.log("paused");
			}
		}
	}, {
		key: "onShareTouch",
		value: function onShareTouch() {
			if (window.landscape) {
				this.objArr["logo.png"].x = this.game.width / 2;
			} else {
				this.objArr["logo.png"].x = this.game.height / 2;
			}
			this.objArr["logo.png"].y = this.objArr["red2.png"].y;
			this.game.world.bringToTop(this.objArr["logo.png"]);
			this.objArr["logo.png"].scale.set(1.5);
			this.objArr["red2.png"].visible = this.objArr["green2.png"].visible = false;
			this.boardTxt.text = 'BẠN VỪA ĐƯỢC ' + this.game.score + ' ĐIỂM!';
			this.objArr["button.png"].visible = false;
			//this.g.add(this.objArr["button1.png"]);
			this.objArr["button3.png"].visible = false;
			this.objArr["replay_txt.png"].visible = false;
			this.objArr["share_txt.png"].visible = false;
			this.objArr["cha_friends.png"].visible = false;
			this.game.selectSound.play();
			//this.game.world.pivot.set(0.5,0.5);
			//this.game.world.scale.set(-1);
			this.print = true;
		}
	}, {
		key: "onReplayTouch",
		value: function onReplayTouch() {
			this.game.selectSound.play();
			this.game.firstPlay = true;
			this.game.state.start("Scene2", true);
		}
	}, {
		key: "centerObjects",
		value: function centerObjects() {
			this.g = this.game.add.group(this.game.world, 'title', false);
			this.g.add(this.objArr["title.png"]);
			//this.g.add(this.objArr["logo.png"]);
			this.g.add(this.objArr["red.png"]);
			this.g.add(this.objArr["green.png"]);
			this.g.add(this.objArr["red2.png"]);
			this.g.add(this.objArr["green2.png"]);
			this.g.add(this.objArr["gift1.png"]);
			this.g.add(this.objArr["gift2.png"]);
			//this.g.add(this.objArr["board.png"]);
			this.g.add(this.objArr["button.png"]);
			//this.g.add(this.objArr["button1.png"]);
			this.g.add(this.objArr["button3.png"]);
			this.g.add(this.objArr["replay_txt.png"]);
			this.g.add(this.objArr["share_txt.png"]);
			this.g.add(this.objArr["cha_friends.png"]);
			//this.g.add(this.objArr["button.png"]);
			//this.g.add(this.objArr["play_txt.png"]);
			//this.g.add(this.objArr["button1.png"]);
			//this.g.add(this.objArr["discover_txt.png"]);
			//g.pivot.set(0.5);
			//this.objArr["giftico.png"].anchor.set(0); 
			//this.objArr["giftico.png"].x = this.game.canvas.width-this.objArr["giftico.png"].width-20;
			//	this.objArr["giftico.png"].y = this.game.canvas.height-this.objArr["giftico.png"].height-20;
			if (window.landscape) {
				this.g.x = this.game.world.centerX - this.g.getLocalBounds().width / 2 - this.g.getLocalBounds().x; //- g.getBounds().x;
			} else {
				this.g.x = this.game.world.centerY - this.g.getLocalBounds().width / 2 - this.g.getLocalBounds().x;
			}
		}
	}, {
		key: "setTrasform",
		value: function setTrasform(s) {
			//console.log(s.frameName);
			var f = s.frameName; //.replace(".png","");
			var jsonData = this.game.cache.getJSON("transform");
			s.position.set(jsonData[f].x, jsonData[f].y);
			s.scale.set(jsonData[f].sx, jsonData[f].sy);
			s.angle = jsonData[f].r;
			s.anchor.set(0.5);
			s.updateTransform();
		}
	}]);

	return Scene4;
}(Phaser.State);

exports.default = Scene4;

},{}]},{},[1])
//# sourceMappingURL=game.js.map
