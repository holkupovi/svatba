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

  const [isMobile, setIsMobile] = React.useState<boolean>(false)
  const [menuOpen, setMenuOpen] = React.useState<boolean>(false)

  React.useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)')
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener ? mq.addEventListener('change', update) : mq.addListener(update)
    return () => {
      mq.removeEventListener ? mq.removeEventListener('change', update) : mq.removeListener(update)
    }
  }, [])

  const handleNavigate = (id: string) => {
    onNavigate(id)
    setMenuOpen(false)
  }

  return (
    <header style={{position:'sticky',top:0,background:'rgba(255,255,255,0.95)',backdropFilter:'blur(6px)',zIndex:900,boxShadow:'0 2px 12px rgba(0,0,0,0.06)'}}>
      <div className="container" style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding: isMobile ? '0.75rem 0.5' : '0.75rem 0',position:'relative'}}>
        <div style={{fontWeight:700,color:'var(--primary)'}}>{config.brideName.split(' ')[0]} & {config.groomName.split(' ')[0]}</div>

        {/* Desktop navigation */}
        {!isMobile && (
          <nav style={{display:'flex',gap:'1rem'}}>
            {items.map(it => (
              <button
                key={it.id}
                onClick={() => handleNavigate(it.id)}
                className={`nav-link${active===it.id ? ' active' : ''}`}
              >
                {it.label}
              </button>
            ))}
          </nav>
        )}

        {/* Mobile hamburger */}
        {isMobile && (
          <div style={{position:'relative'}}>
            <button
              aria-label="Menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(o => !o)}
              style={{
                display:'inline-flex',alignItems:'center',justifyContent:'center',
                width:40,height:40,borderRadius:8,border:'1px solid #e5e7eb',background:'#fff',
                boxShadow:'0 1px 4px rgba(0,0,0,0.06)'
              }}
            >
              <span aria-hidden="true" style={{display:'block',width:18,height:2,background:'#111',position:'relative'}}>
                <span style={{content:'',position:'absolute' as const,top:-6,left:0,width:18,height:2,background:'#111'}} />
                <span style={{content:'',position:'absolute' as const,top:6,left:0,width:18,height:2,background:'#111'}} />
              </span>
            </button>

            {menuOpen && (
              <div
                role="menu"
                style={{
                  position:'absolute',right:0,top:48,minWidth:200,
                  background:'#fff',border:'1px solid #e5e7eb',borderRadius:12,
                  boxShadow:'0 8px 24px rgba(0,0,0,0.12)',padding:8
                }}
              >
                {items.map(it => (
                  <button
                    role="menuitem"
                    key={it.id}
                    onClick={() => handleNavigate(it.id)}
                    className={`nav-link${active===it.id ? ' active' : ''}`}
                    style={{
                      display:'block',width:'100%',textAlign:'left',padding:'0.5rem 0.75rem',
                      borderRadius:8
                    }}
                  >
                    {it.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  )
}
export default Header
