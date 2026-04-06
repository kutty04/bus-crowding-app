import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const BUS_DATA = {
  '19': {
    label: 'Bus 19',
    from: 'T. Nagar', to: 'Thirupporur',
    stops: ['T. Nagar', 'Saidapet', 'SRP Tools', 'Thoraipakkam', 'Sholinganallur', 'Kumaran Nagar', 'Semmancheri', 'Navalur', 'Kelambakkam', 'Thirupporur'],
  },
  '19A': {
    label: 'Bus 19A',
    from: 'T. Nagar', to: 'Chemmenchery',
    stops: ['T. Nagar', 'Saidapet', 'SRP Tools', 'Thoraipakkam', 'Sholinganallur', 'Chemmenchery'],
  },
  '19B': {
    label: 'Bus 19B',
    from: 'Saidapet', to: 'Kelambakkam',
    stops: ['Saidapet', 'Madhya Kailash', 'Tidel Park', 'Sholinganallur', 'Navalur', 'Kelambakkam'],
  },
  '19B ET': {
    label: 'Bus 19B ET',
    from: 'T. Nagar', to: 'Thaiyur',
    stops: ['T. Nagar', 'Sholinganallur', 'Navalur', 'Kelambakkam', 'Thaiyur'],
  },
  '5G': {
    label: 'Bus 5G',
    from: 'T. Nagar', to: 'Kannagi Nagar',
    stops: ['T. Nagar', 'Adyar', 'Thiruvanmiyur', 'Sholinganallur', 'Kannagi Nagar'],
  },
  '5S': {
    label: 'Bus 5S',
    from: 'Saidapet', to: 'Kelambakkam',
    stops: ['Saidapet', 'Adyar', 'Thiruvanmiyur', 'Sholinganallur', 'Navalur', 'Kelambakkam'],
  },
  '91': {
    label: 'Bus 91',
    from: 'Thiruvanmiyur', to: 'Tambaram',
    stops: ['Thiruvanmiyur', 'LB Road', 'Perungudi', 'SRP Tools', 'Thoraipakkam', 'Pallavaram', 'Chromepet', 'Tambaram'],
  },
  '95': {
    label: 'Bus 95',
    from: 'Thiruvanmiyur (LB Road)', to: 'Tambaram East',
    stops: ['Thiruvanmiyur', 'LB Road', 'Perungudi', 'Sholinganallur', 'Navalur', 'Medavakkam', 'Tambaram East'],
  },
  '95X': {
    label: 'Bus 95X',
    from: 'Thiruvanmiyur', to: 'Kelambakkam',
    stops: ['Thiruvanmiyur', 'Perungudi', 'Sholinganallur', 'Navalur', 'Siruseri', 'Kelambakkam'],
  },
  '102': {
    label: 'Bus 102',
    from: 'Broadway', to: 'Kelambakkam',
    stops: ['Broadway', 'Adyar', 'SRP Tools', 'Perungudi', 'Sholinganallur', 'Navalur', 'Kelambakkam'],
  },
  '102C': {
    label: 'Bus 102C',
    from: 'Island Ground', to: 'Chemmenchery',
    stops: ['Island Ground', 'Adyar', 'SRP Tools', 'Thoraipakkam', 'Sholinganallur', 'Chemmenchery'],
  },
  '102CT': {
    label: 'Bus 102CT',
    from: 'Island Ground', to: 'Siruseri/SIPCOT',
    stops: ['Island Ground', 'Adyar', 'SRP Tools', 'Sholinganallur', 'Navalur', 'Siruseri', 'SIPCOT'],
  },
  '102K': {
    label: 'Bus 102K',
    from: 'Island Ground', to: 'Kannagi Nagar',
    stops: ['Island Ground', 'Santhome', 'Adyar', 'SRP Tools', 'Thoraipakkam', 'Kannagi Nagar'],
  },
  '102P': {
    label: 'Bus 102P',
    from: 'Island Ground', to: 'Perumbakkam',
    stops: ['Island Ground', 'Adyar', 'SRP Tools', 'Sholinganallur', 'Navalur', 'Perumbakkam'],
  },
  '109': {
    label: 'Bus 109',
    from: 'Island Ground', to: 'Kovalam',
    stops: ['Island Ground', 'Adyar', 'Thiruvanmiyur', 'Injambakkam', 'Kovalam'],
  },
  '119': {
    label: 'Bus 119',
    from: 'Guindy', to: 'Semmancheri',
    stops: ['Guindy', 'Velachery', 'Sholinganallur', 'Navalur', 'Semmancheri'],
  },
  '221': {
    label: 'Bus 221',
    from: 'Central', to: 'Thirupporur',
    stops: ['Central', 'Adyar', 'Thiruvanmiyur', 'Sholinganallur', 'Navalur', 'Kelambakkam', 'Thirupporur'],
  },
  '515': {
    label: 'Bus 515',
    from: 'Tambaram', to: 'Kelambakkam',
    stops: ['Tambaram', 'Vandalur', 'Kandigai', 'Mambakkam', 'Pudupakkam', 'Kelambakkam'],
  },
  '519': {
    label: 'Bus 519',
    from: 'T. Nagar', to: 'Kelambakkam',
    stops: ['T. Nagar', 'Adyar', 'SRP Tools', 'Sholinganallur', 'Navalur', 'Kelambakkam'],
  },
  '523': {
    label: 'Bus 523',
    from: 'Thiruvanmiyur', to: 'Siruseri',
    stops: ['Thiruvanmiyur', 'SRP Tools', 'Thoraipakkam', 'Sholinganallur', 'Navalur', 'Siruseri'],
  },
  '555G': {
    label: 'Bus 555G',
    from: 'Sholinganallur', to: 'Guduvanchery',
    stops: ['Sholinganallur', 'Navalur', 'Siruseri', 'Kelambakkam', 'Guduvanchery'],
  },
  '555P': {
    label: 'Bus 555P',
    from: 'Sholinganallur', to: 'Padappai',
    stops: ['Sholinganallur', 'Navalur', 'Siruseri', 'Kelambakkam', 'Padappai'],
  },
  '555S': {
    label: 'Bus 555S',
    from: 'Sholinganallur', to: 'Kelambakkam',
    stops: ['Sholinganallur', 'Navalur', 'Siruseri', 'Kelambakkam'],
  },
  '570C': {
    label: 'Bus 570C',
    from: 'CMBT', to: 'Kelambakkam',
    stops: ['CMBT', 'Guindy', 'Velachery', 'Sholinganallur', 'Siruseri', 'Kelambakkam'],
  },
  '570P': {
    label: 'Bus 570P',
    from: 'CMBT', to: 'Perumbakkam',
    stops: ['CMBT', 'Guindy', 'Velachery', 'Sholinganallur', 'Navalur', 'Perumbakkam'],
  },
  '570X': {
    label: 'Bus 570X',
    from: 'CMBT', to: 'Thirupporur',
    stops: ['CMBT', 'Guindy', 'Velachery', 'Sholinganallur', 'Navalur', 'Thirupporur'],
  },
  'A1': {
    label: 'Bus A1',
    from: 'Central', to: 'Kannagi Nagar',
    stops: ['Central', 'Adyar', 'Thiruvanmiyur', 'Sholinganallur', 'Kannagi Nagar'],
  },
  'M19B': {
    label: 'Bus M19B',
    from: 'T. Nagar', to: 'Kannagi Nagar',
    stops: ['T. Nagar', 'Adyar', 'Thiruvanmiyur', 'Sholinganallur', 'Kannagi Nagar'],
  },
  'MAA2': {
    label: 'Bus MAA2',
    from: 'Chennai Airport', to: 'Siruseri IT Park',
    stops: ['Chennai Airport', 'Pallavaram', 'Vels University', 'Thoraipakkam', 'Sholinganallur', 'Navalur', 'Siruseri IT Park'],
  },
  'T29C': {
    label: 'Bus T29C',
    from: 'Perambur', to: 'Thiruvanmiyur',
    stops: ['Perambur', 'Central', 'Adyar', 'Thiruvanmiyur'],
  },
  '29A': {
    label: 'Bus 29A',
    from: 'Perambur', to: 'Anna Square',
    stops: ['Perambur', 'Central', 'Anna Square'],
  },
  '29C': {
    label: 'Bus 29C',
    from: 'Perambur', to: 'Thiruvanmiyur',
    stops: ['Perambur', 'Central', 'Adyar', 'Thiruvanmiyur'],
  },
};

