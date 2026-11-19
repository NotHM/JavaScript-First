/**
 * Teacher Reference: Native Node 18+ async/await fetch() pattern with HTTP error checking.
 * Compare directly with 03-AJAX/code/ajaxClientDemo.js for an offline-testable run.
 */
async function fetchResource(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP request failed with status ${response.status}`);
  }
  return response.json();
}

module.exports = { fetchResource };
