import { useEffect, useState } from 'react'
import { supabase, supabaseConfigured } from './supabase'

const listeners = new Set()
let current = null
let started = false

function emit() {
  listeners.forEach((listener) => listener(current))
}

function ensure() {
  if (!supabase || started) return
  started = true
  supabase.auth.getSession().then(({ data }) => {
    current = data.session
    emit()
  })
  supabase.auth.onAuthStateChange((_event, session) => {
    current = session
    emit()
  })
}

export function useSession() {
  const [session, setSession] = useState(current)

  useEffect(() => {
    ensure()
    listeners.add(setSession)
    queueMicrotask(() => setSession(current))
    return () => listeners.delete(setSession)
  }, [])

  return { configured: supabaseConfigured, session }
}

export async function signIn(email, password) {
  if (!supabase) throw new Error('The Academy database is not connected in this build.')
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
}

export async function signOut() {
  if (!supabase) return
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}
