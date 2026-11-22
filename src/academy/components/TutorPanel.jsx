import { useEffect, useId, useRef, useState } from 'react'
import { pairReply } from '../ai/pair'
import { suggestionsFor } from '../ai/tutor'
import { useAcademy } from '../context'
import { loadPublishedNotes } from '../lib/publishedNotes'
import { useSession } from '../lib/session'

const WELCOME = {
  id: 'welcome',
  from: 'tutor',
  paragraphs: [
    'Cursor answers only from a published lesson note or a reviewed rationale you can open. Claude stays inside that note.',
  ],
  source: null,
}

export function TutorPanel() {
  const { tab } = useAcademy()
  const { session } = useSession()
  const titleId = useId()
  const listRef = useRef(null)
  const inputRef = useRef(null)
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState('')
  const [notes, setNotes] = useState([])
  const [messages, setMessages] = useState([WELCOME])
  const suggestions = suggestionsFor(tab)

  const openNotes = session ? notes : []

  useEffect(() => {
    if (!session) return undefined
    let cancel = false
    loadPublishedNotes()
      .then((next) => {
        if (!cancel) setNotes(next)
      })
      .catch(() => {
        if (!cancel) setNotes([])
      })
    return () => {
      cancel = true
    }
  }, [session])

  useEffect(() => {
    if (!open) return undefined
    inputRef.current?.focus()
    function onKey(event) {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => {
    const list = listRef.current
    if (!list) return
    list.scrollTop = list.scrollHeight
  }, [messages, open])

  function ask(text) {
    const question = text.trim()
    if (!question) return
    const answer = pairReply(question, openNotes)
    setMessages((current) => [
      ...current,
      { id: `you-${current.length}`, from: 'you', paragraphs: [question], source: null },
      { id: `cursor-${current.length}`, from: 'cursor', ...answer.cursor },
      { id: `claude-${current.length}`, from: 'claude', ...answer.claude },
    ])
    setDraft('')
  }

  function submit(event) {
    event.preventDefault()
    ask(draft)
  }

  return (
    <div className="ac-tutor-root">
      {open ? (
        <section className="ac-tutor" role="dialog" aria-modal="false" aria-labelledby={titleId}>
          <header className="ac-tutor__head">
            <div>
              <span className="ac-kicker ac-kicker--mint">On this page</span>
              <h2 id={titleId} className="ac-editorial">
                Claude &amp; Cursor
              </h2>
            </div>
            <button type="button" className="ac-tutor__close" onClick={() => setOpen(false)} aria-label="Close tutor">
              ✕
            </button>
          </header>
          <div className="ac-tutor__log" ref={listRef}>
            {messages.map((message) => (
              <article key={message.id} className={`ac-tutor__msg ac-tutor__msg--${message.from}`}>
                {message.source ? <span className="ac-kicker ac-kicker--mint">{message.source}</span> : null}
                {message.paragraphs.map((paragraph, index) => (
                  <p key={`${message.id}-${index}`}>{paragraph}</p>
                ))}
              </article>
            ))}
          </div>
          <div className="ac-tutor__chips">
            {suggestions.map((item) => (
              <button key={item} type="button" className="ac-pill ac-pill--off" onClick={() => ask(item)}>
                {item}
              </button>
            ))}
          </div>
          <form className="ac-tutor__form" onSubmit={submit}>
            <label className="ac-tutor__field">
              <span className="ac-sr">Ask the tutor</span>
              <input
                ref={inputRef}
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="Ask from the study notes"
                autoComplete="off"
              />
            </label>
            <button type="submit" className="ac-pill ac-pill--on" disabled={!draft.trim()}>
              Ask
            </button>
          </form>
          <p className="ac-tutor__note">Both stay on the notes in this page. Not a prescription or a personal clinical opinion.</p>
        </section>
      ) : null}
      <button
        type="button"
        className="ac-tutor-launch"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        {open ? 'Close' : 'Ask AI'}
      </button>
    </div>
  )
}
