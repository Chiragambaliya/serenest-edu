import { SHORT_COURSES } from '../data/courses'
import { DRUGS } from '../data/drugs'
import { LECTURES, LECTURE_TOTAL } from '../data/lectures'
import { QUESTIONS } from '../data/questions'

const STUDY_LINE = 'These figures are the study card, not a prescription.'

const DRUG_KEYS = [
  { slug: 'brexpiprazole', keys: ['brexpiprazole', 'brexipil', 'brexova', 'rexipra-b'] },
  { slug: 'escitalopram', keys: ['escitalopram', 'nexito', 'stalopam', 'feliz-s', 'rexipra'] },
  { slug: 'lithium', keys: ['lithium', 'licab', 'lithosun', 'intalith'] },
  { slug: 'olanzapine', keys: ['olanzapine', 'oleanz', 'olanex', 'oliza', 'tolaz'] },
  { slug: 'buprenorphine', keys: ['buprenorphine', 'addnok', 'bupregesic', 'sernor'] },
]

const EXAMS = [
  { index: 0, keys: ['anc', 'neutrophil', 'agranulocytosis', 'clozapine'] },
  { index: 1, keys: ['nsaid', 'ibuprofen', 'diclofenac', 'lithium toxicity', 'coarse tremor'] },
  { index: 2, keys: ['qtc', 'cyp2c19', 'poor metabol'] },
  { index: 3, keys: ['akathisia', 'aripiprazole', 'intrinsic activity'] },
  { index: 4, keys: ['cows', 'precipitated withdrawal'] },
]

export const TUTOR_SUGGESTIONS = {
  learn: ['Which published notes are open?'],
  drugs: ['Which published notes are open?'],
  network: ['Which published notes are open?'],
  verify: ['Which published notes are open?'],
  mbbs: ['Which MBBS notes are published?'],
}

export function suggestionsFor(tab) {
  if (tab === 'drugs' || tab === 'network' || tab === 'verify' || tab === 'learn' || tab === 'mbbs') {
    return TUTOR_SUGGESTIONS[tab]
  }
  return TUTOR_SUGGESTIONS.learn
}

export function replyTo(raw) {
  const question = raw.trim()
  if (!question) {
    return { paragraphs: ['Ask about a lecture, a drug card, a question-bank item, or a short course.'], source: null }
  }

  const folded = question.toLowerCase()

  if (isGreeting(folded)) {
    return {
      paragraphs: [
        'I answer from the Academy notes on this page: lectures 5–12, five drug cards, five exam rationales, and the eight short courses.',
        'I can’t choose a medicine for a person.',
      ],
      source: 'Academy notes',
    }
  }

  if (isVerifyQuestion(folded)) {
    return {
      paragraphs: [
        'The council number stays in this browser only. It is not uploaded, not sent to a register, and no one else can open it from the site.',
      ],
      source: 'Verify',
    }
  }

  if (isNetworkQuestion(folded)) {
    return {
      paragraphs: [
        'A case post needs names, exact dates, and hospital identifiers removed before it goes on the network. The composer asks you to confirm that.',
        'Reporting a post only raises a toast in this preview. It does not hide the post.',
      ],
      source: 'Network',
    }
  }

  if (wantsLectureList(folded)) {
    const lines = LECTURES.map((item) => `Lecture ${item.number}: ${item.title}`)
    return {
      paragraphs: [`The preview reel has lectures 5–12 of ${LECTURE_TOTAL}.`, lines.join(' · ')],
      source: 'Lectures',
    }
  }

  const prescribing = wantsPrescription(folded)
  const drug = findDrug(folded)
  const lecture = findLecture(folded)
  const exam = findExam(folded)
  const course = findCourse(folded)
  const askedLecture = /\b(lecture|video|reel)\b/.test(folded)

  if (prescribing) {
    const pointer = drug
      ? `The ${drug.name} card is a study aid. Open it on the Drugs tab and check the current label before any clinical use.`
      : 'Open the matching drug card on the Drugs tab and check the current label. I won’t pick a medicine or a dose for someone.'
    return { paragraphs: ['I can’t prescribe or decide a dose for a person.', pointer], source: drug ? drug.name : 'Academy notes' }
  }

  if (askedLecture && lecture) return lectureAnswer(lecture, drug)

  if (wantsCourseList(folded) || course) {
    if (course) {
      return {
        paragraphs: [
          `${course.title} runs for ${course.dur}. The card shows a regular price of ${course.price}. With the 90-day founding pass it is marked ₹0.`,
        ],
        source: 'Short courses',
      }
    }
    const names = SHORT_COURSES.map((item) => item.title).join(' · ')
    return {
      paragraphs: ['Eight short courses are included at ₹0 on the founding pass.', names],
      source: 'Short courses',
    }
  }

  if (drug && (wantsDose(folded) || !exam)) return drugAnswer(drug, folded)
  if (exam) return examAnswer(exam)
  if (drug) return drugAnswer(drug, folded)
  if (lecture) return lectureAnswer(lecture, drug)

  return {
    paragraphs: [
      'That isn’t in the notes I can read. Ask for a lecture from 5–12, one of the five drug cards, a question-bank rationale, or a short course.',
    ],
    source: null,
  }
}

