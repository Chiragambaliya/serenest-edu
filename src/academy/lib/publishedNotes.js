import { supabase } from './supabase'

export async function loadPublishedNotes() {
  if (!supabase) return []
  const [lessons, questions] = await Promise.all([
    supabase.from('lesson_content').select('notes, lessons(title, courses(title, phase, is_published))'),
    supabase.from('questions').select('explanation, courses(title, phase, is_published)'),
  ])
  if (lessons.error) throw lessons.error
  if (questions.error) throw questions.error

  const notes = []
  for (const row of lessons.data ?? []) {
    const course = row.lessons?.courses
    if (!course?.is_published || !row.notes?.trim()) continue
    notes.push({
      source: `${course.phase} · ${course.title}`,
      text: `${row.lessons.title}. ${row.notes.trim()}`,
    })
  }
  for (const row of questions.data ?? []) {
    const course = row.courses
    if (!course?.is_published || !row.explanation?.trim()) continue
    notes.push({
      source: `${course.phase} · ${course.title}`,
      text: row.explanation.trim(),
    })
  }
  return notes
}
