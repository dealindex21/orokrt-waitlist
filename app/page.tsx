'use client'

import { useState, useEffect, useRef } from 'react'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

const FONT = "'Geist', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
const MONO = "'Geist Mono', 'SF Mono', 'Fira Code', monospace"

type EmailFormProps = {
  email: string
  setEmail: (v: string) => void
  submitted: boolean
  submitting: boolean
  onSubmit: () => void
}

function EmailForm({ email, setEmail, submitted, submitting, onSubmit }: EmailFormProps) {
  if (submitted) {
    return (
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: '12px 20px', background: '#0a1a0f',
        border: '1px solid #22C55E30', borderRadius: 8,
      }}>
        <span style={{ color: '#22C55E' }}>✓</span>
        <span style={{ fontSize: 14, color: '#22C55E', fontFamily: FONT }}>You&apos;re on the list</span>
      </div>
    )
  }
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSubmit() }}
      style={{ display: 'flex', gap: 8, maxWidth: 460, flexWrap: 'wrap' }}
    >
      <input
        type="email"
        placeholder="you@yourbrand.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="email"
        aria-label="Your email address"
        style={{
          flex: 1, minWidth: 220, padding: '12px 16px',
          background: '#111', border: '1px solid #222', borderRadius: 8,
          color: '#fff', fontSize: 14, fontFamily: FONT, outline: 'none',
          transition: 'border 0.2s, box-shadow 0.2s',
        }}
        onFocus={(e) => { e.target.style.borderColor = '#555'; e.target.style.boxShadow = '0 0 0 3px #ffffff08' }}
        onBlur={(e)  => { e.target.style.borderColor = '#222'; e.target.style.boxShadow = 'none' }}
      />
      <button
        type="submit"
        disabled={submitting}
        style={{
          padding: '12px 22px', background: '#fff', border: 'none', borderRadius: 8,
          color: '#000', fontSize: 14, fontWeight: 500, fontFamily: FONT,
          cursor: 'pointer', transition: 'all 0.15s', opacity: submitting ? 0.5 : 1,
        }}
        onMouseEnter={(e) => { (e.target as HTMLButtonElement).style.background = '#e5e5e5' }}
        onMouseLeave={(e) => { (e.target as HTMLButtonElement).style.background = '#fff' }}
      >
        {submitting ? 'Joining...' : 'Get early access'}
      </button>
    </form>
  )
}

