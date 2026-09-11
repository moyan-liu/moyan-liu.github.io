import { useEffect, useRef } from 'react'

const LANDS = [
  [[-168,65],[-158,71],[-130,70],[-95,72],[-80,68],[-62,60],[-56,50],[-66,45],[-70,41],[-81,31],[-97,26],[-105,22],[-114,30],[-124,40],[-125,49],[-140,60],[-168,65]],
  [[-78,8],[-72,11],[-60,5],[-50,-1],[-35,-6],[-38,-13],[-48,-25],[-58,-35],[-62,-40],[-70,-52],[-75,-50],[-71,-40],[-72,-30],[-77,-14],[-80,-3],[-78,8]],
  [[-17,15],[-10,26],[0,33],[11,37],[20,32],[32,31],[43,12],[51,11],[42,-2],[40,-15],[35,-24],[26,-34],[18,-34],[12,-18],[9,-1],[5,5],[-8,5],[-17,15]],
  [[-10,36],[0,44],[10,44],[20,40],[28,45],[40,48],[30,60],[22,60],[12,56],[5,58],[-5,50],[-10,36]],
  [[30,68],[60,72],[95,78],[130,73],[160,70],[170,66],[160,60],[143,50],[130,42],[122,32],[110,20],[100,13],[93,21],[80,10],[72,20],[62,25],[55,38],[45,42],[36,55],[30,68]],
  [[114,-22],[130,-12],[142,-11],[150,-22],[153,-28],[147,-38],[138,-35],[129,-32],[115,-34],[114,-22]],
  [[-60,-63],[0,-70],[60,-68],[120,-67],[170,-72],[120,-80],[0,-82],[-60,-75],[-60,-63]],
  [[-45,60],[-30,64],[-22,70],[-30,80],[-48,78],[-55,70],[-45,60]]
]

