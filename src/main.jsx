import React, { useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  BellRing,
  BookOpen,
  BrainCircuit,
  Check,
  ChevronRight,
  CircleAlert,
  Clock3,
  Command,
  Copy,
  FileCheck2,
  FileText,
  Fingerprint,
  HeartHandshake,
  IndianRupee,
  LayoutDashboard,
  LockKeyhole,
  MessageCircleMore,
  Mic2,
  Network,
  PhoneCall,
  Play,
  Radio,
  RefreshCw,
  ScanFace,
  Send,
  Shield,
  ShieldAlert,
  Siren,
  Sparkles,
  UserRound,
  UsersRound,
  X,
  Zap,
} from 'lucide-react'
import './styles.css'

const navItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'protect', label: 'Protect a payment', icon: Shield },
  { id: 'guardian', label: 'Guardian loop', icon: UsersRound, badge: 'LIVE' },
  { id: 'recovery', label: 'Golden-hour recovery', icon: Siren },
  { id: 'blueprint', label: 'Trust & rollout', icon: Network },
]

const riskSignals = [
  { label: 'New payee', detail: 'First payment to this account', points: '+40', icon: UserRound },
  { label: 'Amount spike', detail: '3.4× above your usual transfer', points: '+30', icon: IndianRupee },
  { label: 'Active call', detail: 'Call state only · audio not read', points: '+30', icon: PhoneCall },
]

