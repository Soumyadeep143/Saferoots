import { useState } from 'react';
import { TrendingUp, TrendingDown, Info, BookOpen, Eye, Filter } from 'lucide-react';

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

export default function MediaDecoder() {
  const [selectedCountry, setSelectedCountry] = useState(0);
  const [selectedOutlet, setSelectedOutlet] = useState(null);

  const currentCountry = MEDIA_OUTLETS[selectedCountry];
  const countries = MEDIA_OUTLETS.map((c) => c.country);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-xl p-6 border border-blue-500/30">
        <h2 className="text-2xl font-bold text-white mb-2">📰 Media Decoder</h2>
        <p className="text-slate-300">
          Understand the bias and political leanings of local media outlets to become a smarter news consumer.
        </p>
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

      {/* Outlets Grid */}
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

      {/* Tips Section */}
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
    </div>
  );
}
