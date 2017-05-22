import Globalize from 'globalize';

const text = Globalize.formatMessage('message-1', {
  count: 3,
})

document.write(`<div>${text}</div>`);
