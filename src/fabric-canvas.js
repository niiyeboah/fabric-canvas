import { PolymerElement } from '@polymer/polymer/polymer-element';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import { IronResizableBehavior } from '@polymer/iron-resizable-behavior';
import { FabricCanvasMixin } from './fabric-canvas-mixin';
import fabric from './lib/fabric.esm';

/**
 * `<fabric-canvas>`
 * Web Component wrapper of [fabric.Canvas](http://fabricjs.com/docs/fabric.Canvas.html)
 *
 * ```html
 * <fabric-canvas></fabric-canvas>
 * ```
 *
 * @demo demo/index.html
 * @polymer
 * @polymerBehavior IronResizableBehavior
 * @appliesMixin FabricCanvasMixin
 */
class FabricCanvas extends FabricCanvasMixin(mixinBehaviors([IronResizableBehavior], PolymerElement)) {
  static get is() {
    return 'fabric-canvas';
  }

  static get properties() {
    return {
      /**
       * Main rendering surface.
       * @type {fabric.Canvas}
       */
      canvas: Object
    };
  }

  constructor() {
    super(false);
  }
}

customElements.define(FabricCanvas.is, FabricCanvas);

export { fabric, FabricCanvas };
