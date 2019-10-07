import { html } from '@polymer/polymer/polymer-element';
import fabric from './lib/fabric.esm';

/**
 * @polymer
 * @mixinFunction
 */
export const FabricCanvasMixin = superClass =>
  class CanvasMixin extends superClass {
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

    static get version() {
      return '0.2.0';
    }

    static get properties() {
      return {
        width: Number,
        height: Number
      };
    }

    constructor(isStatic = false) {
      super();
      this._surfaceClass = isStatic ? 'StaticCanvas' : 'Canvas';
    }

    ready() {
      super.ready();
      this.fabric = fabric;
      this.canvas = new fabric[this._surfaceClass](this.$.canvas, this._getCanvasOptions());
      this.setDimensions();
      this.addEventListener('iron-resize', this._onResize);
      this.$.slot.addEventListener('slotchange', this._onSlotChange.bind(this));
    }

    static get observers() {
      return ['setDimensions(width, height)'];
    }

    setDimensions(width, height) {
      const boundingRect = this.parentElement.getBoundingClientRect();

      if (width) {
        this._width = width || 400;
      } else {
        this._width = boundingRect.width;
        if (this.assignedSlot && this.assignedSlot.parentElement) {
          this._width = Number.parseInt(getComputedStyle(this.assignedSlot.parentElement).width);
        }
      }

      if (height) {
        this._height = height || 400;
      } else {
        this._height = boundingRect.height;
        if (this.assignedSlot && this.assignedSlot.parentElement) {
          this._height = Number.parseInt(getComputedStyle(this.assignedSlot.parentElement).height);
        }
      }

      this.style.width = `${this._width}px`;
      this.style.height = `${this._height}px`;
      this.canvas.setWidth(this._width);
      this.canvas.setHeight(this._height);
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
          const shapeName = node.tagName.replace('FABRIC-', '').toLowerCase();
          const shapeClass = shapeName[0].toUpperCase() + shapeName.substring(1);
          if (fabric[shapeClass]) {
            const options = this._getShapeOptions(node);
            const fabricShape = this._getFabricShape(shapeClass, options);
            this.canvas.add(fabricShape);
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

    _getCanvasOptions() {
      const options = {};
      Array.from(this.attributes)
        .filter(attr => !!attr.name.match(/^opt-.*/))
        .forEach(attr => {
          const optName = attr.name
            .replace('opt-', '')
            .split('-')
            .map((c, i) => (i === 0 ? c : c[0].toUpperCase() + c.substring(1)))
            .join('');
          options[optName] = this._parseAttrValue(attr.value);
        });
      return options;
    }

    _getShapeOptions(node) {
      const options = {};
      Array.from(node.attributes).forEach(attr => {
        const optName = attr.name
          .split('-')
          .map((c, i) => (i === 0 ? c : c[0].toUpperCase() + c.substring(1)))
          .join('');
        options[optName] = this._parseAttrValue(attr.value);
      });
      if (node.tagName.includes('TEXT')) {
        options.text = node.innerText;
        node.innerText = '';
      }
      return options;
    }

    _getFabricShape(shapeClass, options) {
      let fabricShape;
      if (shapeClass === 'Path' && options.path) {
        fabricShape = new fabric[shapeClass](options.path, options);
      } else if (shapeClass.includes('Text') && options.text) {
        fabricShape = new fabric[shapeClass](options.text, options);
      } else {
        fabricShape = new fabric[shapeClass](options);
      }
      return fabricShape;
    }
  };
