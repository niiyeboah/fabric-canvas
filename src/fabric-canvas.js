import { PolymerElement } from '@polymer/polymer/polymer-element';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import { IronResizableBehavior } from '@polymer/iron-resizable-behavior';
import { FabricCanvasMixin } from './fabric-canvas-mixin';
import fabric from './lib/fabric.esm';

/**
 * `<fabric-canvas>` Web Component wrapper of fabric.js
 *
 * ```html
 * <fabric-canvas></fabric-canvas>
 * ```
 *
 * @demo demo/index.html
 * @polymerBehavior IronResizableBehavior
 * @appliesMixin FabricCanvasMixin
 */
class FabricCanvas extends FabricCanvasMixin(mixinBehaviors([IronResizableBehavior], PolymerElement)) {
  static get is() {
    return 'fabric-canvas';
  }

  static get properties() {
    return {
      canvas: fabric.Canvas
    };
  }
}

customElements.define(FabricCanvas.is, FabricCanvas);

export { fabric };
