/**
 * Unit 14 Project Starter: Telehealth System Architecture & Telemetry Simulator
 * Run: node 0-student_files/projects/unit-14-system-spec/index.js
 */

const ARCHITECTURE_SPEC = {
  methodology: 'TODO: Choose RAD, RUP, or Agile + 1-sentence justification (Std 10.4)',
  database: 'TODO: SQL or NoSQL + ACID/Schema rationale (Std 10.6)',
  compliance: ['TODO: Identify HIPAA / PCI DSS controls (Std 10.5)'],
  userStories: [
    'As a patient, I want ____ so that ____ (Std 10.2)',
  ],
};

function validateAppointmentRequest(req) {
  // TODO [L3 Apply | 10.7]: Throw Error if !req, missing/empty patientId, or missing/empty slotDate; return true when valid
  void req;
}

function bookAppointment(req) {
  // TODO [L6 Create | 10.7, 10.10]: Call validateAppointmentRequest(req) inside try/catch,
  // returning { confirmed: true, slotDate: req.slotDate, telemetry: { durationMs, status: 'ok' } }
  // or on error { confirmed: false, error: err.message, telemetry: { durationMs, status: 'error' } } (never log PII!)
  void req;
  return {};
}

if (require.main === module) {
  console.log('Unit 14 Spec Starter:', ARCHITECTURE_SPEC);
}

module.exports = { ARCHITECTURE_SPEC, validateAppointmentRequest, bookAppointment };
