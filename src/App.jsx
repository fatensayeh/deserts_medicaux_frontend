import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TopBar from './TopBar'
import Landing from './Landing'
import Carte from './Carte'
import Statistiques from './Statistiques'
import ZonesRisque from './ZonesRisque'
import APL from './APL'
import Map from './Map'

function App() {
  return (
    <BrowserRouter>
      <TopBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/carte" element={<Carte />} />
        {/* Placeholders for other pages */}
        <Route path="/statistiques" element={<Statistiques />} />
        <Route path="/zones-risque" element={<ZonesRisque />} />
        <Route path="/propos" element={<Landing />} />
        <Route path="/apl" element={<APL />} />
        <Route path="/map" element={<Map />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
