import { useEffect, useId, useRef, useState } from 'react'
import { replyTo, suggestionsFor } from '../ai/tutor'
import { useAcademy } from '../context'

const WELCOME = {
  id: 'welcome',
  from: 'tutor',
  paragraphs: [
    'Ask about a lecture, a drug card, an exam rationale, or a short course. I use only the notes already in the Academy.',
  ],
  source: null,
}

export function TutorPanel() {
  const { tab } = useAcademy()
  const titleId = useId()
  const listRef = useRef(null)
  const inputRef = useRef(null)
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState('')
  const [messages, setMessages] = useState([WELCOME])
  const suggestions = suggestionsFor(tab)

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
    const answer = replyTo(question)
    setMessages((current) => [
      ...current,
      { id: `you-${current.length}`, from: 'you', paragraphs: [question], source: null },
      { id: `tutor-${current.length}`, from: 'tutor', paragraphs: answer.paragraphs, source: answer.source },
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
              <span className="ac-kicker ac-kicker--mint">Built in · Academy notes</span>
              <h2 id={titleId} className="ac-editorial">
                Academy tutor
              </h2>
            </div>
            <button type="button" className="ac-tutor__close" onClick={() => setOpen(false)} aria-label="Close tutor">
              ✕
            </button>
          </header>
          <div className="ac-tutor__log" ref={listRef}>
            {messages.map((message) => (
              <article key={message.id} className={message.from === 'you' ? 'ac-tutor__msg ac-tutor__msg--you' : 'ac-tutor__msg'}>
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
          <p className="ac-tutor__note">Study aid only. Not a prescription or a personal clinical opinion.</p>
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
