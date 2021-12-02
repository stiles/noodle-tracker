/* Strip HTML tags out of the provided string */
export function stripHtml(s) {
  var div = document.createElement('div');
  div.innerHTML = s;
  return div.textContent || div.innerText || '';
}
