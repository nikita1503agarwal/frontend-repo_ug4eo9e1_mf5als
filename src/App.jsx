import React, { useEffect, useMemo, useState } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import Spline from '@splinetool/react-spline'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

const ease = [0.22, 1, 0.36, 1]

function useParallax(multiplier = 50) {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, multiplier])
  return y
}

function NeonButton({ children, href, onClick }) {
  const content = (
    <motion.span
      className="relative inline-flex items-center justify-center px-5 py-3 rounded-xl bg-[#8A5CFF]/20 text-white font-semibold tracking-wide shadow-[0_0_30px_rgba(138,92,255,0.35)] ring-1 ring-[#8A5CFF]/40 hover:ring-[#8A5CFF] hover:bg-[#8A5CFF]/30 transition-colors"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.25, ease }}
    >
      <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#8A5CFF]/30 via-[#4CC9FF]/20 to-[#FF4EDB]/30 blur-xl" aria-hidden />
      <span className="relative">{children}</span>
    </motion.span>
  )
  if (href) {
    return (
      <a href={href} onClick={onClick} className="group">
        {content}
      </a>
    )
  }
  return (
    <button onClick={onClick} className="group">
      {content}
    </button>
  )
}

function Starfield() {
  // 3 layered starfield; animated via CSS for GPU efficiency
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="parallax-layer" data-depth="0.2">
        <div className="stars stars-sm" />
      </div>
      <div className="parallax-layer" data-depth="0.5">
        <div className="stars stars-md" />
      </div>
      <div className="parallax-layer" data-depth="0.8">
        <div className="stars stars-lg" />
      </div>
      <div className="nebula-gradient" />
    </div>
  )
}

function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-20">
      <div className="mx-auto max-w-7xl px-6 py-6 flex items-center justify-between">
        <div className="text-white/80 tracking-widest text-sm">9okXE</div>
        <nav className="hidden md:flex gap-6 text-white/70">
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#gallery" className="hover:text-white transition-colors">Gallery</a>
          <a href="#commissions" className="hover:text-white transition-colors">Commissions</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
        </nav>
      </div>
    </header>
  )
}

function Hero() {
  const prefersReducedMotion = useReducedMotion()
  const y = useParallax(prefersReducedMotion ? 0 : 80)

  return (
    <section id="hero" className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/7m4PRZ7kg6K1jPfF/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0223]/40 via-[#0B0223]/50 to-[#0B0223] pointer-events-none" />
      <Starfield />
      <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
        <motion.h1
          style={{ y }}
          initial={{ opacity: 0, filter: 'blur(8px)', rotateX: -10 }}
          whileInView={{ opacity: 1, filter: 'blur(0px)', rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="text-6xl sm:text-7xl md:text-8xl font-extrabold tracking-tight text-white drop-shadow-[0_0_25px_rgba(138,92,255,0.55)]"
        >
          9okXE
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.2 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease, delay: 0.2 }}
          className="mt-3 text-white/20 text-xl"
        >
          Alex
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease, delay: 0.15 }}
          className="mt-6 text-lg sm:text-xl text-white/80"
        >
          3D Roblox Animator — I bring blocky worlds to life.
        </motion.p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <NeonButton href="#gallery">View Work</NeonButton>
          <NeonButton href="#commissions">Request a Commission</NeonButton>
        </div>
      </div>
    </section>
  )
}

