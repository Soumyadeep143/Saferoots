import { useState, useEffect } from 'react';
import { Globe, Map, BookOpen, Trophy, ArrowRight, Shield } from 'lucide-react';
import QuizGame from './QuizGame';
import FactCheckingMap from './FactCheckingMap';
import MediaDecoder from './MediaDecoder';
import './SafeRoots.css';
import './SafeRoots-Enhanced.css';

export default function SafeRootsApp() {
  const [activeTab, setActiveTab] = useState('home');
  const [quizStats, setQuizStats] = useState({ total: 0, correct: 0, streak: 0 });

  return (
    <div className="saferoots-app min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur border-b border-blue-500/30">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                  SafeRoots
                </h1>
                <p className="text-xs text-slate-400">Navigate your new city safely</p>
              </div>
            </div>
            {activeTab === 'quiz' && (
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span className="text-slate-300">{quizStats.total} completed</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-emerald-400 font-semibold">{quizStats.streak}🔥</span>
                </div>
              </div>
            )}
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {[
              { id: 'home', label: 'Home', icon: Globe },
              { id: 'quiz', label: 'Scam or Safe?', icon: Trophy },
              { id: 'map', label: 'Fact-Check Map', icon: Map },
              { id: 'media', label: 'Media Decoder', icon: BookOpen },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                  activeTab === id
                    ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-lg'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'home' && <HomePage onNavigate={setActiveTab} />}
        {activeTab === 'quiz' && <QuizGame onStatsUpdate={setQuizStats} />}
        {activeTab === 'map' && <FactCheckingMap />}
        {activeTab === 'media' && <MediaDecoder />}
      </main>

      {/* Footer */}
      <footer className="border-t border-blue-500/20 bg-slate-900/50 backdrop-blur mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-400 text-sm">
          <p>SafeRoots © 2026 | Empowering newcomers to navigate their new city safely</p>
        </div>
      </footer>
    </div>
  );
}

function HomePage({ onNavigate }) {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal, .reveal-scale, .reveal-left').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <div className="reveal">
            <h2 className="text-5xl font-bold text-white mb-4 leading-tight">
              Welcome to <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">SafeRoots</span>
            </h2>
            <p className="text-xl text-slate-300">
              Your trusted guide to safely navigating the digital and physical landscape of your new city.
            </p>
          </div>
          <p className="text-slate-400 leading-relaxed reveal">
            Moving to a new city? Overwhelmed by scams, fake information, and cultural differences? SafeRoots teaches you how to trust what you read, who to believe, and where to go safely.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="reveal-scale">
            <FeatureCard
              icon={Trophy}
              title="Learn by Playing"
              description="Duolingo-style micro-quizzes about real scams in your city"
              color="from-emerald-500 to-teal-500"
            />
          </div>
          <div className="reveal-scale" style={{transitionDelay: '100ms'}}>
            <FeatureCard
              icon={Map}
              title="Community Map"
              description="See where locals have reported scams and trusted resources"
              color="from-blue-500 to-cyan-500"
            />
          </div>
          <div className="reveal-scale" style={{transitionDelay: '200ms'}}>
            <FeatureCard
              icon={BookOpen}
              title="Media Insights"
              description="Understand local news bias and political leanings"
              color="from-purple-500 to-pink-500"
            />
          </div>
          <div className="reveal-scale" style={{transitionDelay: '300ms'}}>
            <FeatureCard
              icon={Shield}
              title="Stay Safe"
              description="Real-world tips from expats and local experts"
              color="from-orange-500 to-red-500"
            />
          </div>
        </div>
      </div>

      {/* Core Mission */}
      <div className="reveal card-premium bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/30 rounded-xl p-8 mb-8 glow-emerald">
        <h3 className="text-2xl font-bold text-white mb-2 text-gradient">Learn Calibrated Trust</h3>
        <p className="text-slate-300 mb-4">
          SafeRoots doesn't tell you what to believe—it teaches you <strong>how to determine what's trustworthy</strong>.
        </p>
        <div className="grid md:grid-cols-4 gap-4 text-sm">
          <div className="flex gap-2 reveal">
            <span className="text-emerald-400">✓</span>
            <span className="text-slate-300">Recognize trust signals</span>
          </div>
          <div className="flex gap-2 reveal" style={{transitionDelay: '50ms'}}>
            <span className="text-emerald-400">✓</span>
            <span className="text-slate-300">Understand context</span>
          </div>
          <div className="flex gap-2 reveal" style={{transitionDelay: '100ms'}}>
            <span className="text-emerald-400">✓</span>
            <span className="text-slate-300">Verify information</span>
          </div>
          <div className="flex gap-2 reveal" style={{transitionDelay: '150ms'}}>
            <span className="text-emerald-400">✓</span>
            <span className="text-slate-300">Become a digital resident</span>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="reveal">
          <CTACard
            title="Learn Trust"
            description="Micro-quizzes teaching you to recognize trust signals in real scenarios"
            action={() => onNavigate('quiz')}
            icon={Trophy}
            color="emerald"
          />
        </div>
        <div className="reveal" style={{transitionDelay: '100ms'}}>
          <CTACard
            title="Verify Information"
            description="Analyze sources with trust signals verified by community"
            action={() => onNavigate('map')}
            icon={Map}
            color="blue"
          />
        </div>
        <div className="reveal" style={{transitionDelay: '200ms'}}>
          <CTACard
            title="Understand Context"
            description="Media literacy guide to interpret local information landscape"
            action={() => onNavigate('media')}
            icon={BookOpen}
            color="purple"
          />
        </div>
      </div>

      {/* Digital Resident Progression */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white">🏆 Digital Resident Progression</h3>
        <div className="grid md:grid-cols-5 gap-3">
          {[
            { icon: '🔰', label: 'Newcomer', desc: 'Learning basics' },
            { icon: '👁️', label: 'Aware', desc: 'Recognizing patterns' },
            { icon: '🔍', label: 'Verifier', desc: 'Checking sources' },
            { icon: '🌐', label: 'Navigator', desc: 'Understanding context' },
            { icon: '👑', label: 'Digital Resident', desc: 'Teaching others' },
          ].map((level, i) => (
            <div key={i} className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-xl p-4 border border-blue-500/20 text-center">
              <div className="text-3xl mb-2">{level.icon}</div>
              <div className="font-semibold text-white text-sm mb-1">{level.label}</div>
              <div className="text-xs text-slate-400">{level.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid md:grid-cols-4 gap-4 bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-2xl p-8 border border-blue-500/20">
        {[
          { label: 'Active Users', value: '12.5K+' },
          { label: 'Scams Analyzed', value: '3,847' },
          { label: 'Cities Covered', value: '42' },
          { label: 'Community Verified', value: '5.2K' },
        ].map((stat, i) => (
          <div key={i} className="text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent mb-1">
              {stat.value}
            </div>
            <div className="text-sm text-slate-400">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description, color }) {
  return (
    <div className="card-premium bg-gradient-to-br from-slate-800/40 to-slate-700/40 rounded-xl p-6 border-gradient hover:scale-105 transition-all group">
      <div className={`p-3 bg-gradient-to-br ${color} rounded-lg w-fit mb-3 glow-blue transition-all group-hover:scale-110`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <h3 className="font-semibold text-white mb-1">{title}</h3>
      <p className="text-sm text-slate-400">{description}</p>
    </div>
  );
}

function CTACard({ title, description, action, icon: Icon, color }) {
  const colorMap = {
    emerald: 'from-emerald-500/30 to-emerald-600/30 border-emerald-500/50 hover:border-emerald-400',
    blue: 'from-blue-500/30 to-blue-600/30 border-blue-500/50 hover:border-blue-400',
    purple: 'from-purple-500/30 to-purple-600/30 border-purple-500/50 hover:border-purple-400',
  };

  const glowMap = {
    emerald: 'glow-emerald',
    blue: 'glow-blue',
    purple: 'glow-blue',
  };

  return (
    <button
      onClick={action}
      className={`btn-premium bg-gradient-to-br ${colorMap[color]} rounded-2xl p-6 border transition-all hover:scale-105 text-left group ${glowMap[color]}`}
    >
      <div className={`p-2 bg-${color}-500/20 rounded-lg w-fit mb-3 transition-transform group-hover:scale-110`}>
        <Icon className={`w-6 h-6 text-${color}-400`} />
      </div>
      <h3 className="font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-slate-400 mb-4">{description}</p>
      <div className="flex items-center gap-2 text-sm font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity">
        Get Started
        <ArrowRight className="w-4 h-4" />
      </div>
    </button>
  );
}
