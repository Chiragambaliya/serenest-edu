import { useState } from 'react'
import { useAcademy } from '../context'
import { INITIAL_POSTS, NETWORK_FILTERS } from '../data/network'

export function NetworkView() {
  const { tab, isDoctor, setRole, showToast } = useAcademy()
  const active = tab === 'network'
  const [filter, setFilter] = useState('For You')
  const [draft, setDraft] = useState('')
  const [confirmed, setConfirmed] = useState(false)
  const [posts, setPosts] = useState(INITIAL_POSTS)

  const visible = filter === 'For You' ? posts : posts.filter((post) => post.category === filter)

  function submitPost(event) {
    event.preventDefault()
    const content = draft.trim()
    if (!content || !confirmed) return
    const post = {
      id: `p-${Date.now()}`,
      initials: isDoctor ? 'CA' : 'MK',
      author: isDoctor ? 'Dr. Chirag Ambaliya' : 'Meera Krishnan',
      badge: isDoctor ? 'Psychiatrist · NMC Verified' : 'Clinical Psychologist · RCI Verified',
      city: 'India',
      time: 'Just now',
      category: filter === 'For You' ? 'Mood Disorders' : filter,
      content,
      useful: 1,
      comments: 0,
      liked: true,
      saved: false,
      flagged: false,
    }
    setPosts((current) => [post, ...current])
    setDraft('')
    setConfirmed(false)
    showToast('Anonymised case published to the verified network.')
  }

  function updatePost(id, recipe) {
    setPosts((current) => current.map((post) => (post.id === id ? recipe(post) : post)))
  }

  return (
    <section id="view-network" className="ac-view" role="tabpanel" aria-labelledby="dock-network" hidden={!active}>
      <div className="ac-filters" role="tablist" aria-label="Network specialties">
        {NETWORK_FILTERS.map((item) => {
          const on = filter === item
          return (
            <button key={item} type="button" className={on ? 'ac-pill ac-pill--on' : 'ac-pill ac-pill--off'} aria-pressed={on} onClick={() => setFilter(item)}>
              {item}
            </button>
          )
        })}
      </div>

      <form className="bento bento--glass ac-composer" onSubmit={submitPost}>
        <div className="ac-composer__head">
          <span className="ac-kicker ac-kicker--mint">Share Anonymised Clinical Case</span>
          <span className="ac-muted">DPDP Act Protected</span>
        </div>
        <textarea
          rows={3}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Discuss an anonymised clinical presentation, psychopharmacology dilemma, or therapy pearl..."
        />
        <div className="ac-composer__foot">
          <label className="ac-check">
            <input type="checkbox" checked={confirmed} onChange={(event) => setConfirmed(event.target.checked)} />
            <span>I confirm all patient names, exact dates, and hospital identifiers have been removed</span>
          </label>
          <button type="submit" className="ac-pill ac-pill--on" disabled={!confirmed}>
            Post Case
          </button>
        </div>
      </form>

      {isDoctor ? (
        <article className="bento bento--sand ac-sponsored">
          <div className="ac-sponsored__head">
            <span className="ac-kicker ac-kicker--ink">Sponsored · Shown to verified doctors only</span>
            <span className="ac-mono">UCPMP 2024</span>
          </div>
          <h3>Sun CNS · Accredited Bipolar Maintenance CME Webinar</h3>
          <p>
            Live State Medical Council accredited clinical session on Lithium &amp; Valproate renal safety during Indian
            summer heatwaves. Sponsorship disclosed under UCPMP 2024.
          </p>
          <div className="ac-sponsored__foot">
            <button type="button" className="ac-textlink" onClick={() => showToast('Opened UCPMP 2024 full prescribing information & sponsor disclosure sheet.')}>
              View prescribing information →
            </button>
            <span className="ac-mono">NMC/SMC Verified Gate</span>
          </div>
        </article>
      ) : (
        <div className="bento bento--glass ac-notice">
          <p>
            <strong>DMR Act &amp; UCPMP 2024 Active:</strong> Prescription drug promotions are hidden for RCI / Student
            roles.
          </p>
          <button type="button" className="ac-pill ac-pill--off" onClick={() => setRole('doctor')}>
            Preview Doctor View
          </button>
        </div>
      )}

      <div className="ac-feed">
        {visible.length === 0 ? <p className="ac-muted ac-empty">No cases in this specialty yet.</p> : null}
        {visible.map((post) => (
          <article key={post.id} className="bento bento--glass ac-post">
            <div className="ac-post__head">
              <div className="ac-post__who">
                <div className="ac-avatar" aria-hidden="true">
                  {post.initials}
                </div>
                <div>
                  <div className="ac-post__author">{post.author}</div>
                  <div className="ac-post__badge">
                    {post.badge} · {post.city} · {post.time}
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="ac-flag"
                onClick={() => showToast(`PII Flag logged on post #${post.id}. Hidden pending DPDP Act moderator audit.`)}
              >
                ⚑ Report PII
              </button>
            </div>
            <p className="ac-post__body">{post.content}</p>
            <div className="ac-post__actions">
              <button
                type="button"
                className={post.liked ? 'ac-action ac-action--on' : 'ac-action'}
                onClick={() =>
                  updatePost(post.id, (item) => ({
                    ...item,
                    liked: !item.liked,
                    useful: item.useful + (item.liked ? -1 : 1),
                  }))
                }
              >
                ▲ Useful ({post.useful})
              </button>
              <button type="button" className="ac-action" onClick={() => showToast(`Opened clinical discussion thread (${post.comments} peer replies).`)}>
                💬 Comment ({post.comments})
              </button>
              <button
                type="button"
                className={post.saved ? 'ac-action ac-action--saved' : 'ac-action'}
                onClick={() => {
                  const saved = !post.saved
                  updatePost(post.id, (item) => ({ ...item, saved }))
                  showToast(saved ? 'Saved case discussion to your library.' : 'Removed from saved posts.')
                }}
              >
                {post.saved ? '★ Saved' : '☆ Save'}
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