export default function Background({ tab }) {
  const hostRef = useRef(null)
  const tabRef = useRef(tab)

  useEffect(() => { tabRef.current = tab }, [tab])

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    const rand = (i, k) => { const x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453; return x - Math.floor(x) }
    const drops = Array.from({ length: 150 }, (_, i) => ({
      x: rand(i, 1), y: rand(i, 2), r: 0.3 + rand(i, 3) * 1.5, ph: rand(i, 4) * 6.28, sp: 0.4 + rand(i, 5)
    }))
    const stars = Array.from({ length: 90 }, (_, i) => ({ x: rand(i, 7), y: rand(i, 8), a: 0.2 + rand(i, 9) * 0.8 }))
    const clouds = Array.from({ length: 9 }, (_, i) => ({
      x: rand(i, 21), y: 0.08 + rand(i, 22) * 0.78, s: 0.5 + rand(i, 23) * 0.9,
      o: 0.45 + rand(i, 24) * 0.55, sp: 0.5 + rand(i, 25),
      puffs: Array.from({ length: 6 }, (_, j) => [
        (rand(i * 9 + j, 31) - 0.5) * 1.15,
        (rand(i * 9 + j, 32) - 0.5) * 0.55,
        0.5 + rand(i * 9 + j, 33) * 0.85
      ])
    }))

    const cv = document.createElement('canvas')
    cv.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block'
    host.appendChild(cv)

    const t0 = performance.now()

    const scrollProgress = () => {
      const de = document.scrollingElement || document.documentElement
      let max = de.scrollHeight - de.clientHeight, pos = de.scrollTop
      if (max < 40) {
        let n = host.parentElement
        while (n) {
          if (n.scrollHeight - n.clientHeight > 40) { max = n.scrollHeight - n.clientHeight; pos = n.scrollTop; break }
          n = n.parentElement
        }
      }
      return max > 0 ? Math.min(1, Math.max(0, pos / max)) : 0
    }

    const draw = () => {
      if (tabRef.current !== 'home') {
        cv.style.display = 'none'
        document.documentElement.style.setProperty('--panel', '0')
        return
      }
      cv.style.display = 'block'
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      const w = cv.clientWidth, h = cv.clientHeight
      if (!w || !h) return
      if (cv.width !== w * dpr || cv.height !== h * dpr) { cv.width = w * dpr; cv.height = h * dpr }
      const g = cv.getContext('2d')
      g.setTransform(dpr, 0, 0, dpr, 0, 0)
      const p = scrollProgress()
      document.documentElement.style.setProperty('--panel', (Math.min(1, Math.max(0, (p - 0.1) / 0.14))).toFixed(3))
      const t = (performance.now() - t0) / 1000
      const amt = 1
      const clamp01 = v => Math.min(1, Math.max(0, v))
      const seg = (a, b) => clamp01((p - a) / (b - a))
      const ease = v => v * v * (3 - 2 * v)
      const mix = (c1, c2, k) => c1.map((v, i) => Math.round(v + (c2[i] - v) * k))
      const rgb = c => `rgb(${c[0]},${c[1]},${c[2]})`

      const paper = [247, 244, 238], sky = [232, 238, 240], space = [96, 118, 148], deep = [26, 36, 60]
      const bg = p < 0.5
        ? mix(paper, sky, ease(seg(0.05, 0.5)))
        : mix(mix(sky, space, ease(seg(0.52, 0.85))), deep, ease(seg(0.82, 1)))
      g.fillStyle = rgb(bg)
      g.fillRect(0, 0, w, h)

      const drop = (cx, cy, r, alpha) => {
        if (r <= 0.4 || alpha <= 0.004) return
        const grd = g.createRadialGradient(cx - r * 0.3, cy - r * 0.35, r * 0.05, cx, cy, r)
        grd.addColorStop(0, `rgba(255,255,255,${0.55 * alpha})`)
        grd.addColorStop(0.45, `rgba(150,196,205,${0.14 * alpha})`)
        grd.addColorStop(0.88, `rgba(90,150,168,${0.2 * alpha})`)
        grd.addColorStop(1, `rgba(120,170,185,${0.05 * alpha})`)
        g.fillStyle = grd
        g.beginPath(); g.arc(cx, cy, r, 0, 6.2832); g.fill()
        g.strokeStyle = `rgba(96,152,166,${0.28 * alpha})`
        g.lineWidth = Math.max(0.5, r * 0.012)
        g.stroke()
        if (r > 14) {
          g.fillStyle = `rgba(255,255,255,${0.5 * alpha})`
          g.beginPath(); g.ellipse(cx - r * 0.34, cy - r * 0.42, r * 0.16, r * 0.1, -0.6, 0, 6.2832); g.fill()
        }
      }

      const zoom = Math.pow(0.5, seg(0, 0.62) * 6.2)
      const fieldFade = 1 - ease(seg(0.62, 0.86))
      drop(w * 0.68, h * 0.44, Math.min(w, h) * 0.62 * zoom, 0.95 * amt * fieldFade)

      const many = ease(seg(0.16, 0.5)) * fieldFade * amt

      if (many > 0.01) {
        for (const c of clouds) {
          const cx = ((c.x + t * 0.004 * c.sp + 0.3) % 1.4 - 0.2) * w
          const cy = c.y * h
          const cw = c.s * w * 0.5, chh = cw * 0.32
          const a = 0.9 * many * c.o
          for (const puff of c.puffs) {
            const px = cx + puff[0] * cw, py = cy + puff[1] * chh, pr = puff[2] * chh
            const grd = g.createRadialGradient(px, py - pr * 0.25, pr * 0.1, px, py, pr)
            grd.addColorStop(0, `rgba(255,255,255,${0.85 * a})`)
            grd.addColorStop(0.55, `rgba(240,244,247,${0.5 * a})`)
            grd.addColorStop(1, 'rgba(214,223,230,0)')
            g.fillStyle = grd
            g.beginPath(); g.arc(px, py, pr, 0, 6.2832); g.fill()
          }
          const base = g.createLinearGradient(cx, cy, cx, cy + chh * 1.1)
          base.addColorStop(0, `rgba(198,210,220,${0.3 * a})`)
          base.addColorStop(1, 'rgba(198,210,220,0)')
          g.fillStyle = base
          g.beginPath(); g.ellipse(cx, cy + chh * 0.35, cw * 0.72, chh * 0.5, 0, 0, 6.2832); g.fill()
        }
        for (const d of drops) {
          const fall = (d.y + t * 0.09 * d.sp) % 1.15 - 0.1
          const x = d.x * w + Math.sin(t * 0.5 + d.ph) * 6
          const r = d.r * 5.5 * Math.min(1, zoom * 14 + 0.5)
          const a = many * (0.4 + d.r * 0.3)
          const len = r * (5 + d.sp * 9)
          const grd = g.createLinearGradient(x, fall * h - len, x, fall * h)
          grd.addColorStop(0, 'rgba(120,166,186,0)')
          grd.addColorStop(1, `rgba(108,156,178,${0.4 * a})`)
          g.strokeStyle = grd
          g.lineWidth = Math.max(0.6, r * 0.42)
          g.lineCap = 'round'
          g.beginPath(); g.moveTo(x + 1.5, fall * h - len); g.lineTo(x, fall * h); g.stroke()
          drop(x, fall * h, r, 0.9 * a)
        }
      }

      const orbit = ease(seg(0.68, 1))
      if (orbit > 0.005) {
        const a = orbit * amt
        for (const st of stars) {
          g.fillStyle = `rgba(255,255,255,${0.85 * a * st.a})`
          g.beginPath(); g.arc(st.x * w, st.y * h, st.a * 1.1, 0, 6.2832); g.fill()
        }
        const R = Math.max(w, h) * (0.5 + 0.22 * orbit)
        const cx = w + R * 0.34, cy = h + R * (0.95 - 0.62 * orbit)
        const glow = g.createRadialGradient(cx, cy, R * 0.94, cx, cy, R * 1.22)
        glow.addColorStop(0, `rgba(150,196,218,${0.34 * a})`)
        glow.addColorStop(1, 'rgba(150,196,218,0)')
        g.fillStyle = glow
        g.beginPath(); g.arc(cx, cy, R * 1.22, 0, 6.2832); g.fill()
        const sx = cx - R * 0.45, sy = cy - R * 0.5
        const ocean = g.createRadialGradient(sx, sy, R * 0.05, cx, cy, R * 1.1)
        ocean.addColorStop(0, `rgba(126,178,206,${0.95 * a})`)
        ocean.addColorStop(0.35, `rgba(78,138,176,${0.95 * a})`)
        ocean.addColorStop(0.72, `rgba(44,96,138,${0.95 * a})`)
        ocean.addColorStop(1, `rgba(18,48,78,${0.95 * a})`)
        g.save()
        g.beginPath(); g.arc(cx, cy, R, 0, 6.2832); g.clip()
        g.fillStyle = ocean; g.fillRect(cx - R, cy - R, R * 2, R * 2)
        const spin = -20 + t * 2.2
        const D = Math.PI / 180
        g.lineWidth = Math.max(0.6, R * 0.004)
        for (const poly of LANDS) {
          let sum = 0, n2 = 0
          for (const pt of poly) { sum += Math.abs(pt[1]); n2++ }
          const midLat = sum / n2
          const arid = Math.max(0, 1 - Math.abs(midLat - 24) / 26)
          const lg = g.createLinearGradient(cx - R, cy - R, cx + R, cy + R)
          lg.addColorStop(0, `rgba(${Math.round(126 + arid * 58)},${Math.round(152 - arid * 12)},${Math.round(96 - arid * 22)},${0.97 * a})`)
          lg.addColorStop(1, `rgba(${Math.round(72 + arid * 58)},${Math.round(104 - arid * 6)},${Math.round(66 - arid * 14)},${0.97 * a})`)
          g.fillStyle = lg
          g.strokeStyle = `rgba(58,86,64,${0.45 * a})`
          let started = false, drawn = false
          g.beginPath()
          for (const [lon, lat] of poly) {
            const la = lat * D, lo = (lon + spin) * D
            if (Math.cos(la) * Math.cos(lo) <= 0) { started = false; continue }
            const px = cx + R * Math.cos(la) * Math.sin(lo)
            const py = cy - R * Math.sin(la)
            if (!started) { g.moveTo(px, py); started = true } else { g.lineTo(px, py) }
            drawn = true
          }
          if (drawn) { g.closePath(); g.fill(); g.stroke() }
        }
        for (const pole of [1, -1]) {
          const py = cy - R * Math.sin(pole * 78 * D)
          const cap = g.createRadialGradient(cx, py, 0, cx, py, R * 0.34)
          cap.addColorStop(0, `rgba(246,250,252,${0.92 * a})`)
          cap.addColorStop(0.6, `rgba(226,238,244,${0.5 * a})`)
          cap.addColorStop(1, 'rgba(226,238,244,0)')
          g.fillStyle = cap
          g.beginPath(); g.ellipse(cx, py, R * 0.42, R * 0.17, 0, 0, 6.2832); g.fill()
        }
        for (const c of clouds) {
          const la = (c.y - 0.5) * 120 * D, lo = ((c.x * 360 + t * 6) % 360 - 180) * D
          if (Math.cos(la) * Math.cos(lo) <= 0.08) continue
          const px = cx + R * Math.cos(la) * Math.sin(lo), py = cy - R * Math.sin(la)
          const pr = R * 0.22 * c.s
          const cg = g.createRadialGradient(px, py, 0, px, py, pr)
          cg.addColorStop(0, `rgba(255,255,255,${0.5 * a * c.o})`)
          cg.addColorStop(1, 'rgba(255,255,255,0)')
          g.fillStyle = cg
          g.beginPath(); g.ellipse(px, py, pr * Math.cos(lo), pr * 0.6, 0, 0, 6.2832); g.fill()
        }
        const term = g.createRadialGradient(sx, sy, R * 0.1, cx + R * 0.12, cy + R * 0.16, R * 1.35)
        term.addColorStop(0, `rgba(255,252,240,${0.16 * a})`)
        term.addColorStop(0.45, 'rgba(20,34,56,0)')
        term.addColorStop(0.78, `rgba(14,26,48,${0.42 * a})`)
        term.addColorStop(1, `rgba(8,16,32,${0.72 * a})`)
        g.fillStyle = term; g.fillRect(cx - R, cy - R, R * 2, R * 2)
        g.lineWidth = R * 0.02
        g.strokeStyle = `rgba(186,224,240,${0.35 * a})`
        g.beginPath(); g.arc(cx, cy, R * 0.99, 0, 6.2832); g.stroke()
        g.restore()
      }
    }

    let rafId
    const loop = () => { draw(); rafId = requestAnimationFrame(loop) }
    rafId = requestAnimationFrame(loop)
    const onResize = () => draw()
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', onResize)
      cv.remove()
    }
  }, [])

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        display: tab === 'home' ? 'block' : 'none'
      }}
    />
  )
}
