import '@vaadin/vaadin-demo-helpers/vaadin-demo-ready-event-emitter';
import './components/vaadin-demo-snippet';
import './fabric-canvas-demo';
import '@vaadin/vaadin-demo-helpers/vaadin-component-demo';
import './components/demo-links';

import './components/fabric-canvas-adding-shapes-demos';
import './components/fabric-canvas-static-canvas-demos';

import '../src/fabric-static-canvas';
import { fabric } from '../src/fabric-canvas';

window.fabric = fabric;

window.addEventListener('VaadinDemoReady', () => {
  document.querySelector('main').classList.remove('hidden');

  // Remove tab links
  if (!window.linksRemoved) {
    const demo = document.querySelector('vaadin-component-demo');
    const tabs = demo.shadowRoot.querySelectorAll('vaadin-tab');
    Array.from(tabs).forEach(tab => {
      const a = tab.children[0];
      const text = a.innerText;
      a.remove();
      tab.innerText = text;
    });
    window.linksRemoved = true;
  }
});

// Disable page routing
window.addEventListener('DOMContentLoaded', () => {
  const demo = document.querySelector('vaadin-component-demo');
  demo.$.appLocation.remove();
  demo.$.appRoute.remove();
});
