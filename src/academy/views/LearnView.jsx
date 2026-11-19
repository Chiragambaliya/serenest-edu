import { useEffect, useState } from 'react'
import { useAcademy } from '../context'
import { VideoModule } from '../components/VideoModule'
import { COURSE_FILTERS, SHORT_COURSES } from '../data/courses'
import { QUESTIONS, accuracyPercent } from '../data/questions'

const LETTERS = ['A', 'B', 'C', 'D']

export function LearnView() {
  const { tab, setTab, showToast } = useAcademy()
  const active = tab === 'learn'

  const [qIdx, setQIdx] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [chosen, setChosen] = useState(null)
  const [score, setScore] = useState(0)
  const [attempted, setAttempted] = useState(0)
  const [filter, setFilter] = useState('all')
  const [enrolled, setEnrolled] = useState(() => new Set())

  const question = QUESTIONS[qIdx]
  const accuracy = accuracyPercent(score, attempted)
  const courses = filter === 'all' ? SHORT_COURSES : SHORT_COURSES.filter((course) => course.cat === filter)

  useEffect(() => {
    if (!active) return undefined
    function onKey(event) {
      if (event.target instanceof HTMLElement && event.target.closest('input, textarea, select')) return
      const n = Number(event.key)
      if (n < 1 || n > 4 || answered) return
      setAnswered(true)
      setChosen(n - 1)
      setAttempted((count) => count + 1)
      if (n - 1 === question.correct) setScore((count) => count + 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active, answered, question])

  function selectAnswer(index) {
    if (answered) return
    setAnswered(true)
    setChosen(index)
    setAttempted((n) => n + 1)
    if (index === question.correct) setScore((n) => n + 1)
  }

  function nextQuestion() {
    setQIdx((index) => (index + 1) % QUESTIONS.length)
    setAnswered(false)
    setChosen(null)
  }

  function enrol(course) {
    setEnrolled((current) => {
      const next = new Set(current)
      next.add(course.id)
      return next
    })
    showToast(`Enrolled in "${course.title}" at ₹0 via your 90-Day Founding Pass!`)
  }

  return (
    <section id="view-learn" className="ac-view ac-view--learn" role="tabpanel" aria-labelledby="dock-learn" hidden={!active}>
      <div className="ac-metrics">
        <article className="bento bento--glass ac-metric">
          <div className="ac-metric__value ac-metric__value--mint">12</div>
          <div className="ac-metric__label">Day Streak</div>
        </article>
        <article className="bento bento--glass ac-metric">
          <div className="ac-metric__value">#214</div>
          <div className="ac-metric__label">All-India Rank</div>
        </article>
        <article className="bento bento--glass ac-metric">
          <div className="ac-metric__value ac-metric__value--amber" aria-live="polite">
            {accuracy}%
          </div>
          <div className="ac-metric__label">Accuracy</div>
        </article>
      </div>

      <div className="bento bento--ivory ac-pass">
        <div>
          <div className="ac-pass__chips">
            <span className="ac-kicker">Active · ₹0 for 90 Days</span>
            <span className="ac-pass__hint">No YouTube Code Needed</span>
          </div>
          <h2 className="ac-pass__title">Founding Member Pass Auto-Unlocked via Council/ID Verification</h2>
          <p className="ac-pass__copy">
            Full MD, DNB &amp; NEET SS question bank, unlisted lectures, and all 8 short practical courses are open free
            for 90 days.
          </p>
        </div>
        <button type="button" className="ac-btn ac-btn--dark" onClick={() => setTab('verify')}>
          Manage Badge →
        </button>
      </div>

      <VideoModule />

      <article className="bento bento--glass ac-qbank">
        <div className="ac-qbank__head">
          <div>
            <span className="ac-kicker ac-kicker--mint">{question.topic}</span>
            <h3 className="ac-editorial">MD / DNB Question Bank</h3>
          </div>
          <div className="ac-qbank__tools">
            <span className="ac-score">
              Score: {score} / {attempted}
            </span>
            <button type="button" className="ac-pill ac-pill--on" onClick={nextQuestion}>
              Next →
            </button>
          </div>
        </div>

        <p className="ac-stem">{question.stem}</p>
        <div className="ac-options">
          {question.options.map((option, index) => {
            let tone = ''
            if (answered && index === question.correct) tone = ' ac-option--correct'
            else if (answered && index === chosen) tone = ' ac-option--wrong'
            else if (answered) tone = ' ac-option--dim'
            return (
              <button
                key={option}
                type="button"
                className={`ac-option${tone}`}
                onClick={() => selectAnswer(index)}
                disabled={answered}
              >
                <span className="ac-option__letter">{LETTERS[index]}</span>
                <span>{option}</span>
              </button>
            )
          })}
        </div>
        {answered ? (
          <div className="bento bento--ivory ac-rationale">
            <div className="ac-rationale__label">Clinical &amp; Exam Rationale</div>
            <p>{question.rationale}</p>
          </div>
        ) : null}
      </article>

      <div className="ac-courses-block">
        <div className="ac-section-head">
          <div>
            <h3 className="ac-editorial">Practical Short Courses (8)</h3>
            <p className="ac-muted">Included at ₹0 with Founding Pass · Regular INR pricing shown</p>
          </div>
          <div className="ac-filters" role="tablist" aria-label="Course filters">
            {COURSE_FILTERS.map((item) => {
              const on = filter === item.id
              const label = item.id === 'all' ? `${item.label} (${SHORT_COURSES.length})` : item.label
              return (
                <button
                  key={item.id}
                  type="button"
                  className={on ? 'ac-pill ac-pill--on' : 'ac-pill ac-pill--off'}
                  aria-pressed={on}
                  onClick={() => setFilter(item.id)}
                >
                  {label}
                </button>
              )
            })}
          </div>
        </div>
        <div className="ac-courses">
          {courses.map((course, index) => {
            const sand = index % 3 === 1
            const isEnrolled = enrolled.has(course.id)
            return (
              <article key={course.id} className={sand ? 'bento bento--sand ac-course' : 'bento bento--glass ac-course'}>
                <div>
                  <div className="ac-course__meta">
                    <span>{course.dur}</span>
                    <span>Regular {course.price}</span>
                  </div>
                  <h4>{course.title}</h4>
                </div>
                <div className="ac-course__foot">
                  <span className="ac-mono">₹0 Founding Pass</span>
                  {isEnrolled ? (
                    <span className="ac-enrolled">✓ Enrolled</span>
                  ) : (
                    <button type="button" className="ac-btn ac-btn--light" onClick={() => enrol(course)}>
                      Enrol Free
                    </button>
                  )}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
