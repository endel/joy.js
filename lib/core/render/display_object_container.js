/**
 * @class DisplayObjectContainer
 */
(function(J) {
  var DisplayObjectContainer = J.DisplayObject.extend({
    init: function() {
      this._super();
      this.displayObjects = [];
    },

    render: function() {
      var i = 0, length = this.displayObjects.length;
      this.ctx.save();
      this._super();

      for (; i<length; ++i) {
        if (!this.displayObjects[i].visible) { continue; }

        if (this.displayObjects[i].hasContextOperations) { this.ctx.save(); }
        this.displayObjects[i].render();
        if (this.displayObjects[i].hasContextOperations) { this.ctx.restore(); }

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

    removeChild: function(displayObject) {
      // TODO
    },

    removeChildAt: function(index) {
      // TODO
    }
  });

  // Export module
  J.DisplayObjectContainer = DisplayObjectContainer;
})(Joy);
