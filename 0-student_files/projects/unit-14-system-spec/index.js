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
  // TODO [L3 Apply | 10.7]: Validate patientId and non-empty slotDate
}

function bookAppointment(req) {
  // TODO [L6 Create | 10.7, 10.10]: Compose decomposed steps and emit anonymized telemetry { durationMs, status }
  return {};
}

console.log('Unit 14 Spec Starter:', ARCHITECTURE_SPEC);
