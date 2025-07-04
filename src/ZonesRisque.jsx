import { useEffect, useState } from 'react';
import axios from 'axios';

// Helper for animated number transitions
function AnimatedNumber({ value, duration = 800, className = '' }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = display;
    let startTime = null;
    function animate(ts) {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      setDisplay(start + (value - start) * progress);
      if (progress < 1) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
    // eslint-disable-next-line
  }, [value]);
  return <span className={className}>{Math.round(display)}</span>;
}

function getRiskColor(ratioRetraites, partSup55) {
  // Both ratios are between 0 and 1. Higher = more risk.
  // We'll blend from cyan (low) to orange (medium) to red (high)
  const risk = (ratioRetraites + partSup55) / 2;
  if (risk < 0.15) return 'from-cyan-200 to-blue-200';
  if (risk < 0.25) return 'from-yellow-200 to-orange-300';
  return 'from-orange-400 to-red-500';
}

export default function ZonesRisque() {
  const [retraites, setRetraites] = useState([]);
  const [sup55, setSup55] = useState([]);
  const [medecins, setMedecins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDept, setSelectedDept] = useState(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      axios.get('http://localhost:8000/api/medecins-retraites-actifs'),
      axios.get('http://localhost:8000/api/part-medecins-sup-55'),
      axios.get('http://localhost:8000/api/medecins_dep')
    ])
      .then(([r1, r2, r3]) => {
        setRetraites(r1.data);
        setSup55(r2.data);
        setMedecins(r3.data);
      })
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, []);

  // Merge data by code
  const merged = retraites.map(r => {
    const s = sup55.find(x => x.code === r.code);
    const m = medecins.find(x => x.id === r.code || x.id === r.code.padStart(2, '0'));
    const totalMedecins = m ? m.effectif : null;
    const ratioRetraites = totalMedecins ? r.nbr / totalMedecins : null;
    const partSup55 = s && totalMedecins ? ((s.omnipraticiens + s.specialistes) / totalMedecins) : null;
    return {
      code: r.code,
      dept: r.dept || (s && s.departement) || (m && m.departement) || '',
      nbr: r.nbr,
      omnipraticiens: s ? s.omnipraticiens : null,
      specialistes: s ? s.specialistes : null,
      totalMedecins,
      ratioRetraites,
      partSup55
    };
  });

  // For animation: sort by risk (ratioRetraites + partSup55)
  const sorted = [...merged].sort((a, b) => ((b.ratioRetraites || 0) + (b.partSup55 || 0)) - ((a.ratioRetraites || 0) + (a.partSup55 || 0)));

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-cyan-300 to-blue-900 animate-pulse text-2xl text-blue-900 font-bold">Chargement des zones à risque...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-700 text-xl">Erreur lors du chargement des données.</div>;

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-400 via-cyan-300 to-blue-900 flex flex-col items-center justify-center py-16 px-4 relative overflow-x-auto pt-14">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1500&q=80')] bg-cover bg-center opacity-30 blur-sm animate-fade-in"></div>
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col gap-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-900 drop-shadow-lg mb-8 animate-fade-in">Zones à Risque - Médecins Retraités & +55 ans</h2>
        <p className="text-blue-900 text-center mb-6 max-w-3xl mx-auto text-base bg-white/70 rounded-lg p-4 shadow">
          Les indicateurs présentés ici identifient les départements à risque de désertification médicale, en fonction de la <b>part de médecins proches de la retraite</b> ou déjà retraités mais actifs. Le <b>ratio retraités actifs/médecins</b> et la <b>part de médecins de plus de 55 ans</b> permettent d'anticiper les zones où l'offre médicale pourrait diminuer prochainement.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up">
          {sorted.map((d, i) => (
            <div
              key={d.code}
              className={`relative rounded-2xl shadow-2xl p-6 bg-gradient-to-br ${getRiskColor(d.ratioRetraites, d.partSup55)} border-4 border-cyan-300 hover:border-blue-700 transition-all duration-500 cursor-pointer group overflow-hidden ${selectedDept && selectedDept.code === d.code ? 'scale-105 ring-4 ring-blue-400' : ''}`}
              style={{ animation: `pop-in 0.5s cubic-bezier(.68,-0.55,.27,1.55) ${(i * 0.07).toFixed(2)}s both` }}
              onClick={() => setSelectedDept(d)}
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-cyan-200 to-blue-400 rounded-full opacity-30 group-hover:scale-125 transition-transform duration-500"></div>
              <h3 className="text-2xl font-bold text-blue-900 mb-2">{d.dept}</h3>
              <div className="flex flex-col gap-2 text-blue-800 text-lg">
                <span>👴 Retraités actifs : <AnimatedNumber value={d.nbr || 0} className="font-bold text-2xl text-blue-900" /></span>
                <span>🩺 Omnipraticiens +55 ans : <AnimatedNumber value={d.omnipraticiens || 0} className="font-bold text-xl text-cyan-700" /></span>
                <span>🧑‍⚕️ Spécialistes +55 ans : <AnimatedNumber value={d.specialistes || 0} className="font-bold text-xl text-cyan-700" /></span>
                <span>👨‍⚕️ Total médecins : <AnimatedNumber value={d.totalMedecins || 0} className="font-bold text-xl text-blue-900" /></span>
                <span>📈 Ratio retraités actifs / médecins : <span className="font-bold text-orange-700">{d.ratioRetraites !== null ? (d.ratioRetraites * 100).toFixed(1) + '%' : 'N/A'}</span></span>
                <span>📊 Part +55 ans : <span className="font-bold text-orange-700">{d.partSup55 !== null ? (d.partSup55 * 100).toFixed(1) + '%' : 'N/A'}</span></span>
              </div>
              <div className="absolute bottom-2 right-4 text-xs text-cyan-700 opacity-60">Code: {d.code}</div>
              <div className="absolute top-2 left-4 text-xs text-cyan-700 opacity-60 animate-pulse">#{i + 1}</div>
              <div className="absolute inset-0 pointer-events-none group-hover:bg-cyan-100/30 transition-all duration-500"></div>
            </div>
          ))}
        </div>
        {selectedDept && (
          <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full text-center relative animate-fade-in-up">
              <button onClick={() => setSelectedDept(null)} className="absolute top-2 right-2 text-blue-900 hover:text-cyan-500 text-3xl font-bold transition-transform hover:scale-125">&times;</button>
              <h3 className="text-3xl font-extrabold mb-4 text-blue-900">{selectedDept.dept}</h3>
              <div className="flex flex-col gap-4 text-blue-800 text-xl mb-4">
                <span>👴 <b>{selectedDept.nbr}</b> médecins retraités actifs</span>
                <span>🩺 <b>{selectedDept.omnipraticiens}</b> omnipraticiens +55 ans</span>
                <span>🧑‍⚕️ <b>{selectedDept.specialistes}</b> spécialistes +55 ans</span>
                <span>👨‍⚕️ <b>{selectedDept.totalMedecins}</b> médecins au total</span>
                <span>📈 Ratio retraités actifs / médecins : <b className="text-orange-700">{selectedDept.ratioRetraites !== null ? (selectedDept.ratioRetraites * 100).toFixed(1) + '%' : 'N/A'}</b></span>
                <span>📊 Part +55 ans : <b className="text-orange-700">{selectedDept.partSup55 !== null ? (selectedDept.partSup55 * 100).toFixed(1) + '%' : 'N/A'}</b></span>
              </div>
              <div className="text-cyan-700 text-lg mt-2 animate-fade-in">Code département : <b>{selectedDept.code}</b></div>
            </div>
          </div>
        )}
      </div>
      <style>{`
        @keyframes pop-in {
          0% { opacity: 0; transform: scale(0.7) translateY(40px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-fade-in { animation: fadeIn 1s both; }
        .animate-fade-in-up { animation: fadeInUp 1s both; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(40px);} to { opacity: 1; transform: translateY(0);} }
      `}</style>
    </div>
  );
} 