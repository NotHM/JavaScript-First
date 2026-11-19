/**
 * Unit 16 Semester Capstone Starter (AZ CTE Standards 1.0–19.0)
 * Run test check: node --test 0-student_files/projects/unit-16-semester-capstone/index.test.js
 */
const http = require('node:http');

function escapeHtml(raw) {
  // TODO [1.5]: Escape &, <, >, ", ' (as &amp;, &lt;, &gt;, &quot;, &#39;) cleanly
  return String(raw);
}

function projectSaasMetrics({ price, feeRate, infraPerUser, fixedCosts, churnRate, cac }) {
  // TODO [19.4, 19.7]: Compute { netPerUser, breakEvenUsers, ltv, ratio, healthy } (healthy when ratio >= 3)
  void price;
  void feeRate;
  void infraPerUser;
  void fixedCosts;
  void churnRate;
  void cac;
  return { netPerUser: 0, breakEvenUsers: 0, ltv: 0, ratio: 0, healthy: false };
}

function createCapstoneServer() {
  // TODO [11.4–11.7, 1.5, 16.5]: Add routes for GET /, GET /api/health, CRUD items, 404 fallback & security headers
  return http.createServer((req, res) => {
    void req;
    res.writeHead(200, { 'Content-Type': 'application/json', 'X-Content-Type-Options': 'nosniff' });
    res.end(JSON.stringify({ status: 'capstone starter online' }));
  });
}

module.exports = { escapeHtml, projectSaasMetrics, createCapstoneServer };
