import { answerFromNotes } from './published'

export function pairReply(raw, notes) {
  const found = answerFromNotes(raw, notes)
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
  const first = found.paragraphs.find((paragraph) => paragraph.trim()) ?? 'Cursor did not find a published note.'
  const next = found.source
    ? 'I will not add anything beyond that published note.'
    : 'I will wait until a published note is open to you.'
  return [`I’ll use only what Cursor just pulled. ${first}`, next]
}
