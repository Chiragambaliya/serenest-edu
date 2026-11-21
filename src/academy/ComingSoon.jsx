import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './coming-soon.css'

const AWAITS = [
  {
    title: 'Personal AI Medical Tutor',
    copy: 'Understand difficult concepts through interactive, personalized learning.',
  },
  {
    title: 'Virtual Clinical Experiences',
    copy: 'Practise patient interviews, clinical reasoning, and decision-making through AI-powered simulations.',
  },
  {
    title: 'AI Viva & Exam Preparation',
    copy: 'Test your knowledge, identify weak areas, and build confidence.',
  },
  {
    title: 'Expert-Guided Learning',
    copy: 'Learn from faculty-reviewed medical content and clinical cases.',
  },
  {
    title: 'Research & Innovation',
    copy: 'Develop skills in medical research, evidence-based medicine, and healthcare AI.',
  },
]

export function ComingSoon() {
  useEffect(() => {
    const previous = document.title
    document.title = 'Serenest Academy — Coming Soon'
    return () => {
      document.title = previous
    }
  }, [])

  return (
    <main className="soon">
      <div className="soon__wrap">
        <header className="soon__top">
          <p className="soon__brand">Serenest Academy</p>
          <p className="soon__status">Coming soon</p>
        </header>

        <h1>Don't Just Study Medicine. Experience It.</h1>
        <p className="soon__era">A new era of AI-powered medical learning is coming.</p>
        <p>
          Imagine learning complex medical concepts with your own AI tutor, interviewing virtual patients, solving
          real-world clinical challenges, and sharpening your diagnostic reasoning with expert-guided feedback.
        </p>
        <p>
          From your first day of MBBS to postgraduate training, clinical practice, and medical research, Serenest
          Academy is being designed to grow with you.
        </p>

        <h2>What awaits you</h2>
        <ul className="soon__list">
          {AWAITS.map((item) => (
            <li key={item.title}>
              <strong>{item.title}</strong>
              <span>{item.copy}</span>
            </li>
          ))}
        </ul>

        <p className="soon__beyond">Beyond Lectures. Beyond Textbooks. Beyond Medical College.</p>
        <p>We're not just creating another medical education platform.</p>
        <p className="soon__place">We're building a place where medical knowledge becomes clinical understanding.</p>

        <footer className="soon__close">
          <p className="soon__mark">Serenest Academy</p>
          <p className="soon__tag">Learn Medicine. Think Clinically. Evolve Continuously.</p>
          <p className="soon__status">Coming soon</p>
          <Link to="/">Education site</Link>
        </footer>
      </div>
    </main>
  )
}