const scenarios = [
  { id: 'safe', label: 'Safe payment', tone: 'safe', caption: 'Low-risk transfer' },
  { id: 'risk', label: 'Scam-coached call', tone: 'risk', caption: 'Trigger the pause' },
  { id: 'approved', label: 'Guardian approves', tone: 'approved', caption: 'Show allowed outcome' },
  { id: 'denied', label: 'Guardian blocks', tone: 'denied', caption: 'Show blocked outcome' },
  { id: 'loss', label: 'Post-loss recovery', tone: 'loss', caption: 'Generate the pack' },
]

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [activeNav, setActiveNav] = useState('overview')
  const [scenario, setScenario] = useState('risk')
  const [guardianDecision, setGuardianDecision] = useState('pending')
  const [language, setLanguage] = useState('English')
  const [recoveryGenerated, setRecoveryGenerated] = useState(false)
  const [toast, setToast] = useState('')
  const [showRiskModal, setShowRiskModal] = useState(false)

  const activeScenario = scenarios.find((item) => item.id === scenario)
  const isRisk = scenario !== 'safe'
  const isBlocked = scenario === 'denied' || guardianDecision === 'denied'
  const isApproved = scenario === 'approved' || guardianDecision === 'approved'

  const showToast = (message) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 2400)
  }

  const launchScenario = (nextScenario) => {
    setScenario(nextScenario)
    setGuardianDecision(nextScenario === 'approved' ? 'approved' : nextScenario === 'denied' ? 'denied' : 'pending')
    if (nextScenario === 'loss') {
      setActiveNav('recovery')
      setRecoveryGenerated(false)
    } else if (nextScenario === 'safe' || nextScenario === 'risk' || nextScenario === 'approved' || nextScenario === 'denied') {
      setActiveNav(nextScenario === 'safe' ? 'protect' : 'guardian')
    }
    if (nextScenario === 'risk') setShowRiskModal(true)
  }

  const handleGuardian = (decision) => {
    setGuardianDecision(decision)
    setScenario(decision === 'approved' ? 'approved' : 'denied')
    showToast(decision === 'approved' ? 'Guardian approval returned to Kavach' : 'Payment blocked by your Guardian')
  }

  const pageTitle = useMemo(() => {
    const titles = {
      overview: ['Protection command center', 'A calm second opinion for high-stakes payment moments.'],
      protect: ['Protect a payment', 'Simulate the moment Kavach steps in before money leaves.'],
      guardian: ['Guardian loop', 'Out-of-band human approval, built for the moment trust is under attack.'],
      recovery: ['Golden-hour recovery', 'When money leaves, Kavach helps you do the next right thing fast.'],
      blueprint: ['Trust & rollout', 'The product boundary, architecture and Paytm-native path in one view.'],
    }
    return titles[activeNav]
  }, [activeNav])

  if (!loggedIn) return <Login onLogin={() => setLoggedIn(true)} />

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-lockup">
          <div className="brand-mark"><Shield size={19} strokeWidth={2.6} /></div>
          <div>
            <div className="brand-name">kavach<span>.</span></div>
            <div className="brand-sub">payment-moment guardian</div>
          </div>
        </div>

        <div className="sidebar-label">Workspace</div>
        <nav className="nav-list">
          {navItems.map(({ id, label, icon: Icon, badge }) => (
            <button key={id} className={`nav-item ${activeNav === id ? 'active' : ''}`} onClick={() => setActiveNav(id)}>
              <Icon size={17} />
              <span>{label}</span>
              {badge && <span className="nav-live">{badge}</span>}
            </button>
          ))}
        </nav>

        <div className="sidebar-spacer" />
        <div className="demo-card">
          <div className="demo-card-head"><span className="pulse-dot" /> Demo mode</div>
          <p>Everything here is simulated for the hackathon. No real money moves.</p>
          <button className="text-button" onClick={() => { setActiveNav('overview'); showToast('Demo reset to command center') }}>Reset demo <RefreshCw size={13} /></button>
        </div>
        <div className="team-mini">
          <div className="avatar-stack"><span>DC</span><span>JS</span><span>SK</span></div>
          <div><strong>Paneer_Chicken</strong><small>3 builders · Mumbai</small></div>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div className="breadcrumb"><span>Workspace</span><ChevronRight size={13} /><strong>{pageTitle[0]}</strong></div>
          <div className="topbar-actions">
            <div className="secure-pill"><LockKeyhole size={13} /> No real money moves</div>
            <button className="icon-button" aria-label="Notifications"><BellRing size={17} /><span className="notification-dot" /></button>
            <button className="profile-chip" title="Sign out of demo session" onClick={() => setLoggedIn(false)}><div className="profile-avatar">SK</div><div><strong>Siddhesh</strong><small>Demo session · Sign out</small></div><ChevronRight size={14} /></button>
          </div>
        </header>

        <section className="page-heading">
          <div>
            <div className="eyebrow"><span className="eyebrow-line" /> KAVACH CONTROL ROOM</div>
            <h1>{pageTitle[0]}</h1>
            <p>{pageTitle[1]}</p>
          </div>
          <div className={`scenario-badge ${activeScenario.tone}`}><span className="status-dot" /> {activeScenario.label}<span className="badge-separator" /> {activeScenario.caption}</div>
        </section>

        {activeNav === 'overview' && <Overview setActiveNav={setActiveNav} launchScenario={launchScenario} showToast={showToast} scenario={scenario} />}
        {activeNav === 'protect' && <Protect scenario={scenario} guardianDecision={guardianDecision} language={language} setLanguage={setLanguage} launchScenario={launchScenario} showRiskModal={showRiskModal} setShowRiskModal={setShowRiskModal} isBlocked={isBlocked} isApproved={isApproved} />}
        {activeNav === 'guardian' && <Guardian guardianDecision={guardianDecision} handleGuardian={handleGuardian} scenario={scenario} launchScenario={launchScenario} />}
        {activeNav === 'recovery' && <Recovery generated={recoveryGenerated} setGenerated={setRecoveryGenerated} showToast={showToast} />}
        {activeNav === 'blueprint' && <Blueprint />}

        <section className="demo-strip">
          <div className="demo-strip-title"><Command size={16} /><div><strong>Judge mode</strong><span>Jump to any story beat</span></div></div>
          <div className="scenario-buttons">
            {scenarios.map((item) => <button key={item.id} className={`scenario-button ${scenario === item.id ? 'selected' : ''} ${item.tone}`} onClick={() => launchScenario(item.id)}><span className="mini-signal" />{item.label}</button>)}
          </div>
          <div className="demo-hint"><span>⌘</span> Demo control panel</div>
        </section>

        {toast && <div className="toast"><BadgeCheck size={16} /> {toast}</div>}
      </main>

      {showRiskModal && <RiskModal language={language} setLanguage={setLanguage} onClose={() => setShowRiskModal(false)} onGuardian={() => { setShowRiskModal(false); setActiveNav('guardian'); showToast('Guardian request is waiting for a decision') }} />}
    </div>
  )
}

