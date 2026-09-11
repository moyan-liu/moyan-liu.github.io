export default function WeatherJJ() {
  return (
    <main style={{
      maxWidth: 1320, margin: '0 auto',
      padding: '8px clamp(48px, 9vw, 120px) 96px',
      position: 'relative', zIndex: 1,
      display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#0e6f5c', marginBottom: 20 }}>Coming soon</div>
        <h1 style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontWeight: 400, fontSize: 'clamp(36px, 5vw, 58px)', margin: '0 0 16px', letterSpacing: '-0.02em', color: '#23211d' }}>Under Construction</h1>
        <p style={{ fontSize: 17, color: '#6b6558', margin: 0 }}>This page is being built. Check back soon.</p>
      </div>
    </main>
  )
}
