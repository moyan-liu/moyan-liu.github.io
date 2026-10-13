import { useState, useEffect } from 'react'

const SLIDE_COUNT = 3
const SLIDE_SECONDS = 3

const S = 'rgba(249,247,242,calc(var(--panel) * 0.84))'
const BD = 'blur(calc(var(--panel) * 16px)) saturate(1.04)'
const sectionBase = {
  paddingLeft: 'clamp(32px, 5vw, 64px)',
  paddingRight: 'clamp(32px, 5vw, 64px)',
  marginBottom: 12,
  background: S,
  backdropFilter: BD,
  WebkitBackdropFilter: BD,
  borderRadius: 14,
}

function PhotoSlot({ index, style }) {
  const [failed, setFailed] = useState(false)

  return (
    <div style={{ ...style, position: 'absolute', inset: 0 }}>
      {!failed ? (
        <img
          src={`/images/portrait-${index}.jpg`}
          alt={`Photo ${index}`}
          onError={() => setFailed(true)}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
      ) : (
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center',
          justifyContent: 'center', background: '#ece8e0',
          color: '#a29a88', fontFamily: "'IBM Plex Mono', monospace", fontSize: 11
        }}>
          photo {index}
        </div>
      )}
    </div>
  )
}

const badge = {
  fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: '0.06em',
  textTransform: 'uppercase', color: '#0e6f5c', border: '1px solid rgba(14,111,92,0.3)',
  borderRadius: 3, padding: '2px 6px', marginLeft: 6, display: 'inline-block', whiteSpace: 'nowrap'
}

