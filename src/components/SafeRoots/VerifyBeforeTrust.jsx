import { useState } from 'react';
import { AlertCircle, CheckCircle, TrendingDown } from 'lucide-react';

const TRUST_SIGNALS = {
  danger: [
    { text: 'Urgent payment request', weight: 'CRITICAL', pattern: /\b(payment|send money|transfer|pay.*now|urgent.*pay|book.*fee)\b/i },
    { text: 'Unknown sender', weight: 'HIGH', pattern: /\b(unknown|stranger|unverified)\b/i },
    { text: 'Suspicious link', weight: 'CRITICAL', pattern: /\bhttps?:\/\/[^\s]+\b/ },
    { text: 'Urgency language', weight: 'HIGH', pattern: /\b(immediately|urgent|quickly|hurry|limited time|act now|time-sensitive|expires|deadline)\b/i },
    { text: 'Too good to be true', weight: 'HIGH', pattern: /\b(free|guaranteed|win|claim|inheritance|jackpot|prize|unlimited|risk-free)\b/i },
    { text: 'Spelling/grammar errors', weight: 'MEDIUM', pattern: null },
    { text: 'Fake official tone', weight: 'HIGH', pattern: /\b(verify|confirm|validate|authenticate|please confirm|click to confirm)\b/i },
    { text: 'Personal information request', weight: 'CRITICAL', pattern: /\b(password|pin|otp|cvv|ssn|id number|account number|passport|document)\b/i },
    { text: 'Pressure tactics', weight: 'HIGH', pattern: /\b(or else|if not|must|cannot|prohibited|not allowed)\b/i },
  ],
  safe: [
    { text: 'Official domain email', weight: 'CRITICAL', pattern: /@(company|org|gov)\.(com|org|gov)/ },
    { text: 'Specific details', weight: 'HIGH', pattern: null },
    { text: 'No payment requested', weight: 'HIGH', pattern: null },
    { text: 'Verifiable contact info', weight: 'HIGH', pattern: /\b(phone|website|office address|official)\b/i },
    { text: 'Professional tone', weight: 'MEDIUM', pattern: null },
  ]
};

function detectSignals(text) {
  const signals = [];
  let spellingScore = 0;

  // Detect danger signals
  TRUST_SIGNALS.danger.forEach(signal => {
    if (signal.pattern && signal.pattern.test(text)) {
      signals.push({ ...signal, type: 'danger' });
    }
  });

  // Check for spelling/grammar errors (simple heuristic)
  const words = text.split(/\s+/);
  const errors = words.filter(w => w.length > 3 && /[a-z]{2,}\d+|\d+[a-z]{2,}/.test(w)).length;
  spellingScore = Math.min(errors, 3);
  if (spellingScore > 0) {
    signals.push({
      text: 'Spelling/grammar errors',
      weight: 'MEDIUM',
      pattern: null,
      type: 'danger',
      confidence: spellingScore
    });
  }

  // Check for official characteristics
  if (/\b(dear|regards|sincerely)\b/i.test(text)) {
    signals.push({ text: 'Professional tone', weight: 'MEDIUM', pattern: null, type: 'safe' });
  }

  // Check for specificity
  const hasNumbers = /\d{2,}/.test(text);
  const hasDetails = /\b(regarding|concerning|subject|reference|case|ticket|order|invoice)\b/i.test(text);
  if (hasNumbers || hasDetails) {
    signals.push({ text: 'Specific details provided', weight: 'HIGH', pattern: null, type: 'safe' });
  }

  return signals;
}

