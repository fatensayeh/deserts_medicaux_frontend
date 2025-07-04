import React from 'react';
import { Link } from 'react-router-dom';

function TopBar() {
  return (
    <nav id="topbar-nav" className="w-full bg-blue-900/80 backdrop-blur-md shadow-md fixed top-0 left-0 z-20">
      <div className="mx-auto px-4 py-3 flex items-center justify-between" id="topbar-container">
        <Link to="/" className="text-xl font-bold text-cyan-200 tracking-wide hover:text-cyan-400 transition-colors" id="topbar-title">Déserts Médicaux</Link>
        <div className="space-x-6" id="topbar-links">
          <Link to="/carte" className="text-blue-100 hover:text-cyan-300 transition-colors font-medium">Carte (Ratio passages/médecin)</Link>
          <Link to="/map" className="text-blue-100 hover:text-cyan-300 transition-colors font-medium">Carte APL (Accessibilité)</Link>
          <Link to="/statistiques" className="text-blue-100 hover:text-cyan-300 transition-colors font-medium">Statistiques nationales</Link>
          <Link to="/zones-risque" className="text-blue-100 hover:text-cyan-300 transition-colors font-medium">Zones à risque (démographie médicale)</Link>
          <Link to="/apl" className="text-blue-100 hover:text-cyan-300 transition-colors font-medium">Tableau APL</Link>
          <Link to="/propos" className="text-blue-100 hover:text-cyan-300 transition-colors font-medium">À propos</Link>
        </div>
      </div>
    </nav>
  );
}

export default TopBar; 