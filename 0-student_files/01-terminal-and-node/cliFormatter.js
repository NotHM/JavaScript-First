/**
 * Student Lesson 1.2B — CLI Input Sanitizer & ANSI Formatter (AZ CTE Std 11.0)
 *
 * Instructions:
 * 1. Implement `sanitizeCliInput(rawText)` to trim leading/trailing spaces,
 *    remove ASCII control chars (/[\x00-\x1F\x7F]/g), and return '' for non-strings.
 * 2. Implement `formatBanner(title, statusOk)` using ANSI color codes:
 *    - Use green (\x1b[32m) when statusOk is true, red (\x1b[31m) when false.
 *    - Always end formatted text with ANSI reset (\x1b[0m).
 * 3. Read `process.argv[2]` cleanly with a sensible fallback.
 * 4. Run:
 *      node 0-student_files/01-terminal-and-node/cliFormatter.js "Your Name"
 */

function sanitizeCliInput(rawText) {
  // TODO [L3 Apply]: Validate typeof === 'string', strip control chars, and trim()
}

function formatBanner(title, statusOk = true) {
  // TODO [L3 Apply]: Return ANSI colored string terminated safely with \x1b[0m
}

if (require.main === module) {
  const inputName = sanitizeCliInput(process.argv[2] ?? 'Student');
  console.log(formatBanner(`Welcome to JavaScript First, ${inputName || 'Anonymous'}!`, Boolean(inputName)));
}

module.exports = { sanitizeCliInput, formatBanner };
