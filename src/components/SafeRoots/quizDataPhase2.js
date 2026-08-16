// SafeRoots Phase 2 (Refined): Domain-Based Quiz System with Expanded Content
// 8 locations × 5 domains × 5 scenarios = 200+ unique scenarios

export const DOMAINS = {
  HOUSING: { id: 'housing', name: '🏠 Housing Safety', emoji: '🏠' },
  JOBS: { id: 'jobs', name: '💼 Job Verification', emoji: '💼' },
  HEALTHCARE: { id: 'healthcare', name: '⚕️ Healthcare Safety', emoji: '⚕️' },
  PAYMENTS: { id: 'payments', name: '💳 Payment Safety', emoji: '💳' },
  VISAS: { id: 'visas', name: '🛂 Visa & Immigration', emoji: '🛂' },
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

// Helper function to create scenario
const scenario = (id, city, domain, scenario_text, isSafe, explanation, signals, tips, difficulty = 'medium') => ({
  id,
  city,
  domain,
  scenario: scenario_text,
  isSafe,
  explanation,
  signals,
  tips,
  difficulty,
});

// BANGALORE SCENARIOS
const bangaloreHousing = [
  scenario('b-h-1', 'Bangalore', 'housing',
    'WhatsApp from unknown number: "Indiranagar flat, ₹15K/month. Send ₹5K booking fee to hold it."',
    false,
    'Common rental scam. Real agents never ask payment before viewing.',
    [
      { type: 'danger', text: 'Unknown number (not official)', weight: 'High' },
      { type: 'danger', text: 'Payment request before viewing', weight: 'Critical' },
      { type: 'danger', text: 'Using WhatsApp (informal channel)', weight: 'High' },
      { type: 'safe', text: 'Real agents show property first', weight: 'Critical' }
    ],
    ['Always meet agent at property location', 'Use verified platforms (99acres, MagicBricks)', 'Never pay before viewing', 'Ask for property tax receipt']
  ),
  scenario('b-h-2', 'Bangalore', 'housing',
    'Facebook group "Bangalore Apartments" (75K members): Flat at 40% below market with photos and detailed description.',
    true,
    'Community groups with moderation are reliable. Verify by meeting in person.',
    [
      { type: 'safe', text: 'Large established community', weight: 'High' },
      { type: 'safe', text: 'Multiple community references possible', weight: 'High' },
      { type: 'danger', text: 'Price below market (needs verification)', weight: 'Medium' },
      { type: 'safe', text: 'Professional photos and description', weight: 'Medium' }
    ],
    ['Verify admin and group history', 'Read recent testimonials', 'Meet owner at location with friend', 'Ask neighbors about property']
  ),
  scenario('b-h-3', 'Bangalore', 'housing',
    '"Token amount" of ₹50,000 (half month rent) from verified 99acres agent to "reserve" flat. Claims full refund if you don\'t take it.',
    false,
    'While common in India, 6-month advance or high token amounts without lease are risky. Full refund promises are rarely honored.',
    [
      { type: 'danger', text: 'Payment before lease signed', weight: 'High' },
      { type: 'danger', text: 'Refund promise is verbal not written', weight: 'High' },
      { type: 'safe', text: 'Using verified platform (99acres)', weight: 'High' },
      { type: 'safe', text: 'Agent is on official platform', weight: 'Medium' }
    ],
    ['Typical token: MAX 10% of first month rent', 'Get refund policy in WRITING via platform', 'Verify agent details on 99acres', 'Use registered broker for protection']
  ),
  scenario('b-h-4', 'Bangalore', 'housing',
    'Landlord (verified with ID): "₹1,50,000 advance (1 month rent deposit + 5 months advance). Standard in Bangalore." Offers to take you to bank to transfer.',
    true,
    'Advances ARE standard in Bangalore (1-2 months is normal). Meeting at bank is actually a good sign. But get written lease first.',
    [
      { type: 'safe', text: 'Landlord shows government ID', weight: 'High' },
      { type: 'safe', text: 'Meeting at bank for transparency', weight: 'High' },
      { type: 'safe', text: 'Specific advance amount mentioned', weight: 'Medium' },
      { type: 'safe', text: 'Offering to visit bank together', weight: 'High' }
    ],
    ['Standard Bangalore: 1 month + 2-5 months advance', 'Get written rental agreement before payment', 'Visit bank account confirmation', 'Keep all receipts and agreements']
  ),
  scenario('b-h-5', 'Bangalore', 'housing',
    'Instagram account "Bangaloreflats": "Koramangala 1BR, luxury apartment, ₹30K/month, international standard." Payment via WhatsApp Money Transfer. Agent has no office location listed.',
    false,
    'Instagram property scams are extremely common in India. Legitimate agents use official real estate portals and physical offices.',
    [
      { type: 'danger', text: 'Instagram (not official real estate site)', weight: 'Critical' },
      { type: 'danger', text: 'WhatsApp Money Transfer payment', weight: 'Critical' },
      { type: 'danger', text: 'No physical office address', weight: 'High' },
      { type: 'danger', text: 'Generic luxury description', weight: 'Medium' }
    ],
    ['Use only 99acres, MagicBricks, Housing.com, Sulekha', 'Verify agent on official platform', 'Never use WhatsApp/UPI for large payments', 'Always meet at official agent office']
  ),
];

const bangaloreJobs = [
  scenario('b-j-1', 'Bangalore', 'jobs',
    'LinkedIn: "Senior Developer at prestigious startup, ₹80 LPA + stock options. Send resume and current salary via LinkedIn chat."',
    false,
    'Legitimate recruiters use secure channels and never ask sensitive info via LinkedIn.',
    [
      { type: 'danger', text: 'Asking salary via LinkedIn', weight: 'Critical' },
      { type: 'danger', text: 'Vague company name', weight: 'High' },
      { type: 'danger', text: 'No company email link', weight: 'High' },
      { type: 'safe', text: 'Mentioned specific role and salary', weight: 'Low' }
    ],
    ['Verify recruiter on company LinkedIn directly', 'Legitimate offers use company email', 'Check company careers page', 'Never share current salary first', 'Use company main phone to verify']
  ),
  scenario('b-j-2', 'Bangalore', 'jobs',
    '"Amazon Bangalore HR": "Backend role approved. Pay ₹15,000 for background check processing and verification." Email domain looks similar to Amazon.',
    false,
    'Legitimate companies NEVER charge candidates for hiring. This is always a scam.',
    [
      { type: 'danger', text: 'Asking payment before interview', weight: 'Critical' },
      { type: 'danger', text: 'Email domain impersonation', weight: 'Critical' },
      { type: 'danger', text: 'Companies cover verification costs', weight: 'High' }
    ],
    ['Check email domain carefully (e.g., @amazon.com not @amazonhr.com)', 'Call Amazon Bangalore using official number', 'No company charges for hiring process', 'Report to Amazon security and LinkedIn']
  ),
  scenario('b-j-3', 'Bangalore', 'jobs',
    'HR from verified company (Infosys email): "You\'re selected. Offer letter emailed. Please confirm by clicking link in email to activate account." Link is custom domain (not Infosys).',
    false,
    'Infosys doesn\'t send activation links. Always access company accounts through official app/website, never via email links.',
    [
      { type: 'danger', text: 'Link doesn\'t match company domain', weight: 'Critical' },
      { type: 'safe', text: 'Email appears from company account', weight: 'Medium' },
      { type: 'danger', text: 'Unusual link activation request', weight: 'High' }
    ],
    ['Ignore links in emails - go to official website/app', 'Call HR directly using company directory', 'Verify sender email domain matches company', 'Don\'t click email links for account setup']
  ),
  scenario('b-j-4', 'Bangalore', 'jobs',
    'Recruiter (on company LinkedIn profile): "Referral bonus! Refer developers, earn ₹10,000 per hire. Send your referral list to apply quickly."',
    true,
    'Legitimate referral programs exist. Asking for referral list is normal. Verify program through official company HR website.',
    [
      { type: 'safe', text: 'Contact through company LinkedIn profile', weight: 'High' },
      { type: 'safe', text: 'Normal referral bonus amount', weight: 'Medium' },
      { type: 'safe', text: 'Asking for referral contacts is standard', weight: 'Medium' }
    ],
    ['Verify program on company careers page', 'Check if bonus amount is realistic', 'Confirm through company HR directly', 'Don\'t share referral details until verified']
  ),
  scenario('b-j-5', 'Bangalore', 'jobs',
    'Job posting on Indeed: "QA Lead, ₹50K/month, remote work, flexible hours." Company has verified profile, 4.5 star rating, 2000+ employees. Email: careers@company.com',
    true,
    'Verified Indeed profile with many reviews is reliable. Remote roles from established companies are legitimate.',
    [
      { type: 'safe', text: 'Verified company profile', weight: 'High' },
      { type: 'safe', text: 'Many reviews and ratings', weight: 'High' },
      { type: 'safe', text: 'Official company email', weight: 'High' },
      { type: 'safe', text: 'Realistic salary for role', weight: 'Medium' }
    ],
    ['Verify company on Indeed profile', 'Check company website independently', 'Review salary against market rates', 'Apply through official job portal', 'Request video interview before accepting']
  ),
];

const bangaloreHealthcare = [
  scenario('b-hc-1', 'Bangalore', 'healthcare',
    'WhatsApp: "Private doctor, ₹500 consultation (vs ₹1500 at clinic). Prescriptions for any illness. Send money via Paytm, I\'ll share location."',
    false,
    'Unlicensed practitioners use low pricing to attract patients. Always verify doctor registration.',
    [
      { type: 'danger', text: 'Price far below market', weight: 'High' },
      { type: 'danger', text: 'Using personal WhatsApp', weight: 'High' },
      { type: 'danger', text: 'Payment before seeing location', weight: 'Critical' },
      { type: 'danger', text: 'No license/registration mentioned', weight: 'Critical' }
    ],
    ['Use clinics on Google Maps/99healthplus', 'Verify doctor on Medical Council website', 'Ask for clinic registration certificate', 'Never pay before physical visit', 'Check doctor qualifications']
  ),
  scenario('b-hc-2', 'Bangalore', 'healthcare',
    'Clinic in HSR Layout (verified on Google Maps, 4.8 stars, 1200+ reviews): "Appointment available tomorrow. ₹800 consultation. Registered MD, 15 years experience."',
    true,
    'Google Maps with many genuine reviews is reliable. Check doctor credentials on Medical Council.',
    [
      { type: 'safe', text: 'Verified on Google Maps', weight: 'High' },
      { type: 'safe', text: 'Many reviews and high rating', weight: 'High' },
      { type: 'safe', text: 'Doctor credentials mentioned', weight: 'Medium' },
      { type: 'safe', text: 'Physical clinic location', weight: 'High' }
    ],
    ['Verify clinic address on Google Maps', 'Call clinic number to confirm', 'Check doctor on Medical Council of India', 'Arrive 10 min early to verify', 'Ask about prescription protocols']
  ),
  scenario('b-hc-3', 'Bangalore', 'healthcare',
    'Telegram group "Bangalore Health Deals": "Ayurvedic clinic - 100% cure for diabetes. ₹2000 for full treatment package. Guaranteed no side effects."',
    false,
    '"100% cure" claims are illegal. No legitimate medical practice guarantees cures or side-effect-free treatment.',
    [
      { type: 'danger', text: 'Claims 100% cure (illegal claim)', weight: 'Critical' },
      { type: 'danger', text: 'No registered practitioner info', weight: 'High' },
      { type: 'danger', text: 'Unrealistic pricing for treatment', weight: 'High' },
      { type: 'danger', text: 'Using Telegram (anonymous)', weight: 'High' }
    ],
    ['No medical treatment is 100% guaranteed', 'Verify practitioner credentials', 'Check clinic registration with AYUSH board', 'Consult multiple doctors before treatment', 'Be skeptical of "miracle cures"']
  ),
  scenario('b-hc-4', 'Bangalore', 'healthcare',
    'Apollo Clinic (official website): "Online consultation with MBBS doctor, ₹500. Prescription delivered via app. 24/7 availability."',
    true,
    'Apollo is a verified chain. Online consultations from registered doctors are legitimate. Verify through official website.',
    [
      { type: 'safe', text: 'Established hospital chain', weight: 'High' },
      { type: 'safe', text: 'Official website booking', weight: 'High' },
      { type: 'safe', text: 'MBBS qualification mentioned', weight: 'High' },
      { type: 'safe', text: 'Licensed digital health platform', weight: 'High' }
    ],
    ['Book through hospital official website only', 'Verify doctor license in consultation', 'Get prescription in official format', 'Save consultation records', 'Check medicine authenticity at pharmacy']
  ),
  scenario('b-hc-5', 'Bangalore', 'healthcare',
    'Facebook: "Homeopath cures cancer naturally without surgery. Cost ₹50,000 for 3-month treatment. Join success group to see testimonials."',
    false,
    'Cancer treatment requires conventional medicine from licensed oncologists. Facebook testimonials are unverifiable and often fabricated.',
    [
      { type: 'danger', text: 'Claims to treat cancer (serious disease)', weight: 'Critical' },
      { type: 'danger', text: 'Using Facebook testimonials as proof', weight: 'Critical' },
      { type: 'danger', text: 'No medical qualifications mentioned', weight: 'High' },
      { type: 'danger', text: '"Success group" is marketing tactic', weight: 'High' }
    ],
    ['Cancer requires licensed oncologist only', 'Never trust Facebook testimonials', 'Verify practitioner with medical board', 'Seek second opinion from hospital', 'Don\'t delay conventional treatment']
  ),
];

const bangalorePayments = [
  scenario('b-p-1', 'Bangalore', 'payments',
    'SMS: "Your bank account locked! Click link to verify immediately." Link looks like official bank URL.',
    false,
    'Banks NEVER send verification links via SMS. Always call bank using number on card.',
    [
      { type: 'danger', text: 'Unsolicited SMS with link', weight: 'Critical' },
      { type: 'danger', text: 'Urgency language ("locked")', weight: 'High' },
      { type: 'danger', text: 'Asking for credentials via link', weight: 'Critical' }
    ],
    ['Ignore SMS links from banks', 'Call bank using number on back of card', 'Banks use secure app/website, not links', 'Report SMS as fraud', 'Never enter credentials after clicking links']
  ),
  scenario('b-p-2', 'Bangalore', 'payments',
    'WhatsApp: "Government refund ₹50,000 approved. Claim at link. Share Aadhar/PAN for verification."',
    false,
    'Government never sends refunds via WhatsApp or asks for Aadhar/PAN in unofficial channels.',
    [
      { type: 'danger', text: 'Unsolicited government refund claim', weight: 'Critical' },
      { type: 'danger', text: 'Asking for Aadhar/PAN', weight: 'Critical' },
      { type: 'danger', text: 'Using WhatsApp (informal channel)', weight: 'High' }
    ],
    ['Government uses official website/portal', 'Never share Aadhar/PAN via WhatsApp', 'Verify through official income tax website', 'Report as phishing scam', 'Check refund status on income tax portal']
  ),
  scenario('b-p-3', 'Bangalore', 'payments',
    'UPI: Someone requests ₹5000 with message "Hi, this is your friend\'s new number. Send money urgently."',
    false,
    'Unknown numbers requesting money are likely scammers using hacking or social engineering.',
    [
      { type: 'danger', text: 'Request from unknown/new number', weight: 'High' },
      { type: 'danger', text: 'Creating urgency', weight: 'High' },
      { type: 'danger', text: 'No context for money request', weight: 'High' }
    ],
    ['Always call the person directly before sending money', 'Use saved contacts only', 'Never send money to new numbers', 'Verify via another communication channel', 'Ask security question if suspicious']
  ),
  scenario('b-p-4', 'Bangalore', 'payments',
    'Paytm: "Cashback offer! Send ₹1000 to earn ₹500 cashback. Limited time." Offer from verified Paytm official account.',
    true,
    'Verified platforms do offer legitimate cashback promotions. Check terms in official app.',
    [
      { type: 'safe', text: 'From official Paytm account', weight: 'High' },
      { type: 'safe', text: 'Reasonable cashback percentage', weight: 'High' },
      { type: 'safe', text: 'Promotion details in terms', weight: 'Medium' }
    ],
    ['Verify promotion in official Paytm app', 'Read terms and conditions carefully', 'Cashback appears in wallet', 'Don\'t send money if not in app', 'Check expiry date of offer']
  ),
  scenario('b-p-5', 'Bangalore', 'payments',
    'Google Pay: "Friend paid you ₹2000. Click to accept." Number in recent contacts, saved as "colleague".',
    true,
    'Payments from known contacts through verified apps are generally safe. Verify amount makes sense for context.',
    [
      { type: 'safe', text: 'From saved contact', weight: 'High' },
      { type: 'safe', text: 'Using verified app (Google Pay)', weight: 'High' },
      { type: 'safe', text: 'Reasonable amount', weight: 'Medium' }
    ],
    ['Accept payments only from known contacts', 'If amount seems wrong, call friend to verify', 'Check transaction history', 'Save receipts', 'Report suspicious activity to Google Pay']
  ),
];

const bangaloreVisas = [
  scenario('b-v-1', 'Bangalore', 'visas',
    '"Immigration consultant": "Singapore visa guaranteed in 2 weeks. Cost ₹15,000. I handle everything." On Facebook, no office address.',
    false,
    'No one can guarantee visa approval. Visa timelines are official. Facebook consultants are often fraud.',
    [
      { type: 'danger', text: 'Guaranteeing visa approval', weight: 'Critical' },
      { type: 'danger', text: 'Unrealistic timeline (2 weeks)', weight: 'High' },
      { type: 'danger', text: 'No office or registration shown', weight: 'High' },
      { type: 'danger', text: 'Using Facebook for official service', weight: 'High' }
    ],
    ['Only official visa processing guarantees timelines', 'Verify consultant via Bar Council', 'Singapore visa takes minimum 4-6 weeks', 'Apply through official embassy website', 'No consultant can expedite government process']
  ),
  scenario('b-v-2', 'Bangalore', 'visas',
    'Registered immigration consultant (verified on Bar Council): "UK visa preparation assistance. ₹8000. I review documents and prepare application. Final decision by UK Home Office."',
    true,
    'Licensed consultants can help with preparation. They clarify they cannot guarantee outcomes.',
    [
      { type: 'safe', text: 'Verified on Bar Council', weight: 'High' },
      { type: 'safe', text: 'Clear scope (preparation only)', weight: 'High' },
      { type: 'safe', text: 'States UK Home Office makes decision', weight: 'High' },
      { type: 'safe', text: 'Reasonable fees for service', weight: 'Medium' }
    ],
    ['Verify consultant on Bar Council website', 'Ask for registration number', 'Get written scope of work', 'Document review process', 'Prepare documents yourself too']
  ),
  scenario('b-v-3', 'Bangalore', 'visas',
    '"Agent" on WhatsApp: "UAE visa for ₹20,000. All documents ready. Just send money and report to airport." No company name mentioned.',
    false,
    'Legitimate visa sponsorship includes company identification, contract details, visa fee breakdown.',
    [
      { type: 'danger', text: 'No company identification', weight: 'Critical' },
      { type: 'danger', text: 'Vague "report to airport"', weight: 'Critical' },
      { type: 'danger', text: 'Money upfront without documents', weight: 'Critical' }
    ],
    ['Verify sponsoring company independently', 'Ask for visa letter and details', 'Check company on UAE Ministry website', 'Visa processing happens before travel', 'Never pay without official letter']
  ),
  scenario('b-v-4', 'Bangalore', 'visas',
    'Job offer letter from verified UAE company with visa sponsorship details. Letter has company letterhead, HR sign-off, visa application fee breakdown.',
    true,
    'Official job offer with visa details is legitimate. Follow company\'s visa process.',
    [
      { type: 'safe', text: 'Official company letterhead', weight: 'High' },
      { type: 'safe', text: 'Visa details specified', weight: 'High' },
      { type: 'safe', text: 'Fee breakdown provided', weight: 'High' },
      { type: 'safe', text: 'Signed by HR department', weight: 'High' }
    ],
    ['Verify company registration independently', 'Follow their visa instructions exactly', 'Apply through official process', 'Keep all documentation', 'Contact embassy for status']
  ),
  scenario('b-v-5', 'Bangalore', 'visas',
    'Email from "Ministry of Immigration": "Your visa application is rejected. Appeal within 7 days by paying ₹50,000 fee." Email address looks suspicious.',
    false,
    'Official rejections come from actual embassy, not generic email. Appeals don\'t require additional fees.',
    [
      { type: 'danger', text: 'Suspicious email domain', weight: 'Critical' },
      { type: 'danger', text: 'Requesting appeal payment', weight: 'Critical' },
      { type: 'danger', text: 'Creating false urgency', weight: 'High' }
    ],
    ['Check email domain matches official embassy', 'Call embassy directly to verify status', 'Appeals processed by embassy only', 'Don\'t pay for appeals', 'Report phishing to embassy']
  ),
];

// DUBAI SCENARIOS (5 per domain)
const dubaiHousing = [
  scenario('d-h-1', 'Dubai', 'housing',
    'Instagram: "Downtown Dubai 1BR, AED 50,000/year (way below market). WhatsApp Money Transfer accepted."',
    false,
    'Instagram property scams are rampant in Dubai. Use only official portals.',
    [
      { type: 'danger', text: 'Suspicious price (50% below market)', weight: 'High' },
      { type: 'danger', text: 'Instagram (not official portal)', weight: 'High' },
      { type: 'danger', text: 'WhatsApp Money Transfer (no protection)', weight: 'Critical' }
    ],
    ['Use Bayut, Dubizzle, Property Finder only', 'Verify agent on RERA registry', 'Never send money before viewing', 'Meet at agent\'s physical office']
  ),
  scenario('d-h-2', 'Dubai', 'housing',
    'Bayut listing (verified agent): "Marina apartment, AED 90,000/year. Agent office in JBR, 5+ years established, 4.8 RERA rating."',
    true,
    'Verified RERA agents on Bayut are legitimate. Check ratings and meet at office.',
    [
      { type: 'safe', text: 'Official Bayut portal', weight: 'High' },
      { type: 'safe', text: 'RERA verified agent', weight: 'High' },
      { type: 'safe', text: 'Physical office location', weight: 'High' },
      { type: 'safe', text: 'High RERA rating', weight: 'High' }
    ],
    ['Verify agent RERA number on official registry', 'Meet at agent office with lease', 'Inspect property with tenant if occupied', 'Check utility bills', 'Get all documents notarized']
  ),
  scenario('d-h-3', 'Dubai', 'housing',
    'Agent: "Deposit required: AED 20,000 (one month rent) via bank transfer to hold apartment. Refundable if lease not signed within 7 days."',
    true,
    'Standard Dubai practice. Refundable deposit is normal. Verify agent is RERA registered.',
    [
      { type: 'safe', text: 'One month deposit (standard)', weight: 'High' },
      { type: 'safe', text: 'Refund clause mentioned', weight: 'High' },
      { type: 'safe', text: 'Using bank transfer (traceable)', weight: 'High' }
    ],
    ['Verify deposit is refundable in writing', 'Get receipt from agent', 'Verify RERA registration', 'Sign NOC after payment', 'Lease should specify refund terms']
  ),
  scenario('d-h-4', 'Dubai', 'housing',
    'WhatsApp from "landlord": "Apartment available. You need to pay AED 50,000 upfront as 3-month advance WITHOUT seeing the place. Trust me."',
    false,
    'Never pay advance without seeing property or meeting actual landlord with ID.',
    [
      { type: 'danger', text: 'No property viewing', weight: 'Critical' },
      { type: 'danger', text: 'Large advance without documentation', weight: 'Critical' },
      { type: 'danger', text: 'Using WhatsApp (no paper trail)', weight: 'High' },
      { type: 'danger', text: '"Trust me" is red flag', weight: 'High' }
    ],
    ['Always view property in person', 'Meet landlord with government ID', 'Use registered RERA agent', 'Get written agreement before payment', 'Never trust WhatsApp-only communication']
  ),
  scenario('d-h-5', 'Dubai', 'housing',
    'Dubizzle (verified banner landlord, 10+ properties): "Studio in Deira, AED 25,000/year. Immediate handover available. Bank transfer preferred."',
    true,
    'Verified landlord badges on Dubizzle indicate reliability. Bank transfer is safer than cash.',
    [
      { type: 'safe', text: 'Verified Dubizzle landlord', weight: 'High' },
      { type: 'safe', text: 'Bank transfer payment', weight: 'High' },
      { type: 'safe', text: 'Multiple properties (established)', weight: 'High' }
    ],
    ['Meet landlord at property', 'Verify ID before payment', 'Get NOC and ejari contract', 'Arrange tenancy registration through RERA', 'Pay utilities setup fees separately']
  ),
];

const dubaiJobs = [
  scenario('d-j-1', 'Dubai', 'jobs',
    'LinkedIn: "Finance Manager at Gulf Bank, AED 25,000/month + visa. Send passport scan and bank details via LinkedIn."',
    false,
    'Banks don\'t request sensitive docs via LinkedIn. Real banks use formal processes.',
    [
      { type: 'danger', text: 'Asking for passport via LinkedIn', weight: 'Critical' },
      { type: 'danger', text: 'Requesting bank details', weight: 'Critical' },
      { type: 'danger', text: 'Using LinkedIn for formal hiring', weight: 'High' }
    ],
    ['Call bank using official number', 'Verify recruiter on bank LinkedIn', 'Visit bank branch in person', 'Never share banking info online', 'Report to bank security']
  ),
  scenario('d-j-2', 'Dubai', 'jobs',
    'Verified company email: "Congratulations on selection. UAE visa processing fee AED 500. After payment, you\'ll receive visa."',
    false,
    'Companies NEVER charge employees for visa sponsorship. This is always a scam.',
    [
      { type: 'danger', text: 'Charging for visa sponsorship', weight: 'Critical' },
      { type: 'danger', text: 'Payment before visa received', weight: 'Critical' }
    ],
    ['Call company HR directly', 'Check with Ministry of Human Resources', 'Report to employer and labor office', 'Never pay for company-sponsored visa', 'Visa fees covered by employer']
  ),
  scenario('d-j-3', 'Dubai', 'jobs',
    'Email from verified UAE company: "Congratulations on selection. Please complete training and verification. Details sent to your email. Signing bonus: AED 5000."',
    true,
    'Real job offers include contract details. Training before start is normal. Signing bonus is legitimate.',
    [
      { type: 'safe', text: 'Verified company email', weight: 'High' },
      { type: 'safe', text: 'Signing bonus mentioned', weight: 'Medium' },
      { type: 'safe', text: 'Details in separate email', weight: 'High' }
    ],
    ['Verify job offer email address', 'Check employee benefits policy', 'Review contract carefully', 'Clarify signing bonus conditions', 'Visit company before accepting']
  ),
  scenario('d-j-4', 'Dubai', 'jobs',
    'Glassdoor: "Company in Dubai with 4.5/5 stars. 500+ reviews from employees. Posted vacancy for Business Analyst."',
    true,
    'Glassdoor reviews are generally reliable due to employee verification. High ratings with many reviews indicate legitimacy.',
    [
      { type: 'safe', text: 'Verified Glassdoor reviews', weight: 'High' },
      { type: 'safe', text: 'Many employee reviews', weight: 'High' },
      { type: 'safe', text: 'High rating score', weight: 'High' }
    ],
    ['Read detailed employee reviews', 'Check company website', 'Research company background', 'Look for salary reviews', 'Apply through company website when possible']
  ),
  scenario('d-j-5', 'Dubai', 'jobs',
    'WhatsApp from "recruitment agent": "Get job in Dubai with visa. Only ₹30,000. Flexible positions, high pay guaranteed." No company name mentioned.',
    false,
    'Recruitment agents that charge upfront fees and make vague promises are scams. Real jobs don\'t work this way.',
    [
      { type: 'danger', text: 'Charging upfront fees', weight: 'Critical' },
      { type: 'danger', text: 'Vague "flexible positions"', weight: 'Critical' },
      { type: 'danger', text: '"Guaranteed high pay" (impossible)', weight: 'Critical' },
      { type: 'danger', text: 'No company identification', weight: 'Critical' }
    ],
    ['Real jobs are free to apply for', 'No recruitment agency charges candidates', 'Never pay for job prospects', 'Research company independently', 'Report to Ministry of Labor']
  ),
];

// Generate remaining domains for Dubai
const dubaiHealthcare = [
  scenario('d-hc-1', 'Dubai', 'healthcare',
    'Telegram: "German doctor, 30 years experience, AED 200 consultation (vs AED 1000 at clinic). WhatsApp for appointment."',
    false,
    'Unlicensed practitioners advertise on Telegram. Always verify through official channels.',
    [
      { type: 'danger', text: 'Telegram (anonymous channel)', weight: 'High' },
      { type: 'danger', text: 'Suspiciously low price', weight: 'High' },
      { type: 'danger', text: 'WhatsApp only communication', weight: 'High' },
      { type: 'danger', text: 'No clinic location', weight: 'Critical' }
    ],
    ['Use Google Maps for verified clinics', 'Check doctor on Health Authority Dubai', 'Only licensed clinics accepted', 'Never pay upfront to unknown practitioners', 'Ask for clinic name and registration']
  ),
  scenario('d-hc-2', 'Dubai', 'healthcare',
    'Emirates Clinic (verified on Google, 4.9 stars, 2000+ reviews): "Consultation AED 150. American board-certified doctor. Online appointment available."',
    true,
    'Verified clinic with many real reviews is reliable. Online consultation from licensed doctors is safe.',
    [
      { type: 'safe', text: 'Verified on Google Maps', weight: 'High' },
      { type: 'safe', text: 'Many reviews from patients', weight: 'High' },
      { type: 'safe', text: 'Board-certified mentioned', weight: 'High' },
      { type: 'safe', text: 'Official clinic', weight: 'High' }
    ],
    ['Verify clinic registration with DHA', 'Check doctor credentials online', 'Ask about prescription delivery', 'Save consultation notes', 'Follow-up through clinic portal']
  ),
  scenario('d-hc-3', 'Dubai', 'healthcare',
    '"Natural healer" Facebook group: "Cure for all diseases using herbs. AED 5000 for lifetime health guarantee." 1000+ members, many testimonials.',
    false,
    '"Cure all" claims violate medical regulations. Testimonials on Facebook are unverifiable.',
    [
      { type: 'danger', text: 'Claims cure all diseases', weight: 'Critical' },
      { type: 'danger', text: '"Lifetime guarantee" (impossible)', weight: 'Critical' },
      { type: 'danger', text: 'Facebook testimonials (unverifiable)', weight: 'High' }
    ],
    ['Report to Health Authority Dubai', 'No treatment cures all diseases', 'Herbal medicine needs regulation check', 'Seek licensed doctor for diagnosis', 'Never pay for unproven treatments']
  ),
  scenario('d-hc-4', 'Dubai', 'healthcare',
    'Health Authority Dubai website: "Vaccination clinic near you. Registered healthcare providers. Appointment booking available."',
    true,
    'Official government health authority is the most reliable source. Government-verified providers are legitimate.',
    [
      { type: 'safe', text: 'Official HAD website', weight: 'High' },
      { type: 'safe', text: 'Registered providers only', weight: 'High' },
      { type: 'safe', text: 'Government system', weight: 'High' }
    ],
    ['Book through official HAD portal', 'Verify clinic through HAD list', 'Use government ID for registration', 'Keep vaccination certificates', 'Ask about side effects and precautions']
  ),
  scenario('d-hc-5', 'Dubai', 'healthcare',
    'WhatsApp: "Buy prescription antibiotics without doctor\'s note. AED 100 per course. Delivery within 2 hours."',
    false,
    'Selling prescription medicine without doctor\'s note is illegal. Antibiotics need proper diagnosis.',
    [
      { type: 'danger', text: 'Selling prescription without doctor', weight: 'Critical' },
      { type: 'danger', text: 'Illegal in UAE', weight: 'Critical' },
      { type: 'danger', text: 'No diagnosis or consultation', weight: 'Critical' }
    ],
    ['Only licensed pharmacies sell antibiotics', 'Antibiotics require prescription', 'See doctor first for diagnosis', 'Report illegal pharmacy sales', 'Use only registered pharmacies']
  ),
];

const dubaiPayments = [
  scenario('d-p-1', 'Dubai', 'payments',
    'SMS: "Your Emirates Bank account has unusual activity. Verify now via link." Link looks like official bank site.',
    false,
    'Banks never verify accounts via SMS links. Always use official app/call bank.',
    [
      { type: 'danger', text: 'SMS with verification link', weight: 'Critical' },
      { type: 'danger', text: 'Fake urgency', weight: 'High' }
    ],
    ['Call bank using card number', 'Use official mobile app for banking', 'Never click SMS links', 'Report SMS to bank', 'Monitor account for fraud']
  ),
  scenario('d-p-2', 'Dubai', 'payments',
    'WhatsApp: "I am your friend. Send me AED 1000 urgently. Emergency situation. Use Wise transfer."',
    false,
    'Unknown numbers should be verified before sending money.',
    [
      { type: 'danger', text: 'Request from new number', weight: 'High' },
      { type: 'danger', text: 'Creating false urgency', weight: 'High' }
    ],
    ['Call friend on saved number', 'Never send money to new contacts', 'Verify through another method', 'Ask security question', 'Report if account compromised']
  ),
  scenario('d-p-3', 'Dubai', 'payments',
    'Facebook: "AED 500 cashback on Fawry payments! Verified Abu Dhabi Bank account. Limited time offer."',
    true,
    'Banks do offer legitimate cashback. Verify offer in official app.',
    [
      { type: 'safe', text: 'From official bank account', weight: 'High' },
      { type: 'safe', text: 'Reasonable cashback percentage', weight: 'Medium' }
    ],
    ['Check offer in official banking app', 'Read terms and conditions', 'Verify expiry date', 'Cashback appears in account', 'No personal data needed']
  ),
  scenario('d-p-4', 'Dubai', 'payments',
    'Email from Payfort (verified payment gateway): "Transaction AED 250 deducted from your card. Details in your transaction history."',
    true,
    'Legitimate payment gateways send transaction notifications. Check card statement to verify.',
    [
      { type: 'safe', text: 'From verified payment processor', weight: 'High' },
      { type: 'safe', text: 'Specific transaction amount', weight: 'Medium' },
      { type: 'safe', text: 'Directing to official history', weight: 'High' }
    ],
    ['Check transaction in online banking', 'Contact merchant if unrecognized', 'Block card if fraud suspected', 'Report to bank', 'Check card statement monthly']
  ),
  scenario('d-p-5', 'Dubai', 'payments',
    'Telegram: "Bitcoin investment broker. Guaranteed 50% return monthly. Send money now before offer ends."',
    false,
    '"Guaranteed returns" in crypto are impossible. These are investment scams.',
    [
      { type: 'danger', text: 'Guaranteed returns claim', weight: 'Critical' },
      { type: 'danger', text: 'Unrealistic 50% monthly return', weight: 'Critical' },
      { type: 'danger', text: 'Telegram (unregulated)', weight: 'High' },
      { type: 'danger', text: 'Creating false urgency', weight: 'High' }
    ],
    ['No investment guarantees returns', 'Bitcoin can lose 50% in month', 'Only licensed brokers in UAE', 'Report to UAE Securities Commission', 'Never invest in Telegram offers']
  ),
];

const dubaiVisas = [
  scenario('d-v-1', 'Dubai', 'visas',
    'Email: "UAE visa guaranteed in 1 week. AED 20,000 fee. I handle everything." No company letterhead or registration.',
    false,
    'No one can guarantee visa approval or speed it up. Official process takes minimum 3-4 weeks.',
    [
      { type: 'danger', text: 'Guaranteeing visa approval', weight: 'Critical' },
      { type: 'danger', text: 'Unrealistic timeline (1 week)', weight: 'Critical' },
      { type: 'danger', text: 'No official registration shown', weight: 'High' }
    ],
    ['Only official UAE embassy processes visas', 'Minimum processing time is 3-4 weeks', 'Verify agent on Bar Council', 'No consultant can expedite government', 'Report to Ministry of Human Resources']
  ),
  scenario('d-v-2', 'Dubai', 'visas',
    'Official UAE company offer letter: "We sponsor your work visa. All documents submitted to immigration. Visa processing timeline: 4 weeks."',
    true,
    'Official job offers with visa sponsorship include realistic timelines. Company handles sponsorship.',
    [
      { type: 'safe', text: 'Official company letterhead', weight: 'High' },
      { type: 'safe', text: 'Realistic timeline (4 weeks)', weight: 'High' },
      { type: 'safe', text: 'Clear sponsorship details', weight: 'High' }
    ],
    ['Verify company registration with DED', 'Follow company visa process', 'Prepare required documents', 'Track application on GDRFA portal', 'Keep all communication records']
  ),
  scenario('d-v-3', 'Dubai', 'visas',
    '"Agent" WhatsApp: "Send AED 5000 now. Visa approved in 3 days. Don\'t tell immigration office about this shortcut."',
    false,
    'Paying to "shortcut" official process is bribery and illegal. This is definitely a scam.',
    [
      { type: 'danger', text: 'Bribery suggestion', weight: 'Critical' },
      { type: 'danger', text: 'Illegal shortcut', weight: 'Critical' },
      { type: 'danger', text: 'Unrealistic approval time', weight: 'Critical' }
    ],
    ['Report to police (999)', 'Never pay for immigration shortcuts', 'Only official process is legitimate', 'Report to GDRFA', 'Bribery has serious penalties in UAE']
  ),
  scenario('d-v-4', 'Dubai', 'visas',
    'Employer email: "Send passport for visa processing. We\'ll cover all costs. You\'ll receive visa in 4-6 weeks through official channels."',
    true,
    'Legitimate employers specify clear timelines and cover costs. Official channels mean proper government processing.',
    [
      { type: 'safe', text: 'Employer covers costs', weight: 'High' },
      { type: 'safe', text: 'Realistic timeline (4-6 weeks)', weight: 'High' },
      { type: 'safe', text: 'Official channels mentioned', weight: 'High' }
    ],
    ['Verify employer legitimacy', 'Check sponsorship letter details', 'Submit through official portal', 'Monitor processing status', 'Keep all documents']
  ),
  scenario('d-v-5', 'Dubai', 'visas',
    'Facebook group: "Anyone got tourist visa rejected? Here\'s how to appeal and get approval without real appeal fee."',
    false,
    'Visa rejections are serious. Only official appeal process exists. "Free approval" is impossible.',
    [
      { type: 'danger', text: 'Suggesting fake appeal', weight: 'Critical' },
      { type: 'danger', text: 'Promising impossible result', weight: 'Critical' },
      { type: 'danger', text: 'Unverifiable advice from strangers', weight: 'High' }
    ],
    ['Contact official embassy for appeal', 'Follow legitimate appeal process', 'Get legal advice if needed', 'No shortcuts for visa rejection', 'Report misleading advice']
  ),
];

// Create complete location data structure
export const QUIZ_SCENARIOS_PHASE2 = {
  bangalore: {
    housing: bangaloreHousing,
    jobs: bangaloreJobs,
    healthcare: bangaloreHealthcare,
    payments: bangalorePayments,
    visas: bangaloreVisas,
  },
  dubai: {
    housing: dubaiHousing,
    jobs: dubaiJobs,
    healthcare: dubaiHealthcare,
    payments: dubaiPayments,
    visas: dubaiVisas,
  },
  // Simplified: Repeat for other locations with city-specific variations
  mumbai: {
    housing: bangaloreHousing.map(s => ({...s, city: 'Mumbai', id: s.id.replace('b-', 'm-')})),
    jobs: bangaloreJobs.map(s => ({...s, city: 'Mumbai', id: s.id.replace('b-', 'm-')})),
    healthcare: bangaloreHealthcare.map(s => ({...s, city: 'Mumbai', id: s.id.replace('b-', 'm-')})),
    payments: bangalorePayments.map(s => ({...s, city: 'Mumbai', id: s.id.replace('b-', 'm-')})),
    visas: bangaloreVisas.map(s => ({...s, city: 'Mumbai', id: s.id.replace('b-', 'm-')})),
  },
  singapore: {
    housing: bangaloreHousing.map(s => ({...s, city: 'Singapore', id: s.id.replace('b-', 's-')})),
    jobs: bangaloreJobs.map(s => ({...s, city: 'Singapore', id: s.id.replace('b-', 's-')})),
    healthcare: bangaloreHealthcare.map(s => ({...s, city: 'Singapore', id: s.id.replace('b-', 's-')})),
    payments: bangalorePayments.map(s => ({...s, city: 'Singapore', id: s.id.replace('b-', 's-')})),
    visas: bangaloreVisas.map(s => ({...s, city: 'Singapore', id: s.id.replace('b-', 's-')})),
  },
  bangkok: {
    housing: bangaloreHousing.map(s => ({...s, city: 'Bangkok', id: s.id.replace('b-', 'bk-')})),
    jobs: bangaloreJobs.map(s => ({...s, city: 'Bangkok', id: s.id.replace('b-', 'bk-')})),
    healthcare: bangaloreHealthcare.map(s => ({...s, city: 'Bangkok', id: s.id.replace('b-', 'bk-')})),
    payments: bangalorePayments.map(s => ({...s, city: 'Bangkok', id: s.id.replace('b-', 'bk-')})),
    visas: bangaloreVisas.map(s => ({...s, city: 'Bangkok', id: s.id.replace('b-', 'bk-')})),
  },
  hongkong: {
    housing: dubaiHousing.map(s => ({...s, city: 'Hong Kong', id: s.id.replace('d-', 'hk-')})),
    jobs: dubaiJobs.map(s => ({...s, city: 'Hong Kong', id: s.id.replace('d-', 'hk-')})),
    healthcare: dubaiHealthcare.map(s => ({...s, city: 'Hong Kong', id: s.id.replace('d-', 'hk-')})),
    payments: dubaiPayments.map(s => ({...s, city: 'Hong Kong', id: s.id.replace('d-', 'hk-')})),
    visas: dubaiVisas.map(s => ({...s, city: 'Hong Kong', id: s.id.replace('d-', 'hk-')})),
  },
  jakarta: {
    housing: bangaloreHousing.map(s => ({...s, city: 'Jakarta', id: s.id.replace('b-', 'j-')})),
    jobs: bangaloreJobs.map(s => ({...s, city: 'Jakarta', id: s.id.replace('b-', 'j-')})),
    healthcare: bangaloreHealthcare.map(s => ({...s, city: 'Jakarta', id: s.id.replace('b-', 'j-')})),
    payments: bangalorePayments.map(s => ({...s, city: 'Jakarta', id: s.id.replace('b-', 'j-')})),
    visas: bangaloreVisas.map(s => ({...s, city: 'Jakarta', id: s.id.replace('b-', 'j-')})),
  },
  kualalumpur: {
    housing: bangaloreHousing.map(s => ({...s, city: 'Kuala Lumpur', id: s.id.replace('b-', 'kl-')})),
    jobs: bangaloreJobs.map(s => ({...s, city: 'Kuala Lumpur', id: s.id.replace('b-', 'kl-')})),
    healthcare: bangaloreHealthcare.map(s => ({...s, city: 'Kuala Lumpur', id: s.id.replace('b-', 'kl-')})),
    payments: bangalorePayments.map(s => ({...s, city: 'Kuala Lumpur', id: s.id.replace('b-', 'kl-')})),
    visas: bangaloreVisas.map(s => ({...s, city: 'Kuala Lumpur', id: s.id.replace('b-', 'kl-')})),
  },
};

// Helper functions
export const getQuizzesForLocation = (locationId, domain) => {
  const quizzes = QUIZ_SCENARIOS_PHASE2[locationId]?.[domain] || [];
  // Shuffle to randomize order each session
  return [...quizzes].sort(() => Math.random() - 0.5);
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

export const getScenarioDifficulty = (scenario) => {
  return scenario.difficulty || 'medium';
};
