/**
	The rendering class is responsible for drawing everything at the canvas.
	It works using a buffer of sprites, so you can use it alone, adding sprites to it.
	Sprites are arranged into layers, so to speed up the rendering process.
	You can have as much layers as you wish, although remember that, the more layers you have, the slower the rendering will be.
	Animations are also handled by the class.

	@class Render
*/

Joy.Render = {
	canvas: null,
	context: null,
	rate: 30,
	spriteBuffer: [],

	/**
		Initializes the renderer.

		@method Setup
		@param canvas {Object} Canvas to be used on the rendering.
		@param [fps] {Number} Number of Frames Per Second to be rendered.
	*/
	Setup: function (canvas, fps) {
		this.canvas = canvas;
		this.context = this.canvas.getContext("2d");
		this.rate = typeof fps == 'undefined' ? this.rate : fps;
	},

	/**
		Adds a sprite to the rendering buffer.

		@method AddToBuffer
		@param sprite {Object} The sprite to be added.
		@param sprite.asset {Object} An Image object containing the sprite.
		@param sprite.x {Number} The horizontal position.
		@param sprite.y {Number} The vertical position.
		@param [layer] {Number} The layer where the sprite will be rendered. If none is specified, then the top layer is used.
	*/
	AddToBuffer: function (sprite, layer) {
		layer = typeof layer == 'undefined' ? this.spriteBuffer.length - 1 : layer;
		var l = this.spriteBuffer[layer];

		if (typeof this.spriteBuffer[layer] == 'undefined') {
			this.spriteBuffer[layer] = [];
		}

		this.spriteBuffer[layer].push(sprite);
	},

	RemoveFromBuffer: function () {
		//
	},

	/**
		Clears the entire screen.

		@method Clear
	*/
	Clear: function () {
		this.context.clearRect(0, 0, 320, 240);
	},

	/**
		Renders everything in the buffer to the screen.

		@method Render
	*/
	Render: function () {
		this.Clear();

		for (var layer in this.spriteBuffer) {
			for (var sprite in this.spriteBuffer[layer]) {
				// TODO: check for visibility/position and render only what is needed.
				this.RenderSprite(this.spriteBuffer[layer][sprite]);
			}
		}
	},

	/**
		Renders a single sprite.

		@method RenderSprite
		@param sprite {Object} The sprite object.
	*/
	RenderSprite: function (sprite) {
		this.context.drawImage(sprite.asset, sprite.x, sprite.y);
	}
};
