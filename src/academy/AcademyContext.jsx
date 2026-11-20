import { useCallback, useMemo, useRef, useState } from 'react'
import { AcademyContext } from './context'

const DOCTOR_TOAST = 'Verified Doctor (NMC/SMC) mode — UCPMP 2024 Rx Drug CME visible.'
const LEARNER_TOAST = 'RCI / PG / Student mode — Rx Drug Ads hidden per DMR Act.'

export function AcademyProvider({ children }) {
  const [role, setRoleState] = useState('doctor')
  const [tab, setTab] = useState('learn')
  const [toast, setToast] = useState(null)
  const roleRef = useRef(role)
  const toastTimer = useRef(null)

  const hideToast = useCallback(() => {
    clearTimeout(toastTimer.current)
    setToast(null)
  }, [])

  const showToast = useCallback((message) => {
    clearTimeout(toastTimer.current)
    setToast({ id: Date.now(), message })
    toastTimer.current = setTimeout(() => setToast(null), 3800)
  }, [])

  const setRole = useCallback(
    (next) => {
      if (roleRef.current === next) return
      roleRef.current = next
      setRoleState(next)
      showToast(next === 'doctor' ? DOCTOR_TOAST : LEARNER_TOAST)
    },
    [showToast],
  )

  const value = useMemo(
    () => ({
      role,
      isDoctor: role === 'doctor',
      setRole,
      tab,
      setTab,
      toast,
      showToast,
      hideToast,
    }),
    [role, setRole, tab, toast, showToast, hideToast],
  )

  return <AcademyContext.Provider value={value}>{children}</AcademyContext.Provider>
}
