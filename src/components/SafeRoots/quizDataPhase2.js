// SafeRoots Phase 2: Domain-Based Quiz System
// Each location has multiple domains (Housing, Jobs, Healthcare, Payments, Visas)

export const DOMAINS = {
  HOUSING: { id: 'housing', name: '🏠 Housing Safety', color: 'from-emerald-500 to-teal-500', emoji: '🏠' },
  JOBS: { id: 'jobs', name: '💼 Job Verification', color: 'from-blue-500 to-cyan-500', emoji: '💼' },
  HEALTHCARE: { id: 'healthcare', name: '⚕️ Healthcare Safety', color: 'from-purple-500 to-pink-500', emoji: '⚕️' },
  PAYMENTS: { id: 'payments', name: '💳 Payment Safety', color: 'from-orange-500 to-red-500', emoji: '💳' },
  VISAS: { id: 'visas', name: '🛂 Visa & Immigration', color: 'from-indigo-500 to-purple-500', emoji: '🛂' },
};

export const LOCATIONS = [
  { id: 'bangalore', name: 'Bangalore', country: '🇮🇳 India', timezone: 'IST' },
  { id: 'dubai', name: 'Dubai', country: '🇦🇪 UAE', timezone: 'GST' },
  { id: 'mumbai', name: 'Mumbai', country: '🇮🇳 India', timezone: 'IST' },
  { id: 'singapore', name: 'Singapore', country: '🇸🇬 Singapore', timezone: 'SGT' },
  { id: 'bangkok', name: 'Bangkok', country: '🇹🇭 Thailand', timezone: 'ICT' },
  { id: 'hongkong', name: 'Hong Kong', country: '🇭🇰 Hong Kong', timezone: 'HKT' },
  { id: 'jakarta', name: 'Jakarta', country: '🇮🇩 Indonesia', timezone: 'WIB' },
  { id: 'kualalumpur', name: 'Kuala Lumpur', country: '🇲🇾 Malaysia', timezone: 'MYT' },
];

// Badge definitions
export const BADGES = {
  housing: {
    id: 'housing',
    name: 'Housing Safety',
    emoji: '🏠',
    description: 'Complete 3 Housing Safety quizzes',
    requirement: 3,
  },
  jobs: {
    id: 'jobs',
    name: 'Job Verification',
    emoji: '💼',
    description: 'Complete 3 Job Verification quizzes',
    requirement: 3,
  },
  healthcare: {
    id: 'healthcare',
    name: 'Healthcare Safety',
    emoji: '⚕️',
    description: 'Complete 3 Healthcare Safety quizzes',
    requirement: 3,
  },
  payments: {
    id: 'payments',
    name: 'Payment Safety',
    emoji: '💳',
    description: 'Complete 3 Payment Safety quizzes',
    requirement: 3,
  },
  visas: {
    id: 'visas',
    name: 'Visa & Immigration',
    emoji: '🛂',
    description: 'Complete 3 Visa & Immigration quizzes',
    requirement: 3,
  },
};