function calculateVerdict(signals, text) {
  const dangerSignals = signals.filter(s => s.type === 'danger');
  const safeSignals = signals.filter(s => s.type === 'safe');

  // Weight calculation
  const weightValues = { CRITICAL: 25, HIGH: 15, MEDIUM: 10, LOW: 5 };
  const dangerScore = dangerSignals.reduce((sum, s) => sum + (weightValues[s.weight] || 0), 0);
  const safeScore = safeSignals.reduce((sum, s) => sum + (weightValues[s.weight] || 0), 0);

  const totalScore = dangerScore + safeScore;
  const scamLikelihood = totalScore > 0 ? Math.round((dangerScore / totalScore) * 100) : 50;

  let verdict = 'UNKNOWN';
  let color = 'var(--pixel-orange)';
  let recommendation = 'Proceed with caution';

  if (scamLikelihood >= 75) {
    verdict = '🚫 LIKELY SCAM';
    color = 'var(--pixel-red)';
    recommendation = 'Do NOT respond or click links. Report to authorities.';
  } else if (scamLikelihood >= 50) {
    verdict = '⚠️ SUSPICIOUS';
    color = 'var(--pixel-orange)';
    recommendation = 'Verify through official channels before taking action.';
  } else if (scamLikelihood < 30) {
    verdict = '✓ LIKELY SAFE';
    color = 'var(--pixel-green)';
    recommendation = 'Appears legitimate, but always verify official details independently.';
  } else {
    verdict = '❓ UNCLEAR';
    color = 'var(--pixel-blue)';
    recommendation = 'Insufficient information. Contact official source directly.';
  }

  return { scamLikelihood, verdict, recommendation, color, dangerScore, safeScore };
}

