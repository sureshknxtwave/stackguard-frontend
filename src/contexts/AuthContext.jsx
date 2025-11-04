import React, { createContext, useContext, useMemo, useState, useEffect } from 'react'
import { storage } from '../utils/storage'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)              // { email }
  const [hasConfig, setHasConfig] = useState(false)   // boolean
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // hydrate from localStorage for persistence
    const auth = storage.getAuth()
    const cfg = storage.getConfig()
    if (auth?.email) setUser({ email: auth.email })
    setHasConfig(Boolean(cfg?.key))
    setLoading(false)
  }, [])

  const signIn = async (email, password) => {
    // fake auth; plug real API here
    if (!email || !password) throw new Error('Missing credentials')
    // pretend success
    storage.setAuth({ email })
    setUser({ email })
  }

  const signUp = async (email, password) => {
    if (!email || !password) throw new Error('Missing credentials')
    // pretend account creation success
    storage.setAuth({ email })
    setUser({ email })
  }

  const signOut = () => {
    storage.clearAuth()
    storage.clearConfig()
    setUser(null)
    setHasConfig(false)
  }

  const saveConfigKey = (key) => {
    storage.setConfig({ key, savedAt: Date.now() })
    setHasConfig(true)
  }

  const value = useMemo(() => ({
    user,
    loading,
    isAuthenticated: !!user,
    hasConfig,
    actions: { signIn, signUp, signOut, saveConfigKey }
  }), [user, loading, hasConfig])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
