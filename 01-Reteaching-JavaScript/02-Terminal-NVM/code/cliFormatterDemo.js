/**
 * Lesson 1.2 Teacher Reference Demo (AZ CTE Standard 11.0)
 * Demonstrates CLI input reading, sanitization, camelCase conventions, and ANSI formatted output.
 *
 * Run: node 01-Reteaching-JavaScript/02-Terminal-NVM/code/cliFormatterDemo.js "Ada Lovelace"
 */

const ANSI = {
  reset: '\x1b[0m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  bold: '\x1b[1m',
};

function sanitizeCliName(rawInput) {
  if (typeof rawInput !== 'string') return '';
  // Strip control characters and excessive whitespace
  return rawInput.replace(/[\x00-\x1F\x7F]/g, '').trim().slice(0, 40);
}

function formatStatusBadge(label, value, isOk = true) {
  const color = isOk ? ANSI.green : ANSI.red;
  return `${color}${ANSI.bold}[${label}]${ANSI.reset} ${value}`;
}

const rawArg = process.argv[2] ?? 'Developer';
const developerName = sanitizeCliName(rawArg);

if (!developerName) {
  console.error(formatStatusBadge('ERROR', 'Provide a non-empty name argument.', false));
  process.exitCode = 1;
} else {
  console.log(`${ANSI.cyan}${ANSI.bold}=== Node.js Runtime Info ===${ANSI.reset}`);
  console.log(formatStatusBadge('USER', developerName));
  console.log(formatStatusBadge('NODE', process.version));
  console.log(formatStatusBadge('OS', `${process.platform} (${process.arch})`));
}
