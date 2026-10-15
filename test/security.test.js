import assert from 'node:assert/strict'
import test from 'node:test'
import {
  createLoginLimiter, requireAdminPassword, requireDatabasePassword
} from '../server/security.js'

test('server credentials must be set and must not use the sample values', () => {
  assert.throws(() => requireAdminPassword({}), /ADMIN_PASSWORD/)
  assert.throws(() => requireAdminPassword({ ADMIN_PASSWORD: 'wonosobo123' }), /ADMIN_PASSWORD/)
  assert.throws(() => requireAdminPassword({ ADMIN_PASSWORD: 'short' }), /ADMIN_PASSWORD/)
  assert.equal(requireAdminPassword({ ADMIN_PASSWORD: 'a-unique-password' }), 'a-unique-password')

  assert.throws(() => requireDatabasePassword({}), /DB_PASSWORD/)
  assert.throws(() => requireDatabasePassword({ DB_PASSWORD: 'kemenag_wsb_2024' }), /DB_PASSWORD/)
  assert.equal(requireDatabasePassword({ DB_PASSWORD: 'another-unique-password' }), 'another-unique-password')
})

test('login limiter blocks repeated failures and resets after the window', () => {
  const limiter = createLoginLimiter({ maxAttempts: 2, windowMs: 1_000 })

  assert.equal(limiter.isBlocked('127.0.0.1', 0), false)
  assert.equal(limiter.recordFailure('127.0.0.1', 0), false)
  assert.equal(limiter.recordFailure('127.0.0.1', 1), true)
  assert.equal(limiter.isBlocked('127.0.0.1', 2), true)
  assert.equal(limiter.retryAfter('127.0.0.1', 2), 1)
  assert.equal(limiter.isBlocked('127.0.0.1', 1_000), false)
  assert.equal(limiter.recordFailure('127.0.0.1', 1_000), false)

  limiter.clear('127.0.0.1')
  assert.equal(limiter.isBlocked('127.0.0.1', 1_001), false)
})

test('login limiter does not grow beyond its entry limit', () => {
  const limiter = createLoginLimiter({ maxAttempts: 1, windowMs: 1_000, maxEntries: 1 })

  assert.equal(limiter.recordFailure('first', 0), true)
  assert.equal(limiter.isBlocked('second', 1), true)
  assert.equal(limiter.retryAfter('second', 1), 1)
  assert.equal(limiter.isBlocked('second', 1_000), false)
})