function Login({ onLogin }) {
  const [step, setStep] = useState('welcome')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')

  const requestOtp = (event) => {
    event.preventDefault()
    if (phone.replace(/\D/g, '').length < 10) {
      setError('Enter a valid 10-digit mobile number to continue.')
      return
    }
    setError('')
    setStep('otp')
  }

  const verifyOtp = (event) => {
    event.preventDefault()
    if (otp !== '123456') {
      setError('For this prototype, use demo OTP 123456.')
      return
    }
    onLogin()
  }

  return (
    <div className="login-shell">
      <div className="login-visual">
        <div className="login-noise" />
        <div className="login-orbit orbit-a" /><div className="login-orbit orbit-b" />
        <div className="login-visual-content">
          <div className="brand-lockup login-brand"><div className="brand-mark"><Shield size={19} strokeWidth={2.6} /></div><div><div className="brand-name">kavach<span>.</span></div><div className="brand-sub">payment-moment guardian</div></div></div>
          <div className="login-kicker"><span className="pulse-dot" /> TRUST LAYER FOR EVERY PAYMENT</div>
          <h1>When a scammer<br /><em>gets on the line,</em><br />family gets in the loop.</h1>
          <p>Kavach protects the human decision moment — then helps finish the recovery if money still leaves.</p>
          <div className="login-proof-grid"><div><strong>30 sec</strong><span>guardian decision</span></div><div><strong>3 layers</strong><span>intercept · protect · recover</span></div><div><strong>0 audio</strong><span>privacy-light signals</span></div></div>
          <div className="login-team-line"><div className="avatar-stack"><span>DC</span><span>JS</span><span>SK</span></div><span>Built by <strong>Paneer_Chicken</strong> for Paytm Build for India</span></div>
        </div>
      </div>
      <div className="login-panel">
        <div className="login-panel-top"><span className="secure-pill"><LockKeyhole size={13} /> Secure demo environment</span><span className="login-stage">{step === 'welcome' ? '01 / 02' : '02 / 02'}</span></div>
        <div className="login-form-wrap">
          {step === 'welcome' ? <>
            <div className="login-icon"><Shield size={21} /></div>
            <div className="eyebrow"><span className="eyebrow-line" /> WELCOME BACK</div>
            <h2>Enter the safer<br />side of payments.</h2>
            <p className="login-subtitle">Sign in to see your protection command center and run the Kavach demo.</p>
            <form onSubmit={requestOtp} className="login-form">
              <label>Mobile number<span>We’ll send a one-time demo code</span></label>
              <div className="phone-input"><span>+91</span><input value={phone} onChange={(event) => setPhone(event.target.value)} inputMode="numeric" placeholder="98765 43210" aria-label="Mobile number" /></div>
              {error && <div className="form-error"><CircleAlert size={14} /> {error}</div>}
              <button className="login-submit" type="submit">Continue with mobile <ArrowRight size={16} /></button>
            </form>
            <div className="login-divider"><span>or</span></div>
            <button className="demo-access" onClick={onLogin}><Sparkles size={15} /><span><strong>Enter demo workspace</strong><small>No phone needed for judges</small></span><ChevronRight size={15} /></button>
          </> : <>
            <button className="back-link" onClick={() => { setError(''); setStep('welcome') }}>← Change number</button>
            <div className="login-icon otp"><MessageCircleMore size={21} /></div>
            <div className="eyebrow"><span className="eyebrow-line" /> VERIFY DEVICE</div>
            <h2>Check your<br />messages.</h2>
            <p className="login-subtitle">We sent a 6-digit code to <strong>+91 {phone}</strong>. This is a simulated OTP for the prototype.</p>
            <form onSubmit={verifyOtp} className="login-form">
              <label>One-time password<span>Use 123456 for the demo</span></label>
              <input className="otp-input" value={otp} onChange={(event) => setOtp(event.target.value.replace(/\D/g, '').slice(0, 6))} inputMode="numeric" placeholder="123456" maxLength={6} aria-label="One-time password" />
              {error && <div className="form-error"><CircleAlert size={14} /> {error}</div>}
              <button className="login-submit" type="submit">Open my dashboard <ArrowRight size={16} /></button>
            </form>
            <div className="login-note"><LockKeyhole size={13} /><span>Your demo session is private to this workspace. No real payment or OTP is processed.</span></div>
          </>}
        </div>
        <div className="login-footer"><span>© 2026 Kavach</span><span>Prototype · Paytm Build for India AI Hackathon</span></div>
      </div>
    </div>
  )
}

