const PRESCRIBE = /\b(prescrib|for my patient|my patient|what should i give|what do i give)\b/

export function answerFromNotes(raw, notes) {
  const question = raw.trim()
  if (!question) {
    return { source: null, paragraphs: ['Ask about a published lesson note.'] }
  }
  if (PRESCRIBE.test(question.toLowerCase())) {
    return {
      source: 'Academy notes',
      paragraphs: [
        'I can’t prescribe or decide a dose for a person.',
        'I only repeat a published lesson note or a reviewed rationale that is already open to you.',
      ],
    }
  }
  if (!notes.length) {
    return { source: null, paragraphs: ['No published lesson note or reviewed rationale is open yet.'] }
  }

  const tokens = question.toLowerCase().split(/[^a-z0-9]+/).filter((word) => word.length > 3)
  const ranked = notes
    .map((note) => ({
      note,
      score: tokens.filter((token) => `${note.source} ${note.text}`.toLowerCase().includes(token)).length,
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)

  if (!ranked.length) {
    return { source: null, paragraphs: ['That is not in the published notes you can open.'] }
  }

  return {
    source: ranked[0].note.source,
    paragraphs: [ranked[0].note.text, 'These words are the published note, not a prescription.'],
  }
}
