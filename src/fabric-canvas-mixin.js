import { html } from '@polymer/polymer/polymer-element';
import fabric from './lib/fabric.esm';

/**
 * @polymer
 * @mixinFunction
 */
export const FabricCanvasMixin = superClass =>
  class FCanvasMixin extends superClass {
    static get template() {
      return html`
        <style>
          :host {
            display: block;
            height: 400px;
          }
        </style>
        <slot id="slot"></slot>
        <canvas id="canvas" part="canvas" width="[[width]]" height="[[height]]"></canvas>
      `;
    }

    static get version() {
      return '0.3.1';
    }

    static get properties() {
      return {
        width: Number,
        height: Number
      };
    }

    static get observers() {
      return ['setDimensions(width, height)'];
    }

    constructor(isStatic = true) {
      super();
      this._canvasClass = isStatic ? 'StaticCanvas' : 'Canvas';
    }

    ready() {
      super.ready();
      this.fabric = fabric;
      this.canvas = new fabric[this._canvasClass](this.$.canvas, this._getCanvasOptions());
      this.setDimensions();
      this.addEventListener('iron-resize', this._onResize);
      this.$.slot.addEventListener('slotchange', this._onSlotChange.bind(this));
    }

    get _counter() {
      return this.__counter === undefined ? (this.__counter = 0) : ++this.___counter;
    }

    setDimensions(width, height) {
      if (width) {
        this._width = width;
      } else if (this.parentElement) {
        this._width = this.parentElement.getBoundingClientRect().width;
      } else if (this.assignedSlot && this.assignedSlot.parentElement) {
        this._width = Number.parseInt(getComputedStyle(this.assignedSlot.parentElement).width);
      }

      if (height) {
        this._height = height;
      } else if (this.parentElement) {
        this._height = this.parentElement.getBoundingClientRect().height;
      } else if (this.assignedSlot && this.assignedSlot.parentElement) {
        this._height = Number.parseInt(getComputedStyle(this.assignedSlot.parentElement).height);
      }

      this.style.width = this._width ? `${this._width}px` : 'auto';
      this.style.height = `${this._height || 400}px`;
      this.canvas.setWidth(this._width || this.getBoundingClientRect().width);
      this.canvas.setHeight(this._height || this.getBoundingClientRect().width);
    }

    _onFabricCanvasUpdate(e) {
      const { id, prop, value } = e.detail;
      this.canvas.getObjects().filter(obj => obj.id === id)[0][prop] = value;
      this.canvas.renderAll();
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
            node.id = options.id;
            node.fabric = this._proxyProperties(options, node);
            node.addEventListener('fabric-canvas-update', e => this._onFabricCanvasUpdate(e));
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
      const options = { id: this._counter };
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

    _proxyProperties(obj, node) {
      return new Proxy(obj, {
        set: function(target, prop, value) {
          const event = new CustomEvent('fabric-canvas-update', {
            detail: {
              id: target.id,
              prop,
              value
            }
          });
          node.dispatchEvent(event);
          return Reflect.set(target, prop, value);
        }
      });
    }
  };
