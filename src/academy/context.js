import { createContext, useContext } from 'react'

export const AcademyContext = createContext(null)

export function useAcademy() {
  const value = useContext(AcademyContext)
  if (!value) {
    throw new Error('useAcademy must be used inside AcademyProvider')
  }
  return value
}
