import React, { useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import {
  Activity, AlertTriangle, ArrowRight, Award, BarChart3, BookOpen, BrainCircuit,
  Check, CheckCircle2, ChevronLeft, ChevronRight, CircleHelp, Clock3, Copy,
  ExternalLink, Eye, EyeOff, FileSearch, Fingerprint, Gauge, Globe2, GraduationCap,
  Info, KeyRound, LayoutDashboard, Link2, LockKeyhole, Menu, MessageSquareWarning,
  MousePointerClick, Network, Radar, RefreshCw, ScanLine, Shield, ShieldAlert,
  ShieldCheck, ShieldQuestion, Signal, Sparkles, Target, TriangleAlert, UserRoundCheck,
  Wifi, X, XCircle, Zap
} from 'lucide-react'
import './styles.css'

const navItems = [
  { to: '/', label: 'Home', icon: Shield },
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/url-scanner', label: 'URL Scanner', icon: Link2 },
  { to: '/message-analyzer', label: 'Message Analyzer', icon: MessageSquareWarning },
  { to: '/password-checker', label: 'Password Checker', icon: KeyRound },
  { to: '/quiz', label: 'Cyber Quiz', icon: GraduationCap },
  { to: '/about', label: 'About', icon: Info },
]

const demoActivity = [
  { icon: Link2, title: 'URL scan completed', detail: 'secure-account-check.net', result: 'High risk', time: '8 min ago', tone: 'danger' },
  { icon: MessageSquareWarning, title: 'Message analyzed', detail: 'Delivery payment request', result: 'Medium risk', time: '32 min ago', tone: 'warning' },
  { icon: KeyRound, title: 'Password checked', detail: 'Processed locally · never stored', result: 'Strong', time: 'Yesterday', tone: 'safe' },
  { icon: GraduationCap, title: 'Awareness quiz', detail: '8 of 10 answers correct', result: '80%', time: 'Sep 4', tone: 'info' },
]

const quizQuestions = [
  { q: 'A bank message says your account will close in 10 minutes unless you verify through a link. What should you do?', options: ['Open the link quickly', 'Reply with your account number', 'Use the bank’s official app or phone number', 'Forward it to friends'], answer: 2, topic: 'Phishing' },
  { q: 'Who is it safe to share a one-time password (OTP) with?', options: ['Bank support staff', 'A delivery agent', 'Nobody', 'A trusted friend'], answer: 2, topic: 'OTP scams' },
  { q: 'Which password is the safest choice?', options: ['password123', 'Maya2005', 'Blue!Orbit7-Cedar?Train', 'qwerty@1'], answer: 2, topic: 'Password security' },
  { q: 'A caller claims to be IT support and asks for your login code. This is most likely:', options: ['Routine maintenance', 'Social engineering', 'Software testing', 'A firewall update'], answer: 1, topic: 'Social engineering' },
  { q: 'Before opening a shortened link, you should:', options: ['Trust it if a friend sent it', 'Preview or expand the destination', 'Disable your antivirus', 'Open it in private mode'], answer: 1, topic: 'Suspicious links' },
  { q: 'What is the safest way to access sensitive accounts on public Wi-Fi?', options: ['Use any open network', 'Turn off HTTPS', 'Use mobile data or a trusted VPN', 'Share files publicly'], answer: 2, topic: 'Public Wi-Fi' },
  { q: 'Two-factor authentication improves security because it:', options: ['Makes passwords shorter', 'Adds another verification step', 'Stores your password publicly', 'Blocks all spam'], answer: 1, topic: 'Two-factor authentication' },
  { q: 'A message promises a prize you never entered to win and asks for a processing fee. It is likely:', options: ['A legitimate reward', 'A software update', 'A scam', 'A security audit'], answer: 2, topic: 'Phishing' },
  { q: 'You receive an unexpected attachment named “invoice.exe”. What is the best action?', options: ['Run it immediately', 'Rename it to PDF', 'Delete or verify it through a separate channel', 'Upload it to social media'], answer: 2, topic: 'Suspicious links' },
  { q: 'Which habit best protects multiple online accounts?', options: ['Reuse one strong password', 'Use unique passwords with a password manager', 'Write passwords in public notes', 'Disable account alerts'], answer: 1, topic: 'Password security' },
]

function App() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  useEffect(() => { setMobileOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }, [location.pathname])
  return (
    <div className="app-shell">
      <div className="ambient ambient-one" /><div className="ambient ambient-two" />
      <Navbar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/url-scanner" element={<UrlScanner />} />
          <Route path="/message-analyzer" element={<MessageAnalyzer />} />
          <Route path="/password-checker" element={<PasswordChecker />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

function Navbar({ mobileOpen, setMobileOpen }) {
  return <header className="navbar-wrap">
    <nav className="navbar container" aria-label="Main navigation">
      <NavLink to="/" className="brand" aria-label="CyberShield home">
        <span className="brand-mark"><ShieldCheck size={23} /></span>
        <span><b>Cyber</b>Shield<small>Check Before You Trust</small></span>
      </NavLink>
      <div className={`nav-links ${mobileOpen ? 'open' : ''}`}>
        {navItems.map(({ to, label, icon: Icon }) => <NavLink key={to} to={to} end={to === '/'} className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}><Icon size={16}/><span>{label}</span></NavLink>)}
      </div>
      <div className="nav-status"><span className="live-dot"/> Demo systems active</div>
      <button className="menu-button" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle navigation" aria-expanded={mobileOpen}>{mobileOpen ? <X/> : <Menu/>}</button>
    </nav>
  </header>
}

function Home() {
  const navigate = useNavigate()
  const features = [
    { icon: Link2, kicker: 'Inspect', title: 'URL Threat Scanner', text: 'Spot suspicious domains, risky patterns, and common impersonation tactics before you click.', path: '/url-scanner', metric: '12 risk signals' },
    { icon: MessageSquareWarning, kicker: 'Decode', title: 'Phishing Message Analyzer', text: 'Break down urgent, manipulative, and sensitive-data requests in messages you receive.', path: '/message-analyzer', metric: 'Plain-language results' },
    { icon: KeyRound, kicker: 'Strengthen', title: 'Password Strength Checker', text: 'Measure password resilience locally in your browser. Nothing is transmitted or stored.', path: '/password-checker', metric: '100% local' },
    { icon: BrainCircuit, kicker: 'Practice', title: 'Cyber Safety Quiz', text: 'Test practical instincts across phishing, OTP fraud, public Wi-Fi, and account security.', path: '/quiz', metric: '10 scenarios' },
  ]
  return <>
    <section className="hero container">
      <div className="hero-copy reveal">
        <div className="eyebrow"><span className="eyebrow-icon"><Radar size={14}/></span> Practical cyber defense for everyday decisions</div>
        <h1>Pause. Inspect.<br/><span>Trust smarter.</span></h1>
        <p className="hero-tagline">Check Before You Trust.</p>
        <p className="hero-description">An intelligent cybersecurity assistant that helps you detect suspicious links, identify phishing messages, strengthen your passwords, and improve your cyber awareness.</p>
        <div className="hero-actions">
          <Button onClick={() => navigate('/url-scanner')} icon={ScanLine}>Scan a URL</Button>
          <Button onClick={() => navigate('/message-analyzer')} icon={MessageSquareWarning} variant="secondary">Analyze a Message</Button>
        </div>
        <div className="trust-row"><span><CheckCircle2/>No sign-up needed</span><span><LockKeyhole/>Passwords stay local</span><span><BookOpen/>Education-first</span></div>
      </div>
      <div className="hero-visual reveal delay-2" aria-label="CyberShield live analysis preview">
        <div className="scanner-frame">
          <div className="scanner-top"><span><Signal size={15}/> LIVE ANALYSIS</span><span className="mono">CS-07</span></div>
          <div className="radar-stage">
            <div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="orbit orbit-three"/>
            <div className="radar-sweep"/><div className="shield-core"><ShieldCheck size={56}/><span>82</span></div>
            <span className="node n1"/><span className="node n2"/><span className="node n3"/><span className="node n4"/>
          </div>
          <div className="scan-readout">
            <div><span>Current posture</span><b>Protected</b></div>
            <div><span>Threat signals</span><b className="cyan">Monitoring</b></div>
          </div>
        </div>
        <div className="floating-alert"><span className="alert-icon"><ShieldAlert size={18}/></span><div><small>Pattern detected</small><strong>Urgent payment request</strong></div><span className="risk-mini">HIGH</span></div>
      </div>
    </section>

    <section className="section container">
      <SectionHeading eyebrow="Four focused tools" title="A second look can stop a bad click." text="CyberShield turns common warning signs into clear, useful decisions—without pretending demo analysis is a guarantee." />
      <div className="feature-grid">
        {features.map(({icon: Icon, ...f}, i) => <button className={`feature-card feature-${i+1}`} key={f.title} onClick={() => navigate(f.path)}>
          <div className="feature-head"><span className="feature-icon"><Icon/></span><span className="feature-number">0{i+1}</span></div>
          <div><span className="feature-kicker">{f.kicker}</span><h3>{f.title}</h3><p>{f.text}</p></div>
          <div className="feature-foot"><span>{f.metric}</span><ArrowRight size={18}/></div>
        </button>)}
      </div>
    </section>

    <section className="awareness-section">
      <div className="container awareness-grid">
        <div className="awareness-copy">
          <div className="eyebrow"><span className="eyebrow-icon"><Target size={14}/></span> Awareness is your first firewall</div>
          <h2>Most attacks begin with a moment of trust.</h2>
          <p>Phishing works by creating urgency, fear, curiosity, or excitement. Learning to pause and verify is one of the strongest security habits you can build.</p>
          <div className="awareness-points">
            <div><MousePointerClick/><span><b>Inspect before acting</b><small>Check links, senders, and requests independently.</small></span></div>
            <div><UserRoundCheck/><span><b>Verify through trusted channels</b><small>Use official apps, saved contacts, and known websites.</small></span></div>
            <div><Fingerprint/><span><b>Protect sensitive details</b><small>Never share OTPs, passwords, or recovery codes.</small></span></div>
          </div>
        </div>
        <div className="awareness-panel">
          <div className="panel-label"><Activity size={16}/> THREAT ANATOMY</div>
          <div className="message-sample"><div className="message-meta"><span className="avatar">!</span><span><b>Account Security</b><small>unknown-sender · now</small></span></div><p>Your account has been locked. Verify your details immediately to avoid permanent suspension.</p><button>http://secure-login-verify.co</button></div>
          <div className="signal-list">
            <span><i className="signal-index">01</i>Artificial urgency<b>+28 risk</b></span>
            <span><i className="signal-index">02</i>Unknown sender<b>+18 risk</b></span>
            <span><i className="signal-index">03</i>Lookalike login link<b>+34 risk</b></span>
          </div>
          <div className="panel-verdict"><span><TriangleAlert/>Likely phishing attempt</span><strong>86%</strong></div>
        </div>
      </div>
    </section>
  </>
}

function Dashboard() {
  const scoreCards = [
    { label: 'URL Safety', score: 90, icon: Link2, detail: 'Strong link instincts', tone: 'safe' },
    { label: 'Phishing Awareness', score: 76, icon: MessageSquareWarning, detail: 'Review urgency signals', tone: 'warning' },
    { label: 'Password Security', score: 95, icon: KeyRound, detail: 'Excellent resilience', tone: 'safe' },
    { label: 'Cyber Knowledge', score: 80, icon: BrainCircuit, detail: '8/10 quiz score', tone: 'info' },
  ]
  return <PageShell eyebrow="Security command center" title="Your cyber readiness, at a glance." description="A demo overview of your activity and awareness across CyberShield tools.">
    <div className="dashboard-hero">
      <div className="overall-card surface-card">
        <div className="card-label"><Gauge/> OVERALL SECURITY SCORE</div>
        <div className="overall-content"><ScoreRing score={82} size={176}/><div><RiskBadge level="GOOD POSTURE" tone="safe"/><h3>You’re building strong security habits.</h3><p>Your password practices lead the score. Focus next on recognizing urgency and impersonation in suspicious messages.</p><Button to="/quiz" variant="secondary" icon={BrainCircuit}>Train awareness</Button></div></div>
      </div>
      <div className="status-stack">
        <div className="mini-status surface-card"><span className="mini-icon"><ShieldCheck/></span><div><small>System status</small><b>All demo tools ready</b></div><span className="status-live">ACTIVE</span></div>
        <div className="mini-status surface-card"><span className="mini-icon purple"><Clock3/></span><div><small>Last check</small><b>8 minutes ago</b></div><ChevronRight/></div>
        <div className="tip-card"><Sparkles/><span><small>Today’s security cue</small><b>Urgency is a signal—not a deadline.</b></span></div>
      </div>
    </div>
    <div className="score-card-grid">{scoreCards.map(c => <MetricCard key={c.label} {...c}/>)}</div>
    <div className="dashboard-lower">
      <div className="surface-card chart-card"><div className="card-title-row"><div><span className="card-label"><BarChart3/> SCORE TREND</span><h3>Security readiness</h3></div><span className="trend-chip">+11 points</span></div><SecurityChart/></div>
      <div className="surface-card activity-card"><div className="card-title-row"><div><span className="card-label"><Activity/> RECENT ACTIVITY</span><h3>Your latest checks</h3></div><span className="muted-small">Demo data</span></div><div className="activity-list">{demoActivity.map((a,i) => <ActivityRow key={i} {...a}/>)}</div></div>
    </div>
  </PageShell>
}

function UrlScanner() {
  const [url, setUrl] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  function scan(e) {
    e.preventDefault(); setError(''); setResult(null)
    if (!url.trim()) return setError('Enter a URL to inspect.')
    let parsed
    try { parsed = new URL(url.includes('://') ? url : `https://${url}`) } catch { return setError('Enter a valid web address, such as example.com.') }
    setLoading(true)
    setTimeout(() => { setResult(analyzeUrl(parsed)); setLoading(false) }, 1350)
  }
  return <PageShell eyebrow="URL threat scanner" title="Inspect the link. Then decide." description="Run a transparent, rule-based check for common suspicious URL patterns. No live threat-intelligence service is connected yet.">
    <DemoNotice text="Demo analysis uses local pattern rules—not a real-time reputation database." />
    <div className="tool-layout">
      <form className="tool-panel surface-card" onSubmit={scan}>
        <div className="tool-panel-head"><span className="tool-icon"><ScanLine/></span><div><h2>Scan a URL</h2><p>Paste the complete link you want to inspect.</p></div></div>
        <label className="input-label" htmlFor="url-input">Suspicious URL</label>
        <div className={`input-wrap ${error ? 'input-error' : ''}`}><Globe2/><input id="url-input" value={url} onChange={e => setUrl(e.target.value)} placeholder="Enter a suspicious URL…" autoComplete="off"/><button type="button" aria-label="Paste example URL" onClick={() => setUrl('http://secure-paypal-login.verify-account.co/update')}><Copy/></button></div>
        {error && <div className="error-text"><XCircle/> {error}</div>}
        <Button type="submit" icon={ScanLine} full disabled={loading}>{loading ? 'Scanning URL…' : 'Scan URL'}</Button>
        <div className="privacy-line"><LockKeyhole/> This demo checks the URL pattern in your browser session.</div>
      </form>
      <aside className="side-guide surface-card"><div className="card-label"><CircleHelp/> WHAT WE INSPECT</div><h3>Common warning signals</h3>{[
        ['Domain structure','Extra subdomains, IP-based hosts, and lookalike names.'],['Connection clues','Missing HTTPS and unusual ports.'],['Manipulative wording','Terms such as verify, urgent, reward, or update-account.'],['URL complexity','Excessive length, encoded characters, and redirect patterns.']
      ].map(([t,d],i) => <div className="guide-row" key={t}><span>0{i+1}</span><div><b>{t}</b><p>{d}</p></div></div>)}</aside>
    </div>
    {loading && <AnalysisLoader type="URL" />}
    {result && <AnalysisResult result={result} type="url" />}
  </PageShell>
}

function analyzeUrl(parsed) {
  const text = parsed.href.toLowerCase(), host = parsed.hostname.toLowerCase(); let risk = 0; const reasons = []
  const suspiciousWords = ['verify','secure-login','update-account','urgent','reward','claim','wallet','banking','password','paypal','appleid','microsoft-login']
  const shorteners = ['bit.ly','tinyurl.com','t.co','cutt.ly','is.gd']
  if (parsed.protocol !== 'https:') { risk += 18; reasons.push('The link does not use an encrypted HTTPS connection') }
  if (host.split('.').length > 3) { risk += 18; reasons.push('Suspicious domain structure with multiple subdomains') }
  if (suspiciousWords.some(w => text.includes(w))) { risk += 27; reasons.push('Possible brand impersonation or account-verification wording') }
  if (/\d{1,3}(\.\d{1,3}){3}/.test(host)) { risk += 28; reasons.push('The link uses an IP address instead of a recognizable domain') }
  if (text.length > 90 || text.includes('%') || text.includes('@')) { risk += 18; reasons.push('Unusual or intentionally complex URL pattern') }
  if (shorteners.includes(host)) { risk += 22; reasons.push('Shortened link hides the final destination') }
  if (/xn--/.test(host)) { risk += 30; reasons.push('Encoded international domain could imitate a familiar brand') }
  if (!reasons.length) reasons.push('No obvious high-risk patterns found in the URL structure', 'Domain format appears straightforward', 'Encrypted HTTPS connection is present')
  const score = Math.max(8, Math.min(96, 100 - risk)); const level = score < 40 ? 'HIGH' : score < 72 ? 'MEDIUM' : 'LOW'
  return { level, score, reasons, recommendation: level === 'HIGH' ? 'Do not enter passwords, OTPs, banking information, or other sensitive data. Verify the destination through an official app or saved address.' : level === 'MEDIUM' ? 'Pause before opening. Confirm the sender and reach the organization through a trusted channel.' : 'No obvious structural warning signs were found, but this does not guarantee the website is safe. Continue carefully.' }
}

function MessageAnalyzer() {
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  function analyze(e) { e.preventDefault(); setError(''); setResult(null); if (message.trim().length < 12) return setError('Paste a longer message so there is enough context to analyze.'); setLoading(true); setTimeout(() => { setResult(analyzeMessage(message)); setLoading(false) }, 1450) }
  return <PageShell eyebrow="Phishing message analyzer" title="Read between the lines." description="Expose emotional pressure, sensitive-data requests, and suspicious calls-to-action in SMS, email, or chat messages.">
    <DemoNotice text="Current results are rule-based demo analysis until an AI model or security API is connected." />
    <div className="tool-layout message-layout">
      <form className="tool-panel surface-card" onSubmit={analyze}>
        <div className="tool-panel-head"><span className="tool-icon"><FileSearch/></span><div><h2>Analyze a message</h2><p>Paste an SMS, email, WhatsApp message, or chat text.</p></div></div>
        <div className="textarea-head"><label className="input-label" htmlFor="message-input">Message content</label><span>{message.length} / 2,000</span></div>
        <textarea id="message-input" maxLength={2000} rows={9} value={message} onChange={e => setMessage(e.target.value)} placeholder="Paste a suspicious message here…" className={error ? 'input-error' : ''}/>
        {error && <div className="error-text"><XCircle/> {error}</div>}
        <div className="form-button-row"><button type="button" className="text-button" onClick={() => setMessage('Congratulations! You have won a $5,000 reward. Act now—verify your bank details and OTP at http://claim-prize-now.co to avoid expiry.')}>Use demo message</button><Button type="submit" icon={BrainCircuit} disabled={loading}>{loading ? 'Analyzing…' : 'Analyze Message'}</Button></div>
      </form>
      <aside className="side-guide surface-card"><div className="card-label"><ShieldQuestion/> PAUSE & CHECK</div><h3>Four questions to ask</h3>{['Was I expecting this message?','Is it pressuring me to act now?','Does it ask for money or private details?','Can I verify it another way?'].map((q,i) => <div className="check-question" key={q}><span>{i+1}</span><p>{q}</p></div>)}<div className="guide-tip"><ShieldCheck/><span><b>When in doubt</b>Contact the person or organization using details you already trust.</span></div></aside>
    </div>
    {loading && <AnalysisLoader type="message" />}
    {result && <AnalysisResult result={result} type="message" />}
  </PageShell>
}

function analyzeMessage(message) {
  const t = message.toLowerCase(); let risk = 7; const reasons = []
  const tests = [
    { terms: ['urgent','immediately','act now','expires','suspended','locked','final warning'], label: 'Urgency or fear-based pressure', value: 23 },
    { terms: ['won','winner','reward','prize','gift','lottery','cashback'], label: 'Unexpected reward or financial promise', value: 22 },
    { terms: ['password','otp','pin','bank details','card number','login code','ssn'], label: 'Request for sensitive information', value: 28 },
    { terms: ['click here','tap here','http://','https://','verify at','open link'], label: 'Suspicious call-to-action or link', value: 18 },
    { terms: ['payment','fee','transfer','crypto','gift card','refund'], label: 'Request involving money or unusual payment', value: 17 },
  ]
  tests.forEach(x => { if (x.terms.some(term => t.includes(term))) { risk += x.value; reasons.push(x.label) } })
  risk = Math.min(96, risk); if (!reasons.length) reasons.push('No strong urgency, reward, or sensitive-data phrases detected')
  const level = risk >= 70 ? 'HIGH' : risk >= 38 ? 'MEDIUM' : 'LOW'
  return { level, score: risk, reasons, explanation: level === 'HIGH' ? 'This message combines tactics commonly used in phishing: emotional pressure, a tempting or alarming claim, and a request to take a risky action.' : level === 'MEDIUM' ? 'Some language in this message deserves caution. It may be legitimate, but you should verify the request independently.' : 'The wording does not match many common scam patterns. Context and sender identity still matter.', recommendation: level === 'HIGH' ? 'Do not click links, reply, send money, or share private information. Block the sender and verify through an official channel.' : 'Verify the sender using contact details you already know before acting.' }
}

function PasswordChecker() {
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const analysis = useMemo(() => ratePassword(password), [password])
  return <PageShell eyebrow="Local password checker" title="Build a password that holds up." description="Estimate password strength entirely inside your browser. CyberShield never stores or sends the password you type.">
    <div className="privacy-banner"><span><LockKeyhole/></span><div><b>Private by design</b><p>Your password is evaluated locally in this browser tab. It is never saved, logged, or transmitted.</p></div><RiskBadge level="LOCAL ONLY" tone="safe"/></div>
    <div className="password-grid">
      <div className="tool-panel surface-card password-panel">
        <div className="tool-panel-head"><span className="tool-icon"><KeyRound/></span><div><h2>Check your password</h2><p>Try a sample—not a password you actively use.</p></div></div>
        <label className="input-label" htmlFor="password-input">Password</label>
        <div className="input-wrap password-input"><KeyRound/><input id="password-input" type={show ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter a password to test…" autoComplete="new-password"/><button type="button" onClick={() => setShow(!show)} aria-label={show ? 'Hide password' : 'Show password'}>{show ? <EyeOff/> : <Eye/>}</button></div>
        <div className="strength-summary"><div><span>Strength</span><b className={`strength-${analysis.tone}`}>{analysis.label}</b></div><strong>{analysis.score}<small>/100</small></strong></div>
        <ScoreMeter value={analysis.score} tone={analysis.tone}/>
        <div className="password-signals">{analysis.signals.map(s => <span className={s.met ? 'met' : ''} key={s.label}>{s.met ? <Check/> : <X/>}{s.label}</span>)}</div>
      </div>
      <div className="surface-card suggestions-card"><div className="card-label"><Zap/> IMPROVEMENT PLAN</div><h3>{password ? 'Make this password harder to crack' : 'Start with four strong habits'}</h3><div className="suggestion-list">{analysis.suggestions.map((s,i) => <div key={s}><span>{i+1}</span><p>{s}</p></div>)}</div><div className="password-note"><ShieldCheck/><p><b>Better approach:</b> use a password manager to create and store a unique passphrase for every account, then enable two-factor authentication.</p></div></div>
    </div>
  </PageShell>
}

function ratePassword(p) {
  if (!p) return { score: 0, label: 'Not tested', tone: 'neutral', signals: [{label:'12+ characters',met:false},{label:'Upper & lowercase',met:false},{label:'Number included',met:false},{label:'Symbol included',met:false}], suggestions: ['Use at least 14 characters when possible.', 'Combine unrelated words into a memorable passphrase.', 'Mix uppercase, lowercase, numbers, and symbols.', 'Never reuse a password across important accounts.'] }
  const checks = { length: p.length >= 12, long: p.length >= 16, cases: /[a-z]/.test(p) && /[A-Z]/.test(p), number: /\d/.test(p), symbol: /[^A-Za-z0-9]/.test(p), spaces: /\s/.test(p) }
  let score = Math.min(35, p.length * 2) + (checks.cases ? 16 : 0) + (checks.number ? 13 : 0) + (checks.symbol ? 18 : 0) + (checks.long ? 10 : 0) + (checks.spaces ? 5 : 0)
  if (/password|qwerty|123456|admin|letmein|welcome/i.test(p)) score -= 35
  if (/(.)\1{2,}/.test(p)) score -= 12
  score = Math.max(5, Math.min(100, score)); const label = score >= 85 ? 'Strong' : score >= 62 ? 'Good' : score >= 38 ? 'Weak' : 'Very weak'; const tone = score >= 85 ? 'safe' : score >= 62 ? 'info' : score >= 38 ? 'warning' : 'danger'
  const suggestions = []; if (!checks.length) suggestions.push('Increase the length to at least 12 characters.'); if (!checks.cases) suggestions.push('Use both uppercase and lowercase letters.'); if (!checks.number) suggestions.push('Add one or more numbers in an unpredictable place.'); if (!checks.symbol) suggestions.push('Include symbols such as !, ?, -, or #.'); if (suggestions.length < 2) suggestions.push('Keep this password unique—do not reuse it on another account.'); if (suggestions.length < 2) suggestions.push('Store it in a trusted password manager.');
  return { score, label, tone, signals: [{label:'12+ characters',met:checks.length},{label:'Upper & lowercase',met:checks.cases},{label:'Number included',met:checks.number},{label:'Symbol included',met:checks.symbol}], suggestions }
}

function Quiz() {
  const [index, setIndex] = useState(0), [answers, setAnswers] = useState([]), [selected, setSelected] = useState(null), [finished, setFinished] = useState(false)
  const q = quizQuestions[index]
  function next() { if (selected === null) return; const updated = [...answers, selected]; setAnswers(updated); if (index === quizQuestions.length - 1) setFinished(true); else { setIndex(index+1); setSelected(null) } }
  function reset() { setIndex(0); setAnswers([]); setSelected(null); setFinished(false) }
  if (finished) { const score = answers.filter((a,i) => a === quizQuestions[i].answer).length; const pct = score*10; const missed = [...new Set(quizQuestions.filter((q,i) => answers[i] !== q.answer).map(q => q.topic))]; return <PageShell eyebrow="Cyber safety quiz" title="Your awareness report." description="Use the result as a starting point for stronger day-to-day security habits."><div className="quiz-result surface-card"><div className="result-celebration"><Award/><span>QUIZ COMPLETE</span></div><ScoreRing score={pct} size={196}/><h2>{score >= 9 ? 'Excellent cyber instincts.' : score >= 7 ? 'Strong foundation. Keep sharpening.' : 'Good start. Review the warning signs.'}</h2><p>You answered <b>{score} of 10</b> questions correctly.</p><div className="result-stats"><span><small>Score</small><b>{score}/10</b></span><span><small>Accuracy</small><b>{pct}%</b></span><span><small>Level</small><b>{score >= 8 ? 'Aware' : score >= 5 ? 'Developing' : 'Beginner'}</b></span></div><div className="improve-box"><span><Target/></span><div><b>Areas to improve</b><p>{missed.length ? missed.join(' · ') : 'No weak areas detected—keep practicing regularly.'}</p></div></div><Button onClick={reset} icon={RefreshCw}>Retake Quiz</Button></div></PageShell> }
  return <PageShell eyebrow="Cyber safety quiz" title="Would you spot the warning sign?" description="Work through 10 practical scenarios. One question appears at a time—no trick wording.">
    <div className="quiz-shell">
      <div className="quiz-progress"><div><span>Question {index+1} of {quizQuestions.length}</span><b>{Math.round(((index+1)/quizQuestions.length)*100)}% complete</b></div><ScoreMeter value={((index+1)/quizQuestions.length)*100} tone="info"/></div>
      <div className="quiz-card surface-card"><div className="quiz-topic"><BrainCircuit/> {q.topic}</div><h2>{q.q}</h2><div className="answer-list">{q.options.map((option,i) => <button key={option} onClick={() => setSelected(i)} className={selected === i ? 'selected' : ''}><span>{String.fromCharCode(65+i)}</span><p>{option}</p><i>{selected === i && <Check/>}</i></button>)}</div><div className="quiz-actions"><span>Select the safest response</span><Button onClick={next} disabled={selected === null} icon={index === 9 ? Award : ChevronRight}>{index === 9 ? 'See Results' : 'Next Question'}</Button></div></div>
    </div>
  </PageShell>
}

function About() {
  return <PageShell eyebrow="About CyberShield" title="Security awareness, made practical." description="CyberShield is an educational toolkit designed to help students, families, and everyday internet users make safer digital decisions.">
    <div className="about-hero surface-card"><div><span className="about-mark"><ShieldCheck/></span><p className="large-copy">Cybersecurity advice is often technical, alarming, or difficult to apply. CyberShield translates common risk signals into calm, clear next steps.</p></div><div className="about-stat"><span>01</span><b>Pause</b><small>Resist urgency</small></div><div className="about-stat"><span>02</span><b>Inspect</b><small>Find the signal</small></div><div className="about-stat"><span>03</span><b>Verify</b><small>Use trusted channels</small></div></div>
    <div className="about-grid">
      <div className="surface-card about-card"><span className="feature-icon"><Shield/></span><h3>What CyberShield is</h3><p>A focused security-awareness platform for checking suspicious URLs, evaluating questionable messages, improving password habits, and practicing cyber safety.</p></div>
      <div className="surface-card about-card"><span className="feature-icon"><UserRoundCheck/></span><h3>Who it is for</h3><p>Students, educators, families, first-time internet users, and anyone who wants a second look before taking a potentially risky digital action.</p></div>
      <div className="surface-card about-card"><span className="feature-icon"><MessageSquareWarning/></span><h3>Why phishing awareness matters</h3><p>Phishing targets human judgment. Recognizing pressure, impersonation, and unusual requests helps prevent account theft, fraud, and data loss.</p></div>
      <div className="surface-card about-card"><span className="feature-icon"><Network/></span><h3>How the platform works</h3><p>The current frontend uses transparent demo rules and local calculations. Its modular service layer is ready for future APIs, AI analysis, accounts, history, and real-time statistics.</p></div>
    </div>
    <div className="roadmap-section"><SectionHeading eyebrow="Built to evolve" title="Ready for the next security layer." text="The interface separates analysis experiences from data sources so real services can be connected without redesigning the product."/><div className="roadmap-row">{['Threat intelligence API','AI message analysis','Secure backend API','Authentication & profiles','Scan history','Live security statistics'].map((x,i) => <div key={x}><span>{String(i+1).padStart(2,'0')}</span><p>{x}</p></div>)}</div></div>
    <div className="disclaimer"><AlertTriangle/><div><b>Educational use disclaimer</b><p>CyberShield is an educational security-awareness tool. Its results are informational and should not be treated as a guarantee that a website, message, or account is safe.</p></div></div>
  </PageShell>
}

function PageShell({ eyebrow, title, description, children }) { return <div className="page container"><header className="page-header reveal"><div className="eyebrow"><span className="eyebrow-icon"><Shield size={14}/></span>{eyebrow}</div><h1>{title}</h1><p>{description}</p></header>{children}</div> }

function Button({ children, icon: Icon, variant='primary', full=false, to, ...props }) { const navigate = useNavigate(); return <button className={`button button-${variant} ${full?'button-full':''}`} onClick={to ? () => navigate(to) : props.onClick} {...props}>{Icon && <Icon size={18}/>}<span>{children}</span>{variant === 'primary' && !Icon && <ArrowRight size={18}/>}</button> }
function SectionHeading({ eyebrow, title, text }) { return <div className="section-heading"><div><div className="eyebrow"><span className="eyebrow-icon"><Sparkles size={14}/></span>{eyebrow}</div><h2>{title}</h2></div><p>{text}</p></div> }
function RiskBadge({ level, tone }) { return <span className={`risk-badge risk-${tone || level.toLowerCase()}`}><span/>{level}</span> }
function ScoreMeter({ value, tone='info' }) { return <div className={`score-meter meter-${tone}`}><span style={{transform:`scaleX(${Math.max(0,Math.min(100,value))/100})`}}/></div> }
function ScoreRing({ score, size=160 }) { const r=54,c=2*Math.PI*r,offset=c-(score/100)*c; return <div className="score-ring" style={{width:size,height:size}}><svg viewBox="0 0 128 128"><circle className="ring-track" cx="64" cy="64" r={r}/><circle className="ring-value" cx="64" cy="64" r={r} strokeDasharray={c} strokeDashoffset={offset}/></svg><div><strong>{score}</strong><span>/100</span></div></div> }
function MetricCard({label,score,icon:Icon,detail,tone}) { return <div className="metric-card surface-card"><div className="metric-top"><span className={`metric-icon ${tone}`}><Icon/></span><span className={`delta ${score>85?'up':''}`}>{score>85?'+4.2%':'Review'}</span></div><span>{label}</span><div className="metric-score"><b>{score}%</b><small>{detail}</small></div><ScoreMeter value={score} tone={tone}/></div> }
function ActivityRow({icon:Icon,title,detail,result,time,tone}) { return <div className="activity-row"><span className={`activity-icon ${tone}`}><Icon/></span><div><b>{title}</b><small>{detail}</small></div><RiskBadge level={result} tone={tone}/><time>{time}</time></div> }
function DemoNotice({text}) { return <div className="demo-notice"><Info/><span><b>Transparent demo mode</b>{text}</span></div> }
function AnalysisLoader({type}) { return <div className="analysis-loader surface-card"><div className="loader-visual"><ScanLine/><span/></div><div><h3>Inspecting {type} signals…</h3><p>Checking structure, wording, and common manipulation patterns.</p><div className="skeleton-lines"><i/><i/><i/></div></div></div> }
function AnalysisResult({result,type}) { const tone=result.level==='HIGH'?'danger':result.level==='MEDIUM'?'warning':'safe'; return <section className={`analysis-result surface-card result-${tone}`} aria-live="polite"><div className="result-header"><div><div className="card-label"><ShieldAlert/> DEMO ANALYSIS RESULT</div><RiskBadge level={`${result.level} RISK`} tone={tone}/></div><div className="result-score"><span>{type==='message'?'Risk':'Security score'}</span><strong>{result.score}<small>{type==='message'?'%':'/100'}</small></strong><ScoreMeter value={result.score} tone={tone}/></div></div><div className="result-body"><div><h3>{type==='message'?'Detected warning signs':'Reasons for this result'}</h3><div className="reason-list">{result.reasons.map((r,i)=><div key={r}><span>{i+1}</span><p>{r}</p></div>)}</div>{result.explanation && <div className="plain-explanation"><BookOpen/><p><b>In simple language:</b> {result.explanation}</p></div>}</div><div className="recommendation"><span className="recommend-icon">{tone==='danger'?<TriangleAlert/>:<ShieldCheck/>}</span><div><small>RECOMMENDED ACTION</small><p>{result.recommendation}</p></div></div></div><div className="result-disclaimer"><Info/>This rule-based result is informational, not a guarantee of safety.</div></section> }

function SecurityChart() { const points='8,126 58,113 108,118 158,88 208,96 258,62 308,72 358,35 408,45 458,22'; return <div className="chart-wrap"><div className="chart-y"><span>100</span><span>75</span><span>50</span><span>25</span></div><svg viewBox="0 0 470 150" preserveAspectRatio="none"><defs><linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3bc7d4" stopOpacity=".28"/><stop offset="1" stopColor="#3bc7d4" stopOpacity="0"/></linearGradient></defs><path className="chart-grid" d="M0 20H470 M0 55H470 M0 90H470 M0 125H470"/><path className="chart-area" d={`M${points} L458,145 L8,145 Z`}/><polyline className="chart-line" points={points}/>{points.split(' ').map((p,i)=>{const [x,y]=p.split(',');return <circle key={i} cx={x} cy={y} r="3.5"/>})}</svg><div className="chart-x"><span>Aug 1</span><span>Aug 8</span><span>Aug 15</span><span>Aug 22</span><span>Sep 1</span></div></div> }

function Footer() { return <footer><div className="container footer-inner"><div className="footer-brand"><span className="brand-mark"><ShieldCheck size={20}/></span><div><b>CyberShield</b><small>Check Before You Trust.</small></div></div><p>Educational security awareness, designed for better digital decisions.</p><div className="footer-links"><NavLink to="/about">Disclaimer</NavLink><span>•</span><NavLink to="/dashboard">Demo dashboard</NavLink></div></div></footer> }
function NotFound() { return <PageShell eyebrow="404" title="This route is off the radar." description="The page you requested does not exist."><div className="not-found surface-card"><Radar/><Button to="/">Return Home</Button></div></PageShell> }

createRoot(document.getElementById('root')).render(<React.StrictMode><BrowserRouter><App/></BrowserRouter></React.StrictMode>)
