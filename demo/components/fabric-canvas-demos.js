import { PolymerElement, html } from '@polymer/polymer/polymer-element';

/**
 * `fabric-canvas-demos`
 * @class FabricCanvasDemos
 * @extends {PolymerElement}
 */
class FabricCanvasDemos extends DemoReadyEventEmitter(FabricCanvasDemo(PolymerElement)) {
  static get template() {
    return html`
      <style include="vaadin-component-demo-shared-styles">
        :host {
          display: block;
        }
      </style>

      <h3>Adding shapes <code>JS</code></h3>
      <vaadin-demo-snippet id="fabric-canvas-demos-adding-shapes-js">
        <template preserve-content>
          <fabric-canvas></fabric-canvas>
          <script>
            window.addDemoReadyListener('#fabric-canvas-demos-adding-shapes-js', function(document) {
              const rect = new fabric.Rect({
                top: 100,
                left: 100,
                width: 200,
                height: 200,
                fill: 'red'
              });

              document.querySelector('fabric-canvas').add(rect);
            });
          </script>
        </template>
      </vaadin-demo-snippet>

      <h3>Adding shapes <code>HTML</code></h3>
      <vaadin-demo-snippet id="fabric-canvas-demos-adding-shapes-html">
        <template preserve-content>
          <fabric-canvas>
            <fabric-rect top="100" left="100" width="200" height="200" fill="green"></fabric-rect>
          </fabric-canvas>
        </template>
      </vaadin-demo-snippet>

      <h3>Adding shapes and text <code>HTML</code></h3>
      <vaadin-demo-snippet id="fabric-canvas-demos-adding-shapes-and-text-html">
        <template preserve-content>
          <fabric-canvas opt-viewport-transform="[1,0,0,1,200,0]">
            <fabric-path path="M 100 350 l 150 -300" stroke="red" stroke-width="5" fill="transparent"></fabric-path>
            <fabric-path path="M 250 50 l 150 300" stroke="red" stroke-width="5" fill="transparent"></fabric-path>
            <fabric-path path="M 175 200 l 150 0" stroke="green" stroke-width="5" fill="transparent"></fabric-path>
            <fabric-path path="M 100 350 q 150 -300 300 0" stroke="blue" stroke-width="5" fill=""></fabric-path>
            <fabric-circle left="95" top="345" radius="5"></fabric-circle>
            <fabric-circle left="245" top="45" radius="5"></fabric-circle>
            <fabric-circle left="395" top="345" radius="5"></fabric-circle>
            <fabric-i-text font-family="sans-serif" font-size="30" fill="black" left="70" top="330">A</fabric-i-text>
            <fabric-i-text font-family="sans-serif" font-size="30" fill="black" left="240" top="10">B</fabric-i-text>
            <fabric-i-text font-family="sans-serif" font-size="30" fill="black" left="410" top="330">C</fabric-i-text>
          </fabric-canvas>
        </template>
      </vaadin-demo-snippet>
    `;
  }

  static get is() {
    return 'fabric-canvas-demos';
  }
}

customElements.define(FabricCanvasDemos.is, FabricCanvasDemos);
