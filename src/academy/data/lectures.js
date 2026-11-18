export const LECTURE_SRC = '/lectures/md-dnb-preview.mp4'
export const LECTURE_TOTAL = 24

export const LECTURES = [
  { number: 5, title: 'Mood stabilisers', start: 0, end: 6 },
  { number: 6, title: 'Antidepressants and CYP450', start: 6, end: 12 },
  { number: 7, title: 'Antipsychotics — Receptor Profiles', start: 12, end: 18 },
  { number: 8, title: 'Clozapine monitoring', start: 18, end: 24 },
  { number: 9, title: 'Lithium safety', start: 24, end: 30 },
  { number: 10, title: 'Buprenorphine induction', start: 30, end: 36 },
  { number: 11, title: 'Telepractice notes', start: 36, end: 42 },
  { number: 12, title: 'After the lecture', start: 42, end: 48 },
]

export function clock(seconds) {
  const whole = Math.max(0, Math.floor(seconds))
  const minutes = Math.floor(whole / 60)
  const remain = whole % 60
  return `${minutes}:${String(remain).padStart(2, '0')}`
}