export default function Home() {
  const [slide, setSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setSlide(s => (s + 1) % SLIDE_COUNT), SLIDE_SECONDS * 1000)
    return () => clearInterval(timer)
  }, [])

  const slideStyle = i => ({
    position: 'absolute', inset: 0,
    opacity: slide === i ? 1 : 0,
    transition: 'opacity 1.1s ease',
    pointerEvents: slide === i ? 'auto' : 'none'
  })

  const dotStyle = i => ({
    width: 5, height: 5, borderRadius: '50%', display: 'inline-block',
    background: slide === i ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.45)',
    boxShadow: '0 0 3px rgba(40,50,60,0.45)',
    transition: 'background 0.5s ease'
  })

  return (
    <main style={{ maxWidth: 1320, margin: '0 auto', padding: '8px clamp(48px, 9vw, 120px) 96px', position: 'relative', zIndex: 1 }}>

      {/* Hero */}
      <section style={{ ...sectionBase, paddingTop: 88, paddingBottom: 64, display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: 40, alignItems: 'start', position: 'relative' }}>
        <div>
          <h1 style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontWeight: 400, fontSize: 'clamp(38px, 5.2vw, 58px)', lineHeight: 1.05, margin: '0 0 10px', letterSpacing: '-0.02em' }}>Moyan&nbsp;Liu</h1>
          <div style={{ fontSize: 15, color: '#6b6558', marginBottom: 30 }}>PhD student, Complex Adaptive Systems Science · Arizona State University</div>
          <p style={{ fontSize: 19, lineHeight: 1.7, margin: '0 0 20px', color: '#33302a' }}>I use data-driven approaches to inform decision-making in complex systems, with a focus on the Earth's climate. My work combines dynamical systems theory, probabilistic modeling, and AI-based weather models to study the predictability and control of extreme events.</p>
          <p style={{ fontSize: 18, lineHeight: 1.7, margin: '0 0 20px', color: '#4c4740' }}>My research journey is the story of a drop of water: from water treatment, to water management, and ultimately to climate and weather. Following this path has broadened my perspective from individual water systems to the interconnected and complex Earth system, shaping how I think about water, climate, and the world around us.</p>
        </div>
        <div>
          <div style={{ position: 'relative', border: '1px solid #ded7c9', borderRadius: 5, overflow: 'hidden', aspectRatio: '4/5', background: '#f3efe5' }}>
            <PhotoSlot index={1} style={slideStyle(0)} />
            <PhotoSlot index={2} style={slideStyle(1)} />
            <PhotoSlot index={3} style={slideStyle(2)} />
            <div style={{ position: 'absolute', left: 0, right: 0, bottom: 9, display: 'flex', justifyContent: 'center', gap: 6, pointerEvents: 'none' }}>
              <span style={dotStyle(0)} /><span style={dotStyle(1)} /><span style={dotStyle(2)} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 18, alignItems: 'center' }}>
            <a href="mailto:moyanliu@asu.edu" title="moyanliu@asu.edu" aria-label="Email" className="icon-link">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2.5" y="4.5" width="19" height="15" rx="2"/><path d="M3 6.5l9 6 9-6"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/moyanliu06/" target="_blank" rel="noopener" title="LinkedIn" aria-label="LinkedIn" className="icon-link">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4v11H3v-11zm7 0h3.8v1.5h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.75v5.7h-4v-5.05c0-1.2-.02-2.75-1.75-2.75-1.75 0-2.02 1.3-2.02 2.66v5.14h-4v-11z"/></svg>
            </a>
            <a href="https://scholar.google.com/citations?user=4i7Vb6IAAAAJ&hl=en" target="_blank" rel="noopener" title="Google Scholar" aria-label="Google Scholar" className="icon-link">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3.5L1.8 9 12 14.5 22.2 9 12 3.5z"/><path d="M6 11.2v4.3c0 1.9 2.7 3.4 6 3.4s6-1.5 6-3.4v-4.3"/></svg>
            </a>
          </div>
        </div>
      </section>

      {/* Education */}
      <section style={{ ...sectionBase, paddingTop: 64, paddingBottom: 64, borderTop: '1px solid #e3ddd1' }}>
        <h2 style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 18, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8d8676', margin: '0 0 28px', marginTop: -35 }}>Education</h2>
        <div style={{ display: 'grid', gap: 26 }}>
          {[
            { years: '2024 – present', degree: 'PhD, Complex Adaptive Systems Science', school: 'Arizona State University · Supervisor: Prof. Upmanu Lall' },
            { years: '2022 – 2023', degree: 'MS, Earth and Environmental Engineering', school: 'Columbia University, New York' },
            { years: '2018 – 2022', degree: 'BEng, Environmental Engineering', school: 'Southwest Minzu University, Chengdu' },
          ].map(({ years, degree, school }) => (
            <div key={years} style={{ display: 'grid', gridTemplateColumns: '116px minmax(0, 1fr)', gap: 18 }}>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: '#a29a88', paddingTop: 4 }}>{years}</span>
              <div>
                <div style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 21, marginBottom: 4 }}>{degree}</div>
                <div style={{ fontSize: 14, color: '#5f594c' }}>{school}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Publications */}
      <section style={{ ...sectionBase, paddingTop: 64, paddingBottom: 64, borderTop: '1px solid #e3ddd1' }}>
        <h2 style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 18, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8d8676', margin: '0 0 28px', marginTop: -35 }}>Publications</h2>
        <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 26 }}>
          <li style={{ display: 'grid', gridTemplateColumns: '46px minmax(0,1fr)', gap: 16 }}>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: '#a29a88', paddingTop: 5 }}>2026</span>
            <div>
              <div style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 18, lineHeight: 1.4, marginBottom: 7 }}><a href="https://arxiv.org/abs/2604.18906" target="_blank" rel="noopener" className="pub-link">Instability-Aware Steering of an Extreme Atmospheric River in an AI Weather Foundation Model</a></div>
              <div style={{ fontSize: 13.5, lineHeight: 1.6, color: '#5f594c' }}><strong style={{ fontWeight: 600, color: '#33302a' }}>Liu, M.</strong>, Huang, Q., &amp; Lall, U. · Geophysical Review Letter <span style={badge}>under review</span></div>
            </div>
          </li>
          <li style={{ display: 'grid', gridTemplateColumns: '46px minmax(0,1fr)', gap: 16 }}>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: '#a29a88', paddingTop: 5 }}>2026</span>
            <div>
              <div style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 18, lineHeight: 1.4, marginBottom: 7 }}><a href="https://arxiv.org/abs/2605.29248" target="_blank" rel="noopener" className="pub-link">Steering Tropical Cyclones Using Small Perturbations in an AI Weather Model</a></div>
              <div style={{ fontSize: 13.5, lineHeight: 1.6, color: '#5f594c' }}>Huang, Q., <strong style={{ fontWeight: 600, color: '#33302a' }}>Liu, M.</strong>, Kwon, Y., Kapnick, S., &amp; Lall, U. · Journal of Geophysical Research: Machine Learning and Computation <span style={badge}>under review</span></div>
            </div>
          </li>
          <li style={{ display: 'grid', gridTemplateColumns: '46px minmax(0,1fr)', gap: 16 }}>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: '#a29a88', paddingTop: 5 }}>2026</span>
            <div>
              <div style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 18, lineHeight: 1.4, marginBottom: 7 }}><a href="https://journals.aps.org/pre/abstract/10.1103/gcz8-3j9y" target="_blank" rel="noopener" className="pub-link">Regime identification and control of extremes in the nonautonomous Lorenz model with chaos and intransitivity</a></div>
              <div style={{ fontSize: 13.5, lineHeight: 1.6, color: '#5f594c' }}><strong style={{ fontWeight: 600, color: '#33302a' }}>Liu, M.</strong>, Huang, Q., &amp; Lall, U. · Physical Review E 113, 064207</div>
            </div>
          </li>
          <li style={{ display: 'grid', gridTemplateColumns: '46px minmax(0,1fr)', gap: 16 }}>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: '#a29a88', paddingTop: 5 }}>2026</span>
            <div>
              <div style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 18, lineHeight: 1.4, marginBottom: 7 }}><a href="https://www.sciencedirect.com/science/article/abs/pii/S0960077926007988" target="_blank" rel="noopener" className="pub-link">Targeted adaptive chaos control of regimes and eddy strength in two Lorenz models</a></div>
              <div style={{ fontSize: 13.5, lineHeight: 1.6, color: '#5f594c' }}><strong style={{ fontWeight: 600, color: '#33302a' }}>Liu, M.</strong>, Huang, Q., &amp; Lall, U. · Chaos, Solitons &amp; Fractals</div>
            </div>
          </li>
          <li style={{ display: 'grid', gridTemplateColumns: '46px minmax(0,1fr)', gap: 16 }}>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: '#a29a88', paddingTop: 5 }}>2026</span>
            <div>
              <div style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 18, lineHeight: 1.4, marginBottom: 7 }}><a href="https://www.mdpi.com/2073-4433/17/8/716" target="_blank" rel="noopener" className="pub-link">Evaluating the Predictability of Selected Weather Extremes with Aurora, an AI Weather Forecast Model</a></div>
              <div style={{ fontSize: 13.5, lineHeight: 1.6, color: '#5f594c' }}>Huang, Q., <strong style={{ fontWeight: 600, color: '#33302a' }}>Liu, M.</strong>, Kwon, Y., &amp; Lall, U. · Atmosphere</div>
            </div>
          </li>
          <li style={{ display: 'grid', gridTemplateColumns: '46px minmax(0,1fr)', gap: 16 }}>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: '#a29a88', paddingTop: 5 }}>2026</span>
            <div>
              <div style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 18, lineHeight: 1.4, marginBottom: 7 }}><a href="https://journals.plos.org/water/article?id=10.1371/journal.pwat.0000562" target="_blank" rel="noopener" className="pub-link">Weather Jiu-Jitsu: Prospects for atmospheric nudging to defuse the impact of catastrophic weather extremes</a></div>
              <div style={{ fontSize: 13.5, lineHeight: 1.6, color: '#5f594c' }}>Huang, Q., <strong style={{ fontWeight: 600, color: '#33302a' }}>Liu, M.</strong>, &amp; Lall, U. · PLOS Water 5(6), e0000562</div>
            </div>
          </li>
        </ol>
      </section>

      {/* Talks */}
      <section style={{ ...sectionBase, paddingTop: 64, paddingBottom: 64, borderTop: '1px solid #e3ddd1' }}>
        <h2 style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 18, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8d8676', margin: '0 0 28px', marginTop: -35 }}>Talks &amp; presentations</h2>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 20 }}>
          {[
            { title: 'Instability-Aware Perturbations of Extreme Events in an AI Weather Foundation Model', href: 'https://meetingorganizer.copernicus.org/EGU26/EGU26-22120.html', venue: 'Oral · European Geosciences Union (EGU) General Assembly 2026, Vienna, AUT' },
            { title: 'Controlling Eddies in the Non-Autonomous Lorenz-84 Model', venue: 'Poster · American Physical Society Conference (APS) Global Physics Summit, Denver, CO' },
            { title: 'Weather Jiu-Jitsu: Toward Adaptive Control of Extreme Weather Regimes Using the Seasonally Forced Lorenz-84 Model', venue: 'Poster · American Geophysical Union (AGU) Fall Meeting 2025, New Orleans, LA' },
            { title: 'Weather Jiu-Jitsu: Toward Controlling Atmospheric Rivers with Deep Learning Foundation Models and Adaptive Perturbation', venue: 'Poster · American Geophysical Union (AGU) Fall Meeting 2025, New Orleans, LA' },
            { title: 'Investigating Adaptive Chaos Control for Mitigating Weather Extremes', venue: 'Poster · American Geophysical Union (AGU) Fall Meeting 2024, Washington, DC' },
          ].map(({ title, href, venue }) => (
            <li key={title}>
              <div style={{ fontSize: 17, lineHeight: 1.45, marginBottom: 6, color: '#23211d' }}>
                {href ? <a href={href} target="_blank" rel="noopener" className="pub-link">{title}</a> : title}
              </div>
              <div style={{ fontSize: 14.5, color: '#6b6558' }}>{venue}</div>
            </li>
          ))}
        </ul>
      </section>

      {/* Experience */}
      <section style={{ ...sectionBase, paddingTop: 64, paddingBottom: 64, borderTop: '1px solid #e3ddd1' }}>
        <h2 style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 18, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8d8676', margin: '0 0 28px', marginTop: -35 }}>Professional Experience</h2>
        <div style={{ display: 'grid', gap: 30 }}>
          {[
            {
              role: 'Graduate Research Associate', org: 'Arizona State University', loc: 'Tempe, AZ', dates: 'July 2025 – Present',
              bullets: ['Develop AI-based climate models to assess extreme precipitation and flood risk associated with Atmospheric Rivers', 'Conduct climate vulnerability analysis to identify high-risk regions and support early warning systems']
            },
            {
              role: 'Technical and Performance Intern', org: 'Veolia North America', loc: 'Paramus, NJ', dates: 'May 2024 – Aug 2024',
              bullets: ['Developed AI/ML models to optimize water system processes, reducing energy usage and improving system efficiency', 'Assisted the team with data analysis for three case studies and drafted standard operating procedures (SOPs).']
            },
            {
              role: 'Data Analyst', org: 'Columbia Water Center', loc: 'New York, NY', dates: 'Sep 2023 – July 2024',
              bullets: ['Cleaned and analyzed drinking water quality and violation data from over 4,644 public schools in New York State.', 'Visualized data for recommendations and submitted results to federal, state, and local stakeholders.']
            },
            {
              role: 'Research Assistant', org: 'Columbia University', loc: 'New York, NY', dates: 'July 2023 – Jan 2024',
              bullets: ['Developed machine learning models to predict electricity prices using demand, generation mix, and climate variables.', 'Designed risk management strategies, including insurance and derivative frameworks, to mitigate extreme price volatility']
            },
          ].map(({ role, org, loc, dates, bullets }) => (
            <div key={role}>
              <div style={{ fontSize: 16.5, fontWeight: 500, marginBottom: 5 }}>{role}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 20, marginBottom: 11 }}>
                <span style={{ fontSize: 13, color: '#6b6558' }}><u>{org}</u>, {loc}</span>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: '#a29a88', whiteSpace: 'nowrap' }}>{dates}</span>
              </div>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 7 }}>
                {bullets.map(b => (
                  <li key={b} style={{ fontSize: 15, lineHeight: 1.6, color: '#4c4740', display: 'grid', gridTemplateColumns: '14px minmax(0,1fr)', gap: 6 }}>
                    <span style={{ color: '#0e6f5c' }}>·</span><span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section style={{ ...sectionBase, paddingTop: 64, paddingBottom: 64, borderTop: '1px solid #e3ddd1' }}>
        <h2 style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8d8676', margin: '0 0 28px' }}>Contact</h2>
        <div>
          <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 26, lineHeight: 1.45, margin: '0 0 24px', whiteSpace: 'nowrap' }}>If any of this overlaps with what you are working on, I would like to hear from you.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px 24px', fontSize: 15 }}>
            <a href="mailto:moyanliu@asu.edu">moyanliu@asu.edu</a>
            <a href="https://www.linkedin.com/in/moyanliu06/" target="_blank" rel="noopener">LinkedIn</a>
            <a href="https://scholar.google.com/citations?user=4i7Vb6IAAAAJ&hl=en" target="_blank" rel="noopener">Google Scholar</a>
          </div>
        </div>
      </section>

    </main>
  )
}
