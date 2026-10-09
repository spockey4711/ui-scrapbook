export const C = (slug, title, description, hint, html, css, js) => ({slug, title, description, hint, html, css, js});
export const button = (label, attrs = '', classes = '', type = 'button') => `<button type="${type}" class="btn ${classes}" ${attrs}>${label}</button>`;
export const chip = (label, attrs = '') => `<button type="button" class="chip" ${attrs}>${label}</button>`;
export const status = (value = '') => `<p class="status" role="status">${value}</p>`;
export const label = (name, input) => `<label>${name}${input}</label>`;
export const checks = items => items.map(item => `<label class="check-row"><input type="checkbox"><span>${item}</span></label>`).join('');
