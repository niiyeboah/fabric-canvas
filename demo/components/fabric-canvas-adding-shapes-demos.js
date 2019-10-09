import { PolymerElement, html } from '@polymer/polymer/polymer-element';

/**
 * `fabric-canvas-adding-shapes-demos`
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
      <!-- 
      <h3>
        <a href="api/#/elements/FabricCanvas">API documentation ↗</a>
        &nbsp;|&nbsp;
        <a href="https://stackblitz.com/edit/fabric-canvas?file=index.html">Live code ↗</a>
      </h3> 
      -->
      <h3>Basic <code>JS</code></h3>
      <vaadin-demo-snippet id="fabric-canvas-adding-shapes-demos-basic-js">
        <template preserve-content>
          <fabric-canvas></fabric-canvas>
          <script>
            window.addDemoReadyListener('#fabric-canvas-adding-shapes-demos-basic-js', function(document) {
              // To use the fabric.js API to create shapes, use util and helpers etc.
              // you must first import the fabric module like so:
              // import { fabric } from 'fabric-canvas';

              const fc = document.querySelector('fabric-canvas');

              const rect = new fabric.Rect({
                top: 100,
                left: 100,
                width: 200,
                height: 200,
                fill: 'red'
              });

              fc.canvas.add(rect);
            });
          </script>
        </template>
      </vaadin-demo-snippet>

      <h3>Basic <code>HTML</code></h3>
      <vaadin-demo-snippet id="fabric-canvas-adding-shapes-demos-basic-html">
        <template preserve-content>
          <fabric-canvas>
            <fabric-rect top="100" left="100" width="200" height="200" fill="green"></fabric-rect>
          </fabric-canvas>
        </template>
      </vaadin-demo-snippet>

      <h3>Advanced <code>HTML</code></h3>
      <vaadin-demo-snippet id="fabric-canvas-adding-shapes-demos-advanced-html">
        <template preserve-content>
          <fabric-canvas opt-viewport-transform="[1,0,0,1,220,0]">
            <fabric-path path="M 100 350 l 150 -300" stroke="red" stroke-width="5" fill=""></fabric-path>
            <fabric-path path="M 250 50 l 150 300" stroke="red" stroke-width="5" fill=""></fabric-path>
            <fabric-path path="M 175 200 l 150 0" stroke="green" stroke-width="5" fill=""></fabric-path>
            <fabric-path path="M 100 350 q 150 -300 300 0" stroke="blue" stroke-width="5" fill=""></fabric-path>
            <fabric-circle left="95" top="345" radius="5"></fabric-circle>
            <fabric-circle left="245" top="45" radius="5"></fabric-circle>
            <fabric-circle left="395" top="345" radius="5"></fabric-circle>
            <fabric-text font-family="sans-serif" font-size="30" fill="black" left="70" top="330">A</fabric-text>
            <fabric-text font-family="sans-serif" font-size="30" fill="black" left="240" top="10">B</fabric-text>
            <fabric-text font-family="sans-serif" font-size="30" fill="black" left="410" top="330">C</fabric-text>
          </fabric-canvas>
        </template>
      </vaadin-demo-snippet>
    `;
  }

  static get is() {
    return 'fabric-canvas-adding-shapes-demos';
  }
}

customElements.define(FabricCanvasAddingShapesDemos.is, FabricCanvasAddingShapesDemos);
