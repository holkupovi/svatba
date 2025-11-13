import React, {useState} from 'react'
import { config } from '../config'

const RSVP:React.FC = ()=>{
  const [form,setForm] = useState({name:'',attendees:1,dietary:'',transport:'car',accommodation:false,message:''})
  const [errors,setErrors] = useState<{name?:string;attendees?:string}>({})
  const [submitted,setSubmitted] = useState(false)

  function validate(){
    const newErrors: {name?:string;attendees?:string} = {}
    if(!form.name.trim()){
      newErrors.name = 'Vyplňte prosím jméno a příjmení.'
    }
    if(!form.attendees || Number.isNaN(form.attendees) || form.attendees < 1){
      newErrors.attendees = 'Zadejte prosím počet osob (alespoň 1).'
    }
    return newErrors
  }

  function submit(e:React.FormEvent){
    e.preventDefault();
    const v = validate()
    if(Object.keys(v).length){
      setErrors(v)
      return
    }
    setErrors({})

    // Build and trigger a prefilled email via mailto:
    const email = config.contactEmail
    const subject = encodeURIComponent(`RSVP: ${form.name} (${form.attendees})`)
    const transportLabel = form.transport === 'car' ? 'Vlastní auto' : 'Autobus'
    const body = encodeURIComponent(
      `Jméno: ${form.name}\n` +
      `Počet osob: ${form.attendees}\n` +
      `Doprava: ${transportLabel}\n` +
      `Ubytování: ${form.accommodation ? 'Ano' : 'Ne'}\n` +
      `Alergie / strava: ${form.dietary || '-'}\n` +
      `Vzkaz: ${form.message || '-'}\n`
    )
    const mailto = `mailto:${email}?subject=${subject}&body=${body}`
    window.location.href = mailto

    setSubmitted(true)
    setTimeout(()=>setSubmitted(false),4000)
  }
  return (
    <section id="rsvp" className="section section--translucent">
      <div className="translucent-block stamp-border">
        <div className="center">
          <h2 style={{color:'var(--primary)'}}>Potvrzení účasti</h2>
          <p style={{opacity:0.8}}>Prosíme potvrďte svou účast <wbr/>do <strong>{new Date(config.rsvpDeadline).toLocaleDateString('cs-CZ',{day:'numeric',month:'long',year:'numeric'})}</strong></p>
        </div>
        <div style={{maxWidth:700,margin:'16px auto 0'}}>
          {submitted && <div style={{padding:12,background:'#d4edda',borderRadius:8,marginBottom:12}}>Děkujeme! Těšíme se na vás.</div>}
          <form onSubmit={submit} className="card">
            <div className="form-group">
              <label className="form-label" htmlFor="rsvp-name">Jméno a příjmení *</label>
              <input
                id="rsvp-name"
                className="form-control"
                aria-invalid={!!errors.name}
                value={form.name}
                onChange={e=>{ setForm({...form,name:e.target.value}); if(errors.name) setErrors({...errors,name:undefined}) }}
              />
              {errors.name && <div className="form-error" role="alert">{errors.name}</div>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="rsvp-attendees">Počet osob *</label>
              <input
                id="rsvp-attendees"
                type="number"
                min={1}
                className="form-control"
                aria-invalid={!!errors.attendees}
                value={form.attendees}
                onChange={e=>{ const val = Number(e.target.value); setForm({...form,attendees:val}); if(errors.attendees) setErrors({...errors,attendees:undefined}) }}
              />
              {errors.attendees && <div className="form-error" role="alert">{errors.attendees}</div>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="rsvp-dietary">Alergie / strava</label>
              <textarea id="rsvp-dietary" className="form-control" value={form.dietary} onChange={e=>setForm({...form,dietary:e.target.value})} />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="rsvp-transport">Doprava</label>
              <select
                id="rsvp-transport"
                className="form-control"
                value={form.transport}
                onChange={e=>setForm({...form,transport:e.target.value as 'car'|'bus'})}
              >
                <option value="car">Vlastní auto</option>
                <option value="bus">Autobus</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-checkbox">
                <input type="checkbox" checked={form.accommodation} onChange={e=>setForm({...form,accommodation:e.target.checked})} />
                <span>Mám zájem o ubytování v Hostinci u Zmátlů</span>
              </label>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="rsvp-message">Vzkaz</label>
              <textarea id="rsvp-message" className="form-control" value={form.message} onChange={e=>setForm({...form,message:e.target.value})} />
            </div>

            <button type="submit" className="btn-action btn-block">Odeslat potvrzení</button>
          </form>
        </div>
      </div>
    </section>
  )
}
export default RSVP
