import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { GestureEventListeners } from '@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import '@polymer/marked-element/marked-element.js';
import '@polymer/prism-element/prism-highlighter.js';
import { ThemableMixin } from '@vaadin/vaadin-themable-mixin/vaadin-themable-mixin.js';
import { LightDomHelper } from '@vaadin/vaadin-demo-helpers/vaadin-light-dom-helper';
import './vaadin-demo-shadow-dom-renderer.js';
import '@vaadin/vaadin-demo-helpers/vaadin-demo-iframe-renderer';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import '@vaadin/vaadin-demo-helpers/vaadin-demo-ready-event-emitter';

const documentContainer = document.createElement('template');

documentContainer.innerHTML = `<dom-module id="vaadin-demo-snippet-default-theme">
  <template>
    <style>
      /**
       * atom-dark theme for prism.js
       * Based on Atom's atom-dark theme: https://github.com/atom/atom-dark-syntax
       * @author Joe Gibson (@gibsjose)
       */

      code[class*="language-"],
      pre[class*="language-"],
      code[class*="lang-"],
      pre[class*="lang-"] {
        color: #c5c8c6;
        text-shadow: 0 1px rgba(0, 0, 0, 0.3);
        font-family: Inconsolata, Monaco, Consolas, 'Courier New', Courier, monospace;
        direction: ltr;
        text-align: left;
        white-space: pre;
        word-spacing: normal;
        word-break: normal;
        line-height: 1.5;

        -moz-tab-size: 4;
        -o-tab-size: 4;
        tab-size: 4;

        -webkit-hyphens: none;
        -moz-hyphens: none;
        -ms-hyphens: none;
        hyphens: none;
      }

      /* Code blocks */
      pre[class*="language-"],
      pre[class*="lang-"] {
        padding: 1em;
        margin: .5em 0;
        overflow: auto;
        border-radius: 0.3em;
      }

      :not(pre) > code[class*="language-"],
      pre[class*="language-"],
      :not(pre) > code[class*="lang-"],
      pre[class*="lang-"]  {
        background: #1d1f21;
      }

      /* Inline code */
      :not(pre) > code[class*="language-"],
      :not(pre) > code[class*="lang-"] {
        padding: .1em;
        border-radius: .3em;
      }

      .token.comment,
      .token.prolog,
      .token.doctype,
      .token.cdata {
        color: #7C7C7C;
      }

      .token.punctuation {
        color: #c5c8c6;
      }

      .namespace {
        opacity: .7;
      }

      .token.property,
      .token.keyword,
      .token.tag {
        color: #96CBFE;
      }

      .token.class-name {
        color: #FFFFB6;
        text-decoration: underline;
      }

      .token.boolean,
      .token.constant {
        color: #99CC99;
      }

      .token.symbol,
      .token.deleted {
        color: #f92672;
      }

      .token.number {
        color: #FF73FD;
      }

      .token.selector,
      .token.attr-name,
      .token.string,
      .token.char,
      .token.builtin,
      .token.inserted {
        color: #A8FF60;
      }

      .token.variable {
        color: #C6C5FE;
      }

      .token.operator {
        color: #EDEDED;
      }

      .token.entity {
        color: #FFFFB6;
        /* text-decoration: underline; */
      }

      .token.url {
        color: #96CBFE;
      }

      .language-css .token.string,
      .lang-css .token.string,
      .style .token.string {
        color: #87C38A;
      }

      .token.atrule,
      .token.attr-value {
        color: #F9EE98;
      }

      .token.function {
        color: #DAD085;
      }

      .token.regex {
        color: #E9C062;
      }

      .token.important {
        color: #fd971f;
      }

      .token.important,
      .token.bold {
        font-weight: bold;
      }
      .token.italic {
        font-style: italic;
      }

      .token.entity {
        cursor: help;
      }
    </style>
  </template>
</dom-module>`;

