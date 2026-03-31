// modules/auth/loginAttemptStore.js

const attempts = {};

const MAX_ATTEMPTS = 5;
const LOCK_TIME = 15 * 60 * 1000; // 15 menit

function recordFailure(email) {
  if (!attempts[email]) {
    attempts[email] = { count: 0, lockUntil: null };
  }

  const entry = attempts[email];

  entry.count += 1;

  if (entry.count >= MAX_ATTEMPTS) {
    entry.lockUntil = Date.now() + LOCK_TIME;
  }
}

function resetAttempts(email) {
  delete attempts[email];
}

function isLocked(email) {
  const entry = attempts[email];

  if (!entry) return false;

  if (entry.lockUntil && Date.now() < entry.lockUntil) {
    return true;
  }

  return false;
}

module.exports = {
  recordFailure,
  resetAttempts,
  isLocked
};