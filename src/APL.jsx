import React, { useEffect, useState } from 'react';

const ENDPOINT = 'http://localhost:8000/api/apl-dep';

function getAplColor(apl, min, max) {
  // Interpolate from red (bad) to yellow (mid) to green (good)
  const percent = (apl - min) / (max - min);
  if (isNaN(percent)) return '#eee';
  // Red to yellow to green
  if (percent < 0.5) {
    // Red to yellow
    const t = percent * 2;
    const r = 255;
    const g = Math.round(200 * t + 55 * (1 - t));
    return `rgb(${r},${g},100)`;
  } else {
    // Yellow to green
    const t = (percent - 0.5) * 2;
    const r = Math.round(255 * (1 - t));
    const g = 200;
    return `rgb(${r},${g},100)`;
  }
}

const APL = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sort, setSort] = useState(null); // null = unordered, 'desc' = high to low, 'asc' = low to high
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch(ENDPOINT)
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-cyan-400 to-blue-900 text-2xl text-white font-bold animate-pulse">Chargement...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-700 text-xl">Erreur: {error}</div>;

  const apls = data.map((d) => d.apl_mg_hmep);
  const minApl = Math.min(...apls);
  const maxApl = Math.max(...apls);

  let displayed = data;
  if (sort === 'desc') {
    displayed = [...data].sort((a, b) => b.apl_mg_hmep - a.apl_mg_hmep);
  } else if (sort === 'asc') {
    displayed = [...data].sort((a, b) => a.apl_mg_hmep - b.apl_mg_hmep);
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-500 via-cyan-400 to-blue-900 flex flex-col items-center justify-center py-16 px-4 relative overflow-x-auto pt-14">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80')] bg-cover bg-center opacity-40 blur-sm"></div>
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col gap-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-200 drop-shadow-lg mb-4">Accessibilité potentielle localisée (APL) par département</h2>
        <p className="text-blue-900 text-center mb-6 max-w-3xl mx-auto text-base bg-white/70 rounded-lg p-4 shadow">
          L'Accessibilité Potentielle Localisée (APL) mesure la facilité d'accès aux médecins généralistes pour chaque département. Elle est calculée selon la méthode HMEP, prenant en compte la répartition géographique des médecins et de la population. Un APL élevé indique une meilleure accessibilité aux soins.
        </p>
        <div className="bg-white/80 rounded-xl shadow-lg p-6 overflow-x-auto animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-2 items-center">
              <span className="font-semibold text-blue-900">Trier par APL :</span>
              <button
                className={`px-3 py-1 rounded font-bold border-2 border-cyan-500 bg-white/80 text-blue-900 transition-colors duration-200 ${sort === 'desc' ? 'bg-cyan-200' : ''}`}
                onClick={() => setSort('desc')}
              >
                Plus élevé {sort === 'desc' && <span className="ml-1">⬇️</span>}
              </button>
              <button
                className={`px-3 py-1 rounded font-bold border-2 border-cyan-500 bg-white/80 text-blue-900 transition-colors duration-200 ${sort === 'asc' ? 'bg-cyan-200' : ''}`}
                onClick={() => setSort('asc')}
              >
                Plus faible {sort === 'asc' && <span className="ml-1">⬆️</span>}
              </button>
              <button
                className={`px-3 py-1 rounded font-bold border-2 border-cyan-500 bg-white/80 text-blue-900 transition-colors duration-200 ${sort === null ? 'bg-cyan-200' : ''}`}
                onClick={() => setSort(null)}
              >
                Désactiver le tri {sort === null && <span className="ml-1">🔀</span>}
              </button>
            </div>
            <div className="flex gap-2 items-center">
              <span className="text-xs">Légende :</span>
              <span className="rounded px-3 py-1 text-xs font-semibold" style={{ background: getAplColor(maxApl, minApl, maxApl), color: '#1e293b' }}>APL élevé (bon)</span>
              <span className="rounded px-3 py-1 text-xs font-semibold" style={{ background: getAplColor(minApl, minApl, maxApl), color: '#1e293b' }}>APL faible (mauvais)</span>
            </div>
          </div>
          <table className="min-w-full border-collapse rounded-xl overflow-hidden shadow">
            <thead>
              <tr className="bg-cyan-100 text-blue-900">
                <th className="px-3 py-2 text-left">Code</th>
                <th className="px-3 py-2 text-left">Département</th>
                <th className="px-3 py-2 text-left">Année</th>
                <th className="px-3 py-2 text-left">APL MG/HMEP</th>
              </tr>
            </thead>
            <tbody>
              {displayed.map((row) => (
                <tr
                  key={row.codgeo}
                  className="transition-all duration-200 cursor-pointer hover:scale-[1.02] hover:shadow-xl border-b border-blue-200"
                  style={{ background: getAplColor(row.apl_mg_hmep, minApl, maxApl), color: '#1e293b' }}
                  onClick={() => setSelected(row)}
                  title="Voir le détail du département"
                >
                  <td className="px-3 py-2 font-medium text-blue-900">{row.codgeo}</td>
                  <td className="px-3 py-2 font-medium text-blue-900">{row.libgeo}</td>
                  <td className="px-3 py-2 text-blue-900">{row.an}</td>
                  <td className="px-3 py-2 text-blue-900 font-bold">{row.apl_mg_hmep}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-6 text-blue-800 text-center text-lg">Cliquez sur une ligne pour voir le détail du département.</p>
        </div>
      </div>
      {/* Modal Popup */}
      {selected && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-xs w-full text-center relative animate-fade-in-up">
            <button onClick={() => setSelected(null)} className="absolute top-2 right-2 text-blue-900 hover:text-cyan-500 text-xl font-bold">&times;</button>
            <h3 className="text-xl font-bold mb-4 text-blue-900">{selected.libgeo}</h3>
            <div className="text-blue-800 text-lg mb-2">Code : <span className="font-semibold">{selected.codgeo}</span></div>
            <div className="text-blue-800 text-lg mb-2">Année : <span className="font-semibold">{selected.an}</span></div>
            <div className="text-blue-800 text-lg mb-2">APL MG/HMEP : <span className="font-semibold">{selected.apl_mg_hmep}</span></div>
            <div className="mt-4 text-blue-700 text-sm">L'APL mesure l'accessibilité potentielle localisée aux médecins généralistes pour ce département.</div>
          </div>
        </div>
      )}
      <style>{`
        .animate-fade-in { animation: fadeIn 1s both; }
        .animate-fade-in-up { animation: fadeInUp 1s both; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(40px);} to { opacity: 1; transform: translateY(0);} }
      `}</style>
    </div>
  );
};

export default APL; 