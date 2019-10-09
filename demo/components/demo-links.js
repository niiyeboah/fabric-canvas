import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@vaadin/vaadin-button';
import '@polymer/iron-icon';
import '@polymer/iron-icons';

class DemoLinks extends PolymerElement {
  static get is() {
    return 'demo-links';
  }

  static get properties() {
    return {
      apiUrl: String,
      codeUrl: String
    };
  }

  static get template() {
    return html`
      <style>
        :host {
          position: fixed;
          bottom: 1vh;
          right: 2vw;
        }
        .links-container {
          display: flex;
          margin: 0 auto;
          color: var(--lumo-primary-contrast-color);
          align-self: center;
          padding: var(--lumo-space-l);
          flex-direction: column;
          justify-content: space-evenly;
        }
        .links-container code {
          align-self: center;
        }
        .links-container span {
          flex-grow: 1;
          font-size: 0.6em;
          align-self: center;
          opacity: 0.6;
        }
        a:first-child {
          margin-bottom: var(--lumo-space-m);
        }
        a vaadin-button {
          cursor: pointer;
          margin-left: var(--lumo-space-s);
        }
        vaadin-button {
          background: #009688;
          padding: var(--lumo-space-m);
          height: auto;
          width: auto;
          border-radius: 50%;
          box-shadow: var(--lumo-box-shadow-m);
          color: var(--lumo-primary-contrast-color);
        }

        @media screen and (max-width: 1300px) {
          :host {
            position: unset;
          }
          .links-container {
            flex-direction: row;
            justify-content: left;
            width: 60rem;
          }
          a:first-child {
            margin-bottom: 0;
            margin-right: var(--lumo-space-m);
          }
        }
      </style>
      <div class="links-container">
        <a href="[[apiUrl]]">
          <vaadin-button id="api" title="API documentation ↗">
            <iron-icon icon="icons:description"></iron-icon>
          </vaadin-button>
        </a>

        <a href="[[codeUrl]]">
          <vaadin-button title="Live code ↗">
            <iron-icon icon="icons:code"></iron-icon>
          </vaadin-button>
        </a>
      </div>
    `;
  }

  ready() {
    super.ready();
    this.$.api.addEventListener('click', () => {
      window.location.reload();
      window.location.href = this.apiUrl;
    });
  }
}

customElements.define(DemoLinks.is, DemoLinks);
