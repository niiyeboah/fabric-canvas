import { html, PolymerElement } from '@polymer/polymer/polymer-element';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import { IronResizableBehavior } from '@polymer/iron-resizable-behavior/iron-resizable-behavior.js';
import fabric from './lib/fabric.esm';

/**
 * `<fabric-canvas>` Web Component wrapper of fabric.js
 *
 * ```html
 * <fabric-canvas></fabric-canvas>
 * ```
 *
 * ### Styling
 *
 * The following custom properties are available for styling:
 *
 * Custom property | Description | Default
 * ----------------|-------------|-------------
 * `--fabric-canvas-property` | Example custom property | `unset`
 *
 * The following shadow DOM parts are available for styling:
 *
 * Part name | Description
 * ----------------|----------------
 * `part` | Example part
 *
 * The following state attributes are available for styling:
 *
 * Attribute    | Description | Part name
 * -------------|-------------|------------
 * `attribute` | Example styling attribute | :host
 *
 * @demo demo/index.html
 */
class FabricCanvas extends mixinBehaviors([IronResizableBehavior], PolymerElement) {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <slot id="slot"></slot>
      <canvas id="canvas" part="canvas" width="[[width]]" height="[[height]]"></canvas>
    `;
  }

  static get is() {
    return 'fabric-canvas';
  }

  static get version() {
    return '0.1.0';
  }

  /**
   * @property {object} canvas
   * @property {number} width
   * @property {number} height
   */
  static get properties() {
    return {
      canvas: fabric.Canvas,
      width: {
        type: Number,
        value: 400
      },
      height: {
        type: Number,
        value: 400
      }
    };
  }

  ready() {
    super.ready();
    const options = {};
    Array.from(this.attributes)
      .filter(attr => !!attr.name.match(/^opt-.*/))
      .map(attr => {
        const optName = attr.name
          .replace('opt-', '')
          .split('-')
          .map((c, i) => (i === 0 ? c : c[0].toUpperCase() + c.substring(1)))
          .join('');
        options[optName] = this._parseAttrValue(attr.value);
      });
    this.canvas = new fabric.Canvas(this.$.canvas, options);
    this.setDimensions();
    this.addEventListener('iron-resize', this._onResize);
    this.$.slot.addEventListener('slotchange', this._onSlotChange.bind(this));
  }

  setDimensions() {
    const boundingRect = this.parentElement.getBoundingClientRect();
    this.width = boundingRect.width;
    this.height = boundingRect.height;
    if (this.assignedSlot && this.assignedSlot.parentElement) {
      this.width = Number.parseInt(getComputedStyle(this.assignedSlot.parentElement).width);
      this.height = Number.parseInt(getComputedStyle(this.assignedSlot.parentElement).height);
    }
    this.style.width = `${this.width}px`;
    this.style.height = `${this.height}px`;
    this.canvas.setWidth(this.width);
    this.canvas.setHeight(this.height);
  }

  _onResize() {
    if (this._resizeId) clearTimeout(this._resizeId);
    this._resizeId = setTimeout(() => {
      this._resizeId = null;
      this.setDimensions();
    }, 500);
  }

  _onSlotChange() {
    this.$.slot.assignedNodes().forEach(node => {
      if (node.nodeType !== 3 && node.tagName.match(/^FABRIC-.*/)) {
        const shape = node.tagName.replace('FABRIC-', '').toLowerCase();
        const shapeClass = shape[0].toUpperCase() + shape.substring(1);
        if (fabric[shapeClass]) {
          const options = {};
          Array.from(node.attributes).map(attr => {
            options[attr.name] = isNaN(attr.value) ? attr.value : Number(attr.value);
          });
          let shapeObj;
          if (shape === 'path' && options.path) {
            shapeObj = new fabric[shapeClass](options.path, options);
          } else {
            shapeObj = new fabric[shapeClass](options);
          }
          this.canvas.add(shapeObj);
        }
      }
    });
  }

  _parseAttrValue(value) {
    let parsed = value.trim();
    if (parsed[0] === '[') {
      try {
        parsed = JSON.parse(value);
      } catch (e) {
        console.error(e);
      }
    } else if (!isNaN(parsed)) {
      parsed = Number.parseFloat(value);
    }
    return parsed;
  }
}

customElements.define(FabricCanvas.is, FabricCanvas);
