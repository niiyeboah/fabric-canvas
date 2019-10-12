import { PolymerElement, html } from '@polymer/polymer/polymer-element';

/**
 * `fabric-static-canvas-demos`
 * @class FabricStaticCanvasDemos
 * @extends {PolymerElement}
 */
class FabricStaticCanvasDemos extends DemoReadyEventEmitter(FabricCanvasDemo(PolymerElement)) {
  static get template() {
    return html`
      <style include="vaadin-component-demo-shared-styles">
        :host {
          display: block;
        }
      </style>

      <h3>Adding shapes <code>JS</code></h3>
      <vaadin-demo-snippet id="fabric-static-canvas-demos-adding-shapes-js">
        <template preserve-content>
          <fabric-static-canvas></fabric-static-canvas>
          <script>
            window.addDemoReadyListener('#fabric-static-canvas-demos-adding-shapes-js', function(document) {
              const ellipse = new fabric.Ellipse({
                top: 100,
                left: 100,
                rx: 100,
                ry: 100,
                fill: 'yellow'
              });

              document.querySelector('fabric-static-canvas').add(ellipse);
            });
          </script>
        </template>
      </vaadin-demo-snippet>

      <h3>Adding shapes <code>HTML</code></h3>
      <vaadin-demo-snippet id="fabric-static-canvas-demos-adding-shapes-html">
        <template preserve-content>
          <fabric-static-canvas>
            <fabric-ellipse top="100" left="100" rx="100" ry="100" fill="blue"></fabric-ellipse>
          </fabric-static-canvas>
        </template>
      </vaadin-demo-snippet>
    `;
  }

  static get is() {
    return 'fabric-static-canvas-demos';
  }
}

customElements.define(FabricStaticCanvasDemos.is, FabricStaticCanvasDemos);