export default function VerifyBeforeTrust() {
  const [input, setInput] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [analyzed, setAnalyzed] = useState(false);

  const handleAnalyze = () => {
    if (input.trim().length === 0) return;

    const signals = detectSignals(input);
    const verdict = calculateVerdict(signals, input);

    setAnalysis({ signals, verdict });
    setAnalyzed(true);
  };

  const handleReset = () => {
    setInput('');
    setAnalysis(null);
    setAnalyzed(false);
  };

  const dangerSignals = analysis?.signals.filter(s => s.type === 'danger') || [];
  const safeSignals = analysis?.signals.filter(s => s.type === 'safe') || [];

  return (
    <div style={{ display: 'grid', gap: '16px' }}>
      {/* Hero Section */}
      <div className="pixel-section pixel-section-grass">
        <div className="pixel-h2" style={{ color: 'var(--pixel-black)', textAlign: 'center', marginBottom: '12px' }}>
          🔍 VERIFY BEFORE YOU TRUST 🔍
        </div>
        <div className="pixel-text" style={{ color: 'var(--pixel-black)', textAlign: 'center', lineHeight: '1.6', marginBottom: '12px' }}>
          Paste a suspicious message, email, or post below.
          <br />
          SafeRoots will analyze it for trust signals and scam patterns.
        </div>
      </div>

      {/* Input Area */}
      <div className="pixel-section pixel-section-stone">
        <div className="pixel-h3" style={{ color: 'var(--pixel-yellow)', marginBottom: '8px' }}>
          📝 PASTE YOUR CONTENT
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste message, email, or text here... (WhatsApp, email, SMS, social media, etc.)"
          style={{
            width: '100%',
            minHeight: '120px',
            padding: '12px',
            border: '2px solid var(--pixel-black)',
            background: 'var(--pixel-white)',
            color: 'var(--pixel-black)',
            fontFamily: 'var(--pixel-font)',
            fontSize: '10px',
            resize: 'vertical',
            boxShadow: '2px 2px 0px rgba(0,0,0,0.5)',
          }}
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '12px' }}>
          <button
            onClick={handleAnalyze}
            disabled={input.trim().length === 0}
            className="pixel-btn"
            style={{
              background: 'var(--pixel-blue)',
              color: 'var(--pixel-white)',
              padding: '12px',
              fontSize: '9px',
              fontWeight: 'bold',
              cursor: input.trim().length === 0 ? 'not-allowed' : 'pointer',
              opacity: input.trim().length === 0 ? 0.5 : 1,
            }}
          >
            🔎 ANALYZE NOW
          </button>
          <button
            onClick={handleReset}
            className="pixel-btn"
            style={{
              background: 'var(--pixel-orange)',
              color: 'var(--pixel-black)',
              padding: '12px',
              fontSize: '9px',
              fontWeight: 'bold',
            }}
          >
            🔄 CLEAR
          </button>
        </div>
      </div>

      {/* Analysis Results */}
      {analyzed && analysis && (
        <>
          {/* Verdict Card */}
          <div
            className="pixel-section"
            style={{
              background: analysis.verdict.color,
              color: analysis.verdict.color === 'var(--pixel-green)' ? 'var(--pixel-black)' : 'var(--pixel-white)',
            }}
          >
            <div className="pixel-h2" style={{ textAlign: 'center', marginBottom: '8px', color: 'inherit' }}>
              {analysis.verdict.verdict}
            </div>
            <div className="pixel-text" style={{ textAlign: 'center', marginBottom: '8px', fontSize: '11px', color: 'inherit' }}>
              <span style={{ fontWeight: 'bold', fontSize: '16px' }}>{analysis.verdict.scamLikelihood}%</span> likelihood of SCAM
            </div>
            <div className="pixel-text" style={{ textAlign: 'center', color: 'inherit', fontWeight: 'bold', lineHeight: '1.6' }}>
              ⚡ {analysis.verdict.recommendation}
            </div>
          </div>

          {/* Signals Analysis */}
          <div className="pixel-grid pixel-grid-2">
            {/* Danger Signals */}
            {dangerSignals.length > 0 && (
              <div className="pixel-section" style={{ background: '#fee', color: 'var(--pixel-black)' }}>
                <div className="pixel-h3" style={{ color: 'var(--pixel-red)', marginBottom: '8px' }}>
                  ⚠️ RED FLAGS FOUND
                </div>
                <div style={{ display: 'grid', gap: '6px' }}>
                  {dangerSignals.map((signal, i) => (
                    <div
                      key={i}
                      style={{
                        padding: '8px',
                        background: 'rgba(204,0,0,0.15)',
                        border: '1px solid var(--pixel-red)',
                        fontSize: '9px',
                      }}
                    >
                      <div className="pixel-text" style={{ color: 'var(--pixel-red)', fontWeight: 'bold', marginBottom: '2px' }}>
                        🔴 {signal.text}
                      </div>
                      <div className="pixel-text" style={{ color: 'var(--pixel-black)', fontSize: '8px' }}>
                        Risk: {signal.weight}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Safe Signals */}
            {safeSignals.length > 0 && (
              <div className="pixel-section" style={{ background: '#efe', color: 'var(--pixel-black)' }}>
                <div className="pixel-h3" style={{ color: 'var(--pixel-green)', marginBottom: '8px' }}>
                  ✓ POSITIVE INDICATORS
                </div>
                <div style={{ display: 'grid', gap: '6px' }}>
                  {safeSignals.map((signal, i) => (
                    <div
                      key={i}
                      style={{
                        padding: '8px',
                        background: 'rgba(0,204,0,0.15)',
                        border: '1px solid var(--pixel-green)',
                        fontSize: '9px',
                      }}
                    >
                      <div className="pixel-text" style={{ color: 'var(--pixel-green)', fontWeight: 'bold', marginBottom: '2px' }}>
                        ✓ {signal.text}
                      </div>
                      <div className="pixel-text" style={{ color: 'var(--pixel-black)', fontSize: '8px' }}>
                        Strength: {signal.weight}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Detailed Analysis */}
          <div className="pixel-section pixel-section-grass">
            <div className="pixel-h3" style={{ color: 'var(--pixel-black)', marginBottom: '12px' }}>
              📊 DETAILED ANALYSIS
            </div>
            <div className="pixel-grid pixel-grid-3">
              <div className="pixel-stat">
                <div className="pixel-stat-label">RED FLAGS</div>
                <div className="pixel-stat-value" style={{ color: 'var(--pixel-red)' }}>
                  {dangerSignals.length}
                </div>
                <div className="pixel-text" style={{ color: 'var(--pixel-black)', marginTop: '4px', fontSize: '8px' }}>
                  Found in content
                </div>
              </div>
              <div className="pixel-stat">
                <div className="pixel-stat-label">GOOD SIGNS</div>
                <div className="pixel-stat-value" style={{ color: 'var(--pixel-green)' }}>
                  {safeSignals.length}
                </div>
                <div className="pixel-text" style={{ color: 'var(--pixel-black)', marginTop: '4px', fontSize: '8px' }}>
                  Positive indicators
                </div>
              </div>
              <div className="pixel-stat">
                <div className="pixel-stat-label">RISK LEVEL</div>
                <div className="pixel-stat-value" style={{ color: 'var(--pixel-orange)' }}>
                  {analysis.verdict.scamLikelihood > 75 ? '🔴 HIGH' : analysis.verdict.scamLikelihood > 50 ? '🟡 MED' : '🟢 LOW'}
                </div>
                <div className="pixel-text" style={{ color: 'var(--pixel-black)', marginTop: '4px', fontSize: '8px' }}>
                  Overall risk
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="pixel-section pixel-section-stone">
            <div className="pixel-h3" style={{ color: 'var(--pixel-yellow)', marginBottom: '12px' }}>
              ✅ WHAT TO DO NEXT
            </div>
            <ul style={{ paddingLeft: '0', margin: '0', display: 'grid', gap: '8px' }}>
              {analysis.verdict.scamLikelihood >= 75 && (
                <>
                  <li className="pixel-text" style={{ color: 'var(--pixel-white)', listStyle: 'none', marginBottom: '0' }}>
                    → Do NOT click any links or download files
                  </li>
                  <li className="pixel-text" style={{ color: 'var(--pixel-white)', listStyle: 'none', marginBottom: '0' }}>
                    → Do NOT send money or personal information
                  </li>
                  <li className="pixel-text" style={{ color: 'var(--pixel-white)', listStyle: 'none', marginBottom: '0' }}>
                    → Report to: Police (local number), Platform (WhatsApp/Email/etc)
                  </li>
                  <li className="pixel-text" style={{ color: 'var(--pixel-white)', listStyle: 'none', marginBottom: '0' }}>
                    → Block the sender and delete the message
                  </li>
                </>
              )}
              {analysis.verdict.scamLikelihood >= 50 && analysis.verdict.scamLikelihood < 75 && (
                <>
                  <li className="pixel-text" style={{ color: 'var(--pixel-white)', listStyle: 'none', marginBottom: '0' }}>
                    → Contact the organization directly using official contact info
                  </li>
                  <li className="pixel-text" style={{ color: 'var(--pixel-white)', listStyle: 'none', marginBottom: '0' }}>
                    → Use phone/website from official sources, NOT the message
                  </li>
                  <li className="pixel-text" style={{ color: 'var(--pixel-white)', listStyle: 'none', marginBottom: '0' }}>
                    → Never send money until fully verified
                  </li>
                  <li className="pixel-text" style={{ color: 'var(--pixel-white)', listStyle: 'none', marginBottom: '0' }}>
                    → Ask a trusted local friend for verification
                  </li>
                </>
              )}
              {analysis.verdict.scamLikelihood < 50 && (
                <>
                  <li className="pixel-text" style={{ color: 'var(--pixel-white)', listStyle: 'none', marginBottom: '0' }}>
                    → Verify all details independently
                  </li>
                  <li className="pixel-text" style={{ color: 'var(--pixel-white)', listStyle: 'none', marginBottom: '0' }}>
                    → Check official website/phone for confirmation
                  </li>
                  <li className="pixel-text" style={{ color: 'var(--pixel-white)', listStyle: 'none', marginBottom: '0' }}>
                    → Proceed cautiously if everything checks out
                  </li>
                </>
              )}
            </ul>
          </div>
        </>
      )}

      {/* Empty State */}
      {!analyzed && (
        <div className="pixel-section pixel-section-grass">
          <div style={{ textAlign: 'center', padding: '32px 16px' }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>👆</div>
            <div className="pixel-text" style={{ color: 'var(--pixel-black)', fontWeight: 'bold' }}>
              Paste suspicious content above
            </div>
            <div className="pixel-text" style={{ color: 'var(--pixel-black)', marginTop: '8px', fontSize: '9px' }}>
              Examples: job offers, rental scams, payment requests, fake banking alerts, suspicious links
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
