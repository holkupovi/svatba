import React from 'react'
import { config } from '../config'
import { Heart } from 'lucide-react'

const Footer:React.FC = ()=> (
  <footer style={{padding:'2rem 0',background:'var(--primary)',color:'white',textAlign:'center'}}>
    <div className="container">
      <Heart />
      <div style={{marginTop:8}}>{config.brideName} & {config.groomName}</div>
      <div style={{opacity:0.9}}>{new Date(config.weddingDate).toLocaleDateString('cs-CZ',{day:'numeric',month:'long',year:'numeric'})}</div>
    </div>
  </footer>
)

export default Footer
