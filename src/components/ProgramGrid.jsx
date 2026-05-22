import { programs } from '../data/programs'

export function ProgramGrid({ filter }) {
  const list = filter ? programs.filter((p) => p.audience === filter) : programs

  return (
    <div className="program-grid">
      {list.map((p) => (
        <article key={p.id} className="program">
          <span className="program__badge">{p.badge}</span>
          <h3 className="program__title">{p.title}</h3>
          <p className="program__meta">{p.meta}</p>
          <p className="program__desc">{p.desc}</p>
        </article>
      ))}
    </div>
  )
}
