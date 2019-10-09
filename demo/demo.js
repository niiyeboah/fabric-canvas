import '@vaadin/vaadin-demo-helpers/vaadin-demo-ready-event-emitter';
import './components/vaadin-demo-snippet';
import './fabric-canvas-demo';
import '@vaadin/vaadin-demo-helpers/vaadin-component-demo';
import './components/demo-links';

import '../src/fabric-static-canvas';
import { fabric } from '../src/fabric-canvas';

window.fabric = fabric;

window.addEventListener('VaadinDemoReady', () => {
  document.querySelector('main').classList.remove('hidden');
});
