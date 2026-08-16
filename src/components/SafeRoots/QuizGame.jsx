import { useState, useEffect } from 'react';
import { ChevronDown, Award, Zap, AlertCircle, CheckCircle, Eye } from 'lucide-react';
import {
  DOMAINS,
  LOCATIONS,
  QUIZ_SCENARIOS_PHASE2,
  getDomainsForLocation,
  getLocationName,
  getDomainInfo,
} from './quizDataPhase2';

const CLASSIC_QUIZ_SCENARIOS = [
  {
    id: 1,
    city: 'Bangalore',
    scenario: 'You receive a WhatsApp message from an unknown number claiming to be a rental agent offering a ₹15,000/month apartment in Indiranagar. They ask for a ₹5,000 "booking fee" to hold it.',
    isSafe: false,
    explanation: 'This is a common rental scam. Real agents never ask for payment before viewing.',
    signals: [
      { type: 'danger', text: 'Unknown number (not official business)', weight: 'High' },
      { type: 'danger', text: 'Payment request before viewing property', weight: 'Critical' },
      { type: 'danger', text: 'Using informal channels (WhatsApp vs official email/website)', weight: 'High' },
      { type: 'danger', text: 'Urgency ("to hold it" implies limited time)', weight: 'Medium' },
      { type: 'safe', text: 'Real agents provide verifiable contact info', weight: 'High' },
      { type: 'safe', text: 'Legitimate agents show property first, payment comes after', weight: 'Critical' }
    ],
    tips: [
      'Always meet the property owner/agent in person at the location',
      'Use verified platforms like 99acres, MagicBricks, or company websites',
      'Never send money before seeing and verifying the property',
      'Ask for government ID and cross-check their identity independently'
    ]
  },
  {
    id: 2,
    city: 'Dubai',
    scenario: 'A LinkedIn recruiter messages you about a job opportunity at a tech company with a salary of AED 50,000/month (very high for your role). They ask for your passport details to "process the offer".',
    isSafe: false,
    explanation: 'Job scams often use unrealistic salaries and requests for personal documents via informal channels.',
    signals: [
      { type: 'danger', text: 'Salary significantly above market rate for the role', weight: 'High' },
      { type: 'danger', text: 'Requesting passport via LinkedIn (insecure channel)', weight: 'Critical' },
      { type: 'danger', text: 'No formal company email communication', weight: 'High' },
      { type: 'danger', text: 'Bypassing official HR/recruiting process', weight: 'Medium' },
      { type: 'safe', text: 'Official offers use company email', weight: 'Critical' },
      { type: 'safe', text: 'Real HR conducts verification through official channels', weight: 'High' }
    ],
    tips: [
      'Always verify recruiter via company LinkedIn page directly',
      'Verify company domain email (not gmail, yahoo, or free services)',
      'Check company careers page for the posted job',
      'Never share passport/sensitive docs until official signed offer',
      'Verify offer through official company channels'
    ]
  },
  {
    id: 3,
    city: 'Mumbai',
    scenario: 'A friend recommends a local Facebook group "Mumbai Apartments - Best Deals" with 50K members. You find a flat at 30% below market price.',
    isSafe: true,
    explanation: 'Community groups with active moderation and member verification are reliable sources.',
    signals: [
      { type: 'safe', text: 'Large, established community (50K members)', weight: 'High' },
      { type: 'safe', text: 'Personal recommendation from trusted friend', weight: 'High' },
      { type: 'safe', text: 'Group moderation and community oversight', weight: 'Medium' },
      { type: 'safe', text: 'Multiple community members can verify info', weight: 'High' },
      { type: 'danger', text: 'Price below market (verify authenticity)', weight: 'Medium' },
      { type: 'safe', text: 'Physical meetup still required for verification', weight: 'Critical' }
    ],
    tips: [
      'Verify admin credentials and group history',
      'Read recent member testimonials and reviews',
      'Meet property owner in person at the location',
      'Ask multiple group members for references about the specific property'
    ]
  },
  {
    id: 4,
    city: 'Singapore',
    scenario: 'A neighbor suggests a local healthcare clinic for a general checkup. The clinic is recommended by multiple neighbors on the community WhatsApp group.',
    isSafe: true,
    explanation: 'Word-of-mouth from verified neighbors and community groups is reliable. Local recommendations are trusted sources.',
    tips: [
      'Ask for specific details from community members',
      'Verify clinic credentials and licenses online',
      'Check for patient reviews on Google Maps',
      'Cross-reference with expat guides'
    ]
  },
  {
    id: 5,
    city: 'Bangkok',
    scenario: 'You get a text from your "bank" saying your account is locked and asking you to click a link to verify. The sender ID looks official.',
    isSafe: false,
    explanation: 'Banks never ask for verification via links in SMS. This is a phishing scam. Always call your bank directly.',
    tips: [
      'Ignore SMS/WhatsApp links claiming to be from banks',
      'Call your bank using the official number on your card',
      'Legitimate banks use secure portals, not links',
      'Report the message as spam'
    ]
  },
  {
    id: 6,
    city: 'Hong Kong',
    scenario: 'A local expat tells you about a trusted currency exchange they use regularly. They show you their transaction receipts from the past year.',
    isSafe: true,
    explanation: 'Direct recommendations with verified transaction history are reliable. Personal experience is valuable.',
    tips: [
      'Ask to see transaction documentation',
      'Cross-check exchange rates with official rates',
      'Get recommendations from multiple expats',
      'Always ask for receipts'
    ]
  },
  {
    id: 7,
    city: 'Kuala Lumpur',
    scenario: 'A stranger approaches you at the mall offering to help you open a local bank account. They say they work for the bank (but have no ID) and ask for your passport.',
    isSafe: false,
    explanation: 'Bank employees are identified. Legitimate employees never approach strangers without clear identification.',
    tips: [
      'Always verify ID before sharing documents',
      'Visit the official bank branch yourself',
      'Never let strangers handle your documents',
      'Ask for an official business card'
    ]
  },
  {
    id: 8,
    city: 'Jakarta',
    scenario: 'A local expat group on Telegram shares a list of verified hospitals, restaurants, and services with ratings and member reviews.',
    isSafe: true,
    explanation: 'Verified expat communities with user reviews and transparency are highly reliable resources.',
    tips: [
      'Join established expat groups (check member count)',
      'Look for groups with moderation and rules',
      'Cross-reference multiple recommendations',
      'Trust groups with detailed reviews and experiences'
    ]
  }
];

