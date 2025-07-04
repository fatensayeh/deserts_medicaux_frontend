import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import * as L from 'leaflet';

const ENDPOINT = 'http://localhost:8000/api/apl-dep';

const FranceDepartmentMap = () => {
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [aplData, setAplData] = useState({});
  const [minApl, setMinApl] = useState(0);
  const [maxApl, setMaxApl] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch both geojson and APL data
    Promise.all([
      fetch('/departements.geojson').then(res => res.json()),
      fetch(ENDPOINT).then(res => {
        if (!res.ok) throw new Error('API error');
        return res.json();
      })
    ])
      .then(([geo, aplArr]) => {
        setGeoJsonData(geo);
        // Transform APL array to object by code
        const aplMap = {};
        let min = Infinity, max = -Infinity;
        aplArr.forEach(dep => {
          aplMap[dep.codgeo] = dep;
          if (typeof dep.apl_mg_hmep === 'number') {
            if (dep.apl_mg_hmep < min) min = dep.apl_mg_hmep;
            if (dep.apl_mg_hmep > max) max = dep.apl_mg_hmep;
          }
        });
        setAplData(aplMap);
        setMinApl(min);
        setMaxApl(max);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Function to determine color based on APL value
  const getColor = (apl) => {
    if (typeof apl !== 'number' || isNaN(apl)) return '#eee';
    const percent = (apl - minApl) / (maxApl - minApl);
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
  };

  // Style for each department
  const styleFeature = (feature) => {
    const code = feature.properties.code;
    const dep = aplData[code];
    const apl = dep ? dep.apl_mg_hmep : null;
    return {
      fillColor: getColor(apl),
      weight: 1,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
    };
  };

  // Handle click on a department
  const onEachFeature = (feature, layer) => {
    const code = feature.properties.code;
    const dep = aplData[code];
    const name = dep ? dep.libgeo : feature.properties.nom;
    const apl = dep ? dep.apl_mg_hmep : 'N/A';
    const an = dep ? dep.an : '';
    layer.bindTooltip(
      `<b>${name}</b><br/>APL MG/HMEP: ${apl}${an ? `<br/>Année: ${an}` : ''}`,
      { permanent: false, sticky: true }
    );
    layer.on({
      mouseover: (e) => {
        e.target.setStyle({
          weight: 3,
          color: '#666',
          dashArray: '',
          fillOpacity: 0.9
        });
        e.target.bringToFront();
      },
      mouseout: (e) => {
        e.target.setStyle(styleFeature(feature));
      },
      click: (e) => {
        // Handle click if needed
        console.log('Clicked:', feature.properties);
      }
    });
  };

  if (loading) return <div>Chargement de la carte...</div>;
  if (error) return <div style={{ color: 'red' }}>Erreur: {error}</div>;
  if (!geoJsonData) return <div>Chargement des données géographiques...</div>;

  return (
    <div style={{ height: '100vh', width: '100%', paddingTop: '56px', boxSizing: 'border-box' }}>
      <h2 style={{ textAlign: 'center' }}>APL par département</h2>
      <div style={{ maxWidth: 700, margin: '0 auto', marginBottom: 24, background: 'rgba(255,255,255,0.8)', borderRadius: 12, padding: 16, color: '#1e293b', textAlign: 'center', boxShadow: '0 2px 8px #0001' }}>
        L'Accessibilité Potentielle Localisée (APL) mesure la facilité d'accès aux médecins généralistes pour chaque département. Elle est calculée selon la méthode HMEP, prenant en compte la répartition géographique des médecins et de la population. Un APL élevé indique une meilleure accessibilité aux soins.
      </div>
      <MapContainer
        center={[46.603354, 1.888334]}
        zoom={6}
        style={{ height: 'calc(100vh - 56px)', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <GeoJSON
          data={geoJsonData}
          style={styleFeature}
          onEachFeature={onEachFeature}
        />
      </MapContainer>
      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        <div style={{ display: 'inline-block', textAlign: 'left' }}>
          <div>Légende couleur :</div>
          <div style={{
            height: '20px',
            width: '200px',
            background: 'linear-gradient(to right, rgb(255,55,100), rgb(255,200,100), rgb(0,200,100))',
            marginTop: '5px'
          }}></div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>APL faible</span>
            <span>APL élevé</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FranceDepartmentMap;