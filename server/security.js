export function requireAdminPassword(env = process.env) {
  const password = env.ADMIN_PASSWORD
  if (!password || password === 'wonosobo123' || password.length < 12) {
    throw new Error('Set ADMIN_PASSWORD to a unique password of at least 12 characters.')
  }
  return password
}

export function getAdminUsername(env = process.env) {
  return env.ADMIN_USERNAME || 'admin'
}

export function requireDatabasePassword(env = process.env) {
  const password = env.DB_PASSWORD
  if (!password || password === 'kemenag_wsb_2024') {
    throw new Error('Set DB_PASSWORD to a unique database password.')
  }
  return password
}

export function createLoginLimiter({ maxAttempts = 5, windowMs = 15 * 60_000, maxEntries = 10_000 } = {}) {
  // shortcut: per-process IP limits fit one server; use shared storage for multiple replicas.
  const failures = new Map()

  const prune = (now) => {
    for (const [key, entry] of failures) {
      if (entry.resetAt <= now) failures.delete(key)
    }
  }

  return {
    isBlocked(key, now = Date.now()) {
      const entry = failures.get(key)
      if (!entry) {
        if (failures.size >= maxEntries) prune(now)
        return failures.size >= maxEntries
      }
      if (entry.resetAt <= now) {
        failures.delete(key)
        return false
      }
      return entry.count >= maxAttempts
    },
    recordFailure(key, now = Date.now()) {
      let entry = failures.get(key)
      if (!entry || entry.resetAt <= now) {
        if (failures.size >= maxEntries) prune(now)
        if (failures.size >= maxEntries) return true
        entry = { count: 0, resetAt: now + windowMs }
        failures.set(key, entry)
      }
      entry.count += 1
      return entry.count >= maxAttempts
    },
    clear(key) {
      failures.delete(key)
    },
    retryAfter(key, now = Date.now()) {
      const entry = failures.get(key)
      return entry
        ? Math.max(1, Math.ceil((entry.resetAt - now) / 1000))
        : failures.size >= maxEntries ? Math.ceil(windowMs / 1000) : 0
    }
  }
}
