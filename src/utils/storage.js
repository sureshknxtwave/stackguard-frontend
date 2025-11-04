const KEYS = {
  AUTH: 'stackguard_auth',
  CONFIG: 'stackguard_config'
}

export const storage = {
  getAuth() {
    try { return JSON.parse(localStorage.getItem(KEYS.AUTH)) || null } catch { return null }
  },
  setAuth(auth) {
    localStorage.setItem(KEYS.AUTH, JSON.stringify(auth))
  },
  clearAuth() {
    localStorage.removeItem(KEYS.AUTH)
  },
  getConfig() {
    try { return JSON.parse(localStorage.getItem(KEYS.CONFIG)) || null } catch { return null }
  },
  setConfig(cfg) {
    localStorage.setItem(KEYS.CONFIG, JSON.stringify(cfg))
  },
  clearConfig() {
    localStorage.removeItem(KEYS.CONFIG)
  }
}
