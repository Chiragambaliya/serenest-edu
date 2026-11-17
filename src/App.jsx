import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AcademyFallback } from './academy/AcademyFallback'
import { Layout } from './components/Layout'
import { ScrollToTop } from './components/ScrollToTop'
import { AboutPage } from './pages/AboutPage'
import { ContactPage } from './pages/ContactPage'
import { FaqPage } from './pages/FaqPage'
import { ForOrganisationsPage } from './pages/ForOrganisationsPage'
import { ForProfessionalsPage } from './pages/ForProfessionalsPage'
import { HomePage } from './pages/HomePage'
import { ProgrammesPage } from './pages/ProgrammesPage'
import { WhatWeDoPage } from './pages/WhatWeDoPage'
import './App.css'

const AcademyApp = lazy(() => import('./academy/AcademyApp'))

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route
          path="academy"
          element={
            <Suspense fallback={<AcademyFallback />}>
              <AcademyApp />
            </Suspense>
          }
        />
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="what-we-do" element={<WhatWeDoPage />} />
          <Route path="programmes" element={<ProgrammesPage />} />
          <Route path="for-professionals" element={<ForProfessionalsPage />} />
          <Route path="for-organisations" element={<ForOrganisationsPage />} />
          <Route path="faq" element={<FaqPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
