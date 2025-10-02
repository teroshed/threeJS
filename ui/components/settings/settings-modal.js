




export function initSettingsModal() {
    

    const modal = document.createElement('template');
    modal.id = 'settings-modal';
    modal.innerHTML = `
        <div id="settings-modal-content">
            <div id="settings-modal-header">
                <h1>tests test </h1>
                <button id="settings-modal-close">Close</button>
            </div>
        </div>
    `;  //Write the correct html here please.
    

    customElements.define('settings-modal', class extends HTMLElement {
        connectedCallback() {
          this.attachShadow({ mode: 'open' }).append(modal.content.cloneNode(true));
          console.log('Settings modal initialized');
        }
      });

}

