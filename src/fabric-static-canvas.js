import { PolymerElement } from '@polymer/polymer/polymer-element';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import { IronResizableBehavior } from '@polymer/iron-resizable-behavior';
import { FabricCanvasMixin } from './fabric-canvas-mixin';
import fabric from './lib/fabric.esm';

/**
 * `<fabric-static-canvas>` Web Component wrapper of fabric.js
 *
 * ```html
 * <fabric-static-canvas></fabric-static-canvas>
 * ```
 *
 * @demo demo/index.html
 * @polymerBehavior IronResizableBehavior
 * @appliesMixin FabricCanvasMixin
 */
class FabricStaticCanvas extends FabricCanvasMixin(mixinBehaviors([IronResizableBehavior], PolymerElement)) {
  static get is() {
    return 'fabric-static-canvas';
  }

  static get properties() {
    return {
      canvas: fabric.StaticCanvas
    };
  }

  constructor() {
    super(true);
  }
}

customElements.define(FabricStaticCanvas.is, FabricStaticCanvas);

export { fabric };
