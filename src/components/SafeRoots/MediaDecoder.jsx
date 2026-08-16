import { useState } from 'react';
import { TrendingUp, TrendingDown, Info, BookOpen, Eye, Filter, Globe } from 'lucide-react';

const MEDIA_OUTLETS = [
  {
    id: 1,
    country: 'India',
    outlets: [
      {
        name: 'Times of India',
        type: 'Print/Digital',
        bias: 'Center-Right',
        ownership: 'Independents Media (publicly traded)',
        coverage: 'Mainstream news, business-friendly editorial',
        reliability: 9,
        politicalLean: 5,
        strengths: ['Good investigative journalism', 'Wide reach', 'English language'],
        weaknesses: ['Commercial bias', 'Can be sensationalist'],
        tips: 'Good for general news but check multiple sources for political stories',
      },
      {
        name: 'Hindustan Times',
        type: 'Print/Digital',
        bias: 'Center',
        ownership: 'Shobhana Bhartia family',
        coverage: 'News, opinion, lifestyle',
        reliability: 8,
        politicalLean: 3,
        strengths: ['Balanced reporting', 'Good city coverage', 'English newspaper'],
        weaknesses: ['Limited vernacular reach', 'Sometimes business-centric'],
        tips: 'Relatively balanced; good for city-specific news',
      },
      {
        name: 'The Hindu',
        type: 'Print/Digital',
        bias: 'Center-Left Liberal',
        ownership: 'Hindu Publications Limited (independent)',
        coverage: 'News, analysis, culture',
        reliability: 8.5,
        politicalLean: 2,
        strengths: ['Strong editorial standards', 'Good analysis', 'South India focus'],
        weaknesses: ['Liberal bias in op-eds', 'English only'],
        tips: 'Excellent for analysis and long-form journalism',
      },
      {
        name: 'India Today',
        type: 'TV/Digital',
        bias: 'Center-Right',
        ownership: 'TV Today Network',
        coverage: 'News, politics, entertainment',
        reliability: 7,
        politicalLean: 4,
        strengths: ['Breaking news coverage', 'Wide reach', 'Business stories'],
        weaknesses: ['Sensationalist at times', 'High TRP-driven content'],
        tips: 'Good for breaking news but verify political stories elsewhere',
      },
      {
        name: 'NDTV',
        type: 'TV/Digital',
        bias: 'Center-Left',
        ownership: 'NDTV Group',
        coverage: 'News, investigative journalism',
        reliability: 8,
        politicalLean: 2,
        strengths: ['Strong investigative unit', 'Balanced news', 'Good documentaries'],
        weaknesses: ['Sometimes too critical', 'Limited Hindi content'],
        tips: 'Excellent for investigative stories and analysis',
      },
      {
        name: 'ABP News',
        type: 'TV/Digital',
        bias: 'Center-Right to Right-Wing',
        ownership: 'ABP Group',
        coverage: 'News, politics',
        reliability: 6.5,
        politicalLean: 6,
        strengths: ['Breaking news', 'Regional stories', 'Good tech coverage'],
        weaknesses: ['Political bias', 'Sensationalist', 'Higher editorial interference'],
        tips: 'Can be politically biased; cross-check political stories',
      },
    ],
  },
  {
    id: 2,
    country: 'UAE',
    outlets: [
      {
        name: 'Gulf News',
        type: 'Print/Digital',
        bias: 'Pro-Government',
        ownership: 'Gulf News (government-aligned)',
        coverage: 'News, business, lifestyle',
        reliability: 7,
        politicalLean: 7,
        strengths: ['Business news', 'Wide English audience', 'Established brand'],
        weaknesses: ['Government-aligned bias', 'Limited criticism', 'Self-censoring'],
        tips: 'Good for business/economic news; avoid for political criticism',
      },
      {
        name: 'The National',
        type: 'Print/Digital',
        bias: 'Pro-Government',
        ownership: 'The National (Abu Dhabi)',
        coverage: 'News, analysis, culture',
        reliability: 7.5,
        politicalLean: 7,
        strengths: ['High-quality journalism', 'Arabic and English', 'Regional focus'],
        weaknesses: ['Government-influenced', 'Limited critical perspective'],
        tips: 'Quality journalism but limited political criticism allowed',
      },
      {
        name: 'Khaleej Times',
        type: 'Print/Digital',
        bias: 'Pro-Government',
        ownership: 'Galadari Group',
        coverage: 'General news, expat stories',
        reliability: 7,
        politicalLean: 6.5,
        strengths: ['Good expat coverage', 'Community news', 'Affordable'],
        weaknesses: ['Pro-government stance', 'Limited investigation'],
        tips: 'Good for community announcements and expat stories',
      },
      {
        name: 'Facebook Community Groups',
        type: 'Digital/Social',
        bias: 'Mixed (User-driven)',
        ownership: 'Community members',
        coverage: 'Local announcements, advice',
        reliability: 6,
        politicalLean: 0,
        strengths: ['Timely local info', 'Peer recommendations', 'Real experience'],
        weaknesses: ['No fact-checking', 'Rumors spread quickly', 'No editorial control'],
        tips: 'Great for local tips but always verify important information',
      },
    ],
  },
  {
    id: 3,
    country: 'Singapore',
    outlets: [
      {
        name: 'The Straits Times',
        type: 'Print/Digital',
        bias: 'Pro-Government',
        ownership: 'Singapore Press Holdings (SPH)',
        coverage: 'News, politics, business',
        reliability: 8,
        politicalLean: 7,
        strengths: ['High journalism standards', 'Respected regionally', 'Good analysis'],
        weaknesses: ['Government-influenced', 'Limited political criticism'],
        tips: 'Excellent journalism quality; limited political independence',
      },
      {
        name: 'The Online Citizen',
        type: 'Digital',
        bias: 'Opposition/Critical',
        ownership: 'Independent bloggers',
        coverage: 'Politics, human rights, criticism',
        reliability: 6.5,
        politicalLean: 2,
        strengths: ['Political criticism', 'Independent perspective', 'Investigative'],
        weaknesses: ['Sometimes biased reporting', 'Limited mainstream reach'],
        tips: 'Good for alternative perspectives; check facts independently',
      },
      {
        name: 'CNA (Channel News Asia)',
        type: 'TV/Digital',
        bias: 'Neutral/Professional',
        ownership: 'Mediacorp (government-linked)',
        coverage: 'News, current affairs',
        reliability: 8.5,
        politicalLean: 4,
        strengths: ['Professional standards', 'Regional reach', 'Balanced reporting'],
        weaknesses: ['Government-linked ownership', 'Limited bold criticism'],
        tips: 'Professional news source with regional perspective',
      },
    ],
  },
  {
    id: 4,
    country: 'Thailand',
    outlets: [
      {
        name: 'Bangkok Post',
        type: 'Print/Digital',
        bias: 'Center',
        ownership: 'Ittra Publishing',
        coverage: 'News, business, opinion',
        reliability: 7.5,
        politicalLean: 4,
        strengths: ['English language', 'Business coverage', 'Moderate perspective'],
        weaknesses: ['Self-censoring on sensitive topics', 'Business-oriented'],
        tips: 'Good for business and expat news; limitations on political stories',
      },
      {
        name: 'The Nation',
        type: 'Print/Digital',
        bias: 'Center-Right',
        ownership: 'Nation Multimedia Group',
        coverage: 'News, politics, sports',
        reliability: 7,
        politicalLean: 5,
        strengths: ['Long-established', 'English and Thai', 'Good sports coverage'],
        weaknesses: ['Political leanings', 'Some sensationalism'],
        tips: 'Established paper with some political bias; verify political stories',
      },
      {
        name: 'Reddit Thailand Community',
        type: 'Digital/Social',
        bias: 'Mixed (User-driven)',
        ownership: 'Community',
        coverage: 'Discussions, local tips, politics',
        reliability: 5,
        politicalLean: 2,
        strengths: ['Honest discussions', 'Expat perspectives', 'Uncensored'],
        weaknesses: ['Unverified info', 'Strong opinions', 'Occasional misinformation'],
        tips: 'Great for expat perspectives but no fact-checking; verify information',
      },
    ],
  },
];

