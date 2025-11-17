import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { config } from '../config'
import PhysicalPhoto from './PhysicalPhoto'

const SCROLL_SPEED_PX_PER_SEC = 40 // slow
const MAX_DT = 0.05 // cap delta time to avoid large jumps (~50ms)
const BIG_DT_THRESHOLD = 0.5 // ignore movement if tab was inactive for a long time

const Photos: React.FC = () => {
  const ref = useRef<HTMLDivElement | null>(null)
  const rafId = useRef<number | null>(null)
  const lastTs = useRef<number | null>(null)
  const direction = useRef<1 | -1>(1)
  const userInteracting = useRef<boolean>(false)
  const wheelPauseTimer = useRef<number | null>(null)
  const pausedDueToHidden = useRef<boolean>(false)

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const selectedRef = useRef<number | null>(null)
  useEffect(() => {
    selectedRef.current = selectedIndex
  }, [selectedIndex])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const step = (ts: number) => {
      if (pausedDueToHidden.current) {
        // While hidden or window blurred, keep RAF alive but skip movement
        lastTs.current = null
        rafId.current = requestAnimationFrame(step)
        return
      }

      if (lastTs.current == null) {
        lastTs.current = ts
      }
      let dt = (ts - lastTs.current) / 1000 // seconds
      lastTs.current = ts

      // If the tab was inactive or throttled for a long time, skip movement to avoid a big jump
      if (dt > BIG_DT_THRESHOLD) {
        dt = 0
      } else {
        // Cap to a reasonable frame time to keep motion consistent
        dt = Math.min(dt, MAX_DT)
      }

      if (!userInteracting.current && dt > 0) {
        const maxScroll = el.scrollWidth - el.clientWidth
        if (maxScroll > 0) {
          const delta = SCROLL_SPEED_PX_PER_SEC * dt * direction.current
          let next = el.scrollLeft + delta

          // bounce at edges
          if (next <= 0) {
            next = 0
            direction.current = 1
          } else if (next >= maxScroll) {
            next = maxScroll
            direction.current = -1
          }
          el.scrollLeft = next
        }
      }

      rafId.current = requestAnimationFrame(step)
    }

    rafId.current = requestAnimationFrame(step)

    // User interaction handlers
    const onPointerDown = () => {
      userInteracting.current = true
    }
    const onPointerUp = () => {
      // If a photo is selected, keep auto-scroll paused
      if (selectedRef.current == null) {
        userInteracting.current = false
      }
    }
    const onWheel = () => {
      userInteracting.current = true
      if (wheelPauseTimer.current) window.clearTimeout(wheelPauseTimer.current)
      // resume shortly after wheel interaction stops (unless a photo is selected)
      wheelPauseTimer.current = window.setTimeout(() => {
        if (selectedRef.current == null) {
          userInteracting.current = false
        }
      }, 600)
    }
    const onTouchStart = () => {
      userInteracting.current = true
    }
    const onTouchEnd = () => {
      if (selectedRef.current == null) {
        userInteracting.current = false
      }
    }

    el.addEventListener('pointerdown', onPointerDown, { passive: true })
    window.addEventListener('pointerup', onPointerUp, { passive: true })
    el.addEventListener('wheel', onWheel, { passive: true })
    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchend', onTouchEnd, { passive: true })

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedIndex(null)
        userInteracting.current = false
      }
    }
    window.addEventListener('keydown', onKeyDown)

    const handleVisibility = () => {
      if (document.hidden) {
        pausedDueToHidden.current = true
        lastTs.current = null
        if (wheelPauseTimer.current) {
          window.clearTimeout(wheelPauseTimer.current)
          wheelPauseTimer.current = null
        }
      } else {
        pausedDueToHidden.current = false
        lastTs.current = null
      }
    }
    const onWindowBlur = () => {
      pausedDueToHidden.current = true
      lastTs.current = null
      if (wheelPauseTimer.current) {
        window.clearTimeout(wheelPauseTimer.current)
        wheelPauseTimer.current = null
      }
    }
    const onWindowFocus = () => {
      pausedDueToHidden.current = false
      lastTs.current = null
      if (selectedRef.current == null) {
        // allow auto-scroll to resume on focus if nothing is selected
        userInteracting.current = false
      }
    }

    document.addEventListener('visibilitychange', handleVisibility)
    window.addEventListener('blur', onWindowBlur)
    window.addEventListener('focus', onWindowFocus)

    return () => {
      if (rafId.current != null) cancelAnimationFrame(rafId.current)
      el.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointerup', onPointerUp)
      el.removeEventListener('wheel', onWheel)
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('visibilitychange', handleVisibility)
      window.removeEventListener('blur', onWindowBlur)
      window.removeEventListener('focus', onWindowFocus)
      if (wheelPauseTimer.current) {
        window.clearTimeout(wheelPauseTimer.current)
        wheelPauseTimer.current = null
      }
    }
  }, [])

  const handleSelect = (idx: number) => {
    setSelectedIndex((prev) => {
      const next = prev === idx ? null : idx
      // pause while selected; resume when deselected
      userInteracting.current = next !== null
      return next
    })
  }

  // Pause auto-scroll when any photo gains focus; resume when focus leaves and none selected
  const handleItemFocus = () => {
    userInteracting.current = true
  }
  const handleItemBlur = () => {
    if (selectedRef.current == null) {
      userInteracting.current = false
    }
  }

  // lock body scroll when a photo is selected (overlay open)
  useEffect(() => {
    const original = document.body.style.overflow
    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = original || ''
    }
    return () => {
      document.body.style.overflow = original || ''
    }
  }, [selectedIndex])

  const closeOverlay = () => {
    setSelectedIndex(null)
    userInteracting.current = false
  }

  return (
    <section id='photos' className='section' style={{paddingBottom: 0}}>
      <div className='container center'>
        <h2 style={{ color: 'var(--primary)' }}>Náš příběh</h2>
        <p style={{ opacity: 0.8 }}>Společné chvíle, které nás přivedly sem</p>
      </div>
      <div
        className='photos-scroller'
        style={{
          overflowX: 'auto',
          overflowY: 'visible',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          padding: '2rem 1rem',
          scrollBehavior: 'auto',
          position: 'relative',
        }}
        ref={ref}
      >
        {config.photos.map((p, idx) => (
          <div
            key={idx}
            style={{
              minWidth: 450,
              position: 'relative',
              zIndex: 1,
            }}
          >
            <PhysicalPhoto
              src={p.url}
              caption={p.title}
              width={450}
              selected={false}
              onClick={() => handleSelect(idx)}
              onFocus={handleItemFocus}
              onBlur={handleItemBlur}
              tabIndex={0}
              role={'button'}
              ariaSelected={selectedIndex === idx}
            />
          </div>
        ))}
      </div>
      {selectedIndex !== null &&
        createPortal(
          (
            <div
              role="dialog"
              aria-modal={true}
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9999,
                background: 'rgba(0,0,0,0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
              }}
              onClick={closeOverlay}
            >
              <div
                style={{
                  position: 'relative',
                  maxWidth: 'min(92vw, 820px)',
                  width: 'auto',
                  maxHeight: '86vh',
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <PhysicalPhoto
                  src={config.photos[selectedIndex].url}
                  caption={config.photos[selectedIndex].title}
                  width={600}
                  selected={true}
                  onClick={closeOverlay}
                  tabIndex={0}
                  role={'button'}
                  ariaSelected={true}
                />
              </div>
            </div>
          ),
          document.body
        )}
    </section>
  )
}

export default Photos
