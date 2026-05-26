import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'OROKRT.ai — AI Operator for E-commerce'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#000',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
        }}
      >
        {/* subtle gold glow */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'radial-gradient(ellipse at 20% 50%, #C9A84C12, transparent 60%)',
          display: 'flex',
        }} />

        {/* logo mark */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          marginBottom: 48,
        }}>
          <div style={{
            width: 40, height: 40, borderRadius: 9,
            background: '#C9A84C',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22, fontWeight: 700, color: '#000',
          }}>O</div>
          <span style={{ fontSize: 22, fontWeight: 500, color: '#fff', letterSpacing: '-0.02em' }}>
            OROKRT<span style={{ color: '#C9A84C' }}>.ai</span>
          </span>
        </div>

        {/* headline */}
        <div style={{
          fontSize: 64, fontWeight: 700, color: '#fff',
          letterSpacing: '-0.04em', lineHeight: 1.05,
          marginBottom: 24,
          display: 'flex', flexDirection: 'column',
        }}>
          <span>Your e-commerce</span>
          <span>runs itself.</span>
        </div>

        {/* sub */}
        <div style={{ fontSize: 22, color: '#888', maxWidth: 640, lineHeight: 1.5 }}>
          One AI operator replaces your entire ops stack — Amazon, eBay, Shopify.
        </div>

        {/* stats row */}
        <div style={{
          display: 'flex', gap: 40, marginTop: 56,
          paddingTop: 32, borderTop: '1px solid #1a1a1a',
        }}>
          {[
            { v: '867 hrs/mo', l: 'Ops replaced' },
            { v: '37 skills', l: 'Battle-tested' },
            { v: '3 channels', l: 'Amazon · eBay · Shopify' },
          ].map((s, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 20, fontWeight: 600, color: '#C9A84C' }}>{s.v}</span>
              <span style={{ fontSize: 14, color: '#555' }}>{s.l}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  )
}