const CULTURAL_PHRASES = [
  {
    id: 1,
    country: 'India',
    phrases: [
      {
        phrase: 'Arre, kya chal raha hai?',
        englishTranslation: 'Hey, what is happening?',
        literalMeaning: 'Direct translation means "Hey, what is going on?"',
        socialContext: 'Casual greeting and conversation starter, often used between friends and colleagues. Shows familiarity and informality.',
        tone: 'Friendly, Informal',
        whenAppropriate: 'Among friends, colleagues, casual settings. Works in almost any informal situation.',
        whenToAvoid: 'With strangers, in formal meetings, with elders you do not know well, professional emails.',
        culturalNotes: 'Very common in Hindi-speaking regions. Indicates comfort level and camaraderie.',
      },
      {
        phrase: 'Bas karo, yaar',
        englishTranslation: 'Stop it, buddy',
        literalMeaning: 'Direct: "Stop, friend"',
        socialContext: 'Used to ask someone to stop teasing, joking, or doing something annoying. Can be affectionate or frustrated depending on tone.',
        tone: 'Context-dependent (friendly to frustrated)',
        whenAppropriate: 'With friends, colleagues you are close to, during playful moments.',
        whenToAvoid: 'In formal settings, with people you do not know, when genuinely angry (use direct English instead).',
        culturalNotes: 'Very common in casual conversations. Tone of voice is crucial—same words can be affectionate or annoyed.',
      },
      {
        phrase: 'Chut maarna',
        englishTranslation: 'To cut/deceive someone',
        literalMeaning: 'Literally means "to cut" but idiomatically means "to cheat or deceive"',
        socialContext: 'Used when someone tricks you or gets the better deal in a transaction. Not aggressive but implies mild frustration.',
        tone: 'Informal, slightly negative',
        whenAppropriate: 'Among friends discussing a bad deal, lighthearted complaint situations.',
        whenToAvoid: 'Formal settings, professional environments, when genuinely accusing someone.',
        culturalNotes: 'Common in markets and business settings in India.',
      },
      {
        phrase: 'Shaadi mein chhappan bhog',
        englishTranslation: 'Many varieties of sweets at a wedding feast',
        literalMeaning: 'Refers to 56 types of sweet dishes traditionally served at weddings',
        socialContext: 'References the Indian wedding feast tradition of serving many different dishes. Used to describe abundance or variety.',
        tone: 'Neutral, Cultural reference',
        whenAppropriate: 'When discussing weddings, feasts, abundance, variety in any context.',
        whenToAvoid: 'No specific context to avoid.',
        culturalNotes: 'Traditional Indian cultural concept that newcomers should understand to fully appreciate conversations.',
      },
    ],
  },
  {
    id: 2,
    country: 'UAE',
    phrases: [
      {
        phrase: 'Wallahi',
        englishTranslation: 'I swear to God',
        literalMeaning: 'Islamic oath meaning "by God"',
        socialContext: 'Used to emphasize truthfulness or seriousness. Common in Gulf Arabic. Not offensive but very sincere.',
        tone: 'Formal emphasis, Serious',
        whenAppropriate: 'When you need to stress sincerity, truth, or seriousness of what you are saying.',
        whenToAvoid: 'In casual jokes, when making trivial points, in professional emails.',
        culturalNotes: 'Important Islamic cultural phrase. Shows respect for religious values when used appropriately.',
      },
      {
        phrase: 'Inshallah',
        englishTranslation: 'God willing',
        literalMeaning: 'Islamic phrase meaning "if God wills it"',
        socialContext: 'Used when discussing future plans or hopes. Not a definite commitment but an expression of faith.',
        tone: 'Neutral, Respectful',
        whenAppropriate: 'When talking about future plans, expressing hope, showing religious respect.',
        whenToAvoid: 'When making firm commitments or promises (use direct language instead).',
        culturalNotes: 'Very common in Gulf countries. Newcomers should not interpret as a definite "yes".',
      },
      {
        phrase: 'Alhamdulillah',
        englishTranslation: 'Praise be to God',
        literalMeaning: 'Islamic greeting expressing gratitude to God',
        socialContext: 'Response to "How are you?" or expressing gratitude and contentment. Shows good manners and cultural respect.',
        tone: 'Grateful, Respectful',
        whenAppropriate: 'As a greeting, when expressing satisfaction, when someone asks how you are.',
        whenToAvoid: 'In secular or formal non-Islamic contexts (though not offensive).',
        culturalNotes: 'Very common response in Gulf culture. Learning this phrase helps with cultural integration.',
      },
    ],
  },
];