// Domain-based scenarios organized by location and domain
export const QUIZ_SCENARIOS_PHASE2 = {
  bangalore: {
    housing: [
      {
        id: 'b-h-1',
        city: 'Bangalore',
        domain: 'housing',
        scenario: 'You receive a WhatsApp message from an unknown number claiming to be a rental agent offering a ₹15,000/month apartment in Indiranagar. They ask for a ₹5,000 "booking fee" to hold it.',
        isSafe: false,
        explanation: 'This is a common rental scam in Bangalore. Real agents never ask for payment before viewing.',
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
        id: 'b-h-2',
        city: 'Bangalore',
        domain: 'housing',
        scenario: 'A friend recommends a local Facebook group "Bangalore Apartments - Best Deals" with 75K members. You find a flat at 40% below market price with photos.',
        isSafe: true,
        explanation: 'Community groups with active moderation and member verification are reliable. Always meet in person to verify.',
        signals: [
          { type: 'safe', text: 'Large, established community (75K members)', weight: 'High' },
          { type: 'safe', text: 'Personal recommendation from trusted friend', weight: 'High' },
          { type: 'safe', text: 'Multiple community members can verify info', weight: 'High' },
          { type: 'danger', text: 'Price significantly below market (verify authenticity)', weight: 'Medium' },
          { type: 'safe', text: 'Professional property photos and description', weight: 'Medium' }
        ],
        tips: [
          'Verify admin credentials and group history',
          'Read recent member testimonials and reviews',
          'Meet property owner in person at the location with a friend',
          'Ask multiple group members for references about the specific property'
        ]
      },
      {
        id: 'b-h-3',
        city: 'Bangalore',
        domain: 'housing',
        scenario: 'You contact a property listed on 99acres. The agent says the landlord wants a "token amount" of ₹50,000 to "reserve" the flat before signing lease. They promise full refund if you decide not to take it.',
        isSafe: false,
        explanation: 'Token amounts for reservations are sometimes legitimate, but full refunds are rarely given. This is a high-risk scenario.',
        signals: [
          { type: 'danger', text: 'Requests money before lease is signed', weight: 'High' },
          { type: 'danger', text: 'Refund promise is vague (not in writing)', weight: 'High' },
          { type: 'safe', text: 'Using verified platform (99acres)', weight: 'High' },
          { type: 'danger', text: 'Pressure to decide quickly', weight: 'Medium' },
          { type: 'safe', text: 'Agent provided contact details', weight: 'Medium' }
        ],
        tips: [
          'Token amounts should be NO MORE than 10% of first month rent',
          'Always get refund policy in WRITING on official platform',
          'Verify agent details on 99acres directly',
          'Consider this a yellow flag - research the property and agent thoroughly'
        ]
      }
    ],
    jobs: [
      {
        id: 'b-j-1',
        city: 'Bangalore',
        domain: 'jobs',
        scenario: 'A LinkedIn recruiter messages you about a Senior Developer role at a "prestigious tech startup" offering ₹80 LPA + stock. They ask for your resume, expected salary, and current salary via LinkedIn chat.',
        isSafe: false,
        explanation: 'Legitimate recruiters use secure channels and don\'t ask sensitive salary info via LinkedIn.',
        signals: [
          { type: 'danger', text: 'Asking salary details via LinkedIn (insecure channel)', weight: 'Critical' },
          { type: 'danger', text: 'Vague company name ("prestigious tech startup")', weight: 'High' },
          { type: 'danger', text: 'No formal job description or company website link', weight: 'High' },
          { type: 'safe', text: 'Using LinkedIn (though can be impersonated)', weight: 'Low' }
        ],
        tips: [
          'Always verify recruiter via company LinkedIn page directly',
          'Legitimate offers use official company email, not LinkedIn',
          'Check company careers page for the posted job',
          'Never share current salary - let them make offer first',
          'Use company main phone number to verify recruiter employment'
        ]
      },
      {
        id: 'b-j-2',
        city: 'Bangalore',
        domain: 'jobs',
        scenario: 'You get an email from "Amazon Bangalore HR" offering a Backend Developer role. They want you to pay ₹15,000 for "verification and background check processing" before the interview.',
        isSafe: false,
        explanation: 'Legitimate companies NEVER ask candidates to pay for hiring process. This is always a scam.',
        signals: [
          { type: 'danger', text: 'Asking for payment before interview', weight: 'Critical' },
          { type: 'danger', text: 'Email likely impersonation (check domain carefully)', weight: 'Critical' },
          { type: 'danger', text: 'Legitimate companies cover verification costs', weight: 'High' },
          { type: 'safe', text: 'Email mentions specific company and role', weight: 'Low' }
        ],
        tips: [
          'Check email domain - Amazon emails are @amazon.com, not @amazonhr.com',
          'Call Amazon Bangalore directly using official phone number',
          'No legitimate company charges candidates for hiring process',
          'Report scam to Amazon and LinkedIn immediately'
        ]
      }
    ],
  },
  dubai: {
    housing: [
      {
        id: 'd-h-1',
        city: 'Dubai',
        domain: 'housing',
        scenario: 'A real estate agent on Instagram offers a 1BR apartment in Downtown Dubai for AED 50,000/year (way below market). They want payment via WhatsApp Money Transfer before showing the apartment.',
        isSafe: false,
        explanation: 'Instagram property listings often involve scams. Legitimate agents use official real estate portals and don\'t ask pre-payment.',
        signals: [
          { type: 'danger', text: 'Suspicious price (50% below market rate)', weight: 'High' },
          { type: 'danger', text: 'Instagram account (not official real estate site)', weight: 'High' },
          { type: 'danger', text: 'Payment via WhatsApp (no protection)', weight: 'Critical' },
          { type: 'danger', text: 'No viewing before payment', weight: 'Critical' }
        ],
        tips: [
          'Use official portals: Bayut, Dubizzle, or Property Finder',
          'Legitimate agents ask for viewing BEFORE any payment',
          'Meet agent in person at registered real estate agency office',
          'Verify agent license with RERA (Real Estate Regulatory Agency)'
        ]
      }
    ],
    jobs: [
      {
        id: 'd-j-1',
        city: 'Dubai',
        domain: 'jobs',
        scenario: 'You get WhatsApp message from "Gulf HR" offering a Finance Manager role at AED 25,000/month + visa sponsorship. They ask for passport scan and bank account details to "process the offer".',
        isSafe: false,
        explanation: 'Legitimate employers don\'t ask for banking details via WhatsApp and don\'t request documents before formal interview.',
        signals: [
          { type: 'danger', text: 'Requesting passport and bank details via WhatsApp', weight: 'Critical' },
          { type: 'danger', text: 'Vague company name ("Gulf HR")', weight: 'High' },
          { type: 'danger', text: 'Offering visa sponsorship without interview', weight: 'High' },
          { type: 'danger', text: 'Using informal messaging app for official business', weight: 'High' }
        ],
        tips: [
          'Legitimate employers conduct formal interviews first',
          'Document requests happen AFTER verbal job offer',
          'Verify company registration with UAE Ministry of Commerce',
          'Use company main phone number to verify job opportunity',
          'Never share banking details until signed contract'
        ]
      }
    ]
  },
  mumbai: {
    housing: [
      {
        id: 'm-h-1',
        city: 'Mumbai',
        domain: 'housing',
        scenario: 'A property owner on Facebook group "Mumbai Apartments" offers a flat in Andheri at ₹25,000/month. They ask for ₹1,50,000 "advance" (6 months rent) upfront before you can view.',
        isSafe: false,
        explanation: 'While advances are common in Mumbai, 6 months is excessive and payment before viewing is risky.',
        signals: [
          { type: 'danger', text: 'Requesting 6 months advance (excessive)', weight: 'High' },
          { type: 'danger', text: 'Payment before viewing property', weight: 'Critical' },
          { type: 'safe', text: 'Using established Facebook group', weight: 'Medium' },
          { type: 'danger', text: 'No registered broker involved', weight: 'Medium' }
        ],
        tips: [
          'Typical Mumbai advance: 1-2 months, NOT 6 months',
          'Always view property and verify with neighbors first',
          'Use registered broker - they protect both parties',
          'Get written rental agreement before paying any amount',
          'Meet owner at the property location'
        ]
      }
    ]
  },
  singapore: {
    healthcare: [
      {
        id: 's-h-1',
        city: 'Singapore',
        domain: 'healthcare',
        scenario: 'A WhatsApp contact offers you affordable private doctor consultation for SGD 30 (way below clinic rates). They ask for payment via PayLah before sending address.',
        isSafe: false,
        explanation: 'Unlicensed practitioners and fake clinics use cheap pricing to attract patients. Always use licensed clinics.',
        signals: [
          { type: 'danger', text: 'Price significantly below market (SGD 30 vs SGD 80+)', weight: 'High' },
          { type: 'danger', text: 'Using personal WhatsApp (not clinic number)', weight: 'High' },
          { type: 'danger', text: 'Payment before consultation location confirmed', weight: 'Critical' },
          { type: 'danger', text: 'No clinic registration number provided', weight: 'Critical' }
        ],
        tips: [
          'Use only clinics listed on Singapore Health Ministry website',
          'Legitimate clinics have physical addresses and registered doctors',
          'Check doctor\'s name on Singapore Medical Council register',
          'Never pay upfront for medical consultation',
          'Ask for clinic registration number and verify independently'
        ]
      }
    ]
  },
  bangkok: {
    payments: [
      {
        id: 'b-p-1',
        city: 'Bangkok',
        domain: 'payments',
        scenario: 'You receive SMS: "Your Bank account locked! Click here to verify". Link looks almost identical to your bank\'s website.',
        isSafe: false,
        explanation: 'Banks NEVER send verification links via SMS. This is a phishing scam (common in Thailand).',
        signals: [
          { type: 'danger', text: 'Unsolicited SMS from "bank"', weight: 'Critical' },
          { type: 'danger', text: 'Link asking to verify credentials', weight: 'Critical' },
          { type: 'danger', text: 'Urgency language ("account locked")', weight: 'High' },
          { type: 'safe', text: 'Legitimate banks call you for account issues', weight: 'High' }
        ],
        tips: [
          'Ignore SMS/WhatsApp links claiming to be from banks',
          'Call your bank using number on back of your card',
          'Legitimate banks use secure mobile apps, not links',
          'Report the message as spam immediately',
          'Never enter credentials after clicking unsolicited links'
        ]
      }
    ]
  },
  hongkong: {
    visas: [
      {
        id: 'h-v-1',
        city: 'Hong Kong',
        domain: 'visas',
        scenario: 'An "immigration consultant" on Facebook offers Hong Kong visa processing for HKD 8,000. They handle everything: application, documents, guarantees visa approval in 2 weeks.',
        isSafe: false,
        explanation: 'Immigration departments don\'t accept bribes. Licensed immigration consultants can help but can\'t guarantee approval.',
        signals: [
          { type: 'danger', text: 'Guaranteeing visa approval (impossible)', weight: 'Critical' },
          { type: 'danger', text: 'No official license displayed', weight: 'High' },
          { type: 'danger', text: 'Using social media for official services', weight: 'High' },
          { type: 'danger', text: 'Unrealistic timeline (2 weeks)', weight: 'High' }
        ],
        tips: [
          'Only official HK Immigration Department processes visas',
          'Verify consultant via HK Law Society website',
          'Licensed consultants help with documents, NOT approval',
          'Visa timelines are official and cannot be rushed',
          'Apply directly to Immigration Department if unsure'
        ]
      }
    ]
  },
  jakarta: {
    housing: [
      {
        id: 'j-h-1',
        city: 'Jakarta',
        domain: 'housing',
        scenario: 'A property owner offers apartment in Jakarta South for IDR 7 million/month. They ask for IDR 35 million (5 months) "administrative deposit" before lease signing.',
        isSafe: false,
        explanation: '5 months deposit is excessive in Jakarta. Standard is 1-2 months. This is often a scam.',
        signals: [
          { type: 'danger', text: 'Requesting 5 months deposit (excessive)', weight: 'High' },
          { type: 'danger', text: 'Payment before signed lease', weight: 'High' },
          { type: 'danger', text: 'No broker or property agent involved', weight: 'Medium' }
        ],
        tips: [
          'Jakarta standard: 1-2 months deposit + 1 month advance',
          'Always use property broker - they protect both parties',
          'Meet owner at property and verify with neighbors',
          'Get lease agreement in writing BEFORE any payment',
          'Verify property ownership through property tax records'
        ]
      }
    ]
  },
  kualalumpur: {
    jobs: [
      {
        id: 'k-j-1',
        city: 'Kuala Lumpur',
        domain: 'jobs',
        scenario: 'A "bank HR" contacts you about Account Executive role at RM 8,000/month. They say you\'ll undergo online training costing RM 500, which you\'ll earn back in first month bonus.',
        isSafe: false,
        explanation: 'Legitimate employers don\'t charge employees for training. This is a common scam in Malaysia.',
        signals: [
          { type: 'danger', text: 'Charging employee for training (red flag)', weight: 'Critical' },
          { type: 'danger', text: 'Vague company identification', weight: 'High' },
          { type: 'danger', text: 'Promise of quick refund ("earn back in bonus")', weight: 'High' },
          { type: 'danger', text: 'No formal interview conducted', weight: 'High' }
        ],
        tips: [
          'No legitimate company charges employees for training',
          'Call bank main line to verify job posting',
          'Formal interviews happen BEFORE any payments',
          'If "training" is mentioned, verify through official bank channels',
          'Report to Bank Negara Malaysia if it\'s impersonating a bank'
        ]
      }
    ]
  }
};

// Helper functions
export const getQuizzesForLocation = (locationId, domain) => {
  return QUIZ_SCENARIOS_PHASE2[locationId]?.[domain] || [];
};

export const getDomainsForLocation = (locationId) => {
  return Object.keys(QUIZ_SCENARIOS_PHASE2[locationId] || {});
};

export const getLocationName = (locationId) => {
  return LOCATIONS.find(l => l.id === locationId)?.name || 'Unknown';
};

export const getDomainInfo = (domainId) => {
  return DOMAINS[domainId.toUpperCase()] || null;
};
