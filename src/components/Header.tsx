import React from 'react'
import { config } from '../config'

type Props = { onNavigate: (id: string) => void, active?: string }

const Header: React.FC<Props> = ({ onNavigate, active }) => {
  const items = [
    { id: 'home', label: 'Domů' },
    { id: 'location', label: 'Místo' },
    { id: 'schedule', label: 'Program' },
    { id: 'rsvp', label: 'Ozvěte se' },
    { id: 'accommodation', label: 'Ubytování' },
    { id: 'gifts', label: 'Dary' },
    { id: 'photos', label: 'Náš příběh' },
  ]

  return (
    <header style={{position:'sticky',top:0,background:'rgba(255,255,255,0.95)',backdropFilter:'blur(6px)',zIndex:900,boxShadow:'0 2px 12px rgba(0,0,0,0.06)'}}>
      <div className="container" style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0.75rem 0'}}>
        <div style={{fontWeight:700,color:'var(--primary)'}}>{config.brideName.split(' ')[0]} & {config.groomName.split(' ')[0]}</div>
        <nav style={{display:'flex',gap:'1rem'}}>
          {items.map(it => (
            <button
              key={it.id}
              onClick={() => onNavigate(it.id)}
              className={`nav-link${active===it.id ? ' active' : ''}`}
            >
              {it.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}
export default Header
