/**
 * Unit 7 Project Starter: Resilient Async Task Pipeline (AZ CTE Std 18.0)
 * Run: node 0-student_files/projects/unit-07-resilient-pipeline/index.js
 */
const { EventEmitter } = require('node:events');

class ValidationError extends Error {
  // TODO [L3 Apply | 18.6]: Extend Error with this.name = 'ValidationError'
}

class TransientError extends Error {
  // TODO [L3 Apply | 18.6]: Extend Error with this.name = 'TransientError'
}

async function runPipeline(jobs, bus, { retries = 1, backoffMs = 5 } = {}) {
  let lockCount = 1;
  try {
    // TODO [L6 Create | 18.1, 18.4, 18.5, 18.7]:
    // 1. Execute jobs (supporting both functions () => Promise and Promise values) via Promise.allSettled(...)
    //    and retry TransientError up to `retries` times with `backoffMs` delay.
    // 2. Reject/flag null/NaN outputs, log WARN/ERROR on `bus`
    // 3. Return { succeeded, failed }
    void jobs;
    void retries;
    void backoffMs;
    return { succeeded: [], failed: [] };
  } finally {
    lockCount = 0; // Guaranteed resource cleanup
    bus.emit('log', { level: 'INFO', msg: `Lock released (${lockCount})` });
  }
}

module.exports = { ValidationError, TransientError, runPipeline };
