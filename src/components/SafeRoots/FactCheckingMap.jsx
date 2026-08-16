import { useEffect, useRef, useState } from 'react';
import { AlertTriangle, CheckCircle2, MapPin, Filter, Info, Upload, X } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Default icon fix for leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom icons
const scamIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const safeIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const LOCATIONS = [
  // Bangalore
  {
    id: 1,
    lat: 13.0827,
    lng: 80.27,
    city: 'Bangalore',
    title: 'Fake Rental Scam Alert',
    type: 'scam',
    description: 'QR code scams at bus stops directing to fake rental sites',
    reports: 47,
    severity: 'high',
    address: 'Whitefield Bus Stop, Bangalore',
  },
  {
    id: 2,
    lat: 13.1939,
    lng: 77.6245,
    city: 'Bangalore',
    title: 'Verified Housing Group',
    type: 'safe',
    description: 'Facebook group "Bangalore Rentals - Verified Owners" with 50K members',
    reviews: 2840,
    rating: 4.8,
    address: 'Facebook Community - Bangalore',
  },
  {
    id: 3,
    lat: 13.0499,
    lng: 80.2624,
    city: 'Bangalore',
    title: 'Trusted Bank Branch',
    type: 'safe',
    description: 'HDFC Bank branch with verified staff and secure account opening',
    reviews: 156,
    rating: 4.9,
    address: 'MG Road, Bangalore',
  },
  {
    id: 4,
    lat: 13.3435,
    lng: 77.7597,
    city: 'Bangalore',
    title: 'Job Scam Operation',
    type: 'scam',
    description: 'Fake tech recruitment scams on LinkedIn claiming ₹60K/month jobs',
    reports: 89,
    severity: 'critical',
    address: 'Online - LinkedIn',
  },

  // Dubai
  {
    id: 5,
    lat: 25.2048,
    lng: 55.2708,
    city: 'Dubai',
    title: 'Fake Visa Agency',
    type: 'scam',
    description: 'Fraudulent visa service operating near Gold Souk',
    reports: 34,
    severity: 'high',
    address: 'Gold Souk Area, Dubai',
  },
  {
    id: 6,
    lat: 25.1972,
    lng: 55.2744,
    city: 'Dubai',
    title: 'Expat Support Group',
    type: 'safe',
    description: 'WhatsApp group "Dubai Expats - Community Support" verified members',
    reviews: 3210,
    rating: 4.9,
    address: 'WhatsApp Community - Dubai',
  },
  {
    id: 7,
    lat: 25.2854,
    lng: 55.3621,
    city: 'Dubai',
    title: 'Government Service Center',
    type: 'safe',
    description: 'Official UAE government services center for residency and visas',
    reviews: 2100,
    rating: 4.7,
    address: 'Dubai Silicon Oasis, UAE',
  },

  // Hong Kong
  {
    id: 8,
    lat: 22.3193,
    lng: 114.1694,
    city: 'Hong Kong',
    title: 'Currency Exchange Scam',
    type: 'scam',
    description: 'Underground exchange rate manipulation near Central',
    reports: 56,
    severity: 'high',
    address: 'Central District, Hong Kong',
  },
  {
    id: 9,
    lat: 22.2855,
    lng: 114.1577,
    city: 'Hong Kong',
    title: 'Verified Bank Branch',
    type: 'safe',
    description: 'HSBC Hong Kong - Official banking with full verification',
    reviews: 5200,
    rating: 4.8,
    address: 'Hong Kong Central, Hong Kong',
  },

  // Singapore
  {
    id: 10,
    lat: 1.3521,
    lng: 103.8198,
    city: 'Singapore',
    title: 'Trusted Healthcare Clinic',
    type: 'safe',
    description: 'Clinic recommended by 400+ expats in community groups',
    reviews: 1200,
    rating: 4.9,
    address: 'CBD, Singapore',
  },

  // Bangkok
  {
    id: 11,
    lat: 13.7563,
    lng: 100.5018,
    city: 'Bangkok',
    title: 'Tourist Taxi Scam Hotspot',
    type: 'scam',
    description: 'Unlicensed taxis overcharging tourists near Siam Square',
    reports: 120,
    severity: 'high',
    address: 'Siam Square, Bangkok',
  },
  {
    id: 12,
    lat: 13.7331,
    lng: 100.5597,
    city: 'Bangkok',
    title: 'Official Tourist Info',
    type: 'safe',
    description: 'Thailand Tourism Board official information center',
    reviews: 890,
    rating: 4.7,
    address: 'Sukhumvit, Bangkok',
  },
];