document.head.appendChild(documentContainer.content);
let instanceIndex = 0;
class VaadinDemoSnippet extends ThemableMixin(GestureEventListeners(PolymerElement)) {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          background-color: white;
          box-shadow: var(--lumo-box-shadow-xs);
          margin-bottom: 3em;
          @apply --demo-snippet;
        }

        #demo {
          display: block;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          margin: 0;
          @apply --demo-snippet-demo;
        }

        .code-container {
          margin: 0;
          background-color: #282a36;
          font-size: 0.85em;
          overflow: auto;
          position: relative;
          padding: 0;
          @apply --demo-snippet-code;
        }

        .code-container .code {
          padding: 1.4em 2em;
          margin: 0;
          overflow: auto;
          @apply --demo-snippet-code;
        }

        .code-container .code > pre {
          margin: 0;
        }

        .code-container button {
          position: absolute;
          top: 0.5em;
          right: 0.5em;
          text-transform: uppercase;
          border: none;
          border-radius: 0.25em;
          cursor: pointer;
          background: rgba(0, 0, 0, 0.3);
          color: #fff;
        }

        .code-container button:focus,
        .code-container button:hover {
          background: rgba(0, 0, 0, 0.6);
        }
      </style>

      <prism-highlighter></prism-highlighter>

      <div id="demo">
        <template is="dom-if" if="[[_isIframe]]" restamp="">
          <vaadin-demo-iframe-renderer
            src="[[iframeSrc]]"
            id="[[id]]"
            demo-components-root="[[demoComponentsRoot]]"
            no-toolbar="[[noToolbar]]"
          >
            <slot></slot>
          </vaadin-demo-iframe-renderer>
        </template>
        <template is="dom-if" if="[[!_isIframe]]" restamp="">
          <vaadin-demo-shadow-dom-renderer id="[[id]]">
            <slot></slot>
          </vaadin-demo-shadow-dom-renderer>
        </template>
      </div>

      <div class="code-container">
        <marked-element markdown="[[_markdown]]" id="marked">
          <div class="code" slot="markdown-html"></div>
        </marked-element>
        <button id="copyButton" title="copy to clipboard" on-tap="_copyToClipboard">Copy</button>
      </div>
    `;
  }

  static get is() {
    return 'vaadin-demo-snippet';
  }

  static get properties() {
    return {
      id: {
        type: String,
        value: () => {
          return `vaadin-demo-snippet-${instanceIndex++}`;
        }
      },
      iframeSrc: String,
      demoComponentsRoot: String,
      noToolbar: Boolean,
      whenDefined: String,
      _isIframe: {
        type: Boolean,
        value: false,
        computed: '_computeIsIframe(iframeSrc)'
      },
      _markdown: String
    };
  }

  ready() {
    super.ready();

    if (this.hasAttribute('ignore-ie') && !!navigator.userAgent.match(/Trident/)) {
      let node = this.previousSibling;
      while (!(node instanceof VaadinDemoSnippet)) {
        const drop = node;
        node = node.previousSibling;
        drop.parentNode.removeChild(drop);
      }
      this.parentNode.removeChild(this);
      return;
    }

    LightDomHelper.querySelectorAsync('template', this)
      .then(template => {
        try {
          const host = this.getRootNode().host.getRootNode().host;
          // set the root directory for lazy loaded elements in demos
          this.demoComponentsRoot = `${host.srcBaseHref}/demo-elements`;
        } catch (e) {
          console.error('Unable to get the `baseHref` from the <vaadin-component-demo>');
        }
        this._showDemo(template);
      })
      .catch(error => {
        throw new Error('vaadin-demo-snippet requires a <template> child');
      });
  }

  _computeIsIframe(iframeSrc) {
    return typeof iframeSrc === 'string' && iframeSrc.trim() !== '';
  }

  _showDemo(template) {
    const replacement = this.whenDefined
      ? `customElements.whenDefined('${this.whenDefined}').then(function() `
      : `window.addEventListener('WebComponentsReady', function() `;

    // Hide the use of window.addDemoReadyListener
    let snippet = this.$.marked
      .unindent(template.innerHTML)
      .replace(/window\.addDemoReadyListener\('[^{]+/g, replacement);

    // Hide the use of window.Vaadin.demoComponentsRoot
    snippet = snippet.replace(/`(\${Vaadin\.Demo\.componentsRoot})(.+)`/gi, `'$2'`);

    // Hide the use of window.__importModule for dynamic imports
    snippet = snippet.replace(/(Vaadin\.Demo\.import\(')/gi, `import('.`);

    // Remove style-scoped classes that are appended when ShadyDOM is enabled
    Array.from(this.classList).forEach(e => (snippet = snippet.replace(new RegExp('\\s*' + e, 'g'), '')));
    snippet = snippet.replace(/ class=""/g, '');

    // Boolean properties are displayed as checked="", so remove the ="" bit.
    snippet = snippet.replace(/=""/g, '');
    this._markdown = '```html\n' + snippet.trim() + '```';
  }

  _copyToClipboard() {
    // From https://github.com/google/material-design-lite/blob/master/docs/_assets/snippets.js
    const snipRange = document.createRange();
    const selectedSource = this.shadowRoot.querySelector('marked-element > .code');
    snipRange.selectNodeContents(selectedSource);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(snipRange);
    let result = false;
    try {
      result = document.execCommand('copy');
      this.$.copyButton.textContent = 'done';
    } catch (err) {
      // Copy command is not available
      console.error(err);
      this.$.copyButton.textContent = 'error';
    }

    // Return to the copy button after a second.
    setTimeout(this._resetCopyButtonState.bind(this), 1000);

    selection.removeAllRanges();
    return result;
  }

  _resetCopyButtonState() {
    this.$.copyButton.textContent = 'copy';
  }
}
customElements.define(VaadinDemoSnippet.is, VaadinDemoSnippet);
