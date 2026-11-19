/**
 * Student Lab 14.1 — Program Analysis, Architecture & Telemetry (AZ CTE Std 10.0)
 * Run: node 0-student_files/14-program-design/systemDesignLab.js
 */

function mapDomainCompliance(domain) {
  // TODO [L3 Apply | 10.5]: Return ['HIPAA'] for 'healthcare', ['PCI DSS'] for 'ecommerce', ['GLBA'] for 'banking'
  return [];
}

function chooseDatabaseModel({ transactionsRequired, evolvingJsonDocs }) {
  // TODO [L5 Evaluate | 10.6]: Return 'SQL' when transactionsRequired, 'NoSQL' when evolvingJsonDocs, with rationale
  return { engine: 'TBD', rationale: '' };
}

function emitTelemetryEvent(action, durationMs, succeeded) {
  // TODO [L3 Apply | 10.10]: Return clean anonymized telemetry object (never include PII!)
  return {};
}

console.log('Compliance:', mapDomainCompliance('healthcare'));
console.log('DB Choice:', chooseDatabaseModel({ transactionsRequired: true, evolvingJsonDocs: false }));
console.log('Telemetry:', emitTelemetryEvent('user_search', 14.2, true));