const CROWDING_OPTIONS = [
  { value: 20, label: '20%', emoji: '🟢', desc: 'Plenty of seats', color: '#16a34a', bg: '#dcfce7', text: '#15803d' },
  { value: 50, label: '50%', emoji: '🟡', desc: 'Some standing', color: '#ca8a04', bg: '#fef9c3', text: '#a16207' },
  { value: 90, label: '90%', emoji: '🔴', desc: 'Very crowded', color: '#dc2626', bg: '#fee2e2', text: '#b91c1c' },
];

const REFRESH_INTERVAL = 10;

function getCrowdingStyle(pct) {
  if (pct <= 20) return CROWDING_OPTIONS[0];
  if (pct <= 50) return CROWDING_OPTIONS[1];
  return CROWDING_OPTIONS[2];
}

function formatTimestamp(ts) {
  if (!ts) return { timeStr: 'Unknown', ago: '' };
  const utcString = ts.endsWith('Z') ? ts : ts + 'Z';
  const date = new Date(utcString);
  if (isNaN(date.getTime())) return { timeStr: 'Unknown', ago: '' };

  const istOffset = 5.5 * 60 * 60 * 1000;
  const istDate = new Date(date.getTime() + istOffset);
  const hours = istDate.getUTCHours();
  const minutes = istDate.getUTCMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHour = hours % 12 || 12;
  const timeStr = `${displayHour}:${minutes} ${ampm}`;

  const diffSec = Math.floor((Date.now() - date.getTime()) / 1000);
  let ago;
  if (diffSec < 60) ago = 'just now';
  else if (diffSec < 3600) ago = `${Math.floor(diffSec / 60)}m ago`;
  else ago = `${Math.floor(diffSec / 3600)}h ago`;

  return { timeStr, ago };
}