function Overview({ setActiveNav, launchScenario, showToast }) {
  return (
    <div className="content-stack">
      <section className="hero-grid">
        <div className="hero-card">
          <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" /><div className="hero-grid-lines" />
          <div className="hero-content">
            <div className="hero-tag"><Sparkles size={14} /> AI protection, with a human in the loop</div>
            <h2>Scammers coach the payment.<br /><em>Kavach brings family into the moment.</em></h2>
            <p>One calm pause. One trusted decision. One agent that finishes the recovery if money still leaves.</p>
            <div className="hero-actions"><button className="primary-button" onClick={() => { setActiveNav('protect'); showToast('Demo payment ready') }}>Run the 30-second demo <ArrowRight size={16} /></button><button className="ghost-button light" onClick={() => setActiveNav('blueprint')}>See the rollout story</button></div>
          </div>
          <div className="hero-proof"><div className="proof-icon"><HeartHandshake size={20} /></div><div><strong>Guardian loop is the moat</strong><span>Out-of-band approval scammers cannot coach.</span></div><ArrowRight size={17} /></div>
        </div>
        <div className="metric-column">
          <MetricCard label="Protection status" value="LIVE" sub="Signals are being watched" tone="cyan" icon={Radio} />
          <MetricCard label="At-risk prevented" value="₹42,800" sub="This demo session" tone="violet" icon={ShieldAlert} />
          <MetricCard label="Guardian response" value="18 sec" sub="Target: under 30 sec" tone="amber" icon={Clock3} />
        </div>
      </section>

      <section className="section-row-heading"><div><div className="eyebrow compact"><span className="eyebrow-line" /> THE PRODUCT IN 3 MOVES</div><h3>Trust, when judgment is under attack.</h3></div><span className="muted-note">Designed for Paytm’s AI-powered financial journeys</span></section>
      <section className="three-step-grid">
        <StepCard number="01" title="Intercept" description="New payee + amount spike + active call creates a calm, contextual pause before payment." icon={ScanFace} accent="cyan" onClick={() => setActiveNav('protect')} />
        <StepCard number="02" title="Guardian loop" description="A trusted family member gets a one-tap decision on a second channel, out of the scammer’s reach." icon={UsersRound} accent="violet" onClick={() => setActiveNav('guardian')} />
        <StepCard number="03" title="Golden-hour recovery" description="If money still leaves, an AI agent creates the evidence pack, drafts complaints and tracks the next step." icon={Siren} accent="amber" onClick={() => setActiveNav('recovery')} />
      </section>

      <section className="lower-grid">
        <div className="activity-card panel-card"><PanelTitle icon={Activity} title="Recent protection activity" action="View all" /><div className="activity-list"><ActivityItem icon={Shield} tone="safe" title="Payment paused and blocked" detail="New payee · ₹18,500 · 2 min ago" amount="₹18,500" /><ActivityItem icon={HeartHandshake} tone="violet" title="Guardian approved a transfer" detail="Asha Mehta · 24 min ago" amount="₹2,400" /><ActivityItem icon={FileCheck2} tone="amber" title="Recovery pack generated" detail="Case KVC-2408 · Yesterday" amount="Ready" /></div></div>
        <div className="quote-card"><div className="quote-mark">“</div><p>Digital fraud doesn’t always look suspicious to a model. It looks like a person being coached.</p><div className="quote-source"><div className="source-line" /><span>The problem Kavach is built for</span></div></div>
      </section>
    </div>
  )
}

