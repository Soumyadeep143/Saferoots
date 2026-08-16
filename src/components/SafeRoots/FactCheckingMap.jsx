import { useEffect, useRef, useState } from 'react';
import { AlertTriangle, CheckCircle2, MapPin, Filter, Info } from 'lucide-react';
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

export default function FactCheckingMap() {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const [filterType, setFilterType] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [stats, setStats] = useState({ scams: 0, safe: 0 });

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

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-xl p-4 border border-blue-500/20">
          <div className="text-sm text-slate-400">Total Locations</div>
          <div className="text-3xl font-bold text-blue-400">{LOCATIONS.length}</div>
        </div>
        <div className="bg-gradient-to-br from-red-500/10 to-red-600/10 rounded-xl p-4 border border-red-500/30">
          <div className="text-sm text-red-300">Scam Reports</div>
          <div className="text-3xl font-bold text-red-400">{stats.scams}</div>
        </div>
        <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 rounded-xl p-4 border border-emerald-500/30">
          <div className="text-sm text-emerald-300">Trusted Resources</div>
          <div className="text-3xl font-bold text-emerald-400">{stats.safe}</div>
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

      {/* Location Details & List */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Selected Location Details */}
        {selectedLocation && (
          <div className="md:col-span-1 bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-xl p-6 border border-blue-500/30 sticky top-20 h-fit">
            <div className="flex items-start gap-3 mb-4">
              {selectedLocation.type === 'scam' ? (
                <div className="p-2 bg-red-500/20 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                </div>
              ) : (
                <div className="p-2 bg-emerald-500/20 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                </div>
              )}
              <div>
                <h3 className="font-bold text-white">{selectedLocation.title}</h3>
                <p className="text-xs text-slate-400">{selectedLocation.address}</p>
              </div>
            </div>

            <p className="text-slate-300 mb-4">{selectedLocation.description}</p>

            {selectedLocation.type === 'scam' && (
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Reports:</span>
                  <span className="font-bold text-red-400">{selectedLocation.reports}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Severity:</span>
                  <span
                    className={`font-bold ${
                      selectedLocation.severity === 'critical' ? 'text-red-500' : 'text-orange-400'
                    }`}
                  >
                    {selectedLocation.severity.toUpperCase()}
                  </span>
                </div>
              </div>
            )}

            {selectedLocation.type === 'safe' && (
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Rating:</span>
                  <span className="font-bold text-emerald-400">⭐ {selectedLocation.rating}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Reviews:</span>
                  <span className="font-bold text-emerald-400">{selectedLocation.reviews.toLocaleString()}</span>
                </div>
              </div>
            )}

            <button className="w-full px-4 py-2 bg-blue-500/30 hover:bg-blue-500/40 border border-blue-500/50 rounded-lg text-blue-300 font-medium transition-all text-sm">
              Share Location
            </button>
          </div>
        )}

        {/* Locations List */}
        <div className="md:col-span-2 space-y-3">
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
                          <span>{loc.reports} reports</span>
                          <span className="text-red-400 font-medium">{loc.severity}</span>
                        </>
                      ) : (
                        <>
                          <span>⭐ {loc.rating} rating</span>
                          <span>{loc.reviews.toLocaleString()} reviews</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))}
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
