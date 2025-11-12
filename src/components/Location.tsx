import React from 'react'
import { MapPin, Clock, ExternalLink } from 'lucide-react'
import { config } from '../config'

const Location:React.FC = () => {
  const venues = [{key:'ceremony',...config.ceremony},{key:'reception',...config.reception} as any]
  function getMapyUrl(address:string){
    const q = encodeURIComponent(address)
    return `https://mapy.cz/zakladni?q=${q}`
  }
  return (
    <section id="location" className="section section--translucent">
      <div className="translucent-block stamp-border">
        <div className="center">
          <h2 style={{color:'var(--primary)'}}>Kde nás najdete</h2>
          <p style={{opacity:0.8}}>Oslavte s námi na těchto místech</p>
        </div>
        <div style={{marginTop:'1.5rem'}}>
          <div className="grid grid-cols-2">
            {venues.map(v=> (
              <div key={v.key} className="card">
                <MapPin />
                <h3 style={{color:'var(--primary)'}}>{v.venueName}</h3>
                <p style={{opacity:0.75}}>{v.venueAddress}</p>
                <div style={{display:'flex',gap:8,alignItems:'center'}}><Clock size={16}/> <span>{v.time}</span></div>
                <p style={{fontSize:'0.9rem',opacity:0.7}}>{v.parkingInfo}</p>
                <div style={{marginTop:'0.75rem'}}>
                  <button
                    className="btn-action"
                    onClick={(e)=>{ e.stopPropagation?.(); window.open(getMapyUrl(v.venueAddress), '_blank', 'noopener,noreferrer') }}
                    aria-label={`Otevřít ${v.venueName} v Mapy.cz`}
                  >
                    <ExternalLink size={16} />
                    <span>Otevřít v Mapy.cz</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
export default Location