const POLITICAL_REFERENCES = [
  {
    id: 1,
    country: 'India',
    references: [
      {
        reference: 'Modi/NDA',
        refersto: 'Narendra Modi (Prime Minister since 2014) and National Democratic Alliance political coalition',
        whyMentioned: 'Central political leadership and government policies. Used in discussions about policies, elections, governance.',
        historicalContext: 'Modi became Prime Minister in 2014, re-elected in 2019. The NDA is a coalition of political parties.',
        differentInterpretations: 'Supporters see strong leadership and development. Critics raise concerns about communalism and minority rights.',
        avoidingPartisanship: 'When discussing Modi/NDA, try to understand both perspectives without taking a strong stance.',
      },
      {
        reference: 'Congress',
        refersto: 'Indian National Congress party, historically the dominant political party',
        whyMentioned: 'Historical ruling party (1947-1977, 1980-1998, 2004-2014). Still significant in Indian politics.',
        historicalContext: 'Congress led India to independence and governed for much of post-independence era.',
        differentInterpretations: 'Supporters view it as secular and democratic. Critics say it is outdated and corrupt.',
        avoidingPartisanship: 'Both Congress and current govt have achievements and criticisms. Context matters.',
      },
    ],
  },
  {
    id: 2,
    country: 'UAE',
    references: [
      {
        reference: 'UAE Vision 2021/Vision 2030',
        refersto: 'Long-term national development and diversification initiatives',
        whyMentioned: 'Government economic and social development goals. Affects policy, infrastructure, employment.',
        historicalContext: 'UAE focused on diversification away from oil. Vision 2030 launched to continue modernization.',
        differentInterpretations: 'Generally viewed positively as a development framework. Some debate about labor practices and expat issues.',
        avoidingPartisanship: 'Vision 2030 is a development strategy, not a partisan political position.',
      },
    ],
  },
];

