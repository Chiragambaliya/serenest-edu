import { useEffect, useState } from 'react'
import { useAcademy } from '../context'
import { supabase } from '../lib/supabase'
import { signIn, signOut, useSession } from '../lib/session'

const PHASES = ['Phase I', 'Phase II', 'Phase III, Part 1', 'Phase III, Part 2']

export function MbbsView() {
  const { tab } = useAcademy()
  const active = tab === 'mbbs'
  const { configured, session } = useSession()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')
  const [courses, setCourses] = useState([])
  const [loadError, setLoadError] = useState('')
  const [openId, setOpenId] = useState(null)

  useEffect(() => {
    if (!session || !supabase) return undefined
    let cancel = false
    supabase
      .from('courses')
      .select('id, title, phase, is_published, sort, lessons(id, title, sort), questions(id)')
      .neq('phase', '')
      .order('sort')
      .then(({ data, error }) => {
        if (cancel) return
        if (error) {
          setLoadError(error.message)
          setCourses([])
          return
        }
        setLoadError('')
        setCourses(data ?? [])
      })
    return () => {
      cancel = true
    }
  }, [session])

  async function submit(event) {
    event.preventDefault()
    setAuthError('')
    try {
      await signIn(email.trim(), password)
      setPassword('')
    } catch (error) {
      setAuthError(error.message)
    }
  }

  return (
    <section id="view-mbbs" className="ac-view ac-view--mbbs" role="tabpanel" aria-labelledby="dock-mbbs" hidden={!active}>
      <div className="ac-strip">
        <p className="ac-strip__stats">
          <strong>Full MBBS</strong>
        </p>
        <p className="ac-strip__pass">Unpublished subjects stay off the Coming Soon page. A dean or admin can open them here.</p>
      </div>

      {!configured ? <p className="ac-muted">The Academy database is not connected in this build.</p> : null}

      {configured && !session ? (
        <form className="bento bento--glass ac-mbbs-login" onSubmit={submit}>
          <h2 className="ac-section-title">Dean or admin sign-in</h2>
          <label>
            <span>Email</span>
            <input type="email" autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} required />
          </label>
          <label>
            <span>Password</span>
            <input type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required />
          </label>
          {authError ? <p className="ac-muted">{authError}</p> : null}
          <button type="submit" className="ac-btn ac-btn--dark">
            Sign in
          </button>
        </form>
      ) : null}

      {session ? (
        <div className="ac-mbbs-session">
          <button type="button" className="ac-textlink" onClick={() => signOut()}>
            Sign out
          </button>
          {loadError ? <p className="ac-muted">{loadError}</p> : null}
          {courses.length === 0 && !loadError ? (
            <p className="ac-muted">Nothing is published yet. Learners stay on Coming Soon until a dean or admin publishes a subject.</p>
          ) : null}
          {PHASES.map((phase) => {
            const items = courses.filter((course) => course.phase === phase)
            if (!items.length) return null
            return (
              <section key={phase} className="ac-mbbs-phase">
                <h2 className="ac-section-title">{phase}</h2>
                <div className="ac-mbbs-list">
                  {items.map((course) => {
                    const lessons = [...(course.lessons ?? [])].sort((a, b) => a.sort - b.sort)
                    const open = openId === course.id
                    return (
                      <article key={course.id} className="bento bento--glass ac-mbbs-subject">
                        <button type="button" className="ac-mbbs-subject__toggle" aria-expanded={open} onClick={() => setOpenId(open ? null : course.id)}>
                          <strong>{course.title}</strong>
                          <span className="ac-muted">{course.is_published ? 'Published' : 'Unpublished'}</span>
                        </button>
                        {open ? (
                          <div className="ac-mbbs-subject__body">
                            <p className="ac-muted">Lesson titles</p>
                            {lessons.length === 0 ? <p>No lesson title yet.</p> : null}
                            <ul>
                              {lessons.map((lesson) => (
                                <li key={lesson.id}>{lesson.title}</li>
                              ))}
                            </ul>
                            <p className="ac-muted">Notes are not on this subject yet. No reviewed questions yet.</p>
                          </div>
                        ) : null}
                      </article>
                    )
                  })}
                </div>
              </section>
            )
          })}
        </div>
      ) : null}
    </section>
  )
}