function Protect({ scenario, guardianDecision, language, setLanguage, launchScenario, showRiskModal, setShowRiskModal, isBlocked, isApproved }) {
  const amount = scenario === 'safe' ? '₹2,400' : '₹18,500'
  const payee = scenario === 'safe' ? 'Riya Stores' : 'Rajiv Sharma'
  return (
    <div className="content-stack">
      <section className="protect-layout">
        <div className="payment-column">
          <div className="panel-card payment-card">
            <PanelTitle icon={IndianRupee} title="Simulated payment" action={<span className="simulated-tag"><Radio size={11} /> SIMULATED</span>} />
            <div className="payee-row"><div className="payee-avatar">{payee === 'Riya Stores' ? 'RS' : 'RS'}</div><div><span className="field-label">Paying to</span><strong>{payee}</strong><small>{scenario === 'safe' ? 'riya@paytm' : 'rajiv.sharma@paytm'}</small></div><button className="icon-button small"><Copy size={14} /></button></div>
            <div className="amount-field"><span className="rupee-symbol">₹</span><span className="amount-value">{amount.replace('₹','')}</span><span className="amount-currency">INR</span></div>
            <div className="field-grid"><div className="mini-field"><span>Purpose</span><strong>{scenario === 'safe' ? 'Monthly supplies' : 'Urgent verification fee'}</strong></div><div className="mini-field"><span>Payment method</span><strong>Paytm UPI <ChevronRight size={13} /></strong></div></div>
            <div className={`call-toggle ${scenario === 'safe' ? '' : 'on'}`}><div className="call-toggle-icon"><PhoneCall size={16} /></div><div><strong>Active call detected <span className="simulated-pill">SIMULATED</span></strong><span>{scenario === 'safe' ? 'No call signal' : 'You are on a live call while paying'}</span></div><div className={`switch ${scenario === 'safe' ? '' : 'on'}`}><div /></div></div>
            <button className={`pay-button ${scenario === 'safe' ? 'safe-pay' : ''}`} onClick={() => scenario === 'safe' ? launchScenario('safe') : setShowRiskModal(true)}>{scenario === 'safe' ? 'Pay securely' : 'Continue to payment'} <ArrowRight size={17} /></button>
            {scenario !== 'safe' && <div className="pay-disclaimer"><LockKeyhole size={13} /> Kavach checks the moment, not your call audio.</div>}
          </div>
          <div className="language-card panel-card"><div><span className="field-label">Voice guidance language</span><strong>Choose what feels familiar.</strong></div><div className="language-options">{['English', 'हिन्दी', 'मराठी'].map((item) => <button key={item} className={language === item ? 'selected' : ''} onClick={() => setLanguage(item)}>{item}</button>)}</div></div>
        </div>
        <div className="risk-column">
          <div className="panel-card risk-card"><PanelTitle icon={BrainCircuit} title="Transparent risk engine" action={<span className="score-pill">{scenario === 'safe' ? '18' : '100'} / 100</span>} /><div className="risk-meter"><div className={`meter-fill ${scenario === 'safe' ? 'safe' : ''}`} style={{ width: `${scenario === 'safe' ? 18 : 100}%` }} /><span className="meter-marker" style={{ left: '70%' }} /></div><div className="meter-labels"><span>Low</span><span>Pause at 70</span><span>High</span></div><div className="signal-list">{riskSignals.map((signal, index) => { const Icon = signal.icon; const active = scenario !== 'safe' || index === 0; return <div className={`signal-row ${active ? 'active' : ''}`} key={signal.label}><div className="signal-icon"><Icon size={15} /></div><div><strong>{signal.label}</strong><span>{signal.detail}</span></div><b>{active ? signal.points : '—'}</b></div> })}</div><div className="engine-note"><Fingerprint size={15} /><span><strong>Privacy-light by design.</strong> Kavach reads call state, never the call audio.</span></div></div>
          <div className="next-beat-card"><div className="next-beat-icon"><Play size={15} fill="currentColor" /></div><div><span>NEXT DEMO BEAT</span><strong>{scenario === 'safe' ? 'Show the scam-coached payment' : isApproved ? 'Show safe outcome' : isBlocked ? 'Show blocked outcome' : 'Send the Guardian request'}</strong></div><button onClick={() => scenario === 'safe' ? launchScenario('risk') : setShowRiskModal(true)}><ArrowRight size={16} /></button></div>
        </div>
      </section>
      {(guardianDecision === 'approved' || guardianDecision === 'denied') && <div className={`outcome-banner ${guardianDecision}`}><div className="outcome-icon">{guardianDecision === 'approved' ? <Check size={19} /> : <X size={19} />}</div><div><strong>{guardianDecision === 'approved' ? 'Guardian approved — payment can proceed' : 'Guardian blocked the payment'}</strong><span>{guardianDecision === 'approved' ? 'The decision came from Asha’s device, not the live call.' : 'The money stays with you. Kavach has logged the event.'}</span></div><button onClick={() => setShowRiskModal(false)}>Got it</button></div>}
    </div>
  )
}

