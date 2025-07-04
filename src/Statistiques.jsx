import { useEffect, useState } from 'react';
import axios from 'axios';
import { useMemo } from 'react';


function Statistiques() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showBarChart, setShowBarChart] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8000/api/test-db')
      .then(res => setStats(res.data))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur lors du chargement des statistiques.</div>;

  // Filter out entries with id 100 and 101
  const filteredStats = stats.filter(s => s.id !== 100 && s.id !== 101);

  // Aggregate stats
  const totalEffectif = filteredStats.reduce((sum, s) => sum + s.effectif, 0);
  const avgDensiteEnsemble = (filteredStats.reduce((sum, s) => sum + s.densite_ensemble, 0) / filteredStats.length).toFixed(1);
  const avgDensiteGeneralistes = (filteredStats.reduce((sum, s) => sum + s.densite_generalistes, 0) / filteredStats.length).toFixed(1);
  const avgDensiteSpecialistes = (filteredStats.reduce((sum, s) => sum + s.densite_specialistes, 0) / filteredStats.length).toFixed(1);
  const avgDensiteChirDent = (filteredStats.reduce((sum, s) => sum + s.densite_chir_dent, 0) / filteredStats.length).toFixed(1);
  const avgDensitePharma = (filteredStats.reduce((sum, s) => sum + s.densite_pharma, 0) / filteredStats.length).toFixed(1);

  // For bar chart: sort by effectif descending
  const sortedByEffectif = [...filteredStats].sort((a, b) => b.effectif - a.effectif);
  // For pie chart: get % of total effectif per departement
  const pieData = filteredStats.map(s => ({
    departement: s.departement,
    percent: ((s.effectif / totalEffectif) * 100).toFixed(1),
  }));

  // For table: show all stats

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-500 via-cyan-400 to-blue-900 flex flex-col items-center justify-center py-20 px-4 relative overflow-x-auto pt-14">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80')] bg-cover bg-center opacity-40 blur-sm"></div>
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col gap-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-200 drop-shadow-lg mb-4">Statistiques Nationales</h2>
        <p className="text-blue-900 text-center mb-6 max-w-3xl mx-auto text-base bg-white/70 rounded-lg p-4 shadow">
          Cette page présente l'effectif total de médecins et la densité (nombre de médecins pour 100 000 habitants) par spécialité et par département. Ces indicateurs permettent d'évaluer la répartition des professionnels de santé sur le territoire.
        </p>
        {/* Global stats */}
        <div className="flex flex-wrap gap-6 justify-center mb-6">
          <div className="bg-blue-900/80 rounded-xl shadow-lg px-8 py-6 text-center text-white min-w-[180px]">
            <div className="text-2xl font-bold">{totalEffectif.toLocaleString()}</div>
            <div className="text-blue-200 mt-1">Effectif total</div>
          </div>
          <div className="bg-blue-900/80 rounded-xl shadow-lg px-8 py-6 text-center text-white min-w-[180px]">
            <div className="text-2xl font-bold">{avgDensiteEnsemble}</div>
            <div className="text-blue-200 mt-1">Densité moyenne (ensemble)</div>
          </div>
          <div className="bg-blue-900/80 rounded-xl shadow-lg px-8 py-6 text-center text-white min-w-[180px]">
            <div className="text-2xl font-bold">{avgDensiteGeneralistes}</div>
            <div className="text-blue-200 mt-1">Densité moyenne (généralistes)</div>
          </div>
          <div className="bg-blue-900/80 rounded-xl shadow-lg px-8 py-6 text-center text-white min-w-[180px]">
            <div className="text-2xl font-bold">{avgDensiteSpecialistes}</div>
            <div className="text-blue-200 mt-1">Densité moyenne (spécialistes)</div>
          </div>
          <div className="bg-blue-900/80 rounded-xl shadow-lg px-8 py-6 text-center text-white min-w-[180px]">
            <div className="text-2xl font-bold">{avgDensiteChirDent}</div>
            <div className="text-blue-200 mt-1">Densité moyenne (chir. dent.)</div>
          </div>
          <div className="bg-blue-900/80 rounded-xl shadow-lg px-8 py-6 text-center text-white min-w-[180px]">
            <div className="text-2xl font-bold">{avgDensitePharma}</div>
            <div className="text-blue-200 mt-1">Densité moyenne (pharmaciens)</div>
          </div>
        </div>
        {/* Toggle Button */}
        <div className="flex justify-center mb-6">
          <button
            className={`px-6 py-2 rounded-l-lg font-semibold border-2 border-cyan-500 bg-white/80 text-blue-900 transition-colors duration-200 ${showBarChart ? 'bg-cyan-200' : ''}`}
            onClick={() => setShowBarChart(true)}
          >
            Bar Chart
          </button>
          <span className="w-3"></span>
          <button
            className={`px-6 py-2 rounded-r-lg font-semibold border-2 border-cyan-500 bg-white/80 text-blue-900 transition-colors duration-200 ${!showBarChart ? 'bg-cyan-200' : ''}`}
            onClick={() => setShowBarChart(false)}
          >
            Table
          </button>
        </div>
        {/* Conditional rendering: Bar chart or Table */}
        {showBarChart ? (
          <div className="bg-white/80 rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-blue-900 mb-4">Effectif par département</h3>
            <div className="flex flex-col gap-2">
              {sortedByEffectif.map((s, i) => (
                <div key={s.departement} className="flex items-center gap-2">
                  <span className="w-40 text-blue-900 font-medium text-sm truncate">{s.departement}</span>
                  <div className="flex-1 bg-blue-200 rounded h-5 relative">
                    <div
                      className="bg-cyan-500 h-5 rounded"
                      style={{ width: `${(s.effectif / sortedByEffectif[0].effectif) * 100}%` }}
                    ></div>
                    <span className="absolute right-2 top-0 text-xs text-blue-900 font-bold h-5 flex items-center">{s.effectif}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white/80 rounded-xl shadow-lg p-6 overflow-x-auto">
            <h3 className="text-xl font-bold text-blue-900 mb-4">Données détaillées par département</h3>
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-cyan-100 text-blue-900">
                  <th className="px-3 py-2 text-left">Département</th>
                  <th className="px-3 py-2 text-right">Effectif</th>
                  <th className="px-3 py-2 text-right">Densité (ensemble)</th>
                  <th className="px-3 py-2 text-right">Densité (généralistes)</th>
                  <th className="px-3 py-2 text-right">Densité (spécialistes)</th>
                  <th className="px-3 py-2 text-right">Densité (chir. dent.)</th>
                  <th className="px-3 py-2 text-right">Densité (pharmaciens)</th>
                </tr>
              </thead>
              <tbody>
                {filteredStats.map(s => (
                  <tr key={s.departement} className="border-b border-blue-200 hover:bg-cyan-50">
                    <td className="px-3 py-2 font-medium text-blue-900">{s.departement}</td>
                    <td className="px-3 py-2 text-right">{s.effectif}</td>
                    <td className="px-3 py-2 text-right">{s.densite_ensemble}</td>
                    <td className="px-3 py-2 text-right">{s.densite_generalistes}</td>
                    <td className="px-3 py-2 text-right">{s.densite_specialistes}</td>
                    <td className="px-3 py-2 text-right">{s.densite_chir_dent}</td>
                    <td className="px-3 py-2 text-right">{s.densite_pharma}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Statistiques;
