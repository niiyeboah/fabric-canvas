import { html, PolymerElement } from '@polymer/polymer/polymer-element';

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
class FabricCanvas extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
    `;
  }

  static get is() {
    return 'fabric-canvas';
  }

  static get version() {
    return '0.1.0';
  }

  static get properties() {
    return {};
  }
}

customElements.define(FabricCanvas.is, FabricCanvas);