function Guardian({ guardianDecision, handleGuardian, scenario, launchScenario }) {
  const pending = guardianDecision === 'pending'
  return (
    <div className="content-stack">
      <section className="guardian-layout">
        <div className="guardian-main panel-card">
          <div className="guardian-intro"><div><div className="eyebrow compact"><span className="eyebrow-line" /> SECOND PHONE VIEW</div><h2>Someone you trust<br /><em>is in the loop.</em></h2><p>Scammers can coach the person paying. They cannot coach the family member making the decision out-of-band.</p></div><div className="guardian-live"><span className="pulse-dot" /> Guardian link live</div></div>
          <div className="phone-stage"><div className="phone-glow" /><div className="phone-frame"><div className="phone-notch" /><div className="phone-screen"><div className="phone-status"><span>9:41</span><span>● ● ▰</span></div><div className="phone-brand"><div className="brand-mark small"><Shield size={13} /></div><span>kavach</span><span className="guardian-label">GUARDIAN</span></div><div className="guardian-alert"><div className="alert-ring"><ShieldAlert size={25} /></div><span>Payment needs your eyes</span><small>Someone in your family is on a live call.</small></div><div className="request-card"><div className="request-card-top"><span>REQUEST FROM</span><span className="live-request"><span /> LIVE</span></div><div className="request-person"><div className="request-avatar">SK</div><div><strong>Siddhesh Kadam</strong><span>is trying to pay Rajiv Sharma</span></div></div><div className="request-amount"><span>₹18,500</span><small>Urgent verification fee</small></div><div className="request-warning"><CircleAlert size={14} /><span>New payee · Active call · 3.4× usual amount</span></div>{pending ? <div className="guardian-actions"><button className="deny-button" onClick={() => handleGuardian('denied')}>Block payment <X size={15} /></button><button className="approve-button" onClick={() => handleGuardian('approved')}>Approve <Check size={15} /></button></div> : <div className={`decision-state ${guardianDecision}`}><div>{guardianDecision === 'approved' ? <Check size={16} /> : <X size={16} />}</div><strong>{guardianDecision === 'approved' ? 'Approved by you' : 'Blocked by you'}</strong><span>{guardianDecision === 'approved' ? 'Payment can return to Siddhesh.' : 'Kavach will keep the funds safe.'}</span></div>}</div><div className="phone-footer"><LockKeyhole size={12} /> Secure out-of-band decision</div></div></div></div>
          <div className="guardian-footnote"><div className="person-chip"><div className="mini-avatar">AM</div><div><strong>Asha Mehta</strong><span>Guardian · daughter in Mumbai</span></div></div><div className="response-time"><Clock3 size={15} /><span>Usually responds in <strong>18 sec</strong></span></div></div>
        </div>
        <div className="guardian-side"><div className="panel-card loop-card"><PanelTitle icon={HeartHandshake} title="Why this wins" /><div className="loop-points"><LoopPoint number="01" title="Out-of-band" text="The decision moves to a second channel the scammer cannot see." /><LoopPoint number="02" title="Human trust" text="Family context beats a black-box fraud score in the hardest moment." /><LoopPoint number="03" title="One tap" text="No new app to learn. A familiar action for a high-stakes moment." /></div></div><div className="panel-card guardian-status"><div className="status-heading"><div className="guardian-mini-icon"><UsersRound size={16} /></div><div><span>TRUSTED GUARDIAN</span><strong>Asha Mehta</strong></div><span className="verified"><BadgeCheck size={14} /> Verified</span></div><div className="status-line"><span>Relationship</span><strong>Daughter · Mumbai</strong></div><div className="status-line"><span>Notifications</span><strong>Telegram + push</strong></div><button className="outline-button" onClick={() => launchScenario('risk')}>Replay request <RefreshCw size={14} /></button></div></div>
      </section>
    </div>
  )
}

