import { useState, useCallback } from 'react'
import Background from './components/Background'
import Home from './components/Home'
import WeatherJJ from './components/WeatherJJ'

const tabBtn = (active) => ({
  background: 'none',
  border: 'none',
  borderBottom: active ? '1px solid #0e6f5c' : '1px solid transparent',
  padding: '0 0 3px',
  font: 'inherit',
  fontSize: 14,
  letterSpacing: '0.02em',
  color: active ? '#0e6f5c' : '#6b6558',
  cursor: 'pointer',
})

export default function App() {
  const [tab, setTab] = useState('home')

  const goHome = useCallback(() => { setTab('home'); window.scrollTo(0, 0) }, [])
  const goJJ = useCallback(() => { setTab('jj'); window.scrollTo(0, 0) }, [])

  return (
    <div style={{ fontFamily: 'Karla, system-ui, sans-serif', background: '#f7f4ee', minHeight: '100vh', position: 'relative' }}>
      <Background tab={tab} />

      <header style={{ position: 'sticky', top: 0, zIndex: 20, background: 'rgba(247,244,238,0.82)', backdropFilter: 'blur(10px)', borderBottom: '1px solid #e3ddd1' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '16px clamp(32px, 6vw, 88px)', display: 'flex', alignItems: 'baseline', gap: 32, flexWrap: 'wrap' }}>
          <div style={{ fontFamily: 'Newsreader, Georgia, serif', fontSize: 19, letterSpacing: '0.01em', marginRight: 'auto' }}>Moyan Liu</div>
          <nav style={{ display: 'flex', gap: 22, alignItems: 'baseline', fontSize: 14, letterSpacing: '0.02em' }}>
            <button type="button" onClick={goHome} style={tabBtn(tab === 'home')}>Work</button>
            <button type="button" onClick={goJJ} style={tabBtn(tab === 'jj')}>Weather Jiu-Jitsu</button>
          </nav>
        </div>
      </header>

      {tab === 'home' && <Home />}
      {tab === 'jj' && <WeatherJJ />}
    </div>
  )
}
