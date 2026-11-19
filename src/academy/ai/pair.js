import { replyTo } from './tutor'

export function pairReply(raw) {
  const found = replyTo(raw)
  return {
    cursor: {
      source: found.source ? `Cursor · ${found.source}` : 'Cursor',
      paragraphs: found.paragraphs,
    },
    claude: {
      source: 'Claude',
      paragraphs: speakFrom(found),
    },
  }
}

function speakFrom(found) {
  const first = found.paragraphs.find((paragraph) => paragraph.trim()) ?? 'Cursor did not find a note.'
  return [`I’ll use only what Cursor just pulled. ${first}`, placeFor(found.source)]
}

function placeFor(source) {
  if (!source) return 'Ask for a lecture from 5–12, a drug card, a question-bank item, or a short course.'
  if (source === 'Question bank') return 'The options sit in the question bank on Learn. That rationale is an exam note, not a prescription.'
  if (source === 'Lectures' || source.startsWith('Lecture')) return 'Play that title on Learn. The full lecture opens with the founding pass.'
  if (source === 'Verify') return 'Verify keeps the council number on this device.'
  if (source === 'Network') return 'The case composer on Network is where that confirmation sits.'
  if (source === 'Short courses') return 'The course row is on Learn. Enrol free uses the 90-day pass.'
  if (source === 'Academy notes') return 'I will not add a medicine or a dose beyond that note.'
  return `Open ${source} on Drugs. Those figures stay a study aid.`
}
