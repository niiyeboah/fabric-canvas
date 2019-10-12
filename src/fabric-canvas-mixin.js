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
      return '0.3.2';
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
      this.canvas = new fabric[this._canvasClass](this.$.canvas, this._getCanvasOptions());
      this.setDimensions();
      this.addEventListener('iron-resize', this._onResize);
      this.$.slot.addEventListener('slotchange', this._onSlotChange.bind(this));
    }

    get _counter() {
      return this.__counter === undefined ? (this.__counter = 0) : ++this.__counter;
    }

    get objects() {
      return this.canvas.getObjects();
    }

    add(...args) {
      this.canvas.add(...args);
      return this;
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
      this.canvas.setHeight(this._height || this.getBoundingClientRect().height);
    }

    _onFabricCanvasUpdate(e) {
      const { id, prop, value } = e.detail;
      this.objects.filter(obj => obj.id === id)[0].set(prop, value);
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
          const objectName = node.tagName.replace('FABRIC-', '').toLowerCase();
          const objectClass = this._camelCase(objectName, true);
          if (fabric[objectClass]) {
            const options = this._getObjectOptions(node);
            const fabricObject = this._getFabricObject(objectClass, options);
            this.add(fabricObject);
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
          const optionName = this._camelCase(attr.name.replace('opt-', ''));
          options[optionName] = this._parseAttrValue(attr.value);
        });
      return options;
    }

    _getObjectOptions(node) {
      const options = { id: this._counter };
      Array.from(node.attributes).forEach(attr => {
        const optionName = this._camelCase(attr.name);
        options[optionName] = this._parseAttrValue(attr.value);
      });
      if (node.tagName.includes('TEXT')) {
        options.text = node.innerText;
        node.innerText = '';
      }
      return options;
    }

    _getFabricObject(objectClass, options) {
      let fabricObject;
      if (objectClass === 'Path' && options.path) {
        fabricObject = new fabric[objectClass](options.path, options);
      } else if (objectClass.includes('Text') && options.text) {
        fabricObject = new fabric[objectClass](options.text, options);
      } else {
        fabricObject = new fabric[objectClass](options);
      }
      return fabricObject;
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

    _camelCase(str, pascalCase = false) {
      return str
        .split('-')
        .map((c, i) => (i === 0 && !pascalCase ? c : c[0].toUpperCase() + c.substring(1)))
        .join('');
    }
  };
