(function(J) {
  var DisplayObjectContainer = J.DisplayObject.extend({
    /**
     * @class DisplayObjectContainer
     * @extends DisplayObject
     * @constructor
     */
    init: function() {
      this._super();
      this.displayObjects = [];

      /**
       * Number of children displayObject's attached to the container.
       * @property numChildren
       * @type {Number}
       * @readonly
       */
      this.__defineGetter__('numChildren', function() {
        return this.displayObjects.length;
      });
    },

    setContext: function(ctx) {
      this.ctx = ctx;
      var i = 0, length = this.displayObjects.length;
      for (; i<length; ++i) {
        this.displayObjects[i].setContext(ctx);
      }
    },

    render: function() {
      if (!this.visible) { return; }

      var i = 0, length = this.displayObjects.length;
      this.ctx.save();

      this.updateContext();
      this._super();

      for (; i<length; ++i) {
        if (!this.displayObjects[i].visible) { continue; }
        this.ctx.save();
        this.displayObjects[i].updateContext();
        this.displayObjects[i].render();
        this.displayObjects[i].trigger('update');
        this.ctx.restore();
      }

      this.ctx.restore();
    },

    /**
     * Swap index of two DisplayObjects
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
      this.displayObjects[ child1Index ] = child2;
      this.displayObjects[ child2.index ] = child1;

      // Swap indexes
      child1.index = child2.index;
      child2.index = child1Index;
      return this;
    },

    /**
     * Add a display object in the list.
     * @method addChild
     * @param {DisplayObject, DisplayObjectContainer}
     */
    addChild: function(displayObject) {
      displayObject.index = this.displayObjects.push(displayObject) - 1;
      displayObject._parent = this;
    },

    /**
     * Remove target child
     * @param {DisplayObject} displayObject
     * @return this
     */
    removeChild: function(displayObject) {
      return this.removeChildAt(displayObject.index);
    },

    /**
     * Remove child at specific index
     * @param {Number} index
     * @return this
     */
    removeChildAt: function(index) {
      this.displayObjects.splice(index, index+1);
      return this;
    }
  });

  // Export module
  J.DisplayObjectContainer = DisplayObjectContainer;
})(Joy);
