import React from 'react'
import { config } from '../config'

const Schedule:React.FC = () => {
  return (
    <section id="schedule" className="section section--translucent">
      <div className="translucent-block stamp-border">
        <div className="center">
          <h2 style={{color:'var(--primary)'}}>Program dne</h2>
          <p style={{opacity:0.8}}>Průběh našeho velkého dne</p>
        </div>
        <div style={{marginTop:'1.5rem'}}>
          <div style={{position:'relative',paddingLeft:20}}>
            <div style={{position:'absolute',left:8,top:24,bottom:24,width:2,background:'linear-gradient(to bottom,var(--primary),var(--secondary))'}} />
            {config.agenda.map((item,idx)=> (
              <div key={idx} style={{marginBottom:'1.5rem',paddingLeft:24}}>
                <div style={{display:'inline-block',padding:'0.25rem 0.75rem',background:'var(--primary)',color:'white',borderRadius:20,fontWeight:700}}>{item.time}</div>
                <h3 style={{margin: '0.5rem 0'}}>{item.title}</h3>
                {item.description && <p style={{opacity:0.75}}>{item.description}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
export default Schedule
