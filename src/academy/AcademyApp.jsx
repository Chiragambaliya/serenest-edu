import { useEffect } from 'react'
import { AcademyProvider } from './AcademyContext'
import { AcademyHeader } from './components/AcademyHeader'
import { BottomDock } from './components/BottomDock'
import { ToastBanner } from './components/ToastBanner'
import { DrugsView } from './views/DrugsView'
import { LearnView } from './views/LearnView'
import { NetworkView } from './views/NetworkView'
import { VerifyView } from './views/VerifyView'
import './academy.css'

export default function AcademyApp() {
  useEffect(() => {
    const previous = document.title
    document.title = 'Serenest Academy — India’s Mental Health Learning & Verified Network'
    return () => {
      document.title = previous
    }
  }, [])

  return (
    <AcademyProvider>
      <div className="academy">
        <div className="academy__atmosphere" aria-hidden="true" />
        <div className="academy__grain" aria-hidden="true" />
        <ToastBanner />
        <div className="academy__frame">
          <div className="academy__shell">
            <div className="ac-mast">
              <AcademyHeader />
              <BottomDock />
            </div>
            <main className="academy__main">
              <LearnView />
              <DrugsView />
              <NetworkView />
              <VerifyView />
            </main>
          </div>
        </div>
      </div>
    </AcademyProvider>
  )
}
