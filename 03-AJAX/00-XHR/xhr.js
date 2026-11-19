/**
 * Teacher Reference: Browser XMLHttpRequest (XHR) Pattern
 * Note: Execute inside a browser page containing #get-btn and #post-btn elements.
 */
function sendHttpRequest(method, url, data) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.responseType = 'json';
    if (data) {
      xhr.setRequestHeader('Content-Type', 'application/json');
    }
    xhr.onload = () => {
      if (xhr.status >= 400) {
        reject(new Error(`XHR Error ${xhr.status}`));
      } else {
        resolve(xhr.response);
      }
    };
    xhr.onerror = () => reject(new Error('Network connection failed'));
    xhr.send(data ? JSON.stringify(data) : null);
  });
}

if (typeof document !== 'undefined') {
  const getBtn = document.getElementById('get-btn');
  const postBtn = document.getElementById('post-btn');
  if (getBtn) {
    getBtn.addEventListener('click', () => sendHttpRequest('GET', '/api/todos'));
  }
  if (postBtn) {
    postBtn.addEventListener('click', () => sendHttpRequest('POST', '/api/todos', { task: 'Demo' }));
  }
}