export default function OROKRTWaitlist() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [vis, setVis] = useState(new Set<string>())
  const refs = useRef<HTMLElement[]>([])

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const target = e.target as HTMLElement
            setVis((p) => new Set([...p, target.dataset.s ?? '']))
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )
    refs.current.forEach((r) => r && obs.observe(r))
    return () => obs.disconnect()
  }, [])

  const reg = (el: HTMLElement | null, id: string) => {
    if (el) { el.dataset.s = id; refs.current.push(el) }
  }

  const vc = (id: string) =>
    `transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
      vis.has(id) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    }`

  const submit = async () => {
    if (!email || !email.includes('@')) { setError('Enter a valid email'); return }
    setSubmitting(true); setError('')
    try {
      const r = await fetch(`${SUPABASE_URL}/rest/v1/waitlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({ email, source: 'landing', created_at: new Date().toISOString() }),
      })
      if (r.ok || r.status === 201) {
        setSubmitted(true)
      } else {
        const d = await r.json().catch(() => ({})) as { code?: string }
        if (d?.code === '23505') setSubmitted(true)
        else setError('Something went wrong. Try again.')
      }
    } catch {
      setError('Connection failed. Try again.')
    }
    setSubmitting(false)
  }

  return (
    <div style={{ background: '#000', minHeight: '100vh', color: '#fff', overflowX: 'hidden', fontFamily: FONT }}>

      {/* NAV */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '0 24px', height: 48,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        backdropFilter: 'blur(12px)', background: '#000000cc',
        borderBottom: '1px solid #111',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{
            width: 22, height: 22, borderRadius: 5, background: '#C9A84C',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, fontWeight: 600, color: '#000',
          }}>O</div>
          <span style={{ fontSize: 14, fontWeight: 500, letterSpacing: '-0.02em' }}>OROKRT</span>
          <span style={{ fontSize: 14, fontWeight: 500, color: '#888' }}>.ai</span>
        </div>
        <span style={{ fontFamily: MONO, fontSize: 11, color: '#777' }}>Early access</span>
      </nav>

      {/* HERO */}
      <section style={{
        minHeight: 'calc(100vh - 44px)', display: 'flex', flexDirection: 'column',
        justifyContent: 'center', padding: '100px 24px 48px',
        maxWidth: 1000, margin: '0 auto',
      }}>
        <div style={{ animation: 'fadeUp 0.6s ease-out' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '5px 12px', background: '#111', border: '1px solid #1a1a1a',
            borderRadius: 20, marginBottom: 32,
          }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22C55E' }} />
            <span style={{ fontFamily: MONO, fontSize: 12, color: '#888' }}>Accepting early access</span>
          </div>
        </div>

        <h1 style={{
          fontSize: 'clamp(40px, 6.5vw, 72px)', fontWeight: 600,
          lineHeight: 1.05, letterSpacing: '-0.04em', color: '#fff',
          maxWidth: 700, marginBottom: 24,
          animation: 'fadeUp 0.6s ease-out 0.1s both',
        }}>
          Your e-commerce<br />runs itself.
        </h1>

        <p style={{
          fontSize: 'clamp(16px, 1.8vw, 18px)', lineHeight: 1.6, color: '#888',
          maxWidth: 500, marginBottom: 36, fontWeight: 400, letterSpacing: '-0.01em',
          animation: 'fadeUp 0.6s ease-out 0.15s both',
        }}>
          Built by a seller who grew a £1.7M multi-channel business from 2019 — then spent
          3 years encoding every operational decision into AI. Now it&apos;s yours.
        </p>

        <div style={{ animation: 'fadeUp 0.6s ease-out 0.2s both' }}>
          <EmailForm email={email} setEmail={setEmail} submitted={submitted} submitting={submitting} onSubmit={submit} />
          {error && (
            <div role="alert" aria-live="polite" style={{ marginTop: 6, fontSize: 12, color: '#EF4444' }}>{error}</div>
          )}
          <p style={{ marginTop: 12, fontSize: 12, color: '#777' }}>No spam · Unsubscribe anytime · SEIS eligible</p>
        </div>

        {/* Stats strip */}
        <div
          ref={(el) => reg(el as HTMLElement | null, 's')}
          className={vc('s')}
          style={{ display: 'flex', gap: 0, marginTop: 72, borderTop: '1px solid #111', flexWrap: 'wrap' }}
        >
          {[
            { v: '867', u: 'hrs/mo', l: 'Operations replaced' },
            { v: '37',  u: 'skills', l: 'Battle-tested playbooks' },
            { v: '3',   u: 'channels', l: 'Amazon · eBay · Shopify' },
            { v: '20',  u: 'min', l: 'Your time per launch' },
          ].map((s, i) => (
            <div key={i} style={{
              flex: 1, minWidth: '140px', padding: '24px 0',
              borderRight: i < 3 ? '1px solid #111' : 'none', textAlign: 'center',
            }}>
              <div style={{ fontSize: 28, fontWeight: 600, color: '#fff', letterSpacing: '-0.03em' }}>
                {s.v}
                <span style={{ fontFamily: MONO, fontSize: 11, color: '#C9A84C', fontWeight: 400, marginLeft: 2 }}>{s.u}</span>
              </div>
              <div style={{ fontSize: 12, color: '#888', marginTop: 4 }}>{s.l}</div>
            </div>
          ))}
        </div>

      </section>

      {/* FOUNDER TIMELINE — immediately after hero */}
      <section
        ref={(el) => reg(el as HTMLElement | null, 'f')}
        className={vc('f')}
        style={{ padding: '64px 24px 80px', maxWidth: 1000, margin: '0 auto' }}
      >
        <div style={{ marginBottom: 40, textAlign: 'center' }}>
          <p style={{ fontFamily: MONO, fontSize: 12, color: '#C9A84C', marginBottom: 8 }}>Origin</p>
          <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 600, color: '#fff', letterSpacing: '-0.03em' }}>
            Built by a seller, not a lab.
          </h2>
        </div>

        <div style={{ position: 'relative', display: 'flex', gap: 0 }} className="timeline-wrap">
          <div style={{
            position: 'absolute', top: 7, left: '8px', right: '8px', height: 1,
            background: '#222', zIndex: 0,
          }} />

          {[
            { year: '2016', desc: 'Founded Infinity Market UK Ltd' },
            { year: '2019', desc: 'Expanded to Amazon, eBay, Shopify' },
            { year: '2022', desc: '£1M revenue. Ops consuming 60+ hrs/week' },
            { year: '2023', desc: 'Started encoding decisions into AI playbooks' },
            { year: '2025', desc: '862 ASINs running autonomously across 3 channels' },
            { year: '2026', desc: 'Rebuilt as OROKRT.ai for any seller' },
          ].map((m, i, arr) => (
            <div key={i} style={{ flex: 1, position: 'relative', zIndex: 1, paddingRight: i < arr.length - 1 ? 12 : 0 }}>
              <div style={{
                width: 14, height: 14, borderRadius: '50%',
                background: i === arr.length - 1 ? '#C9A84C' : '#222',
                border: `2px solid ${i === arr.length - 1 ? '#C9A84C' : '#333'}`,
                marginBottom: 16,
              }} />
              <div style={{ fontFamily: MONO, fontSize: 13, fontWeight: 500, color: '#C9A84C', marginBottom: 6 }}>
                {m.year}
              </div>
              <div style={{ fontSize: 13, lineHeight: 1.5, color: '#777' }}>
                {m.desc}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MARQUEE */}
      <div style={{
        borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a',
        padding: '12px 0', overflow: 'hidden', whiteSpace: 'nowrap', background: '#0a0a0a',
        width: '100%',
      }}>
        <div style={{ display: 'inline-block', animation: 'marquee 40s linear infinite' }}>
          {[1, 2].map((k) => (
            <span key={k}>
              {['PPC architecture', 'COSMO pre-flight', 'B2B isolation', 'Launch ladder',
                'Competitor defence', 'Review solicitation', 'Keyword graduation',
                'BuyBox monitoring', 'Dayparting', 'Margin gates'].map((t, j) => (
                <span key={j} style={{ fontFamily: MONO, fontSize: 12, color: '#777', letterSpacing: '0.02em' }}>
                  {t}<span style={{ color: '#C9A84C40', margin: '0 28px' }}>·</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section
        ref={(el) => reg(el as HTMLElement | null, 'h')}
        className={vc('h')}
        style={{ padding: '96px 24px', maxWidth: 1000, margin: '0 auto' }}
      >
        <div style={{ marginBottom: 48 }}>
          <p style={{ fontFamily: MONO, fontSize: 12, color: '#C9A84C', marginBottom: 8 }}>How it works</p>
          <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 600, letterSpacing: '-0.03em', color: '#fff' }}>
            Connect. Approve. Scale.
          </h2>
        </div>

        <div className="grid-3col" style={{ display: 'grid', gap: 1, background: '#111', borderRadius: 12, overflow: 'hidden' }}>
          {[
            { n: '01', t: 'Connect your stores', d: 'Link Amazon, eBay, Shopify. The operator reads your catalogue, campaigns, and sales data. Five minutes.' },
            { n: '02', t: 'Approve what matters', d: 'Morning brief: what happened, what needs you. Tap approve on big calls. Bid adjustments and negatives run automatically.' },
            { n: '03', t: 'Watch it compound', d: 'Every action logged with its £ value. Every launch feeds the next. Your Value Ledger proves it — pound by pound.' },
          ].map((f, i) => (
            <div key={i} style={{ padding: '32px 24px', background: '#0a0a0a' }}>
              <span style={{ fontFamily: MONO, fontSize: 11, color: '#777', display: 'block', marginBottom: 16 }}>{f.n}</span>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#fff', marginBottom: 10, letterSpacing: '-0.02em' }}>{f.t}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.65, color: '#888' }}>{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MOAT */}
      <section
        ref={(el) => reg(el as HTMLElement | null, 'm')}
        className={vc('m')}
        style={{ padding: '64px 24px 96px', maxWidth: 1000, margin: '0 auto' }}
      >
        <div className="grid-moat" style={{ display: 'grid', gap: 56, alignItems: 'start' }}>
          <div>
            <p style={{ fontFamily: MONO, fontSize: 12, color: '#C9A84C', marginBottom: 8 }}>The moat</p>
            <h2 style={{ fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 600, color: '#fff', marginBottom: 20, letterSpacing: '-0.03em', lineHeight: 1.15 }}>
              Anyone can wire AI to Shopify. Nobody else has the playbook.
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: '#888', marginBottom: 14 }}>
              37 operator skills — each a versioned playbook encoded from 5 years and £1.7M of real
              e-commerce operations. The PPC Bible. The 6-stage launch ladder. The B2B playbook
              that exploits 60% conversion rates.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: '#888' }}>
              A competitor needs years of production ops to replicate this. By then, the skills
              will have compounded from hundreds of customer accounts.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
            {[
              { n: 'PPC Bible',         d: 'C1–C8 campaigns' },
              { n: 'Launch Ladder',     d: '6-stage lifecycle' },
              { n: 'B2B Playbook',      d: '60% CVR, 3× bids' },
              { n: 'COSMO Pre-flight',  d: 'Amazon AI search' },
              { n: 'Governance',        d: '47 safety controls' },
              { n: 'Compound Learning', d: '#100 > #1' },
            ].map((s, i) => (
              <div
                key={i}
                style={{ padding: '16px 14px', background: '#0a0a0a', borderRadius: 8, border: '1px solid #1a1a1a', transition: 'border 0.2s' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = '#2a2a2a' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = '#1a1a1a' }}
              >
                <div style={{ fontSize: 14, fontWeight: 500, color: '#fff', marginBottom: 2 }}>{s.n}</div>
                <div style={{ fontFamily: MONO, fontSize: 11, color: '#888' }}>{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VS COMPARISON */}
      <section
        ref={(el) => reg(el as HTMLElement | null, 'v')}
        className={vc('v')}
        style={{ padding: '48px 24px 96px', maxWidth: 860, margin: '0 auto' }}
      >
        <h2 style={{ fontSize: 32, fontWeight: 600, color: '#fff', textAlign: 'center', letterSpacing: '-0.03em', marginBottom: 40 }}>
          Not another <span style={{ color: '#777', textDecoration: 'line-through' }}>dashboard</span>. An operator.
        </h2>
        <div className="grid-vs" style={{ display: 'grid', gap: 12 }}>
          {/* Old stack */}
          <div style={{ padding: '24px 20px', background: '#0a0a0a', borderRadius: 10, border: '1px solid #1a1a1a' }}>
            <div style={{ fontFamily: MONO, fontSize: 11, color: '#777', marginBottom: 14 }}>YOUR CURRENT STACK</div>
            {['Helium 10 · £99', 'Repricer · £100', 'PPC tool · £100', 'Inventory · £50', 'Analytics · £50'].map((t, i) => (
              <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid #111', fontSize: 13, color: '#888', display: 'flex', justifyContent: 'space-between' }}>
                <span>{t.split('·')[0]}</span>
                <span style={{ fontFamily: MONO, fontSize: 12, color: '#EF444450' }}>{t.split('·')[1]}</span>
              </div>
            ))}
            <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
              <span style={{ color: '#888' }}>Total</span>
              <span style={{ fontFamily: MONO, color: '#EF4444', fontWeight: 500 }}>£400+/mo</span>
            </div>
            <div style={{ fontSize: 12, color: '#777', marginTop: 6 }}>5 dashboards. Zero execution.</div>
          </div>

          {/* OROKRT */}
          <div style={{ padding: '24px 20px', background: '#0a0a0a', borderRadius: 10, border: '1px solid #C9A84C20', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)' }} />
            <div style={{ fontFamily: MONO, fontSize: 11, color: '#C9A84C', marginBottom: 14 }}>OROKRT.AI</div>
            {[
              'PPC · 8 campaigns per ASIN',
              'Listings · COSMO + Rufus ready',
              'B2B · Separated, 3× bids',
              'Inventory + pricing',
              'Reviews + defence',
              'Product launches · 3 channels',
              'Value ledger · £ proof',
            ].map((t, i) => (
              <div key={i} style={{ padding: '6px 0', borderBottom: '1px solid #111', fontSize: 13, color: '#aaa', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ color: '#22C55E', fontSize: 7 }}>●</span>{t}
              </div>
            ))}
            <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontSize: 13, color: '#888' }}>From</span>
              <div>
                <span style={{ fontSize: 28, fontWeight: 600, color: '#C9A84C', letterSpacing: '-0.03em' }}>£199</span>
                <span style={{ fontSize: 13, color: '#888' }}>/mo</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRESSIVE TRUST */}
      <section
        ref={(el) => reg(el as HTMLElement | null, 't')}
        className={vc('t')}
        style={{ padding: '48px 24px 96px', maxWidth: 860, margin: '0 auto', textAlign: 'center' }}
      >
        <p style={{ fontFamily: MONO, fontSize: 12, color: '#C9A84C', marginBottom: 8 }}>Progressive trust</p>
        <h2 style={{ fontSize: 'clamp(24px, 3vw, 34px)', fontWeight: 600, color: '#fff', marginBottom: 36, letterSpacing: '-0.03em' }}>
          The AI earns autonomy. You hold the dial.
        </h2>
        <div className="grid-trust" style={{ display: 'grid', background: '#0a0a0a', borderRadius: 10, overflow: 'hidden', border: '1px solid #1a1a1a' }}>
          {[
            { ph: 'Day 1',   m: 'Suggest',    d: 'Recommends. Waits for you.', c: '#888' },
            { ph: 'Week 2',  m: 'Approve',    d: 'Executes with 4hr reversal.', c: '#C9A84C' },
            { ph: 'Month 2', m: 'Autonomous', d: 'Handles it. You check the brief.', c: '#22C55E' },
          ].map((p, i) => (
            <div key={i} className={i < 2 ? 'trust-cell' : ''} style={{ padding: '24px 16px' }}>
              <div style={{ fontFamily: MONO, fontSize: 10, color: '#777', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>{p.ph}</div>
              <div style={{ fontSize: 20, fontWeight: 600, color: p.c, marginBottom: 6, letterSpacing: '-0.02em' }}>{p.m}</div>
              <div style={{ fontSize: 13, color: '#888' }}>{p.d}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 16, display: 'flex', justifyContent: 'center', gap: 8, flexWrap: 'wrap' }}>
          {['Kill switch', 'Blast-radius caps', 'Per-action audit', '47 controls'].map((t, i) => (
            <span key={i} style={{ fontFamily: MONO, fontSize: 11, color: '#777', padding: '4px 10px', border: '1px solid #222', borderRadius: 4 }}>{t}</span>
          ))}
        </div>
      </section>

      <style>{`
          .grid-3col  { grid-template-columns: repeat(3, 1fr); }
          .grid-moat  { grid-template-columns: 1.2fr 1fr; }
          .grid-vs    { grid-template-columns: 1fr 1fr; }
          .grid-trust { grid-template-columns: 1fr 1fr 1fr; }
          .trust-cell { border-right: 1px solid #1a1a1a; }
          @media (max-width: 640px) {
            .grid-3col  { grid-template-columns: 1fr !important; }
            .grid-moat  { grid-template-columns: 1fr !important; gap: 32px !important; }
            .grid-vs    { grid-template-columns: 1fr !important; }
            .grid-trust { grid-template-columns: 1fr !important; }
            .trust-cell { border-right: none !important; border-bottom: 1px solid #1a1a1a; }
            .timeline-wrap { flex-direction: column !important; gap: 28px !important; }
            .timeline-wrap > div > div:first-child { display: none !important; }
          }
        `}</style>

      {/* FINAL CTA */}
      <section style={{ padding: '96px 24px 120px', textAlign: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, #C9A84C04, transparent 50%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 600, color: '#fff', letterSpacing: '-0.04em', marginBottom: 14, lineHeight: 1.1 }}>
            Stop managing.<br />
            <span style={{ color: '#C9A84C' }}>Start operating.</span>
          </h2>
          <p style={{ fontSize: 16, color: '#888', maxWidth: 420, margin: '0 auto 32px' }}>
            Join the waitlist. Be first to replace 867 hours of operations with one AI operator.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <EmailForm email={email} setEmail={setEmail} submitted={submitted} submitting={submitting} onSubmit={submit} />
          </div>
          {error && (
            <div role="alert" aria-live="polite" style={{ marginTop: 6, fontSize: 12, color: '#EF4444' }}>{error}</div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        padding: '20px 24px', borderTop: '1px solid #111',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: 12, maxWidth: 1000, margin: '0 auto',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 18, height: 18, borderRadius: 4, background: '#C9A84C', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 600, color: '#000' }}>O</div>
          <span style={{ fontSize: 12, color: '#777' }}>OROKRT.ai · Orokrt Retail Ltd</span>
        </div>
        <div style={{ fontFamily: MONO, fontSize: 11, color: '#777', display: 'flex', gap: 16 }}>
          <span>37 skills</span><span>3 channels</span><span>7 countries</span><span>SEIS eligible</span>
        </div>
      </footer>

    </div>
  )
}
