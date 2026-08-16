import { useState, useEffect } from 'react';
import { ChevronDown, Award, Zap, AlertCircle, CheckCircle, Eye } from 'lucide-react';

const QUIZ_SCENARIOS = [
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [userAnswer, setUserAnswer] = useState(null);
  const [stats, setStats] = useState({ total: 0, correct: 0, streak: 0 });
  const [showExplanation, setShowExplanation] = useState(false);
  const [history, setHistory] = useState([]);

  const current = QUIZ_SCENARIOS[currentIndex];
  const isCorrect = userAnswer === current.isSafe;

  useEffect(() => {
    onStatsUpdate(stats);
  }, [stats, onStatsUpdate]);

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
    setHistory([...history, { scenario: current, userAnswer: answer, correct: answer === current.isSafe }]);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % QUIZ_SCENARIOS.length);
    setAnswered(false);
    setUserAnswer(null);
    setShowExplanation(false);
  };

  return (
    <div className="space-y-8">
      {/* Progress Bar */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-xl p-4 border border-blue-500/20">
          <div className="text-sm text-slate-400">Score</div>
          <div className="text-3xl font-bold text-emerald-400">
            {stats.correct}/{stats.total}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            {stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0}% Correct
          </div>
        </div>
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-xl p-4 border border-blue-500/20">
          <div className="text-sm text-slate-400">Streak</div>
          <div className="text-3xl font-bold text-amber-400">{stats.streak}🔥</div>
          <div className="text-xs text-slate-500 mt-1">Keep it going!</div>
        </div>
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-xl p-4 border border-blue-500/20">
          <div className="text-sm text-slate-400">Quiz #{currentIndex + 1}</div>
          <div className="text-3xl font-bold text-blue-400">{currentIndex + 1}/{QUIZ_SCENARIOS.length}</div>
          <div className="text-xs text-slate-500 mt-1">Scenarios</div>
        </div>
      </div>

      {/* Quiz Card */}
      <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-2xl p-8 border border-blue-500/30 backdrop-blur">
        {/* City Badge */}
        <div className="inline-block px-4 py-2 bg-blue-500/20 rounded-full text-sm font-semibold text-blue-300 mb-6">
          📍 {current.city}
        </div>

        {/* Scenario */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-white mb-4">What do you think?</h3>
          <p className="text-lg text-slate-200 leading-relaxed">{current.scenario}</p>
        </div>

        {/* Answer Buttons */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <button
            onClick={() => handleAnswer(false)}
            disabled={answered}
            className={`p-6 rounded-xl font-bold text-lg transition-all transform hover:scale-105 ${
              !answered
                ? 'bg-gradient-to-br from-red-500/30 to-red-600/30 border-2 border-red-500/50 text-red-300 hover:border-red-400 hover:from-red-500/40 hover:to-red-600/40'
                : userAnswer === false
                  ? isCorrect
                    ? 'bg-gradient-to-br from-red-500/60 to-red-600/60 border-2 border-red-400 text-white ring-2 ring-red-400/50'
                    : 'bg-gradient-to-br from-red-500/20 to-red-600/20 border-2 border-red-500/20 text-red-300'
                  : 'bg-gradient-to-br from-red-500/10 to-red-600/10 border-2 border-red-500/10 text-red-200 opacity-50'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <AlertCircle className="w-5 h-5" />
              SCAM! 🚫
            </div>
          </button>
          <button
            onClick={() => handleAnswer(true)}
            disabled={answered}
            className={`p-6 rounded-xl font-bold text-lg transition-all transform hover:scale-105 ${
              !answered
                ? 'bg-gradient-to-br from-emerald-500/30 to-emerald-600/30 border-2 border-emerald-500/50 text-emerald-300 hover:border-emerald-400 hover:from-emerald-500/40 hover:to-emerald-600/40'
                : userAnswer === true
                  ? isCorrect
                    ? 'bg-gradient-to-br from-emerald-500/60 to-emerald-600/60 border-2 border-emerald-400 text-white ring-2 ring-emerald-400/50'
                    : 'bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 border-2 border-emerald-500/20 text-emerald-300'
                  : 'bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border-2 border-emerald-500/10 text-emerald-200 opacity-50'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5" />
              SAFE ✓
            </div>
          </button>
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div
            className={`p-6 rounded-xl mb-8 space-y-4 border-l-4 ${
              isCorrect
                ? 'bg-emerald-500/10 border-emerald-500 text-emerald-200'
                : 'bg-orange-500/10 border-orange-500 text-orange-200'
            }`}
          >
            <div className="flex gap-3 mb-3">
              {isCorrect ? (
                <>
                  <Award className="w-5 h-5 flex-shrink-0" />
                  <span className="font-bold">Correct! You recognized the signals.</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span className="font-bold">Not quite. Here's what to look for:</span>
                </>
              )}
            </div>
            <p className="text-sm">{current.explanation}</p>

            {/* Trust Signals Analysis */}
            {current.signals && (
              <div className="space-y-2">
                <div className="font-semibold flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  Trust Signal Analysis
                </div>
                <div className="space-y-2 text-sm">
                  {current.signals.map((signal, i) => (
                    <div key={i} className="flex gap-2 items-start">
                      {signal.type === 'danger' ? (
                        <>
                          <span className="text-red-400 font-bold">⚠️</span>
                          <div>
                            <div className="text-red-200">{signal.text}</div>
                            <div className="text-xs text-red-300/70">Risk Level: {signal.weight}</div>
                          </div>
                        </>
                      ) : (
                        <>
                          <span className="text-emerald-400 font-bold">✓</span>
                          <div>
                            <div className="text-emerald-200">{signal.text}</div>
                            <div className="text-xs text-emerald-300/70">Indicator: {signal.weight}</div>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tips */}
            <div>
              <div className="font-semibold mb-2 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Verification Steps:
              </div>
              <ul className="space-y-1 text-sm">
                {current.tips.map((tip, i) => (
                  <li key={i} className="flex gap-2">
                    <span>→</span>
                    <span>{tip}</span>
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
            className="w-full py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-bold rounded-xl hover:from-emerald-600 hover:to-blue-600 transition-all flex items-center justify-center gap-2 group"
          >
            Next Scenario
            <ChevronDown className="w-5 h-5 rotate-[-90deg] group-hover:translate-x-1 transition-transform" />
          </button>
        )}
      </div>

      {/* Stats Section */}
      {history.length > 0 && (
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-xl p-6 border border-blue-500/20">
          <h3 className="font-bold text-white mb-4">Your Progress</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-400">{stats.correct}</div>
              <div className="text-xs text-slate-400">Correct Answers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">{stats.total - stats.correct}</div>
              <div className="text-xs text-slate-400">Mistakes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{stats.streak}</div>
              <div className="text-xs text-slate-400">Current Streak</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">
                {stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0}%
              </div>
              <div className="text-xs text-slate-400">Accuracy</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
