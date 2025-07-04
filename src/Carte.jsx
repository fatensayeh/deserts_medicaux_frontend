import { useEffect, useState } from 'react';
import axios from 'axios';

// Helper to interpolate color from light blue (low) to dark blue (high)
function getBlueColorFromRatio(ratio, min, max) {
  // Clamp and normalize
  const t = Math.max(0, Math.min(1, (ratio - min) / (max - min)));
  // Interpolate from #e0f2fe (light blue) to #0e2954 (dark blue)
  // #e0f2fe: rgb(224,242,254), #0e2954: rgb(14,41,84)
  const r = Math.round(224 + (14 - 224) * t);
  const g = Math.round(242 + (41 - 242) * t);
  const b = Math.round(254 + (84 - 254) * t);
  return `rgb(${r},${g},${b})`;
}

function Carte() {
  const [departements, setDepartements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      axios.get('http://localhost:8000/api/passages'),
      axios.get('http://localhost:8000/api/medecins_dep')
    ])
      .then(([passagesRes, medecinsRes]) => {
        // Map medecins by dep code
        const medecinsByDep = {};
        medecinsRes.data.forEach(m => {
          medecinsByDep[m.id] = m;
        });
        // Combine with passages
        const combined = passagesRes.data.map(p => {
          const med = medecinsByDep[p.dep];
          const effectif = med ? med.effectif : null;
          const departement = med ? med.departement : p.libelle_dep;
          const ratio = effectif && p.moyenne_journaliere_passages ? (p.moyenne_journaliere_passages / effectif) : null;
          return {
            dep: p.dep,
            libelle_dep: p.libelle_dep,
            moyenne_journaliere_passages: p.moyenne_journaliere_passages,
            effectif,
            departement,
            ratio
          };
        });
        setDepartements(combined);
      })
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur lors du chargement des données.</div>;

  // Find min/max ratio for color scale (ignore nulls)
  const validRatios = departements.map(d => d.ratio).filter(r => r !== null && !isNaN(r));
  const minRatio = Math.min(...validRatios);
  const maxRatio = Math.max(...validRatios);

  return (
    <div className="p-8 min-h-screen w-full bg-gradient-to-br from-blue-500 via-cyan-400 to-blue-900 flex items-center justify-center relative overflow-hidden pt-14">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80')] bg-cover bg-center opacity-40 blur-sm"></div>
      <div className="relative z-10 flex flex-col items-center justify-center px-6 py-12 rounded-2xl bg-blue-900/70 shadow-2xl backdrop-blur-md max-w-5xl w-full">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-200 drop-shadow-lg">Carte des Départements - Ratio Passages/Médecins</h2>
        <p className="text-blue-900 text-center mb-6 max-w-3xl mx-auto text-base bg-white/70 rounded-lg p-4 shadow">
          Le <b>ratio passages/médecin</b> correspond au nombre de passages journaliers aux urgences rapporté à l'effectif de médecins dans chaque département. Il permet d'identifier la pression exercée sur les médecins par la demande de soins.
        </p>
        <div className="flex items-center justify-center w-full">
          <div className="grid grid-cols-6 gap-2 w-full max-w-4xl">
            {departements.map((dep) => {
              const color = dep.ratio !== null ? getBlueColorFromRatio(dep.ratio, minRatio, maxRatio) : '#e0e7ef';
              return (
                <div
                  key={dep.dep}
                  className="rounded-lg font-semibold text-xs md:text-sm text-center cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-xl p-2 border border-blue-200 flex flex-col items-center justify-center"
                  style={{ background: color, color: '#1e293b', width: '110px', height: '80px', minWidth: '110px', minHeight: '80px', maxWidth: '110px', maxHeight: '80px' }}
                  title={dep.libelle_dep}
                  onClick={() => setSelected(dep)}
                >
                  <div className="font-bold">{dep.libelle_dep}</div>
                  <div className="text-xs">Ratio: {dep.ratio !== null ? dep.ratio.toFixed(3) : 'N/A'}</div>
                </div>
              );
            })}
          </div>
        </div>
        <p className="mt-8 text-blue-100 text-center text-lg">Cliquez sur un département pour voir les détails.<br/>Le ratio = passages journaliers / effectif médecins</p>
      </div>
      {/* Modal Popup */}
      {selected && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-xs w-full text-center relative">
            <button onClick={() => setSelected(null)} className="absolute top-2 right-2 text-blue-900 hover:text-cyan-500 text-xl font-bold">&times;</button>
            <h3 className="text-xl font-bold mb-4 text-blue-900">{selected.libelle_dep}</h3>
            <div className="text-blue-800 text-lg mb-2">👨‍⚕️ Médecins : <span className="font-semibold">{selected.effectif !== null ? selected.effectif : 'N/A'}</span></div>
            <div className="text-blue-800 text-lg mb-2">🚑 Passages journaliers : <span className="font-semibold">{selected.moyenne_journaliere_passages !== null ? selected.moyenne_journaliere_passages.toFixed(1) : 'N/A'}</span></div>
            <div className="text-blue-800 text-lg mb-2">📊 Ratio passages/médecin : <span className="font-semibold">{selected.ratio !== null ? selected.ratio.toFixed(3) : 'N/A'}</span></div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Carte; 