function Recovery({ generated, setGenerated, showToast }) {
  return (
    <div className="content-stack">
      <section className="recovery-hero panel-card"><div className="recovery-hero-copy"><div className="eyebrow compact"><span className="eyebrow-line" /> THE GOLDEN HOUR</div><h2>Don’t panic.<br /><em>Start with what happened.</em></h2><p>Kavach turns a stressful loss into a clear, evidence-backed next step. Drafted in seconds. Reviewed by you before anything is filed.</p><div className="recovery-actions"><button className="primary-button" onClick={() => { setGenerated(true); showToast('Recovery pack ready to review') }}>{generated ? 'Pack generated' : 'Generate recovery pack'} <FileCheck2 size={16} /></button><span><LockKeyhole size={13} /> AI drafts. You approve. Nothing files automatically.</span></div></div><div className="recovery-ring"><div className="ring-inner"><Siren size={25} /><strong>00:42:18</strong><span>golden hour</span></div></div></section>
      <section className="recovery-grid"><div className="panel-card case-card"><PanelTitle icon={FileText} title="Case KVC-2408" action={<span className="case-open">OPEN CASE</span>} /><div className="case-summary"><div><span>Loss reported</span><strong>₹18,500</strong></div><div><span>Reported at</span><strong>22 Nov · 19:06</strong></div><div><span>Confidence</span><strong className="confidence">High</strong></div></div><div className="timeline"><TimelineItem done title="Payment context captured" text="Payee, amount, call-state and device signal secured" /><TimelineItem done title="Evidence pack assembled" text="Transaction receipt, call window and risk signals" /><TimelineItem active title="1930 complaint draft ready" text="Review and copy the guided script" /><TimelineItem title="Bank dispute next" text="Raise a dispute with the evidence attached" /></div></div><div className="panel-card outputs-card"><PanelTitle icon={Sparkles} title="AI teammate outputs" action={generated ? <span className="ready-tag"><Check size={12} /> READY</span> : <span className="waiting-tag">WAITING</span>} />{generated ? <div className="output-list"><OutputItem icon={FileText} title="1930 cybercrime complaint" meta="Structured draft · 6 fields ready" /><OutputItem icon={IndianRupee} title="Bank dispute statement" meta="Chronology + transaction context" /><OutputItem icon={Copy} title="Evidence pack" meta="PDF-ready · 4 supporting artifacts" /></div> : <div className="empty-output"><div><Zap size={20} /></div><strong>One click turns loss into action.</strong><span>Generate the complaint, dispute and evidence timeline together.</span></div>}<div className="output-footer"><span>AI teammate status</span><strong><span className={`tiny-dot ${generated ? 'green' : 'amber'}`} /> {generated ? 'Work complete · review needed' : 'Waiting for loss report'}</strong></div></div></section>
    </div>
  )
}

function Blueprint() {
  return (
    <div className="content-stack"><section className="blueprint-header panel-card"><div><div className="eyebrow compact"><span className="eyebrow-line" /> BUILT FOR INDIA · TRACK 2 + TRACK 3</div><h2>Trust is the product surface.</h2><p>Kavach is not another warning banner. It is an AI teammate that understands a risky context, brings the right human into the loop, and completes the recovery workflow.</p></div><div className="track-stack"><span>AI-Powered<br />Financial Journeys</span><span>Autonomous<br />AI Teammates</span></div></section><section className="blueprint-grid"><div className="panel-card architecture-card"><PanelTitle icon={Network} title="Prototype architecture" action={<span className="simulated-tag"><Radio size={11} /> IN DEMO</span>} /><div className="architecture-flow"><ArchNode icon={IndianRupee} label="Paytm-style<br />payment" /><div className="flow-line"><span /></div><ArchNode icon={BrainCircuit} label="Risk engine<br />+ context" /><div className="flow-line"><span /></div><ArchNode icon={MessageCircleMore} label="Guardian<br />channel" /><div className="flow-line"><span /></div><ArchNode icon={Siren} label="Recovery<br />agent" /></div><div className="architecture-caption"><span><span className="legend-dot cyan" /> Live product signal</span><span><span className="legend-dot violet" /> AI orchestration</span><span><span className="legend-dot amber" /> Human decision</span></div></div><div className="panel-card boundary-card"><PanelTitle icon={LockKeyhole} title="Trust boundaries" /><BoundaryItem title="What Kavach reads" text="Payee novelty, amount deviation and call state. Never call audio." tone="safe" /><BoundaryItem title="What AI can do" text="Explain the risk, draft the recovery steps and keep a case timeline." tone="violet" /><BoundaryItem title="What humans decide" text="Guardian approval and the final submission of any complaint." tone="amber" /></div></section><section className="rollout-row"><div className="rollout-stat"><strong>3 sec</strong><span>targeted pause latency</span></div><div className="rollout-stat"><strong>30 sec</strong><span>target guardian loop</span></div><div className="rollout-stat"><strong>2 min</strong><span>recovery pack target</span></div><div className="rollout-copy"><div className="eyebrow compact"><span className="eyebrow-line" /> PAYTM-NATIVE ROLLOUT</div><p>Start with simulated signals today. Plug into Paytm payment context and push infrastructure when the product graduates from prototype.</p></div></section></div>
  )
}

