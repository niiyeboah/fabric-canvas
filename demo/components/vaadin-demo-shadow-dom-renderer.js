import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { LightDomHelper } from '@vaadin/vaadin-demo-helpers/vaadin-light-dom-helper';
import { ThemableMixin } from '@vaadin/vaadin-themable-mixin/vaadin-themable-mixin.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
let instanceIndex = 0;
class VaadinDemoShadowDomRenderer extends ThemableMixin(PolymerElement) {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          padding: 1.5em;
        }
      </style>
    `;
  }

  static get is() {
    return 'vaadin-demo-shadow-dom-renderer';
  }

  static get properties() {
    return {
      id: {
        type: String,
        value: () => {
          return `vaadin-demo-shadow-dom-${instanceIndex++}`;
        }
      }
    };
  }

  ready() {
    super.ready();
    LightDomHelper.querySelectorAsync('slot', this)
      .then(slot => {
        return LightDomHelper.querySlotContentAsync('template', slot);
      })
      .then(template => {
        this._showDemo(template);
      })
      .catch(error => {
        throw new Error('vaadin-demo-iframe-renderer requires a <template> child');
      });
  }

  _showDemo(template) {
    window.ShadyCSS.prepareTemplate(template, this.id);
    const dom = this.getRootNode().host._stampTemplate(template);
    const script = dom.querySelector('script');
    this.shadowRoot.appendChild(dom);
    if (script) {
      eval(script.innerText);
    }
  }
}
customElements.define(VaadinDemoShadowDomRenderer.is, VaadinDemoShadowDomRenderer);
