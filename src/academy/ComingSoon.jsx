import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './coming-soon.css'

const AWAITS = [
  {
    title: 'Personal AI Medical Tutor',
    copy: 'Understand difficult concepts through interactive, personalized learning.',
    tone: 'sky',
  },
  {
    title: 'Virtual Clinical Experiences',
    copy: 'Practise patient interviews, clinical reasoning, and decision-making through AI-powered simulations.',
    tone: 'gold',
  },
  {
    title: 'AI Viva & Exam Preparation',
    copy: 'Test your knowledge, identify weak areas, and build confidence.',
    tone: 'cream',
  },
  {
    title: 'Expert-Guided Learning',
    copy: 'Learn from faculty-reviewed medical content and clinical cases.',
    tone: 'sand',
  },
  {
    title: 'Research & Innovation',
    copy: 'Develop skills in medical research, evidence-based medicine, and healthcare AI.',
    tone: 'ink',
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
      <article className="soon__phone">
        <header className="soon__bar">
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
        <ol className="soon__list">
          {AWAITS.map((item, index) => (
            <li key={item.title} className={`soon__card soon__card--${item.tone}`}>
              <span className="soon__index">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <strong>{item.title}</strong>
                <span>{item.copy}</span>
              </div>
            </li>
          ))}
        </ol>

        <footer className="soon__close">
          <p className="soon__beyond">Beyond Lectures. Beyond Textbooks. Beyond Medical College.</p>
          <p>We're not just creating another medical education platform.</p>
          <p className="soon__place">We're building a place where medical knowledge becomes clinical understanding.</p>
          <p className="soon__tag">Learn Medicine. Think Clinically. Evolve Continuously.</p>
          <Link to="/">Education site</Link>
        </footer>
      </article>
    </main>
  )
}