function About() {
  const y = useParallax(40)
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(138,92,255,0.12),transparent_60%)]" aria-hidden />
      <div className="relative mx-auto max-w-5xl px-6">
        <motion.h2
          style={{ y }}
          className="text-3xl sm:text-4xl font-bold text-white"
        >
          About
        </motion.h2>
        <p className="mt-4 text-white/80 leading-relaxed">
          I’m 9okXE (Alex), a 3D Roblox animator. I love transforming simple ideas into clean, expressive motion. I make Roblox and YouTube animations that stand out with style and smooth transitions.
        </p>
        <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {['Character Animation','Combat & Action Loops','Smooth Motion Blends','Custom Effects'].map((item, i) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, ease, delay: i * 0.05 }}
              className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 text-white/90 shadow-[0_0_30px_rgba(76,201,255,0.08)] hover:shadow-[0_0_40px_rgba(255,78,219,0.15)]"
            >
              <span className="relative z-10">{item}</span>
              <span className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-[#8A5CFF]/10 to-[#FF4EDB]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Gallery() {
  const items = [
    { url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', caption: '60s Combat Loop — fast hits, fluid transitions' },
    { url: 'https://www.youtube.com/embed/oHg5SJYRHA0', caption: 'Stylized Run Cycle — clean arcs, snappy timing' },
    { url: 'https://www.youtube.com/embed/ysz5S6PUM-U', caption: 'VFX Combo — particles + motion blend' },
  ]
  return (
    <section id="gallery" className="relative py-24 sm:py-32">
      <div className="relative mx-auto max-w-6xl px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-white">Showreel</h2>
        <p className="mt-3 text-white/70">A glimpse of animation style and energy.</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, idx) => (
            <motion.figure
              key={idx}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
              whileHover={{ y: -2, rotateX: 0 }}
              transition={{ duration: 0.25, ease }}
            >
              <div className="relative aspect-video">
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={item.url}
                  title={`clip-${idx}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10 group-hover:ring-[#8A5CFF]/40 transition-colors" />
              </div>
              <figcaption className="p-4 text-white/80 text-sm">{item.caption}</figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}

function Commissions() {
  const [form, setForm] = useState({ name: '', email: '', description: '', deadline: '', budget: '' })
  const [status, setStatus] = useState({ loading: false, message: '', ok: null })

  async function onSubmit(e) {
    e.preventDefault()
    setStatus({ loading: true, message: '', ok: null })
    try {
      const res = await fetch(`${API_BASE}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          description: form.description,
          deadline: form.deadline || undefined,
          budget: form.budget || undefined,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.detail || 'Failed to submit')
      setStatus({ loading: false, message: data.message, ok: true })
      setForm({ name: '', email: '', description: '', deadline: '', budget: '' })
    } catch (err) {
      setStatus({ loading: false, message: String(err.message || err), ok: false })
    }
  }

  return (
    <section id="commissions" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(76,201,255,0.12),transparent_60%)]" aria-hidden />
      <div className="relative mx-auto max-w-3xl px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-white">Open for Commissions</h2>
        <p className="mt-3 text-white/80">
          Looking for a custom Roblox animation? Tell me what you need — I’ll review the complexity and reply with a quote.
        </p>
        <p className="mt-3 text-[#4CC9FF] font-medium">Average rate: $5–$10 for 60-second animations (final price depends on project complexity).</p>

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-white/80 text-sm">Name</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#8A5CFF]"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="text-white/80 text-sm">Email</label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#8A5CFF]"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label className="text-white/80 text-sm">Project Description</label>
            <textarea
              required
              rows={5}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#8A5CFF]"
              placeholder="Describe the animation, style, length, references..."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-white/80 text-sm">Deadline (optional)</label>
              <input
                type="date"
                value={form.deadline}
                onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#8A5CFF]"
              />
            </div>
            <div>
              <label className="text-white/80 text-sm">Budget Range (optional)</label>
              <select
                value={form.budget}
                onChange={(e) => setForm({ ...form, budget: e.target.value })}
                className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#8A5CFF]"
              >
                <option value="">Select range</option>
                <option value="$5-$10">$5–$10 (60s avg)</option>
                <option value="$10-$25">$10–$25</option>
                <option value="$25+">$25+</option>
              </select>
            </div>
          </div>

          <div className="pt-2">
            <NeonButton>
              {status.loading ? 'Sending…' : 'Send Request'}
            </NeonButton>
          </div>

          {status.message && (
            <p className={`text-sm ${status.ok ? 'text-emerald-300' : 'text-rose-300'}`}>{status.message}</p>
          )}
          <p className="text-xs text-white/60">I’ll reply from okvr500@gmail.com with your quote and next steps.</p>
        </form>
      </div>
    </section>
  )
}

function FAQ() {
  const items = [
    { q: 'How do you price?', a: 'Based on complexity and length. Average 60s = $5–$10.' },
    { q: 'What do I receive?', a: 'Final MP4 or MOV file. Source files available on request.' },
    { q: 'Revisions?', a: '1–2 light adjustments included.' },
    { q: 'Timeline?', a: 'Depends on complexity; you’ll get an ETA with your quote.' },
  ]
  return (
    <section id="faq" className="relative py-24 sm:py-32">
      <div className="relative mx-auto max-w-4xl px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-white">FAQ</h2>
        <div className="mt-8 divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
          {items.map((it, i) => (
            <details key={i} className="group p-6">
              <summary className="cursor-pointer list-none text-white/90">{it.q}</summary>
              <p className="mt-2 text-white/70">{it.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative py-10">
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0223] to-transparent" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-white/70">
        <div className="text-sm">© {year} 9okXE</div>
        <div className="flex items-center gap-6">
          <a href="mailto:okvr500@gmail.com" className="hover:text-white transition-colors">Email</a>
          <a href="#" className="hover:text-white transition-colors">YouTube</a>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--bg-deep', '#0B0223')
  }, [])

  return (
    <div className="min-h-screen relative bg-[#0B0223] text-white">
      <Header />
      <main>
        <Hero />
        <About />
        <Gallery />
        <Commissions />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}
