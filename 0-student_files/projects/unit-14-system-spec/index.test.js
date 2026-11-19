/**
 * Unit 14 Project Test Suite (Telehealth System Architecture & Telemetry Simulator)
 * Run: node --test 0-student_files/projects/unit-14-system-spec/index.test.js
 */
const test = require('node:test');
const assert = require('node:assert/strict');

const { validateAppointmentRequest, bookAppointment } = require('./index.js');

test('validateAppointmentRequest accepts valid slots and throws on missing fields', () => {
  assert.equal(validateAppointmentRequest({ patientId: 'P-101', slotDate: '2026-10-05T14:00Z' }), true);
  assert.throws(() => validateAppointmentRequest(null));
  assert.throws(() => validateAppointmentRequest({ patientId: '', slotDate: '2026-10-05T14:00Z' }));
  assert.throws(() => validateAppointmentRequest({ patientId: 'P-101', slotDate: '' }));
});

test('bookAppointment confirms valid bookings and emits PII-free telemetry', () => {
  const result = bookAppointment({ patientId: 'P-101', slotDate: '2026-10-05T14:00Z' });
  assert.equal(result.confirmed, true);
  assert.equal(result.slotDate, '2026-10-05T14:00Z');
  assert.ok(result.telemetry && typeof result.telemetry === 'object');
  assert.equal(typeof result.telemetry.durationMs, 'number');
  assert.ok(result.telemetry.durationMs >= 0);
  assert.equal(result.telemetry.status, 'ok');
  assert.equal('patientId' in result.telemetry, false);
  assert.equal('patientName' in result.telemetry, false);
});

test('bookAppointment catches validation errors gracefully with error telemetry', () => {
  const result = bookAppointment({ patientId: '', slotDate: '' });
  assert.equal(result.confirmed, false);
  assert.equal(typeof result.error, 'string');
  assert.ok(result.error.length > 0);
  assert.ok(result.telemetry && typeof result.telemetry === 'object');
  assert.equal(typeof result.telemetry.durationMs, 'number');
  assert.equal(result.telemetry.status, 'error');
});
