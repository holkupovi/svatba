import React from 'react'
import { Calendar, Heart } from 'lucide-react'
import { config } from '../config'

function formatDate(d:string){
  const dt = new Date(d)
  return dt.toLocaleDateString('cs-CZ',{day:'numeric',month:'long',year:'numeric'})
}

const Hero: React.FC<{countdown:{days:number,hours:number,minutes:number,seconds:number}, onAddCal:()=>void}> = ({countdown,onAddCal}) => {
  return (
    <section id="home" style={{marginBottom: '4rem', height:'80vh',display:'flex',alignItems:'center',justifyContent:'center',backgroundImage:`linear-gradient(rgba(0,0,0,0.25),rgba(0,0,0,0.25)), url(${config.landingBackground})`,backgroundSize:'cover',backgroundPosition:'center',color:'white',textAlign:'center'}}>
      <div>
        <Heart size={48} style={{color:'var(--primary)',marginBottom:'1rem'}} />
        <h1 style={{fontSize:'clamp(2rem,6vw,3.5rem)',margin:0}}>{config.brideName} & {config.groomName}</h1>
        <p style={{marginTop:'1rem',marginBottom:'1rem'}}>{formatDate(config.weddingDate)} — {config.weddingTime}</p>

        <div style={{display:'flex',gap:'1rem',justifyContent:'center',marginBottom:'1rem'}}>
          <div style={{textAlign:'center'}}>
              <div style={{fontWeight:700,fontSize:'1.5rem'}}>Už za</div>
          </div>
          <div style={{textAlign:'center'}}>
            <div style={{fontWeight:700,fontSize:'1.5rem'}}>{countdown.days}</div>
            <div style={{fontSize:'0.8rem'}}>Dní</div>
          </div>
          <div style={{textAlign:'center'}}>
            <div style={{fontWeight:700,fontSize:'1.5rem'}}>{countdown.hours}</div>
            <div style={{fontSize:'0.8rem'}}>Hodin</div>
          </div>
          <div style={{textAlign:'center'}}>
            <div style={{fontWeight:700,fontSize:'1.5rem'}}>{countdown.minutes}</div>
            <div style={{fontSize:'0.8rem'}}>Minut</div>
          </div>
          <div style={{textAlign:'center'}}>
            <div style={{fontWeight:700,fontSize:'1.5rem'}}>{countdown.seconds}</div>
            <div style={{fontSize:'0.8rem'}}>Sekund</div>
          </div>
        </div>

        <button onClick={onAddCal} className="btn-action">
          <Calendar size={16} /> Přidat do kalendáře
        </button>
      </div>
    </section>
  )
}
export default Hero
