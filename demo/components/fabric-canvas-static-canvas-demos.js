import { PolymerElement, html } from '@polymer/polymer/polymer-element';

/**
 * `fabric-canvas-static-canvas-demos`
 * @class FabricCanvasAddingShapesDemos
 * @extends {PolymerElement}
 */
class FabricCanvasAddingShapesDemos extends DemoReadyEventEmitter(FabricCanvasDemo(PolymerElement)) {
  static get template() {
    return html`
      <style include="vaadin-component-demo-shared-styles">
        :host {
          display: block;
        }
      </style>

      <h3>Basic <code>HTML</code></h3>
      <vaadin-demo-snippet>
        <template preserve-content>
          <fabric-static-canvas>
            <fabric-ellipse top="100" left="100" rx="100" ry="100" fill="blue"></fabric-ellipse>
          </fabric-static-canvas>
        </template>
      </vaadin-demo-snippet>
    `;
  }

  static get is() {
    return 'fabric-canvas-static-canvas-demos';
  }
}

customElements.define(FabricCanvasAddingShapesDemos.is, FabricCanvasAddingShapesDemos);