function isGreeting(folded) {
  return /^(hi|hello|hey|help|what can you do|who are you)\b/.test(folded)
}

function isVerifyQuestion(folded) {
  return /\b(council|registration|reg\.?\s*no|uploaded|upload|saved on|this device|nmc register|rci register)\b/.test(folded)
}

function isNetworkQuestion(folded) {
  return /\b(post a case|anonym|identifier|dpdp|report pii|network)\b/.test(folded)
}

function wantsLectureList(folded) {
  return /\b(which lectures|lecture list|all lectures|what lectures)\b/.test(folded)
}

function wantsCourseList(folded) {
  return /\b(which courses|short courses|all courses|founding pass)\b/.test(folded)
}

function wantsPrescription(folded) {
  return /\b(prescrib|for my patient|my patient|what should i give|what do i give|start (him|her|them))\b/.test(folded)
}

function wantsDose(folded) {
  return /\b(dose|dosing|target|titrat|start|maximum|max|induction|maintenance)\b/.test(folded)
}

function findDrug(folded) {
  const compact = folded.replace(/[\s-]/g, '')
  const entry = DRUG_KEYS.find((item) => item.keys.some((key) => folded.includes(key) || compact.includes(key.replace(/-/g, ''))))
  if (!entry) {
    if (/\bcows\b/.test(folded)) return DRUGS.find((drug) => drug.slug === 'buprenorphine') ?? null
    return null
  }
  return DRUGS.find((drug) => drug.slug === entry.slug) ?? null
}

function findLecture(folded) {
  const numbered = folded.match(/lecture\s*(\d+)/)
  if (numbered) {
    const number = Number(numbered[1])
    return LECTURES.find((item) => item.number === number) ?? { number, title: null }
  }
  return (
    LECTURES.find((item) => {
      const words = item.title.toLowerCase().split(/[^a-z0-9]+/).filter((word) => word.length > 4)
      return words.length > 0 && words.every((word) => folded.includes(word))
    }) ?? null
  )
}

function findCourse(folded) {
  if (/\bone week\b/.test(folded) || folded.includes('mental status')) {
    return SHORT_COURSES.find((course) => course.dur === '1 week') ?? null
  }
  return (
    SHORT_COURSES.find((course) => {
      const title = course.title.toLowerCase()
      if (folded.includes(title)) return true
      const words = title.split(' ').filter((word) => word.length > 5)
      const hits = words.filter((word) => folded.includes(word))
      return hits.length >= 2 || hits.some((word) => word.length > 8)
    }) ?? null
  )
}

function findExam(folded) {
  const hit = EXAMS.find((item) => item.keys.some((key) => folded.includes(key)))
  return hit ? QUESTIONS[hit.index] : null
}

function lectureAnswer(lecture, drug) {
  if (!lecture.title) {
    return {
      paragraphs: [`Lecture ${lecture.number} is not in this preview. The reel on the Learn tab is lectures 5–12 of ${LECTURE_TOTAL}.`],
      source: 'Lectures',
    }
  }
  const paragraphs = [
    `Lecture ${lecture.number} of ${LECTURE_TOTAL} is “${lecture.title}”. It is a title card in the preview reel on Learn. The full lecture opens with the founding pass.`,
  ]
  if (drug) paragraphs.push(`${drug.name}: ${drug.mechanism}`)
  return { paragraphs, source: `Lecture ${lecture.number}` }
}

function drugAnswer(drug, folded) {
  if (/\b(brand|cost|price|cdsco|india|jan aushadhi)\b/.test(folded)) {
    return {
      paragraphs: [`${drug.name} — ${drug.cdsco}.`, `Brands: ${drug.brands}.`, `Monthly cost on the card: ${drug.cost}.`, STUDY_LINE],
      source: drug.name,
    }
  }
  if (/\b(pearl|summer|nsaid|hydration|safety)\b/.test(folded)) {
    return { paragraphs: [drug.ipsPearl, STUDY_LINE], source: drug.name }
  }
  if (/\b(mechanism|receptor|how does|how it works)\b/.test(folded)) {
    return { paragraphs: [drug.mechanism, drug.clinicalFit, STUDY_LINE], source: drug.name }
  }
  const steps = drug.steps.map((step) => `${step.stage}: ${step.dose} (${step.ind}). ${step.note}`)
  return {
    paragraphs: [drug.clinicalFit, ...steps, drug.ipsPearl, STUDY_LINE],
    source: drug.name,
  }
}

function examAnswer(question) {
  const choice = question.options[question.correct]
  return {
    paragraphs: [`${question.topic}.`, `Study answer: ${choice}.`, question.rationale, STUDY_LINE],
    source: 'Question bank',
  }
}
