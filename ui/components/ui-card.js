//THIS IS AN EXAMPLE I PULLLED FROM THE INTERNET 


const tpl = document.createElement('template');
tpl.innerHTML = /*html*/`
  <style>
    :host {
      --card-bg: #111;
      --card-fg: #ddd;
      --accent: #4da3ff;
      display: block;
      border-radius: 12px;
      background: var(--card-bg);
      color: var(--card-fg);
      border: 1px solid color-mix(in srgb, var(--accent) 30%, transparent);
      padding: 12px 14px;
      font-family: system-ui, sans-serif;
    }
    header {
      display: flex; align-items: center; gap: 8px;
      justify-content: space-between;
      margin-bottom: 8px;
    }
    h3 { font-size: 14px; margin: 0; letter-spacing: .3px; }
    .pill {
      font-size: 12px; padding: 2px 8px; border-radius: 999px;
      background: color-mix(in srgb, var(--accent) 20%, transparent);
    }
    :host([variant="outline"]) { background: transparent; }
    .body { font-size: 13px; line-height: 1.5; }
    ::slotted([slot="actions"]) { margin-left: auto; }
  </style>
  <header>
    <h3 id="title"></h3>
    <span class="pill" id="count"></span>
    <slot name="actions"></slot>
  </header>
  <div class="body">
    <slot></slot>
  </div>
`;

export class UICard extends HTMLElement {
  static get observedAttributes() {
    return ['title','variant','count']; // react to attribute changes
  }
  constructor() {
    super();
    this._data = null;     // internal state
    this.attachShadow({ mode: 'open' }).append(tpl.content.cloneNode(true));
    this.$ = (sel) => this.shadowRoot.querySelector(sel);
    this._onToggle = this._onToggle.bind(this);
  }

  // ===== Properties (JS-side “props”) =====
  get data() { return this._data }
  set data(v) {
    this._data = v;
    // re-render any bits that depend on data
    this.$('.body')?.classList.toggle('has-data', !!v);
  }

  get count() { return Number(this.getAttribute('count') ?? 0) }
  set count(n) { this.setAttribute('count', String(n)) }

  // ===== Lifecycle =====
  connectedCallback() {
    // initial render
    this._renderTitle();
    this._renderCount();
    // example: listen to a click inside to raise an event upward
    this.addEventListener('click', this._onToggle);
  }
  disconnectedCallback() {
    this.removeEventListener('click', this._onToggle);
  }
  attributeChangedCallback(name, oldV, newV) {
    if (oldV === newV) return;
    if (name === 'title') this._renderTitle();
    if (name === 'count') this._renderCount();
    if (name === 'variant') {/* style reacts via :host([variant]) */}
  }

  // ===== DOM updates =====
  _renderTitle() { this.$('#title').textContent = this.getAttribute('title') ?? '' }
  _renderCount() {
    const el = this.$('#count');
    const n = this.count;
    el.textContent = n ? n : '';
    el.style.display = n ? '' : 'none';
  }

  // ===== Events upwards =====
  _onToggle(e) {
    // Up-bubble a semantic event (parent can listen)
    this.dispatchEvent(new CustomEvent('card:toggle', {
      detail: { source: 'ui-card', time: performance.now() },
      bubbles: true,
      composed: true
    }));
  }
}

customElements.define('ui-card', UICard);

console.log('ui-card initialized');