export default function QuizGame({ onStatsUpdate }) {
  const [quizMode, setQuizMode] = useState('mode-select'); // 'mode-select', 'classic', 'domain-select', 'domain-quiz'
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [userAnswer, setUserAnswer] = useState(null);
  const [stats, setStats] = useState({ total: 0, correct: 0, streak: 0 });
  const [showExplanation, setShowExplanation] = useState(false);
  const [history, setHistory] = useState([]);
  const [domainProgress, setDomainProgress] = useState({});
  const [badges, setBadges] = useState({});

  useEffect(() => {
    const savedBadges = localStorage.getItem('saferoots-badges');
    if (savedBadges) {
      setBadges(JSON.parse(savedBadges));
    }
    const savedProgress = localStorage.getItem('saferoots-domain-progress');
    if (savedProgress) {
      setDomainProgress(JSON.parse(savedProgress));
    }
  }, []);

  useEffect(() => {
    onStatsUpdate(stats);
  }, [stats, onStatsUpdate]);

  const scenarios = quizMode === 'classic'
    ? CLASSIC_QUIZ_SCENARIOS
    : selectedLocation && selectedDomain
    ? QUIZ_SCENARIOS_PHASE2[selectedLocation]?.[selectedDomain] || []
    : [];

  const current = scenarios[currentIndex];
  const isCorrect = current && userAnswer === current.isSafe;

  const handleAnswer = (answer) => {
    if (answered) return;

    setUserAnswer(answer);
    setAnswered(true);
    setShowExplanation(true);

    const newStats = { ...stats, total: stats.total + 1 };
    if (answer === current.isSafe) {
      newStats.correct = newStats.correct + 1;
      newStats.streak = newStats.streak + 1;
    } else {
      newStats.streak = 0;
    }

    setStats(newStats);

    if (quizMode === 'domain-quiz') {
      const progressKey = `${selectedLocation}-${selectedDomain}`;
      const newProgress = { ...domainProgress };
      if (!newProgress[progressKey]) {
        newProgress[progressKey] = { completed: 0, correct: 0 };
      }
      newProgress[progressKey].completed = (newProgress[progressKey].completed || 0) + 1;
      if (isCorrect) {
        newProgress[progressKey].correct = (newProgress[progressKey].correct || 0) + 1;
      }
      setDomainProgress(newProgress);
      localStorage.setItem('saferoots-domain-progress', JSON.stringify(newProgress));

      if (newProgress[progressKey].completed % 3 === 0) {
        const badgeKey = `${selectedLocation}-${selectedDomain}`;
        if (!badges[badgeKey]) {
          const newBadges = { ...badges, [badgeKey]: true };
          setBadges(newBadges);
          localStorage.setItem('saferoots-badges', JSON.stringify(newBadges));
        }
      }
    }

    setHistory([...history, { scenario: current, userAnswer: answer, correct: answer === current.isSafe }]);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % scenarios.length);
    setAnswered(false);
    setUserAnswer(null);
    setShowExplanation(false);
  };

  const domainsList = selectedLocation ? getDomainsForLocation(selectedLocation) : [];

  // MODE SELECT
  if (quizMode === 'mode-select') {
    return (
      <div style={{ display: 'grid', gap: '16px' }}>
        <div className="pixel-section pixel-section-grass">
          <div className="pixel-h2" style={{ color: 'var(--pixel-black)', textAlign: 'center', marginBottom: '12px' }}>
            🎮 SELECT QUIZ TYPE 🎮
          </div>
          <div className="pixel-text" style={{ color: 'var(--pixel-black)', textAlign: 'center', marginBottom: '16px' }}>
            Choose how you want to train your trust skills
          </div>
          <div className="pixel-grid pixel-grid-2">
            <button
              onClick={() => setQuizMode('classic')}
              className="pixel-btn"
              style={{
                background: 'var(--pixel-blue)',
                color: 'var(--pixel-white)',
                padding: '20px',
                minHeight: '150px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '11px',
                cursor: 'pointer'
              }}
            >
              <div style={{fontSize: '40px', marginBottom: '12px'}}>🎮</div>
              <div style={{fontWeight: 'bold', marginBottom: '8px'}}>CLASSIC QUIZ</div>
              <div style={{fontSize: '8px', opacity: 0.9}}>8 random scenarios from multiple cities</div>
            </button>
            <button
              onClick={() => setQuizMode('domain-select')}
              className="pixel-btn"
              style={{
                background: 'var(--pixel-purple)',
                color: 'var(--pixel-white)',
                padding: '20px',
                minHeight: '150px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '11px',
                cursor: 'pointer'
              }}
            >
              <div style={{fontSize: '40px', marginBottom: '12px'}}>🌍</div>
              <div style={{fontWeight: 'bold', marginBottom: '8px'}}>DOMAIN QUIZ</div>
              <div style={{fontSize: '8px', opacity: 0.9}}>Skill training by location & domain</div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // DOMAIN SELECT (Choose location & domain)
  if (quizMode === 'domain-select') {
    return (
      <div style={{ display: 'grid', gap: '16px' }}>
        <button
          onClick={() => setQuizMode('mode-select')}
          className="pixel-btn"
          style={{
            background: 'var(--pixel-red)',
            color: 'var(--pixel-white)',
            width: '100%',
            padding: '8px',
            fontSize: '9px',
            marginBottom: '8px'
          }}
        >
          ← BACK TO QUIZ TYPE
        </button>

        <div className="pixel-section pixel-section-grass">
          <div className="pixel-h2" style={{ color: 'var(--pixel-black)', textAlign: 'center', marginBottom: '12px' }}>
            🌍 SELECT YOUR LOCATION 🌍
          </div>
          <div className="pixel-grid pixel-grid-4">
            {LOCATIONS.map((loc) => (
              <button
                key={loc.id}
                onClick={() => setSelectedLocation(loc.id)}
                className="pixel-btn"
                style={{
                  background: selectedLocation === loc.id ? 'var(--pixel-yellow)' : 'var(--pixel-grass)',
                  color: 'var(--pixel-black)',
                  padding: '12px',
                  minHeight: '80px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <div style={{ fontSize: '28px', marginBottom: '4px' }}>📍</div>
                <div className="pixel-text" style={{ color: 'var(--pixel-black)', fontWeight: 'bold', fontSize: '9px' }}>
                  {loc.name}
                </div>
              </button>
            ))}
          </div>
        </div>

        {selectedLocation && (
          <div className="pixel-section pixel-section-stone">
            <div className="pixel-h2" style={{ color: 'var(--pixel-yellow)', textAlign: 'center', marginBottom: '12px' }}>
              📚 SELECT DOMAIN FOR {getLocationName(selectedLocation).toUpperCase()} 📚
            </div>
            <div className="pixel-grid pixel-grid-3">
              {domainsList.map((domainId) => {
                const domain = getDomainInfo(domainId);
                const progressKey = `${selectedLocation}-${domainId}`;
                const progress = domainProgress[progressKey];
                const isBadgeEarned = badges[progressKey];

                return (
                  <button
                    key={domainId}
                    onClick={() => {
                      setSelectedDomain(domainId);
                      setQuizMode('domain-quiz');
                      setCurrentIndex(0);
                      setAnswered(false);
                      setUserAnswer(null);
                    }}
                    className="pixel-btn"
                    style={{
                      background: 'var(--pixel-blue)',
                      color: 'var(--pixel-white)',
                      padding: '12px',
                      minHeight: '120px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      position: 'relative',
                    }}
                  >
                    {isBadgeEarned && (
                      <div style={{ position: 'absolute', top: '4px', right: '4px', fontSize: '20px', animation: 'pixel-bounce 400ms steps(2) infinite' }}>
                        ✨
                      </div>
                    )}
                    <div style={{ fontSize: '28px', marginBottom: '4px' }}>{domain.emoji}</div>
                    <div className="pixel-text" style={{ color: 'var(--pixel-white)', fontWeight: 'bold', fontSize: '9px', textAlign: 'center' }}>
                      {domain.name}
                    </div>
                    {progress ? (
                      <div style={{ marginTop: '6px', width: '100%', textAlign: 'center' }}>
                        <div className="pixel-text" style={{ color: 'var(--pixel-yellow)', fontSize: '8px', marginBottom: '2px', fontWeight: 'bold' }}>
                          {progress.completed}/3
                        </div>
                        {!isBadgeEarned && (
                          <div className="pixel-text" style={{ color: 'var(--pixel-orange)', fontSize: '7px' }}>
                            ⏳ IN PROGRESS
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="pixel-text" style={{ color: 'var(--pixel-white)', fontSize: '7px', marginTop: '6px' }}>
                        🔓 UNLOCKED
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  // CLASSIC OR DOMAIN QUIZ MODE
  return (
    <div style={{ display: 'grid', gap: '16px' }}>
      {/* Back Button */}
      <button
        onClick={() => {
          setQuizMode('mode-select');
          setSelectedLocation(null);
          setSelectedDomain(null);
        }}
        className="pixel-btn"
        style={{
          background: 'var(--pixel-red)',
          color: 'var(--pixel-white)',
          width: '100%',
          padding: '8px',
          fontSize: '9px',
        }}
      >
        ← BACK
      </button>

      {/* Progress Bar */}
      <div className="pixel-grid pixel-grid-3">
        <div className="pixel-stat">
          <div className="pixel-stat-label">SCORE</div>
          <div className="pixel-stat-value">
            {stats.correct}/{stats.total}
          </div>
          <div className="pixel-text" style={{color: 'var(--pixel-green)', marginTop: '4px'}}>
            {stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0}% ✓
          </div>
        </div>
        <div className="pixel-stat">
          <div className="pixel-stat-label">STREAK</div>
          <div className="pixel-stat-value">
            {stats.streak}
          </div>
          <div className="pixel-text" style={{color: 'var(--pixel-orange)', marginTop: '4px'}}>
            🔥 KEEP GOING
          </div>
        </div>
        <div className="pixel-stat">
          <div className="pixel-stat-label">QUIZ</div>
          <div className="pixel-stat-value">
            {currentIndex + 1}/{scenarios.length}
          </div>
          <div className="pixel-text" style={{color: 'var(--pixel-blue)', marginTop: '4px'}}>
            SCENARIOS
          </div>
        </div>
      </div>

      {/* Quiz Card */}
      <div className="pixel-section pixel-section-grass">
        {/* Context Badge */}
        {quizMode === 'domain-quiz' && (
          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
            <div className="pixel-level" style={{ background: 'var(--pixel-blue)', color: 'var(--pixel-white)' }}>
              📍 {getLocationName(selectedLocation)}
            </div>
            <div className="pixel-level" style={{ background: 'var(--pixel-purple)', color: 'var(--pixel-white)' }}>
              {getDomainInfo(selectedDomain)?.emoji} {getDomainInfo(selectedDomain)?.name}
            </div>
          </div>
        )}
        {quizMode === 'classic' && (
          <div className="pixel-level" style={{ marginBottom: '12px', display: 'inline-block', background: 'var(--pixel-blue)', color: 'var(--pixel-white)' }}>
            📍 {current?.city}
          </div>
        )}

        {/* Scenario */}
        <div style={{marginBottom: '12px'}}>
          <div className="pixel-h2" style={{color: 'var(--pixel-black)', marginBottom: '8px'}}>
            🤔 WHAT DO YOU THINK?
          </div>
          <div className="pixel-text" style={{color: 'var(--pixel-black)', lineHeight: '1.6', marginBottom: '8px'}}>
            {current?.scenario}
          </div>
        </div>

        {/* Answer Buttons */}
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', marginBottom: '12px'}}>
          <button
            onClick={() => handleAnswer(false)}
            disabled={answered}
            className="pixel-btn pixel-btn-danger"
            style={{
              padding: '12px',
              minHeight: '80px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: !answered ? 1 : userAnswer === false ? (isCorrect ? 1 : 0.6) : 0.4,
              background: userAnswer === false && isCorrect ? 'var(--pixel-orange)' : 'var(--pixel-red)'
            }}
          >
            <div style={{fontSize: '24px', marginBottom: '4px'}}>🚫</div>
            <div className="pixel-text" style={{color: 'var(--pixel-white)', fontWeight: 'bold'}}>
              SCAM!
            </div>
          </button>
          <button
            onClick={() => handleAnswer(true)}
            disabled={answered}
            className="pixel-btn pixel-btn-success"
            style={{
              padding: '12px',
              minHeight: '80px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: !answered ? 1 : userAnswer === true ? (isCorrect ? 1 : 0.6) : 0.4,
            }}
          >
            <div style={{fontSize: '24px', marginBottom: '4px'}}>✓</div>
            <div className="pixel-text" style={{color: 'var(--pixel-black)', fontWeight: 'bold'}}>
              SAFE!
            </div>
          </button>
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div
            className="pixel-card"
            style={{
              marginBottom: '12px',
              background: isCorrect ? 'var(--pixel-grass)' : 'var(--pixel-sand)',
              color: 'var(--pixel-black)'
            }}
          >
            <div style={{marginBottom: '8px'}}>
              {isCorrect ? (
                <div className="pixel-text" style={{color: 'var(--pixel-green)', fontWeight: 'bold', fontSize: '12px'}}>
                  🏆 CORRECT! YOU SPOTTED THE SIGNALS!
                </div>
              ) : (
                <div className="pixel-text" style={{color: 'var(--pixel-red)', fontWeight: 'bold', fontSize: '12px'}}>
                  ⚠️ NOT QUITE! HERE'S WHAT TO LOOK FOR:
                </div>
              )}
            </div>
            <div className="pixel-text" style={{color: 'var(--pixel-black)', marginBottom: '8px', lineHeight: '1.6'}}>
              {current?.explanation}
            </div>

            {/* Trust Signals Analysis */}
            {current?.signals && (
              <div style={{marginBottom: '8px'}}>
                <div className="pixel-text" style={{color: 'var(--pixel-black)', fontWeight: 'bold', marginBottom: '4px', fontSize: '10px'}}>
                  👁️ TRUST SIGNALS:
                </div>
                <div style={{display: 'grid', gap: '4px'}}>
                  {current.signals.map((signal, i) => (
                    <div key={i} style={{padding: '4px 6px', background: signal.type === 'danger' ? 'rgba(204,0,0,0.2)' : 'rgba(0,204,0,0.2)', border: `1px solid ${signal.type === 'danger' ? 'var(--pixel-red)' : 'var(--pixel-green)'}`, fontSize: '8px'}}>
                      <div className="pixel-text" style={{color: signal.type === 'danger' ? 'var(--pixel-red)' : 'var(--pixel-green)', fontWeight: 'bold', marginBottom: '2px'}}>
                        {signal.type === 'danger' ? '⚠️' : '✓'} {signal.text}
                      </div>
                      <div className="pixel-text" style={{color: 'var(--pixel-black)', fontSize: '7px'}}>
                        Level: {signal.weight}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tips */}
            <div>
              <div className="pixel-text" style={{color: 'var(--pixel-black)', fontWeight: 'bold', marginBottom: '4px', fontSize: '10px'}}>
                ⚡ VERIFICATION STEPS:
              </div>
              <ul style={{paddingLeft: '0', margin: '0'}}>
                {current?.tips.map((tip, i) => (
                  <li key={i} className="pixel-text" style={{color: 'var(--pixel-black)', fontSize: '8px', marginBottom: '2px', listStyle: 'none'}}>
                    → {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Next Button */}
        {answered && (
          <button
            onClick={handleNext}
            className="pixel-btn pixel-btn-info"
            style={{
              width: '100%',
              padding: '8px 12px',
              background: 'var(--pixel-blue)',
              color: 'var(--pixel-white)'
            }}
          >
            ➜ NEXT SCENARIO →
          </button>
        )}
      </div>

      {/* Stats Section */}
      {history.length > 0 && (
        <div className="pixel-section pixel-section-stone">
          <div className="pixel-h2" style={{color: 'var(--pixel-yellow)', marginBottom: '8px', textAlign: 'center'}}>
            📊 YOUR PROGRESS 📊
          </div>
          <div className="pixel-grid pixel-grid-4">
            <div className="pixel-stat">
              <div className="pixel-stat-value" style={{color: 'var(--pixel-green)'}}>{stats.correct}</div>
              <div className="pixel-stat-label">CORRECT</div>
            </div>
            <div className="pixel-stat">
              <div className="pixel-stat-value" style={{color: 'var(--pixel-red)'}}>{stats.total - stats.correct}</div>
              <div className="pixel-stat-label">MISTAKES</div>
            </div>
            <div className="pixel-stat">
              <div className="pixel-stat-value" style={{color: 'var(--pixel-orange)'}}>{stats.streak}</div>
              <div className="pixel-stat-label">STREAK</div>
            </div>
            <div className="pixel-stat">
              <div className="pixel-stat-value" style={{color: 'var(--pixel-blue)'}}>
                {stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0}%
              </div>
              <div className="pixel-stat-label">ACCURACY</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
