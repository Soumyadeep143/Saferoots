import { useState, useEffect } from 'react';
import { Globe, Map, BookOpen, Trophy, ArrowRight, Shield } from 'lucide-react';
import QuizGame from './QuizGame';
import DomainQuizGame from './DomainQuizGame';
import FactCheckingMap from './FactCheckingMap';
import MediaDecoder from './MediaDecoder';
import './SafeRoots-Pixelated.css';

export default function SafeRootsApp() {
  const [activeTab, setActiveTab] = useState('home');
  const [quizStats, setQuizStats] = useState({ total: 0, correct: 0, streak: 0 });
  const [badges, setBadges] = useState({});
  const [showBadgeNotif, setShowBadgeNotif] = useState(null);

  useEffect(() => {
    const savedBadges = localStorage.getItem('saferoots-badges');
    if (savedBadges) {
      setBadges(JSON.parse(savedBadges));
    }
  }, []);

  return (
    <div className="saferoots-app min-h-screen">
      {/* Navigation */}
      <nav className="pixel-nav">
        <div className="pixel-content">
          <div className="pixel-nav-brand">
            <div className="pixel-icon-box">🛡️</div>
            <div>
              <div className="pixel-h2" style={{color: 'var(--pixel-yellow)', textShadow: '2px 2px 0px rgba(0,0,0,0.5)'}}>
                SAFE ROOTS
              </div>
              <div className="pixel-text" style={{color: 'var(--pixel-white)'}}>Navigate Your New City Safely</div>
            </div>
          </div>

          {activeTab === 'quiz' && (
            <div className="pixel-text" style={{color: 'var(--pixel-white)', marginBottom: '8px'}}>
              <span style={{color: 'var(--pixel-yellow)'}}>QUIZZES: {quizStats.total}</span>
              {' | '}
              <span style={{color: 'var(--pixel-green)'}}>STREAK: {quizStats.streak}🔥</span>
            </div>
          )}

          {/* Tab Navigation */}
          <div className="pixel-tabs">
            {[
              { id: 'home', label: '🏠 Home' },
              { id: 'quiz', label: '🎮 Quiz' },
              { id: 'domain-quiz', label: '🌍 Domains' },
              { id: 'map', label: '🗺️ Map' },
              { id: 'media', label: '📰 Media' },
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`pixel-tab ${activeTab === id ? 'active' : ''}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="pixel-content">
        {activeTab === 'home' && <HomePage onNavigate={setActiveTab} badges={badges} />}
        {activeTab === 'quiz' && <QuizGame onStatsUpdate={setQuizStats} />}
        {activeTab === 'domain-quiz' && (
          <DomainQuizGame
            onStatsUpdate={setQuizStats}
            onBadgeEarned={(badge) => {
              setShowBadgeNotif(badge);
              const savedBadges = localStorage.getItem('saferoots-badges');
              setBadges(JSON.parse(savedBadges || '{}'));
              setTimeout(() => setShowBadgeNotif(null), 3000);
            }}
          />
        )}
        {activeTab === 'map' && <FactCheckingMap />}
        {activeTab === 'media' && <MediaDecoder />}
      </main>

      {/* Badge Notification */}
      {showBadgeNotif && (
        <div
          style={{
            position: 'fixed',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'var(--pixel-yellow)',
            color: 'var(--pixel-black)',
            padding: '16px',
            border: '3px solid var(--pixel-black)',
            textAlign: 'center',
            animation: 'pixel-bounce 400ms steps(2) infinite',
            zIndex: 100,
            boxShadow: '4px 4px 0px rgba(0,0,0,0.5)',
          }}
        >
          <div className="pixel-h2" style={{color: 'var(--pixel-black)', marginBottom: '8px'}}>
            🏆 BADGE EARNED! 🏆
          </div>
          <div className="pixel-text" style={{color: 'var(--pixel-black)'}}>
            {showBadgeNotif.badge?.emoji} {showBadgeNotif.badge?.name} - {showBadgeNotif.location.toUpperCase()}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{borderTop: '4px solid var(--pixel-black)', background: 'var(--pixel-dirt)', padding: '12px', marginTop: '16px'}}>
        <div className="pixel-content" style={{textAlign: 'center'}}>
          <div className="pixel-text" style={{color: 'var(--pixel-yellow)'}}>
            SAFE ROOTS © 2026 | TEACHING TRUST LITERACY
          </div>
        </div>
      </footer>
    </div>
  );
}

function HomePage({ onNavigate, badges }) {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('pixel-fade-in');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.pixel-card, .pixel-section').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div style={{display: 'grid', gap: '16px'}}>
      {/* Hero Section */}
      <div className="pixel-section pixel-section-grass">
        <div style={{textAlign: 'center', marginBottom: '16px'}}>
          <div className="pixel-h1" style={{color: 'var(--pixel-black)', marginBottom: '8px'}}>
            🎮 WELCOME TO 🎮
          </div>
          <div className="pixel-h1" style={{color: 'var(--pixel-green)', textShadow: '3px 3px 0px rgba(0,0,0,0.5)'}}>
            SAFE ROOTS
          </div>
        </div>

        <div className="pixel-text" style={{color: 'var(--pixel-black)', textAlign: 'center', marginBottom: '12px', lineHeight: '1.6'}}>
          YOUR GUIDE TO SURVIVING IN A NEW CITY
        </div>

        <div className="pixel-text" style={{color: 'var(--pixel-black)', textAlign: 'center', lineHeight: '1.6'}}>
          Moving to a new city? Overwhelmed by scams, fake info, and culture shock?
          <br/>Learn how to recognize what's SAFE and what's SCAM! 🛡️
        </div>
      </div>
        <div className="pixel-grid pixel-grid-2">
          <div className="pixel-card pixel-fade-in">
            <div style={{fontSize: '32px', marginBottom: '8px'}}>🎮</div>
            <div className="pixel-h3" style={{color: 'var(--pixel-black)'}}>LEARN BY PLAYING</div>
            <div className="pixel-text" style={{color: 'var(--pixel-black)', marginTop: '6px'}}>
              Answer quizzes about REAL scams in YOUR city!
            </div>
          </div>

          <div className="pixel-card pixel-fade-in">
            <div style={{fontSize: '32px', marginBottom: '8px'}}>🗺️</div>
            <div className="pixel-h3" style={{color: 'var(--pixel-black)'}}>COMMUNITY MAP</div>
            <div className="pixel-text" style={{color: 'var(--pixel-black)', marginTop: '6px'}}>
              See where others reported SCAMS and SAFE zones!
            </div>
          </div>

          <div className="pixel-card pixel-fade-in">
            <div style={{fontSize: '32px', marginBottom: '8px'}}>📰</div>
            <div className="pixel-h3" style={{color: 'var(--pixel-black)'}}>MEDIA DECODER</div>
            <div className="pixel-text" style={{color: 'var(--pixel-black)', marginTop: '6px'}}>
              Understand NEWS BIAS and who controls media!
            </div>
          </div>

          <div className="pixel-card pixel-fade-in">
            <div style={{fontSize: '32px', marginBottom: '8px'}}>🛡️</div>
            <div className="pixel-h3" style={{color: 'var(--pixel-black)'}}>STAY SAFE</div>
            <div className="pixel-text" style={{color: 'var(--pixel-black)', marginTop: '6px'}}>
              Tips from locals and expats who know the REAL risks!
            </div>
          </div>
        </div>

      {/* Core Mission */}
      <div className="pixel-section pixel-section-stone">
        <div className="pixel-h2" style={{color: 'var(--pixel-yellow)', marginBottom: '12px', textAlign: 'center'}}>
          🎯 CALIBRATED TRUST 🎯
        </div>
        <div className="pixel-text" style={{color: 'var(--pixel-white)', marginBottom: '12px', textAlign: 'center', lineHeight: '1.6'}}>
          SafeRoots doesn't tell you what to BELIEVE
          <br/>It teaches you HOW to know what's TRUSTWORTHY!
        </div>
        <div className="pixel-grid pixel-grid-4">
          <div className="pixel-card-grass">
            <div className="pixel-text" style={{color: 'var(--pixel-green)', fontWeight: 'bold', marginBottom: '4px'}}>✓ TRUST SIGNALS</div>
            <div className="pixel-text" style={{color: 'var(--pixel-black)', fontSize: '8px'}}>Spot the warning signs</div>
          </div>
          <div className="pixel-card-grass">
            <div className="pixel-text" style={{color: 'var(--pixel-green)', fontWeight: 'bold', marginBottom: '4px'}}>✓ CONTEXT</div>
            <div className="pixel-text" style={{color: 'var(--pixel-black)', fontSize: '8px'}}>Know the background</div>
          </div>
          <div className="pixel-card-grass">
            <div className="pixel-text" style={{color: 'var(--pixel-green)', fontWeight: 'bold', marginBottom: '4px'}}>✓ VERIFY</div>
            <div className="pixel-text" style={{color: 'var(--pixel-black)', fontSize: '8px'}}>Check the facts first</div>
          </div>
          <div className="pixel-card-grass">
            <div className="pixel-text" style={{color: 'var(--pixel-green)', fontWeight: 'bold', marginBottom: '4px'}}>✓ RESIDENT</div>
            <div className="pixel-text" style={{color: 'var(--pixel-black)', fontSize: '8px'}}>Master your city</div>
          </div>
        </div>
      </div>

      {/* Badges Earned Section */}
      {Object.keys(badges || {}).length > 0 && (
        <div className="pixel-section pixel-section-stone">
          <div className="pixel-h2" style={{color: 'var(--pixel-yellow)', marginBottom: '12px', textAlign: 'center'}}>
            🏆 YOUR BADGES 🏆
          </div>
          <div className="pixel-grid pixel-grid-4">
            {Object.keys(badges).map((badgeKey) => {
              const [location, domain] = badgeKey.split('-');
              return (
                <div key={badgeKey} className="pixel-card-grass" style={{textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80px'}}>
                  <div style={{fontSize: '32px', marginBottom: '4px'}}>✨</div>
                  <div className="pixel-text" style={{color: 'var(--pixel-green)', fontWeight: 'bold', fontSize: '9px', marginBottom: '2px'}}>
                    {domain.toUpperCase()}
                  </div>
                  <div className="pixel-text" style={{color: 'var(--pixel-black)', fontSize: '7px'}}>
                    📍 {location.toUpperCase()}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className="pixel-grid pixel-grid-3">
        <div>
          <button
            onClick={() => onNavigate('quiz')}
            className="pixel-btn"
            style={{
              background: 'var(--pixel-green)',
              width: '100%',
              height: '120px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            <div style={{fontSize: '32px', marginBottom: '8px'}}>🎮</div>
            CLASSIC QUIZ
          </button>
        </div>
        <div>
          <button
            onClick={() => onNavigate('domain-quiz')}
            className="pixel-btn"
            style={{
              background: 'var(--pixel-purple)',
              color: 'var(--pixel-white)',
              width: '100%',
              height: '120px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            <div style={{fontSize: '32px', marginBottom: '8px'}}>🌍</div>
            DOMAIN QUIZ
          </button>
        </div>
        <div>
          <button
            onClick={() => onNavigate('map')}
            className="pixel-btn"
            style={{
              background: 'var(--pixel-blue)',
              color: 'var(--pixel-white)',
              width: '100%',
              height: '120px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            <div style={{fontSize: '32px', marginBottom: '8px'}}>🗺️</div>
            VIEW MAP
          </button>
        </div>
      </div>

      {/* Digital Resident Progression */}
      <div>
        <div className="pixel-h2" style={{color: 'var(--pixel-yellow)', textAlign: 'center', marginBottom: '12px'}}>
          🏆 LEVEL UP 🏆
        </div>
        <div className="pixel-grid pixel-grid-4">
          {[
            { icon: '🔰', label: 'NEWCOMER' },
            { icon: '👁️', label: 'AWARE' },
            { icon: '🔍', label: 'VERIFIER' },
            { icon: '🌐', label: 'NAVIGATOR' },
            { icon: '👑', label: 'RESIDENT' },
          ].map((level, i) => (
            <div key={i} className="pixel-level" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80px', background: 'var(--pixel-purple)', width: '100%'}}>
              <div style={{fontSize: '28px', marginBottom: '4px'}}>{level.icon}</div>
              <div className="pixel-text" style={{color: 'var(--pixel-white)', fontWeight: 'bold', fontSize: '9px'}}>{level.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="pixel-section pixel-section-stone">
        <div className="pixel-grid pixel-grid-4">
          {[
            { label: 'USERS', value: '12.5K+' },
            { label: 'SCAMS', value: '3,847' },
            { label: 'CITIES', value: '42' },
            { label: 'VERIFIED', value: '5.2K' },
          ].map((stat, i) => (
            <div key={i} className="pixel-stat">
              <div className="pixel-stat-value" style={{color: 'var(--pixel-green)'}}>
                {stat.value}
              </div>
              <div className="pixel-stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

