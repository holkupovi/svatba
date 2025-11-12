import React from 'react'
import { config } from '../config'
import { Gift } from 'lucide-react'

const Gifts:React.FC = ()=>{
  return (
    <section id="gifts" className="section">
      <div className="container center translucent-block stamp-border">
        <Gift size={36} style={{color:'var(--primary)'}} />
        <h2 style={{color:'var(--primary)'}}>Dary</h2>
        <p style={{maxWidth:800,margin:'0 auto',opacity:0.85,whiteSpace:'pre-line', fontSize: '24px', fontStyle: 'italic'}}>{config.giftsMessage}</p>
      </div>
    </section>
  )
}
export default Gifts
