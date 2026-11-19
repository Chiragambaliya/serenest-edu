import { useRef, useState } from 'react'
import { useAcademy } from '../context'
import { LECTURE_SRC, LECTURE_TOTAL, LECTURES, clock } from '../data/lectures'
import { IconPause, IconPlay } from './Icons'

const OPEN_ON = LECTURES.findIndex((item) => item.number === 7)

export function VideoModule() {
  const { showToast } = useAcademy()
  const videoRef = useRef(null)
  const placed = useRef(false)
  const [index, setIndex] = useState(OPEN_ON)
  const [playing, setPlaying] = useState(false)
  const [time, setTime] = useState(LECTURES[OPEN_ON].start)
  const lecture = LECTURES[index]
  const span = lecture.end - lecture.start
  const into = Math.min(span, Math.max(0, time - lecture.start))
  const percent = span === 0 ? 0 : (into / span) * 100

  function seekTo(nextIndex, shouldPlay) {
    const item = LECTURES[nextIndex]
    const video = videoRef.current
    setIndex(nextIndex)
    setTime(item.start)
    if (!video) return
    video.currentTime = item.start
    if (!shouldPlay) return
    video.play().then(
      () => {
        setPlaying(true)
        showToast(`Playing Lecture ${item.number}: ${item.title}`)
      },
      () => setPlaying(false),
    )
  }

  function toggle() {
    const video = videoRef.current
    if (!video) return
    if (!video.paused) {
      video.pause()
      return
    }
    const outside = video.currentTime < lecture.start || video.currentTime >= lecture.end - 0.05
    if (outside) {
      seekTo(index, true)
      return
    }
    video.play().catch(() => setPlaying(false))
  }

  function placeOpening(video) {
    if (placed.current) return
    const start = LECTURES[OPEN_ON].start
    if (Math.abs(video.currentTime - start) <= 0.25) {
      placed.current = true
      return
    }
    video.addEventListener(
      'seeked',
      () => {
        placed.current = true
      },
      { once: true },
    )
    video.currentTime = start
  }

  function onTime(event) {
    if (!placed.current) return
    const now = event.currentTarget.currentTime
    setTime(now)
    const found = LECTURES.findIndex((item) => now >= item.start && now < item.end)
    if (found !== -1) setIndex(found)
    if (now >= LECTURES[LECTURES.length - 1].end - 0.05) {
      event.currentTarget.pause()
    }
  }

  function onScrub(event) {
    const video = videoRef.current
    if (!video) return
    const next = lecture.start + Number(event.target.value)
    video.currentTime = next
    setTime(next)
  }

  return (
    <article className="bento bento--glass ac-video">
      <div className="ac-video__layout">
        <div className="ac-stage">
          <video
            ref={videoRef}
            src={`${LECTURE_SRC}#t=${LECTURES[OPEN_ON].start}`}
            preload="metadata"
            playsInline
            onLoadedMetadata={(event) => {
              placeOpening(event.currentTarget)
            }}
            onTimeUpdate={onTime}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onClick={toggle}
          />
          <button type="button" className="ac-stage__play" aria-label={playing ? 'Pause lecture' : 'Play lecture'} onClick={toggle}>
            {playing ? <IconPause /> : <IconPlay />}
          </button>
        </div>

        <div className="ac-video__meta">
          <span className="ac-kicker ac-kicker--mint">
            Lecture {lecture.number} of {LECTURE_TOTAL} · MD / DNB Psychiatry
          </span>
          <h3>{lecture.title}</h3>
          <p className="ac-muted">
            {playing ? 'Playing' : 'Paused'} · {clock(into)} / {clock(span)} · preview reel
          </p>
          <label className="ac-scrub">
            <span className="ac-progress" aria-hidden="true">
              <span className="ac-progress__bar" style={{ width: `${percent}%` }} />
            </span>
            <input
              type="range"
              min="0"
              max={span}
              step="0.1"
              value={into}
              aria-label="Lecture position"
              onChange={onScrub}
            />
          </label>
        </div>
      </div>

      <ul className="ac-playlist" aria-label="Lectures in this module">
        {LECTURES.map((item, itemIndex) => (
          <li key={item.number}>
            <button
              type="button"
              aria-current={itemIndex === index ? 'true' : undefined}
              className={itemIndex === index ? 'ac-playlist__item ac-playlist__item--on' : 'ac-playlist__item'}
              onClick={() => seekTo(itemIndex, true)}
            >
              <span className="ac-mono">{item.number}</span>
              <span>{item.title}</span>
              <span className="ac-muted">{clock(item.end - item.start)}</span>
            </button>
          </li>
        ))}
      </ul>
    </article>
  )
}