function RiskModal({ language, setLanguage, onClose, onGuardian }) {
  const messages = { English: 'Real police never ask for money on a call.', हिन्दी: 'असली पुलिस कभी भी कॉल पर पैसे नहीं मांगती।', मराठी: 'खरे पोलीस कधीही कॉलवर पैसे मागत नाहीत.' }
  return <div className="modal-backdrop"><div className="risk-modal"><button className="modal-close" onClick={onClose}><X size={17} /></button><div className="modal-signal"><div className="modal-signal-pulse"><ShieldAlert size={29} /></div><span>PAYMENT PAUSED</span></div><h2>This moment feels coached.</h2><p className="modal-lede">Kavach noticed three signals that deserve a second opinion before ₹18,500 leaves your account.</p><div className="modal-score"><div><span>Risk score</span><strong>100 <small>/ 100</small></strong></div><div className="modal-bars"><i /><i /><i /><i /><i /><i /><i /><i /><i /></div><span className="high-risk">HIGH RISK</span></div><div className="voice-message"><div className="voice-icon"><Mic2 size={17} /></div><div><span>KAVACH VOICE · {language.toUpperCase()}</span><strong>“{messages[language]}”</strong></div><button onClick={() => setLanguage(language === 'English' ? 'हिन्दी' : language === 'हिन्दी' ? 'मराठी' : 'English')}><RefreshCw size={14} /></button></div><div className="modal-actions"><button className="deny-button large" onClick={onClose}>Keep my money safe <LockKeyhole size={15} /></button><button className="approve-button large" onClick={onGuardian}>Ask my Guardian <Send size={15} /></button></div><div className="modal-foot"><Fingerprint size={14} /> No audio is read. This is a simulated call-state trigger for the hackathon demo.</div></div></div>
}

function MetricCard({ label, value, sub, tone, icon: Icon }) { return <div className={`metric-card ${tone}`}><div className="metric-top"><span>{label}</span><div className="metric-icon"><Icon size={16} /></div></div><strong>{value}</strong><small>{sub}</small></div> }
function StepCard({ number, title, description, icon: Icon, accent, onClick }) { return <button className={`step-card ${accent}`} onClick={onClick}><div className="step-top"><span>{number}</span><div className="step-icon"><Icon size={18} /></div></div><h4>{title}</h4><p>{description}</p><span className="step-link">Explore flow <ArrowRight size={14} /></span></button> }
function PanelTitle({ icon: Icon, title, action }) { return <div className="panel-title"><div><Icon size={16} /><h3>{title}</h3></div>{action && <div>{action}</div>}</div> }
function ActivityItem({ icon: Icon, tone, title, detail, amount }) { return <div className="activity-item"><div className={`activity-icon ${tone}`}><Icon size={15} /></div><div><strong>{title}</strong><span>{detail}</span></div><b>{amount}</b></div> }
function LoopPoint({ number, title, text }) { return <div className="loop-point"><span>{number}</span><div><strong>{title}</strong><p>{text}</p></div></div> }
function TimelineItem({ done, active, title, text }) { return <div className={`timeline-item ${done ? 'done' : ''} ${active ? 'active' : ''}`}><div className="timeline-dot">{done ? <Check size={12} /> : active ? <span /> : null}</div><div><strong>{title}</strong><span>{text}</span></div></div> }
function OutputItem({ icon: Icon, title, meta }) { return <div className="output-item"><div className="output-icon"><Icon size={16} /></div><div><strong>{title}</strong><span>{meta}</span></div><ChevronRight size={15} /></div> }
function ArchNode({ icon: Icon, label }) { return <div className="arch-node"><div><Icon size={17} /></div><span dangerouslySetInnerHTML={{ __html: label }} /></div> }
function BoundaryItem({ title, text, tone }) { return <div className="boundary-item"><span className={`boundary-dot ${tone}`} /><div><strong>{title}</strong><p>{text}</p></div></div> }

createRoot(document.getElementById('root')).render(<App />)
