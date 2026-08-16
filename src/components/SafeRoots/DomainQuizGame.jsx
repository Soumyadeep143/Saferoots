import { useState, useEffect } from 'react';
import { ChevronDown, Award, Zap, AlertCircle, CheckCircle, Eye, MapPin } from 'lucide-react';
import {
  DOMAINS,
  LOCATIONS,
  BADGES,
  QUIZ_SCENARIOS_PHASE2,
  getDomainsForLocation,
  getLocationName,
  getDomainInfo,
} from './quizDataPhase2';

export default function DomainQuizGame({ onStatsUpdate, onBadgeEarned }) {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [userAnswer, setUserAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [stats, setStats] = useState({ total: 0, correct: 0, streak: 0 });
  const [domainProgress, setDomainProgress] = useState({}); // Track completion per domain/location
  const [badges, setBadges] = useState({}); // Track earned badges

  // Load badges from localStorage on mount
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

  const scenarios = selectedLocation && selectedDomain
    ? QUIZ_SCENARIOS_PHASE2[selectedLocation]?.[selectedDomain] || []
    : [];

  const current = scenarios[currentScenarioIndex];
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

    // Track domain completion
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

    // Check for badge eligibility
    if (newProgress[progressKey].completed % 3 === 0) {
      const badgeKey = `${selectedLocation}-${selectedDomain}`;
      if (!badges[badgeKey]) {
        const newBadges = { ...badges, [badgeKey]: true };
        setBadges(newBadges);
        localStorage.setItem('saferoots-badges', JSON.stringify(newBadges));
        if (onBadgeEarned) {
          onBadgeEarned({
            location: selectedLocation,
            domain: selectedDomain,
            badge: BADGES[selectedDomain],
          });
        }
      }
    }

    onStatsUpdate?.(newStats);
  };

  const handleNext = () => {
    setCurrentScenarioIndex((prev) => (prev + 1) % scenarios.length);
    setAnswered(false);
    setUserAnswer(null);
    setShowExplanation(false);
  };

  const domainsList = selectedLocation ? getDomainsForLocation(selectedLocation) : [];

  return (
    <div style={{ display: 'grid', gap: '16px' }}>
      {/* Location & Domain Selection */}
      {!selectedLocation || !selectedDomain ? (
        <div>
          <div className="pixel-section pixel-section-grass">
            <div className="pixel-h2" style={{ color: 'var(--pixel-black)', textAlign: 'center', marginBottom: '12px' }}>
              🌍 SELECT YOUR LOCATION 🌍
            </div>
            <div className="pixel-grid pixel-grid-4">
              {LOCATIONS.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => {
                    setSelectedLocation(loc.id);
                    setSelectedDomain(null);
                  }}
                  className="pixel-btn"
                  style={{
                    background: 'var(--pixel-grass)',
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
                  <div className="pixel-text" style={{ color: 'var(--pixel-black)', fontSize: '7px' }}>
                    {loc.country}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {selectedLocation && (
            <div className="pixel-section pixel-section-stone">
              <div className="pixel-h2" style={{ color: 'var(--pixel-yellow)', textAlign: 'center', marginBottom: '12px' }}>
                📚 SELECT DOMAIN 📚
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
                        setCurrentScenarioIndex(0);
                        setAnswered(false);
                        setUserAnswer(null);
                      }}
                      className="pixel-btn"
                      style={{
                        background: 'var(--pixel-blue)',
                        color: 'var(--pixel-white)',
                        padding: '12px',
                        minHeight: '100px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        position: 'relative',
                      }}
                    >
                      {isBadgeEarned && (
                        <div style={{ position: 'absolute', top: '4px', right: '4px', fontSize: '20px' }}>
                          ✨
                        </div>
                      )}
                      <div style={{ fontSize: '28px', marginBottom: '4px' }}>{domain.emoji}</div>
                      <div className="pixel-text" style={{ color: 'var(--pixel-white)', fontWeight: 'bold', fontSize: '9px', textAlign: 'center' }}>
                        {domain.name}
                      </div>
                      {progress && (
                        <div className="pixel-text" style={{ color: 'var(--pixel-yellow)', fontSize: '7px', marginTop: '4px' }}>
                          {progress.completed}/3
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setSelectedLocation(null)}
                className="pixel-btn"
                style={{
                  background: 'var(--pixel-red)',
                  color: 'var(--pixel-white)',
                  width: '100%',
                  marginTop: '12px',
                  padding: '8px',
                }}
              >
                ← BACK TO LOCATIONS
              </button>
            </div>
          )}
        </div>
      ) : (
        // Quiz Mode
        <div style={{ display: 'grid', gap: '16px' }}>
          {/* Stats */}
          <div className="pixel-grid pixel-grid-3">
            <div className="pixel-stat">
              <div className="pixel-stat-label">SCORE</div>
              <div className="pixel-stat-value">{stats.correct}/{stats.total}</div>
              <div className="pixel-text" style={{ color: 'var(--pixel-green)', marginTop: '4px' }}>
                {stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0}% ✓
              </div>
            </div>
            <div className="pixel-stat">
              <div className="pixel-stat-label">STREAK</div>
              <div className="pixel-stat-value">{stats.streak}</div>
              <div className="pixel-text" style={{ color: 'var(--pixel-orange)', marginTop: '4px' }}>
                🔥 KEEP GOING
              </div>
            </div>
            <div className="pixel-stat">
              <div className="pixel-stat-label">QUIZ</div>
              <div className="pixel-stat-value">{currentScenarioIndex + 1}/3</div>
              <div className="pixel-text" style={{ color: 'var(--pixel-blue)', marginTop: '4px' }}>
                IN DOMAIN
              </div>
            </div>
          </div>

          {/* Quiz Card */}
          <div className="pixel-section pixel-section-grass">
            {/* Location & Domain Badge */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
              <div className="pixel-level" style={{ background: 'var(--pixel-blue)', color: 'var(--pixel-white)' }}>
                📍 {getLocationName(selectedLocation)}
              </div>
              <div className="pixel-level" style={{ background: 'var(--pixel-purple)', color: 'var(--pixel-white)' }}>
                {getDomainInfo(selectedDomain)?.emoji} {getDomainInfo(selectedDomain)?.name}
              </div>
            </div>

            {/* Scenario */}
            <div style={{ marginBottom: '12px' }}>
              <div className="pixel-h2" style={{ color: 'var(--pixel-black)', marginBottom: '8px' }}>
                🤔 WHAT DO YOU THINK?
              </div>
              <div className="pixel-text" style={{ color: 'var(--pixel-black)', lineHeight: '1.6', marginBottom: '8px' }}>
                {current.scenario}
              </div>
            </div>

            {/* Answer Buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', marginBottom: '12px' }}>
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
                  background: userAnswer === false && isCorrect ? 'var(--pixel-orange)' : 'var(--pixel-red)',
                }}
              >
                <div style={{ fontSize: '24px', marginBottom: '4px' }}>🚫</div>
                <div className="pixel-text" style={{ color: 'var(--pixel-white)', fontWeight: 'bold' }}>
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
                <div style={{ fontSize: '24px', marginBottom: '4px' }}>✓</div>
                <div className="pixel-text" style={{ color: 'var(--pixel-black)', fontWeight: 'bold' }}>
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
                  color: 'var(--pixel-black)',
                }}
              >
                <div style={{ marginBottom: '8px' }}>
                  {isCorrect ? (
                    <div className="pixel-text" style={{ color: 'var(--pixel-green)', fontWeight: 'bold', fontSize: '12px' }}>
                      🏆 CORRECT! YOU SPOTTED THE SIGNALS!
                    </div>
                  ) : (
                    <div className="pixel-text" style={{ color: 'var(--pixel-red)', fontWeight: 'bold', fontSize: '12px' }}>
                      ⚠️ NOT QUITE! HERE'S WHAT TO LOOK FOR:
                    </div>
                  )}
                </div>
                <div className="pixel-text" style={{ color: 'var(--pixel-black)', marginBottom: '8px', lineHeight: '1.6' }}>
                  {current.explanation}
                </div>

                {/* Trust Signals */}
                {current.signals && (
                  <div style={{ marginBottom: '8px' }}>
                    <div className="pixel-text" style={{ color: 'var(--pixel-black)', fontWeight: 'bold', marginBottom: '4px', fontSize: '10px' }}>
                      👁️ TRUST SIGNALS:
                    </div>
                    <div style={{ display: 'grid', gap: '4px' }}>
                      {current.signals.map((signal, i) => (
                        <div key={i} style={{ padding: '4px 6px', background: signal.type === 'danger' ? 'rgba(204,0,0,0.2)' : 'rgba(0,204,0,0.2)', border: `1px solid ${signal.type === 'danger' ? 'var(--pixel-red)' : 'var(--pixel-green)'}`, fontSize: '8px' }}>
                          <div className="pixel-text" style={{ color: signal.type === 'danger' ? 'var(--pixel-red)' : 'var(--pixel-green)', fontWeight: 'bold', marginBottom: '2px' }}>
                            {signal.type === 'danger' ? '⚠️' : '✓'} {signal.text}
                          </div>
                          <div className="pixel-text" style={{ color: 'var(--pixel-black)', fontSize: '7px' }}>
                            Level: {signal.weight}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tips */}
                <div>
                  <div className="pixel-text" style={{ color: 'var(--pixel-black)', fontWeight: 'bold', marginBottom: '4px', fontSize: '10px' }}>
                    ⚡ VERIFICATION STEPS:
                  </div>
                  <ul style={{ paddingLeft: '0', margin: '0' }}>
                    {current.tips.map((tip, i) => (
                      <li key={i} className="pixel-text" style={{ color: 'var(--pixel-black)', fontSize: '8px', marginBottom: '2px', listStyle: 'none' }}>
                        → {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Next Button */}
            {answered && (
              <div>
                {currentScenarioIndex < scenarios.length - 1 ? (
                  <button
                    onClick={handleNext}
                    className="pixel-btn pixel-btn-info"
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      background: 'var(--pixel-blue)',
                      color: 'var(--pixel-white)',
                    }}
                  >
                    ➜ NEXT SCENARIO →
                  </button>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <button
                      onClick={handleNext}
                      className="pixel-btn pixel-btn-info"
                      style={{
                        padding: '8px 12px',
                        background: 'var(--pixel-blue)',
                        color: 'var(--pixel-white)',
                      }}
                    >
                      🔄 RESTART
                    </button>
                    <button
                      onClick={() => {
                        setSelectedDomain(null);
                      }}
                      className="pixel-btn pixel-btn-danger"
                      style={{
                        padding: '8px 12px',
                        background: 'var(--pixel-green)',
                        color: 'var(--pixel-black)',
                      }}
                    >
                      📚 CHANGE DOMAIN
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
