// FILE: tsconfig.json
// {
//   "compilerOptions": {
//     "target": "ES2022",
//     "useDefineForClassFields": true,
//     "lib": ["ES2022", "DOM"],
//     "jsx": "react-jsx",
//     "module": "ESNext",
//     "moduleResolution": "bundler",
//     "strict": true,
//     "esModuleInterop": true,
//     "skipLibCheck": true,
//     "forceConsistentCasingInFileNames": true,
//     "resolveJsonModule": true,
//     "isolatedModules": true,
//     "noEmit": true
//   },
//   "include": ["src"]
// }

import {useEffect,useState} from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Location from './components/Location'
import Schedule from './components/Schedule'
import Photos from './components/Photos'
import RSVP from './components/RSVP'
import Accommodation from './components/Accommodation'
import Gifts from './components/Gifts'
import Footer from './components/Footer'
import { config } from './config'

export default function App(){
  const [active,setActive] = useState('home')
  const [countdown,setCountdown] = useState({days:0,hours:0,minutes:0,seconds:0})

  useEffect(()=>{
    // Build target datetime from config (local time) using numeric Date constructor for cross-browser reliability
    // Expect formats: YYYY-MM-DD and HH:mm (both zero-padded). Example: 2026-04-11 and 13:00
    const [y,m,d] = config.weddingDate.split('-').map(n=>parseInt(n,10))
    const [hh,mm] = config.weddingTime.split(':').map(n=>parseInt(n,10))

    const weddingDate = new Date(y, (m ?? 1) - 1, d ?? 1, hh ?? 0, mm ?? 0, 0, 0)

    function computeAndSet(nowMs:number){
      const dist = weddingDate.getTime() - nowMs
      if(dist > 0){
        setCountdown({
          days: Math.floor(dist/(1000*60*60*24)),
          hours: Math.floor((dist%(1000*60*60*24))/(1000*60*60)),
          minutes: Math.floor((dist%(1000*60*60))/(1000*60)),
          seconds: Math.floor((dist%(1000*60))/1000)
        })
        return true
      } else {
        setCountdown({days:0,hours:0,minutes:0,seconds:0})
        return false
      }
    }

    // Initial tick immediately so UI doesn't wait 1s
    let keepRunning = computeAndSet(Date.now())

    const timer = setInterval(()=>{
      if(!keepRunning){
        clearInterval(timer)
        return
      }
      keepRunning = computeAndSet(Date.now())
      if(!keepRunning){
        clearInterval(timer)
      }
    }, 1000)

    return ()=>clearInterval(timer)
  },[])

  useEffect(()=>{
    const sections = ['home','location','schedule','photos','rsvp','accommodation','gifts']
    function onScroll(){
      const current = sections.find(s=>{
        const el = document.getElementById(s)
        if(!el) return false
        const rect = el.getBoundingClientRect()
        return rect.top <= 120 && rect.bottom >= 120
      })
      if(current) setActive(current)
    }
    window.addEventListener('scroll',onScroll)
    return ()=>window.removeEventListener('scroll',onScroll)
  },[])

  function scrollTo(id:string){
    const el = document.getElementById(id)
    if(!el) return
    const offset = 80
    const pos = el.getBoundingClientRect().top + window.pageYOffset - offset
    window.scrollTo({top:pos,behavior:'smooth'})
  }

  function onNavigate(id:string){ scrollTo(id) }

  function addToCalendar(){
    // Build start datetime from config (local time)
    const [y,m,d] = config.weddingDate.split('-').map(n=>parseInt(n,10))
    const [hh,mm] = config.weddingTime.split(':').map(n=>parseInt(n,10))
    const startDate = new Date(y, (m ?? 1) - 1, d ?? 1, hh ?? 0, mm ?? 0, 0, 0)

    const endDate = new Date(startDate.getTime() + 15 * 60 * 60 * 1000)

    function fmt(dt: Date){
      const pad = (n:number) => String(n).padStart(2,'0')
      const yy = dt.getFullYear()
      const mm2 = pad(dt.getMonth()+1)
      const dd2 = pad(dt.getDate())
      const HH = pad(dt.getHours())
      const MM = pad(dt.getMinutes())
      const SS = '00'
      return `${yy}${mm2}${dd2}T${HH}${MM}${SS}`
    }

    const start = fmt(startDate)
    const end = fmt(endDate)
    const title = encodeURIComponent(`Svatba ${config.brideName} a ${config.groomName}`)
    const loc = encodeURIComponent(`${config.ceremony.venueName}, ${config.ceremony.venueAddress}`)
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&location=${loc}`
    window.open(url,'_blank')
  }

  return (
    <div>
      <Header onNavigate={onNavigate} active={active} />
      <main>
        <Hero countdown={countdown} onAddCal={addToCalendar} />
        <Location />
        <Schedule />
        <RSVP />
        <Accommodation />
        <Gifts />
        <Photos />
      </main>
      <Footer />
    </div>
  )
}

