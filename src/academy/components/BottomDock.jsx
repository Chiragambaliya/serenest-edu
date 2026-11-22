import { useAcademy } from '../context'
import { IconDrugs, IconLearn, IconMbbs, IconNetwork, IconVerify } from './Icons'

const TABS = [
  { id: 'learn', label: 'Learn', Icon: IconLearn },
  { id: 'mbbs', label: 'MBBS', Icon: IconMbbs },
  { id: 'drugs', label: 'Drugs', Icon: IconDrugs },
  { id: 'network', label: 'Network', Icon: IconNetwork },
  { id: 'verify', label: 'Verify', Icon: IconVerify },
]

export function BottomDock() {
  const { tab, setTab } = useAcademy()

  return (
    <nav className="ac-dock" aria-label="Primary navigation">
      <div className="ac-dock__list" role="tablist" aria-label="Academy sections">
        {TABS.map(({ id, label, Icon }) => {
          const selected = tab === id
          return (
            <button
              key={id}
              type="button"
              role="tab"
              id={`dock-${id}`}
              aria-selected={selected}
              aria-controls={`view-${id}`}
              className={selected ? 'ac-dock__btn ac-dock__btn--on' : 'ac-dock__btn'}
              onClick={() => setTab(id)}
            >
              <Icon />
              <span>{label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