const CONTRIBUTION_TYPES = [
  { id: 'trusted', label: 'Trusted Resource', emoji: '🟢', color: 'emerald' },
  { id: 'insight', label: 'Local Insight', emoji: '🟡', color: 'yellow' },
  { id: 'scam', label: 'Scam / Warning', emoji: '🔴', color: 'red' },
  { id: 'info', label: 'Useful Information', emoji: '🔵', color: 'blue' },
];

const DOMAINS = [
  'Housing & Rentals',
  'Jobs & Employment',
  'Payments & QR Codes',
  'Government Services',
  'Transportation',
  'Local News & Media',
  'Community Resources',
  'Safety Alerts',
  'Other',
];

const CITIES = [
  'Bangalore, India',
  'Mumbai, India',
  'Delhi, India',
  'Hyderabad, India',
  'Dubai, UAE',
  'Singapore',
  'London, UK',
  'Hong Kong',
  'Bangkok, Thailand',
];

export default function FactCheckingMap() {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const [filterType, setFilterType] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [stats, setStats] = useState({ scams: 0, safe: 0 });
  const [contributions, setContributions] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    type: 'trusted',
    location: '',
    domain: '',
    information: '',
    source: '',
    media: null,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Initialize map
    if (mapInstance.current) return;

    mapInstance.current = L.map(mapRef.current).setView([20, 78], 4);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(mapInstance.current);

    // Add markers
    LOCATIONS.forEach((loc) => {
      const icon = loc.type === 'scam' ? scamIcon : safeIcon;
      const marker = L.marker([loc.lat, loc.lng], { icon }).addTo(mapInstance.current);

      marker.on('click', () => setSelectedLocation(loc));
    });

    // Calculate stats
    setStats({
      scams: LOCATIONS.filter((l) => l.type === 'scam').length,
      safe: LOCATIONS.filter((l) => l.type === 'safe').length,
    });
  }, []);

  const filteredLocations = filterType === 'all' ? LOCATIONS : LOCATIONS.filter((l) => l.type === filterType);
  const allLocations = [...LOCATIONS, ...contributions];

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        media: {
          name: file.name,
          type: file.type,
        },
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.domain) newErrors.domain = 'Domain is required';
    if (!formData.information.trim()) newErrors.information = 'Please share your information';
    if (!formData.source.trim()) newErrors.source = 'Source/evidence is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Add contribution to local list
    const newContribution = {
      id: LOCATIONS.length + contributions.length + 1,
      lat: 0,
      lng: 0,
      city: formData.location,
      title: formData.information.substring(0, 50) + (formData.information.length > 50 ? '...' : ''),
      type: formData.type === 'scam' ? 'scam' : 'safe',
      description: formData.information,
      source: formData.source,
      status: 'pending',
      media: formData.media,
      timestamp: new Date().toLocaleString(),
      domain: formData.domain,
    };

    setContributions((prev) => [newContribution, ...prev]);
    setShowSuccess(true);

    // Reset form
    setFormData({
      type: 'trusted',
      location: '',
      domain: '',
      information: '',
      source: '',
      media: null,
    });

    // Hide success message after 3 seconds
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const getContributionTypeColor = (type) => {
    const typeObj = CONTRIBUTION_TYPES.find((t) => t.id === type);
    return typeObj?.color || 'blue';
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-xl p-4 border border-blue-500/20">
          <div className="text-sm text-slate-400">Total Locations</div>
          <div className="text-3xl font-bold text-blue-400">{allLocations.length}</div>
        </div>
        <div className="bg-gradient-to-br from-red-500/10 to-red-600/10 rounded-xl p-4 border border-red-500/30">
          <div className="text-sm text-red-300">Scam Reports</div>
          <div className="text-3xl font-bold text-red-400">{stats.scams + contributions.filter((c) => c.type === 'scam').length}</div>
        </div>
        <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 rounded-xl p-4 border border-emerald-500/30">
          <div className="text-sm text-emerald-300">Trusted Resources</div>
          <div className="text-3xl font-bold text-emerald-400">{stats.safe + contributions.filter((c) => c.type === 'safe').length}</div>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative space-y-4">
        {/* Filter Bar */}
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setFilterType('all')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              filterType === 'all'
                ? 'bg-blue-500 text-white'
                : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
            }`}
          >
            <MapPin className="w-4 h-4" />
            All Locations
          </button>
          <button
            onClick={() => setFilterType('scam')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              filterType === 'scam'
                ? 'bg-red-500 text-white'
                : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            Scam Alerts
          </button>
          <button
            onClick={() => setFilterType('safe')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              filterType === 'safe'
                ? 'bg-emerald-500 text-white'
                : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            Trusted
          </button>
        </div>

        {/* Map */}
        <div
          ref={mapRef}
          className="w-full h-96 rounded-xl border border-blue-500/30 overflow-hidden"
          style={{ minHeight: '500px' }}
        />
      </div>

      {/* All Locations & Contribution Form */}
      <div className="grid md:grid-cols-5 gap-6">
        {/* Left: Locations List (60%) - col-span-3 */}
        <div className="md:col-span-3 space-y-3">
          <h3 className="font-bold text-white text-lg">
            {filterType === 'all' ? 'All Locations' : filterType === 'scam' ? 'Scam Alerts' : 'Trusted Resources'}{' '}
            ({filteredLocations.length})
          </h3>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredLocations.map((loc) => (
              <button
                key={loc.id}
                onClick={() => setSelectedLocation(loc)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                  selectedLocation?.id === loc.id
                    ? 'bg-blue-500/20 border-blue-500'
                    : loc.type === 'scam'
                      ? 'bg-red-500/10 border-red-500/30 hover:border-red-500/50'
                      : 'bg-emerald-500/10 border-emerald-500/30 hover:border-emerald-500/50'
                }`}
              >
                <div className="flex items-start gap-3">
                  {loc.type === 'scam' ? (
                    <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  ) : (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <h4 className="font-semibold text-white">{loc.title}</h4>
                    <p className="text-sm text-slate-400 mb-2">{loc.description}</p>
                    <div className="flex gap-4 text-xs text-slate-500">
                      {loc.type === 'scam' ? (
                        <>
                          <span>{loc.reports || 1} reports</span>
                          <span className="text-red-400 font-medium">{loc.severity || 'warning'}</span>
                        </>
                      ) : (
                        <>
                          <span>⭐ {loc.rating || 4.5} rating</span>
                          <span>{(loc.reviews || 100).toLocaleString()} reviews</span>
                        </>
                      )}
                    </div>
                    {loc.status === 'pending' && (
                      <div className="mt-2 text-xs bg-yellow-500/20 border border-yellow-500/30 text-yellow-300 px-2 py-1 rounded inline-block">
                        ⏳ Pending Verification
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Contribution Form (40%) - col-span-2 */}
        <div className="md:col-span-2">
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-xl p-6 border border-cyan-500/30 sticky top-20 h-fit">
            <h3 className="text-lg font-bold text-white mb-2">📍 Share Local Information</h3>
            <p className="text-sm text-slate-400 mb-6">Help newcomers make informed decisions in your city.</p>

            {showSuccess && (
              <div className="mb-4 p-4 bg-emerald-500/20 border border-emerald-500/30 rounded-lg">
                <h4 className="font-bold text-emerald-300 mb-1">✓ Contribution Received</h4>
                <p className="text-sm text-emerald-200">Thank you for helping newcomers navigate their local information environment.</p>
                <p className="text-xs text-emerald-300 mt-2">Your contribution will be reviewed before appearing on the community map.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Contribution Type */}
              <div>
                <label className="text-xs font-semibold text-slate-300 mb-2 block">What are you sharing?</label>
                <div className="grid grid-cols-2 gap-2">
                  {CONTRIBUTION_TYPES.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          type: type.id,
                        }))
                      }
                      className={`p-2 rounded-lg text-xs font-medium transition-all border ${
                        formData.type === type.id
                          ? `bg-${type.color}-500/20 border-${type.color}-500/50 text-${type.color}-300`
                          : 'bg-slate-700/50 border-slate-600/50 text-slate-400 hover:bg-slate-700'
                      }`}
                    >
                      {type.emoji} {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div>
                <label htmlFor="location" className="text-xs font-semibold text-slate-300 mb-1 block">
                  Location *
                </label>
                <select
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleFormChange}
                  className={`w-full px-3 py-2 bg-slate-700/50 border rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 text-sm ${
                    errors.location ? 'border-red-500/50' : 'border-slate-600/50'
                  }`}
                >
                  <option value="">Select a location</option>
                  {CITIES.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
                {errors.location && <p className="text-xs text-red-400 mt-1">{errors.location}</p>}
              </div>

              {/* Domain / Issue */}
              <div>
                <label htmlFor="domain" className="text-xs font-semibold text-slate-300 mb-1 block">
                  Domain / Issue *
                </label>
                <select
                  id="domain"
                  name="domain"
                  value={formData.domain}
                  onChange={handleFormChange}
                  className={`w-full px-3 py-2 bg-slate-700/50 border rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 text-sm ${
                    errors.domain ? 'border-red-500/50' : 'border-slate-600/50'
                  }`}
                >
                  <option value="">Select an issue</option>
                  {DOMAINS.map((domain) => (
                    <option key={domain} value={domain}>
                      {domain}
                    </option>
                  ))}
                </select>
                {errors.domain && <p className="text-xs text-red-400 mt-1">{errors.domain}</p>}
              </div>

              {/* Information */}
              <div>
                <label htmlFor="information" className="text-xs font-semibold text-slate-300 mb-1 block">
                  What would you like to share? *
                </label>
                <textarea
                  id="information"
                  name="information"
                  value={formData.information}
                  onChange={handleFormChange}
                  placeholder="Share a fact, local insight, warning, trusted resource, or useful information for newcomers..."
                  className={`w-full px-3 py-2 bg-slate-700/50 border rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 text-sm resize-none h-24 ${
                    errors.information ? 'border-red-500/50' : 'border-slate-600/50'
                  }`}
                />
                <p className="text-xs text-slate-500 mt-1">Keep your contribution factual and specific. Avoid sharing personal or sensitive information.</p>
                {errors.information && <p className="text-xs text-red-400 mt-1">{errors.information}</p>}
              </div>

              {/* Source / Evidence */}
              <div>
                <label htmlFor="source" className="text-xs font-semibold text-slate-300 mb-1 block">
                  Source / Evidence *
                </label>
                <input
                  id="source"
                  type="text"
                  name="source"
                  value={formData.source}
                  onChange={handleFormChange}
                  placeholder="Paste a website, official source, article, or other reference..."
                  className={`w-full px-3 py-2 bg-slate-700/50 border rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 text-sm ${
                    errors.source ? 'border-red-500/50' : 'border-slate-600/50'
                  }`}
                />
                <p className="text-xs text-slate-500 mt-1">Providing a source helps the community evaluate the information.</p>
                {errors.source && <p className="text-xs text-red-400 mt-1">{errors.source}</p>}
              </div>

              {/* Media Upload */}
              <div>
                <label className="text-xs font-semibold text-slate-300 mb-2 block">Supporting Media (Optional)</label>
                <label className="block p-4 border-2 border-dashed border-slate-600/50 rounded-lg hover:border-cyan-500/50 cursor-pointer transition-all bg-slate-700/30 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="w-5 h-5 text-slate-400" />
                    <span className="text-xs text-slate-400">Add supporting media</span>
                    <span className="text-xs text-slate-500">Image or video (optional)</span>
                    {formData.media && <span className="text-xs text-cyan-300">✓ {formData.media.name}</span>}
                  </div>
                  <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Trust Message */}
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                <p className="text-xs text-blue-200">
                  <strong>Community trust starts with evidence.</strong> Contributions are reviewed and corroborated before being treated as verified information.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold rounded-lg transition-all text-sm"
              >
                Share with Community
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 flex gap-3">
        <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-blue-200">
          Community members report scams and trusted resources to help newcomers stay safe. Always verify information
          with official sources before making decisions.
        </div>
      </div>
    </div>
  );
}