function isStale(reports) {
  if (reports.length === 0) return false;
  const utcString = reports[0].timestamp.endsWith('Z')
    ? reports[0].timestamp
    : reports[0].timestamp + 'Z';
  const diffMs = Date.now() - new Date(utcString).getTime();
  return diffMs > 15 * 60 * 1000 && diffMs < 24 * 60 * 60 * 1000;
}

// Morning = before 12pm IST, Evening = 12pm onwards
function getTimeSlot(ts) {
  if (!ts) return 'morning';
  const utcString = ts.endsWith('Z') ? ts : ts + 'Z';
  const date = new Date(utcString);
  const istHour = (date.getUTCHours() + 5) % 24 + (date.getUTCMinutes() >= 30 ? 0.5 : 0);
  return istHour < 12 ? 'morning' : 'evening';
}

function getCurrentSlot() {
  const now = new Date();
  const istHour = (now.getUTCHours() + 5) % 24 + (now.getUTCMinutes() >= 30 ? 0.5 : 0);
  return istHour < 12 ? 'morning' : 'evening';
}

const ADMIN_PASSWORD = 'maddy123'; // change this to whatever you want

function AdminPage() {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [allReports, setAllReports] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllReports = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/admin/reports`);
      const data = await res.json();
      setAllReports(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error('Admin fetch error:', e);
    }
    setLoading(false);
  };

  if (!authenticated) {
    return (
      <div style={{ fontFamily: "'Segoe UI', sans-serif", background: '#0f172a', minHeight: '100vh', color: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ background: '#1e293b', borderRadius: 16, padding: 32, width: 300 }}>
          <h2 style={{ margin: '0 0 20px', textAlign: 'center' }}>🔐 Admin Login</h2>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && password === ADMIN_PASSWORD) { setAuthenticated(true); fetchAllReports(); } }}
            style={{ width: '100%', padding: '10px 12px', borderRadius: 8, background: '#334155', border: '1px solid #475569', color: '#f1f5f9', fontSize: 14, outline: 'none', boxSizing: 'border-box', marginBottom: 12 }}
          />
          <button
            onClick={() => { if (password === ADMIN_PASSWORD) { setAuthenticated(true); fetchAllReports(); } else alert('Wrong password'); }}
            style={{ width: '100%', padding: '12px', borderRadius: 8, border: 'none', background: '#3b82f6', color: '#fff', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", background: '#0f172a', minHeight: '100vh', color: '#f1f5f9' }}>
      <div style={{ background: 'linear-gradient(135deg, #1e3a5f, #0f172a)', padding: '20px 16px 12px', borderBottom: '1px solid #1e293b' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 28 }}>🛠️</span>
            <div>
              <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>Admin Panel</h1>
              <p style={{ margin: 0, fontSize: 12, color: '#94a3b8' }}>{allReports.length} total reports</p>
            </div>
          </div>
          <button onClick={fetchAllReports} style={{ padding: '8px 16px', borderRadius: 8, border: 'none', background: '#334155', color: '#94a3b8', cursor: 'pointer', fontWeight: 600 }}>
            🔄 Refresh
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: 16 }}>
        {loading ? (
          <p style={{ textAlign: 'center', color: '#64748b' }}>Loading...</p>
        ) : allReports.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#64748b' }}>No reports yet.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: '#1e293b', color: '#94a3b8', textAlign: 'left' }}>
                  {['Time', 'Route', 'Stop', 'Type', 'Crowding', 'AC', 'Reporter', '👍'].map(h => (
                    <th key={h} style={{ padding: '10px 12px', fontWeight: 600 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {allReports.map((r, i) => {
                  const { timeStr, ago } = formatTimestamp(r.timestamp);
                  return (
                    <tr key={i} style={{ background: i % 2 === 0 ? '#0f172a' : '#1e293b', borderBottom: '1px solid #1e293b' }}>
                      <td style={{ padding: '10px 12px', color: '#cbd5e1' }}>
                        <span style={{ fontWeight: 600 }}>{timeStr}</span>
                        <span style={{ display: 'block', fontSize: 11, color: '#475569' }}>{ago}</span>
                      </td>
                      <td style={{ padding: '10px 12px' }}>
                        <span style={{ background: '#3b82f6', color: '#fff', borderRadius: 6, padding: '2px 8px', fontWeight: 700 }}>{r.bus_route}</span>
                      </td>
                      <td style={{ padding: '10px 12px', color: '#94a3b8' }}>{r.boarding_stop || '—'}</td>
                      <td style={{ padding: '10px 12px' }}>
                        {r.just_left
                          ? <span style={{ color: '#818cf8', fontWeight: 600 }}>🚌💨 Just Left</span>
                          : <span style={{ color: '#94a3b8' }}>📊 Crowding</span>}
                      </td>
                      <td style={{ padding: '10px 12px' }}>
                        {r.just_left ? '—' : (
                          <span style={{ color: r.crowding_level >= 90 ? '#ef4444' : r.crowding_level >= 50 ? '#eab308' : '#22c55e', fontWeight: 700 }}>
                            {r.crowding_level}%
                          </span>
                        )}
                      </td>
                      <td style={{ padding: '10px 12px' }}>
                        {r.is_ac ? <span style={{ color: '#38bdf8' }}>❄️ AC</span> : <span style={{ color: '#a8a29e' }}>🌡️ Non-AC</span>}
                      </td>
                      <td style={{ padding: '10px 12px', color: '#cbd5e1', fontWeight: 600 }}>{r.reporter_name || 'Anonymous'}</td>
                      <td style={{ padding: '10px 12px', color: '#64748b' }}>{r.helpful_count || 0}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  // Show admin page if ?admin=true in URL
  const isAdmin = new URLSearchParams(window.location.search).get('admin') === 'true';
  const [busRoute, setBusRoute] = useState('19');
  const [crowdingPct, setCrowdingPct] = useState(null);
  const [boardingStop, setBoardingStop] = useState('');
  const [reporterName, setReporterName] = useState(() => localStorage.getItem('reporterName') || '');
  const [reports, setReports] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState('view');
  const [countdown, setCountdown] = useState(REFRESH_INTERVAL);
  const [helpedIds, setHelpedIds] = useState(() => {
    try { return JSON.parse(localStorage.getItem('helpedIds') || '[]'); } catch { return []; }
  });
  const [timeFilter, setTimeFilter] = useState(getCurrentSlot()); // 'morning' | 'evening'
  const [isAC, setIsAC] = useState(false);

  if (isAdmin) return <AdminPage />;

  const stops = BUS_DATA[busRoute]?.stops || [];

  const fetchReports = async () => {
    try {
      const res = await fetch(`${API_URL}/api/reports/${busRoute}`);
      const data = await res.json();
      setReports(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error('Fetch error:', e);
    }
  };

  useEffect(() => {
    fetchReports();
    setBoardingStop('');
    setCrowdingPct(null);
    setCountdown(REFRESH_INTERVAL);

    const fetchInterval = setInterval(() => {
      fetchReports();
      setCountdown(REFRESH_INTERVAL);
    }, REFRESH_INTERVAL * 1000);

    const countdownInterval = setInterval(() => {
      setCountdown(prev => (prev > 1 ? prev - 1 : REFRESH_INTERVAL));
    }, 1000);

    return () => {
      clearInterval(fetchInterval);
      clearInterval(countdownInterval);
    };
  }, [busRoute]);

  const handleSubmit = async (isJustLeft = false) => {
    if (!isJustLeft && !crowdingPct) return alert('Select how crowded the bus is');
    if (!boardingStop) return alert('Select your stop first');

    // Save name to localStorage so they don't have to type it every time
    if (reporterName.trim()) {
      localStorage.setItem('reporterName', reporterName.trim());
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/reports`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          busRoute,
          crowdingLevel: isJustLeft ? 0 : crowdingPct,
          boardingStop,
          justLeft: isJustLeft,
          reporterName: reporterName.trim() || 'Anonymous',
          isAC,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
        setCrowdingPct(null);
        setBoardingStop('');
        setTimeout(() => setSubmitted(false), 3000);
        fetchReports();
        setTab('view');
      }
    } catch (e) {
      alert('Could not submit. Is the backend running?');
    }
    setLoading(false);
  };

  const handleHelpful = async (reportId) => {
    if (helpedIds.includes(reportId)) return; // already voted
    try {
      const res = await fetch(`${API_URL}/api/reports/${reportId}/helpful`, { method: 'POST' });
      if (res.ok) {
        const newHelpedIds = [...helpedIds, reportId];
        setHelpedIds(newHelpedIds);
        localStorage.setItem('helpedIds', JSON.stringify(newHelpedIds));
        // Update count locally so UI updates instantly
        setReports(prev => prev.map(r =>
          r.id === reportId ? { ...r, helpful_count: (r.helpful_count || 0) + 1 } : r
        ));
      }
    } catch (e) {
      console.error('Error marking helpful:', e);
    }
  };

  // Filter reports by morning/evening
  const filteredReports = reports.filter(r => getTimeSlot(r.timestamp) === timeFilter);
  const stale = isStale(filteredReports.length > 0 ? filteredReports : reports);
  const busKeys = Object.keys(BUS_DATA);

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", background: '#0f172a', minHeight: '100vh', color: '#f1f5f9' }}>

      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #1e3a5f, #0f172a)', padding: '20px 16px 12px', borderBottom: '1px solid #1e293b' }}>
        <div style={{ maxWidth: 480, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 28 }}>🚌</span>
          <div>
            <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#f8fafc' }}>Chennai Bus Crowding</h1>
            <p style={{ margin: 0, fontSize: 12, color: '#94a3b8' }}>Live reports from fellow commuters</p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 480, margin: '0 auto', padding: '16px' }}>

        {/* Route Selector */}
        <div style={{ background: '#1e293b', borderRadius: 12, padding: 16, marginBottom: 16 }}>
          <p style={{ margin: '0 0 10px', fontSize: 12, color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>Select Route</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {Object.entries(BUS_DATA).map(([key]) => (
              <button key={key} onClick={() => setBusRoute(key)} style={{
                padding: '8px 14px', borderRadius: 8, border: 'none', cursor: 'pointer',
                fontWeight: 600, fontSize: 13,
                background: busRoute === key ? '#3b82f6' : '#334155',
                color: busRoute === key ? '#fff' : '#cbd5e1',
                transition: 'all 0.15s',
              }}>
                {key}
              </button>
            ))}
          </div>
          {BUS_DATA[busRoute]?.from && (
            <p style={{ margin: '10px 0 2px', fontSize: 13, color: '#cbd5e1', fontWeight: 600 }}>
              {BUS_DATA[busRoute].from} → {BUS_DATA[busRoute].to}
            </p>
          )}
          <p style={{ margin: '0', fontSize: 12, color: '#64748b', lineHeight: 1.6 }}>
            {BUS_DATA[busRoute]?.stops.join(' → ')}
          </p>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', background: '#1e293b', borderRadius: 10, padding: 4, marginBottom: 16, gap: 4 }}>
          {['view', 'report'].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              flex: 1, padding: '10px', borderRadius: 8, border: 'none', cursor: 'pointer',
              fontWeight: 600, fontSize: 14,
              background: tab === t ? '#3b82f6' : 'transparent',
              color: tab === t ? '#fff' : '#64748b',
              transition: 'all 0.15s',
            }}>
              {t === 'view' ? '📊 Live Status' : '📝 Report'}
            </button>
          ))}
        </div>

        {/* ── VIEW TAB ── */}
        {tab === 'view' && (
          <div>
            {/* Morning / Evening filter */}
            <div style={{ display: 'flex', background: '#1e293b', borderRadius: 10, padding: 4, marginBottom: 12, gap: 4 }}>
              {[
                { key: 'morning', label: '🌅 Morning', sub: 'Before 12 PM' },
                { key: 'evening', label: '🌆 Evening', sub: 'After 12 PM' },
              ].map(slot => (
                <button key={slot.key} onClick={() => setTimeFilter(slot.key)} style={{
                  flex: 1, padding: '8px', borderRadius: 8, border: 'none', cursor: 'pointer',
                  fontWeight: 600, fontSize: 13,
                  background: timeFilter === slot.key ? '#0f172a' : 'transparent',
                  color: timeFilter === slot.key ? '#f8fafc' : '#64748b',
                  transition: 'all 0.15s',
                }}>
                  {slot.label}
                  <span style={{ display: 'block', fontSize: 10, fontWeight: 400, opacity: 0.7 }}>{slot.sub}</span>
                </button>
              ))}
            </div>

            {/* Countdown */}
            <p style={{ textAlign: 'right', fontSize: 12, color: '#334155', margin: '0 0 10px' }}>
              🔄 Refreshing in {countdown}s
            </p>

            {/* Stale warning */}
            {stale && (
              <div style={{ background: '#451a03', border: '1px solid #92400e', borderRadius: 10, padding: 12, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 18 }}>⚠️</span>
                <p style={{ margin: 0, fontSize: 13, color: '#fbbf24' }}>
                  No fresh reports in the last 15 mins. Data may be outdated.
                </p>
              </div>
            )}

            {filteredReports.length === 0 ? (
              <div style={{ background: '#1e293b', borderRadius: 12, padding: 32, textAlign: 'center' }}>
                <p style={{ fontSize: 32, margin: '0 0 8px' }}>🤷</p>
                <p style={{ color: '#64748b', margin: 0 }}>
                  No {timeFilter} reports for Bus {busRoute}.
                </p>
                <p style={{ color: '#475569', fontSize: 13, margin: '4px 0 0' }}>Be the first to report!</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {filteredReports.map((r, i) => {
                  const { timeStr, ago } = formatTimestamp(r.timestamp);
                  const alreadyHelped = helpedIds.includes(r.id);

                  if (r.just_left) {
                    return (
                      <div key={i} style={{ background: '#1e293b', borderRadius: 12, padding: 14, borderLeft: '4px solid #6366f1' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                              <span style={{ fontSize: 18 }}>🚌💨</span>
                              <span style={{ fontWeight: 700, fontSize: 14, color: '#818cf8' }}>
                                Left {r.boarding_stop || 'a stop'}
                              </span>
                              <span style={{ fontSize: 10, background: r.is_ac ? '#0c4a6e' : '#1c1917', color: r.is_ac ? '#38bdf8' : '#a8a29e', borderRadius: 4, padding: '1px 6px', fontWeight: 700 }}>
                                {r.is_ac ? '❄️ AC' : '🌡️'}
                              </span>
                            </div>
                            <p style={{ margin: 0, fontSize: 12, color: '#64748b' }}>
                              👤 {r.reporter_name || 'Anonymous'} · {ago}
                            </p>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                            <span style={{ fontSize: 12, color: '#cbd5e1', fontWeight: 600 }}>{timeStr}</span>
                            <button onClick={() => handleHelpful(r.id)} style={{
                              background: alreadyHelped ? '#1e3a5f' : '#334155',
                              border: 'none', borderRadius: 6, padding: '3px 8px',
                              cursor: alreadyHelped ? 'default' : 'pointer',
                              color: alreadyHelped ? '#60a5fa' : '#94a3b8',
                              fontSize: 11, fontWeight: 600,
                            }}>
                              👍 {r.helpful_count || 0}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  const style = getCrowdingStyle(r.crowding_level);
                  return (
                    <div key={i} style={{ background: '#1e293b', borderRadius: 12, padding: 14, borderLeft: `4px solid ${style.color}` }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                            <span style={{ fontSize: 18 }}>{style.emoji}</span>
                            <span style={{ fontWeight: 700, fontSize: 14, color: style.color }}>{r.crowding_level}% — {style.desc}</span>
                            <span style={{ fontSize: 10, background: r.is_ac ? '#0c4a6e' : '#1c1917', color: r.is_ac ? '#38bdf8' : '#a8a29e', borderRadius: 4, padding: '1px 6px', fontWeight: 700 }}>
                              {r.is_ac ? '❄️ AC' : '🌡️'}
                            </span>
                          </div>
                          <p style={{ margin: 0, fontSize: 12, color: '#64748b' }}>
                            📍 {r.boarding_stop || '—'} · 👤 {r.reporter_name || 'Anonymous'} · {ago}
                          </p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                          <span style={{ fontSize: 12, color: '#cbd5e1', fontWeight: 600 }}>{timeStr}</span>
                          <button onClick={() => handleHelpful(r.id)} style={{
                            background: alreadyHelped ? '#1e3a5f' : '#334155',
                            border: 'none', borderRadius: 6, padding: '3px 8px',
                            cursor: alreadyHelped ? 'default' : 'pointer',
                            color: alreadyHelped ? '#60a5fa' : '#94a3b8',
                            fontSize: 11, fontWeight: 600,
                          }}>
                            👍 {r.helpful_count || 0}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ── REPORT TAB ── */}
        {tab === 'report' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

            {/* Name input */}
            <div style={{ background: '#1e293b', borderRadius: 12, padding: 16 }}>
              <p style={{ margin: '0 0 10px', fontSize: 13, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>Your Name</p>
              <input
                type="text"
                placeholder="e.g. Maddy, Priya... (optional)"
                value={reporterName}
                onChange={e => setReporterName(e.target.value)}
                maxLength={50}
                style={{
                  width: '100%', padding: '10px 12px', borderRadius: 8,
                  background: '#334155', border: '1px solid #475569',
                  color: '#f1f5f9', fontSize: 14, outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
              <p style={{ margin: '6px 0 0', fontSize: 11, color: '#475569' }}>
                Saved automatically. Your friends will see who reported.
              </p>
            </div>

            {/* Stop selector */}
            <div style={{ background: '#1e293b', borderRadius: 12, padding: 16 }}>
              <p style={{ margin: '0 0 10px', fontSize: 13, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>Your Stop</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {stops.map(stop => (
                  <button key={stop} onClick={() => setBoardingStop(stop)} style={{
                    padding: '8px 12px', borderRadius: 8, border: 'none', cursor: 'pointer',
                    fontSize: 13, fontWeight: 500,
                    background: boardingStop === stop ? '#3b82f6' : '#334155',
                    color: boardingStop === stop ? '#fff' : '#94a3b8',
                    transition: 'all 0.15s',
                  }}>
                    {stop}
                  </button>
                ))}
              </div>
            </div>

            {/* AC Toggle */}
            <div style={{ background: '#1e293b', borderRadius: 12, padding: 16 }}>
              <p style={{ margin: '0 0 10px', fontSize: 13, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>Bus Type</p>
              <div style={{ display: 'flex', gap: 10 }}>
                {[{ val: false, label: '🌡️ Non-AC' }, { val: true, label: '❄️ AC' }].map(opt => (
                  <button key={String(opt.val)} onClick={() => setIsAC(opt.val)} style={{
                    flex: 1, padding: '12px', borderRadius: 10, border: 'none', cursor: 'pointer',
                    fontWeight: 700, fontSize: 14,
                    background: isAC === opt.val ? (opt.val ? '#0c4a6e' : '#1c1917') : '#334155',
                    color: isAC === opt.val ? (opt.val ? '#38bdf8' : '#d6d3d1') : '#94a3b8',
                    transition: 'all 0.15s',
                  }}>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Bus just left */}
            <button
              onClick={() => handleSubmit(true)}
              disabled={loading || !boardingStop}
              style={{
                padding: '14px 16px', borderRadius: 12, border: '2px solid #4f46e5',
                cursor: !boardingStop ? 'not-allowed' : 'pointer',
                background: '#1e1b4b',
                color: !boardingStop ? '#4b5563' : '#a5b4fc',
                fontWeight: 700, fontSize: 15,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                opacity: !boardingStop ? 0.5 : 1,
                transition: 'all 0.15s',
              }}
            >
              🚌💨 Bus Just Left My Stop
            </button>

            {/* Crowding options */}
            <div style={{ background: '#1e293b', borderRadius: 12, padding: 16 }}>
              <p style={{ margin: '0 0 10px', fontSize: 13, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>How Crowded?</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {CROWDING_OPTIONS.map(opt => (
                  <button key={opt.value} onClick={() => setCrowdingPct(opt.value)} style={{
                    padding: '14px 16px', borderRadius: 10,
                    border: crowdingPct === opt.value ? `2px solid ${opt.color}` : '2px solid transparent',
                    cursor: 'pointer',
                    background: crowdingPct === opt.value ? opt.bg : '#334155',
                    display: 'flex', alignItems: 'center', gap: 12,
                    textAlign: 'left', transition: 'all 0.15s',
                  }}>
                    <span style={{ fontSize: 24 }}>{opt.emoji}</span>
                    <p style={{ margin: 0, fontWeight: 700, fontSize: 15, color: crowdingPct === opt.value ? opt.text : '#e2e8f0' }}>
                      {opt.label} — {opt.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Submit */}
            <button
              onClick={() => handleSubmit(false)}
              disabled={loading}
              style={{
                padding: '16px', borderRadius: 12, border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                background: loading ? '#334155' : '#3b82f6',
                color: '#fff', fontWeight: 700, fontSize: 16,
                transition: 'all 0.15s',
              }}
            >
              {loading ? 'Submitting...' : 'Submit Crowding Report'}
            </button>

            {submitted && (
              <div style={{ background: '#14532d', border: '1px solid #16a34a', borderRadius: 10, padding: 14, textAlign: 'center' }}>
                <p style={{ margin: 0, color: '#4ade80', fontWeight: 600 }}>✅ Report submitted! Your friends can now see this.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