const BiasScale = ({ value, label }) => {
  const political = ['Extreme Left', 'Left', 'Center-Left', 'Center', 'Center-Right', 'Right', 'Extreme Right'];
  const scale = Math.round((value / 10) * (political.length - 1));

  return (
    <div className="space-y-2">
      <label className="text-xs font-semibold text-slate-400">{label}</label>
      <div className="flex gap-1">
        {political.map((p, i) => (
          <div
            key={i}
            className={`h-2 flex-1 rounded-full transition-all ${
              i <= scale
                ? `${
                    scale < 3
                      ? 'bg-blue-500'
                      : scale === 3
                        ? 'bg-slate-500'
                        : 'bg-red-500'
                  }`
                : 'bg-slate-700'
            }`}
          />
        ))}
      </div>
      <div className="text-xs text-slate-400">{political[scale]}</div>
    </div>
  );
};

const ToneTag = ({ tone }) => {
  const colors = {
    'Neutral': 'bg-gray-500/20 text-gray-300 border-gray-500/30',
    'Friendly': 'bg-green-500/20 text-green-300 border-green-500/30',
    'Informal': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    'Rude': 'bg-red-500/20 text-red-300 border-red-500/30',
    'Offensive': 'bg-red-600/20 text-red-300 border-red-600/30',
    'Context-dependent': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    'Formal': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    'Serious': 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    'Respectful': 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    'Grateful': 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    'Cultural reference': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    'Formal emphasis': 'bg-violet-500/20 text-violet-300 border-violet-500/30',
  };

  const tones = tone.split(', ');
  return (
    <div className="flex flex-wrap gap-2">
      {tones.map((t) => (
        <span key={t} className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${colors[t] || 'bg-slate-500/20 text-slate-300 border-slate-500/30'}`}>
          {t}
        </span>
      ))}
    </div>
  );
};

export default function MediaDecoder() {
  const [activeTab, setActiveTab] = useState('media');
  const [selectedCountry, setSelectedCountry] = useState(0);
  const [selectedOutlet, setSelectedOutlet] = useState(null);
  const [selectedPhrase, setSelectedPhrase] = useState(null);
  const [phraseInput, setPhraseInput] = useState('');

  const currentCountry = MEDIA_OUTLETS[selectedCountry];
  const countries = MEDIA_OUTLETS.map((c) => c.country);

  const culturalCountry = CULTURAL_PHRASES.find(c => c.country === countries[selectedCountry]);
  const politicalCountry = POLITICAL_REFERENCES.find(c => c.country === countries[selectedCountry]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-xl p-6 border border-blue-500/30">
        <h2 className="text-2xl font-bold text-white mb-2">🌐 Media & Cultural Decoder</h2>
        <p className="text-slate-300">
          Understand media bias, local culture, expressions, and social context to navigate your new city with confidence.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-3 border-b border-slate-700/50">
        <button
          onClick={() => {
            setActiveTab('media');
            setSelectedOutlet(null);
          }}
          className={`px-6 py-3 font-semibold transition-all border-b-2 ${
            activeTab === 'media'
              ? 'border-blue-500 text-blue-400'
              : 'border-transparent text-slate-400 hover:text-slate-300'
          }`}
        >
          📰 Media Sources
        </button>
        <button
          onClick={() => {
            setActiveTab('cultural');
            setSelectedPhrase(null);
          }}
          className={`px-6 py-3 font-semibold transition-all border-b-2 ${
            activeTab === 'cultural'
              ? 'border-blue-500 text-blue-400'
              : 'border-transparent text-slate-400 hover:text-slate-300'
          }`}
        >
          🌍 Cultural Awareness
        </button>
      </div>

      {/* Country Selector */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-300">Select a Country</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {countries.map((country, i) => (
            <button
              key={i}
              onClick={() => {
                setSelectedCountry(i);
                setSelectedOutlet(null);
                setSelectedPhrase(null);
              }}
              className={`p-3 rounded-lg font-medium transition-all ${
                selectedCountry === i
                  ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white'
                  : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
              }`}
            >
              {country}
            </button>
          ))}
        </div>
      </div>

      {/* Media Sources Tab */}
      {activeTab === 'media' && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left: Outlets List */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-300 mb-4">News Outlets</h3>
            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {currentCountry.outlets.map((outlet) => (
                <button
                  key={outlet.name}
                  onClick={() => setSelectedOutlet(outlet)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    selectedOutlet?.name === outlet.name
                      ? 'bg-blue-500/20 border-blue-500'
                      : 'bg-slate-800/30 border-slate-700/50 hover:border-blue-500/50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-white">{outlet.name}</h4>
                      <p className="text-xs text-slate-400">{outlet.type}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-blue-400">{outlet.bias}</div>
                    </div>
                  </div>
                  <div className="mt-2 flex justify-between items-center">
                    <div className="text-xs text-slate-400">Reliability:</div>
                    <div className="flex gap-0.5">
                      {[...Array(10)].map((_, i) => (
                        <div
                          key={i}
                          className={`h-1.5 w-1.5 rounded-full ${
                            i < outlet.reliability ? 'bg-emerald-500' : 'bg-slate-600'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Outlet Details */}
          {selectedOutlet && (
            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-xl p-6 border border-blue-500/30 sticky top-0">
                <h3 className="text-2xl font-bold text-white mb-1">{selectedOutlet.name}</h3>
                <p className="text-sm text-slate-400">{selectedOutlet.type}</p>

                <div className="mt-6 space-y-4">
                  {/* Basic Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-slate-400 mb-1">Ownership</div>
                      <div className="text-sm font-semibold text-white">{selectedOutlet.ownership}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 mb-1">Bias</div>
                      <div className="text-sm font-semibold text-blue-400">{selectedOutlet.bias}</div>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-slate-400 mb-1">Coverage</div>
                    <div className="text-sm text-white">{selectedOutlet.coverage}</div>
                  </div>

                  {/* Scales */}
                  <BiasScale value={selectedOutlet.politicalLean * 10} label="Political Leaning" />

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-400">Reliability Score</label>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 flex gap-1">
                        {[...Array(10)].map((_, i) => (
                          <div
                            key={i}
                            className={`h-2 flex-1 rounded-full ${
                              i < selectedOutlet.reliability ? 'bg-emerald-500' : 'bg-slate-700'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-bold text-emerald-400">{selectedOutlet.reliability}/10</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Strengths & Weaknesses */}
              <div className="space-y-3">
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4">
                  <h4 className="font-semibold text-emerald-300 mb-2 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Strengths
                  </h4>
                  <ul className="space-y-1 text-sm text-slate-300">
                    {selectedOutlet.strengths.map((s) => (
                      <li key={s} className="flex gap-2">
                        <span>✓</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4">
                  <h4 className="font-semibold text-orange-300 mb-2 flex items-center gap-2">
                    <TrendingDown className="w-4 h-4" />
                    Weaknesses
                  </h4>
                  <ul className="space-y-1 text-sm text-slate-300">
                    {selectedOutlet.weaknesses.map((w) => (
                      <li key={w} className="flex gap-2">
                        <span>•</span>
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pro Tip */}
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                  <h4 className="font-semibold text-blue-300 mb-2 flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    Pro Tip for Smart Reading
                  </h4>
                  <p className="text-sm text-slate-300">{selectedOutlet.tips}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Cultural Awareness Tab */}
      {activeTab === 'cultural' && (
        <div className="space-y-6">
          {/* Phrase Decoder */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-xl p-6 border border-purple-500/30">
            <h3 className="text-xl font-bold text-white mb-4">🗣️ Phrase & Expression Decoder</h3>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-slate-300 mb-2 block">Find a phrase or enter your own:</label>
                <input
                  type="text"
                  placeholder="e.g., 'Arre, kya chal raha hai?' or any local phrase..."
                  value={phraseInput}
                  onChange={(e) => setPhraseInput(e.target.value)}
                  className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50"
                />
              </div>

              {/* Suggested Phrases */}
              {culturalCountry && !selectedPhrase && (
                <div>
                  <h4 className="text-sm font-semibold text-slate-300 mb-3">Common phrases in {countries[selectedCountry]}:</h4>
                  <div className="grid gap-2 md:grid-cols-2">
                    {culturalCountry.phrases.map((phrase) => (
                      <button
                        key={phrase.phrase}
                        onClick={() => setSelectedPhrase(phrase)}
                        className="text-left bg-slate-800/50 border border-slate-700/50 hover:border-purple-500/50 rounded-lg p-3 transition-all hover:bg-slate-800"
                      >
                        <div className="font-semibold text-white">{phrase.phrase}</div>
                        <div className="text-xs text-slate-400">{phrase.englishTranslation}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Phrase Details */}
          {selectedPhrase && (
            <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-xl p-6 border border-purple-500/30 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">{selectedPhrase.phrase}</h3>
                  <p className="text-purple-400">{selectedPhrase.englishTranslation}</p>
                </div>
                <button
                  onClick={() => setSelectedPhrase(null)}
                  className="text-slate-400 hover:text-slate-300"
                >
                  ✕
                </button>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/30">
                  <h4 className="text-sm font-semibold text-slate-300 mb-2">Literal Meaning</h4>
                  <p className="text-white">{selectedPhrase.literalMeaning}</p>
                </div>

                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/30">
                  <h4 className="text-sm font-semibold text-slate-300 mb-2">Tone</h4>
                  <ToneTag tone={selectedPhrase.tone} />
                </div>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/30">
                <h4 className="text-sm font-semibold text-slate-300 mb-2">Social Context</h4>
                <p className="text-white">{selectedPhrase.socialContext}</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-emerald-500/10 rounded-lg p-4 border border-emerald-500/30">
                  <h4 className="text-sm font-semibold text-emerald-300 mb-2">✓ When It's Appropriate</h4>
                  <p className="text-white text-sm">{selectedPhrase.whenAppropriate}</p>
                </div>

                <div className="bg-red-500/10 rounded-lg p-4 border border-red-500/30">
                  <h4 className="text-sm font-semibold text-red-300 mb-2">✕ When to Avoid</h4>
                  <p className="text-white text-sm">{selectedPhrase.whenToAvoid}</p>
                </div>
              </div>

              {selectedPhrase.culturalNotes && (
                <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/30">
                  <h4 className="text-sm font-semibold text-blue-300 mb-2">📚 Cultural Notes</h4>
                  <p className="text-white text-sm">{selectedPhrase.culturalNotes}</p>
                </div>
              )}
            </div>
          )}

          {/* Political/Contextual References */}
          {politicalCountry && (
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-xl p-6 border border-cyan-500/30 space-y-4">
              <h3 className="text-xl font-bold text-white mb-4">🏛️ Political & Cultural References</h3>

              <div className="space-y-4">
                {politicalCountry.references.map((ref) => (
                  <div key={ref.reference} className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/30 space-y-3">
                    <h4 className="text-lg font-bold text-cyan-400">{ref.reference}</h4>

                    <div className="grid gap-3 md:grid-cols-2">
                      <div>
                        <div className="text-xs font-semibold text-slate-400 mb-1">Refers To</div>
                        <p className="text-white text-sm">{ref.refersto}</p>
                      </div>

                      <div>
                        <div className="text-xs font-semibold text-slate-400 mb-1">Why It's Mentioned</div>
                        <p className="text-white text-sm">{ref.whyMentioned}</p>
                      </div>
                    </div>

                    <div>
                      <div className="text-xs font-semibold text-slate-400 mb-1">Historical Context</div>
                      <p className="text-white text-sm">{ref.historicalContext}</p>
                    </div>

                    <div className="bg-yellow-500/10 rounded p-3 border border-yellow-500/30">
                      <div className="text-xs font-semibold text-yellow-300 mb-1">⚖️ Different Interpretations</div>
                      <p className="text-white text-sm">{ref.differentInterpretations}</p>
                    </div>

                    <div className="bg-blue-500/10 rounded p-3 border border-blue-500/30">
                      <div className="text-xs font-semibold text-blue-300 mb-1">Balanced Perspective</div>
                      <p className="text-white text-sm">{ref.avoidingPartisanship}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tips Section */}
      {activeTab === 'media' && (
        <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-xl p-6 space-y-4">
          <h3 className="font-bold text-white text-lg flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-purple-400" />
            How to Consume News Wisely
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-300">
            <div className="space-y-2">
              <h4 className="font-semibold text-purple-300">Read Multiple Sources</h4>
              <p>Compare same story from outlets with different leanings to get the full picture</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-purple-300">Check the Source</h4>
              <p>Who owns the outlet? Who funds it? Understanding incentives helps identify bias</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-purple-300">Look for Facts, Not Headlines</h4>
              <p>Headlines are designed to attract. Read the actual article for nuance</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-purple-300">Verify with Local Communities</h4>
              <p>Talk to locals and expats to cross-check media narratives with ground reality</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-purple-300">Be Aware of Your Own Bias</h4>
              <p>Seek info that challenges your beliefs, not just confirms them</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-purple-300">Ask Questions</h4>
              <p>Who is quoted? What evidence is used? Are alternative views presented?</p>
            </div>
          </div>
        </div>
      )}

      {/* Cultural Learning Tips */}
      {activeTab === 'cultural' && (
        <div className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/30 rounded-xl p-6 space-y-4">
          <h3 className="font-bold text-white text-lg flex items-center gap-2">
            <Globe className="w-5 h-5 text-emerald-400" />
            Tips for Cultural Integration
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-300">
            <div className="space-y-2">
              <h4 className="font-semibold text-emerald-300">Learn from Locals</h4>
              <p>Ask natives to explain expressions and context. Most people enjoy teaching their culture.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-emerald-300">Context is Everything</h4>
              <p>Same phrase can mean different things depending on who says it and when.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-emerald-300">Don't Assume Offense</h4>
              <p>What sounds rude in your culture may be friendly banter in another. Ask if unsure.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-emerald-300">Observe First, Then Participate</h4>
              <p>Watch how locals interact before using expressions yourself.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-emerald-300">Respect Religious Context</h4>
              <p>Many phrases have religious significance. Learn the cultural importance.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-emerald-300">Keep an Open Mind</h4>
              <p>Cultural differences are opportunities to learn, not reasons to judge.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
