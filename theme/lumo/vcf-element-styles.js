const theme = document.createElement('dom-module');
theme.id = '--elementname---lumo';
theme.setAttribute('theme-for', '--elementname--');
theme.innerHTML = `
    <template>
      <style>
        :host {}
      </style>
    </template>
  `;
theme.register(theme.id);
