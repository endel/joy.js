/**
 * @module Joy
 */
(function(J) {
  var DisplayObjectContainer = J.DisplayObject.extend({
    /**
     * @class DisplayObjectContainer
     * @extends DisplayObject
     * @constructor
     */
    init: function(options) {
      if (!options) { options = {}; }

      /**
       * @attribute children
       * @type {Array}
       */
      this.children = [];

      /**
       * Number of children displayObject's attached to the container.
       * @attribute numChildren
       * @type {Number}
       * @readonly
       */
      Object.defineProperty(this, 'numChildren', {
        get: function () {
          return this.children.length;
        },
        configurable: true
      });

      Object.defineProperty(this, 'width', {
        get: function () {
          // Get child with greater width
          var width = 0;
          for (var i=0, length = this.children.length; i<length; ++i) {
            if (this.children[i].width > width) {
              width = this.children[i].width;
            }
          }
          return width;
        },
        configurable: true
      });

      Object.defineProperty(this, 'height', {
        get: function () {
          // Get child with greater height
          var height = 0;
          for (var i=0, length = this.children.length; i<length; ++i) {
            if (this.children[i].height > height) {
              height = this.children[i].height;
            }
          }
          return height;
        },
        configurable: true
      });

      this._super(options);

      // Add children after setup.
      if (options.children) {
        for (var i=0,length=options.children.length; i<length; ++i) {
          this.addChild(options.children[i]);
        }
      }
    },

    setContext: function(ctx) {
      this.ctx = ctx;
      var i = 0, length = this.children.length;
      for (; i<length; ++i) {
        this.children[i].setContext(ctx);
      }
    },

    render: function() {
      if (!this.visible) { return; }
      this.ctx.save();
      this.updateContext();

      this._super();
      this.renderChildren();

      this.ctx.restore();
    },

    renderChildren: function () {
      for (var i = 0, length = this.children.length; i<length; ++i) {
        if (!this.children[i].visible) { continue; }
        this.ctx.save();
        this.children[i].updateContext();
        this.children[i].render();
        this.children[i].trigger('update');
        this.ctx.restore();

        // Render collider, without any transformation
        if (J.debug) {
          this.children[i].collider.renderStroke(this.ctx);
        }
      }
    },

    /**
     * @method broadcast
     * @param {String}
     * @return {DisplayObjectContainer} this
     */
    broadcast: function (e, params) {
      this.trigger(e, params);
      for (var i = 0, length = this.children.length; i<length; ++i) {
        this.children[i].trigger(e, params);
      }
    },

    /**
     * Swap index of two children
     * @method swapChildren
     * @param {DisplayObject} child1
     * @param {DisplayObject} child2
     */
    swapChildren: function(child1, child2) {
      if (child1.parent !== child2.parent) {
        throw new Error("DisplayObject must be at same level to swap.");
      }

      var child1Index = child1.index;

      // Swap child references
      this.children[ child1Index ] = child2;
      this.children[ child2.index ] = child1;

      // Swap indexes
      child1.index = child2.index;
      child2.index = child1Index;
      return this;
    },

    /**
     * Add a display object in the list.
     * @method addChild
     * @param {DisplayObject | DisplayObjectContainer}
     * @return {DisplayObjectContainer} this
     */
    addChild: function(displayObject) {
      displayObject.setContext(this.ctx);
      displayObject.index = this.children.push(displayObject) - 1;
      displayObject._parent = this;

      if (displayObject.scene) {
        // Trigger ADDED event on target DisplayObject.
        displayObject.broadcast(J.Events.ADDED, [this]);
      }

      return this;
    },

    /**
     * Search for a child by id attribute
     * @method getChildById
     * @param {String} id
     * @return {DisplayObject}
     */
    getChildById: function (id) {
      for (var i = 0, length = this.children.length; i<length; ++i) {
        if (this.children[i].id == id) {
          return this.children[i];
        }
      }
    },

    /**
     * @method getChildAt
     * @param {Number} index
     * @return {DisplayObject}
     */
    getChildAt: function (index) {
      return this.children[index];
    },

    /**
     * Remove target child
     * @param {DisplayObject} displayObject
     * @return {DisplayObjectContainer} this
     */
    removeChild: function(displayObject) {
      var index = this.children.indexOf(displayObject);
      if (index !== -1) {
        this.removeChildAt(index);
      }
      return this;
    },

    /**
     * Remove child at specific index
     * @param {Number} index
     * @return {DisplayObjectContainer} this
     */
    removeChildAt: function(index) {
      var displayObject = this.children.splice(index, 1)[0];

      // Trigger REMOVED event on target DisplayObject.
      displayObject.trigger(J.Events.REMOVED, [this]);

      return this;
    }

  });

  // Export module
  J.DisplayObjectContainer = DisplayObjectContainer;
})(Joy);
