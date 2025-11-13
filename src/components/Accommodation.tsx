import React from 'react'
import { config } from '../config'

const Accommodation:React.FC = ()=>{
  return (
    <section id="accommodation" className="section">
      <div className="container center">
        <h2 style={{color:'var(--primary)'}}>Ubytování</h2>
        <p style={{opacity:0.8}}>Doporučená ubytování v okolí</p>
      </div>
      <div className="container" style={{marginTop:16}}>
        <div className="grid grid-cols-2">
          {config.hotels.map((h,idx)=> (
            <div key={idx} className="card">
              <h3 style={{color:'var(--primary)'}}>{h.name}</h3>
              <p style={{opacity:0.8}}>{h.address}</p>
              <p><a href={`tel:${h.phone}`}>{h.phone}</a></p>
              <p style={{fontStyle:'italic',opacity:0.8}}>{h.notes}</p>
              <a href={h.bookingUrl} target="_blank" rel="noreferrer" style={{display:'inline-block',marginTop:8,padding:'0.5rem 1rem',borderRadius:999,background:'var(--primary)',color:'white',textDecoration:'none'}}>Rezervovat</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
export default Accommodation
