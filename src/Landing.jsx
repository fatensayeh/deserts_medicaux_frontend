function Landing() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-500 via-cyan-400 to-blue-900 flex items-center justify-center relative overflow-hidden pt-14">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80')] bg-cover bg-center opacity-40 blur-sm"></div>
      <div id="box" className="relative z-10 flex flex-col items-center justify-center px-6 py-12 rounded-2xl bg-blue-900/70 shadow-2xl backdrop-blur-md w-full">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-200 drop-shadow-lg">À propos du projet — Déserts Médicaux en France</h1>
        <p className="text-lg md:text-xl text-blue-100 leading-relaxed text-center mb-6">
          Bienvenue sur notre application interactive dédiée à la compréhension des <b>déserts médicaux en France</b> !<br/>
          Ce projet a été conçu avec passion pour offrir à tous — citoyens, étudiants, enseignants, décideurs — un outil moderne, pédagogique et accessible afin de visualiser, analyser et comparer la situation de l'accès aux soins sur l'ensemble du territoire français.<br/><br/>
          <b>Pourquoi ce projet ?</b><br/>
          Les inégalités d'accès aux soins sont un enjeu majeur de santé publique. Grâce à des indicateurs reconnus et des données récentes, notre application met en lumière les zones à risque, propose des outils d'aide à la décision et favorise la prise de conscience collective.<br/><br/>
          <b>Fonctionnalités principales :</b><br/>
          <ul className="list-disc list-inside text-left mx-auto max-w-4xl">
            <li>Cartes interactives pour explorer l'accessibilité aux soins et la pression sur les médecins.</li>
            <li>Tableaux dynamiques et graphiques pour comparer les départements.</li>
            <li>Statistiques nationales détaillées sur la démographie médicale.</li>
            <li>Identification des zones à risque de désertification médicale.</li>
          </ul>
        </p>
        <div className="bg-blue-800/80 rounded-xl p-4 mb-6 w-full text-blue-100 text-left">
          <h2 className="font-semibold text-xl mb-2">Technologies utilisées</h2>
          <ul className="list-disc list-inside">
            <li><b>React 19</b> — pour des interfaces dynamiques et modulaires</li>
            <li><b>Vite</b> — pour un développement rapide et moderne</li>
            <li><b>React Router DOM</b> — pour la navigation fluide entre les pages</li>
            <li><b>React Leaflet & Leaflet</b> — pour l'affichage de cartes interactives</li>
            <li><b>Tailwind CSS</b> — pour un design responsive et élégant</li>
            <li><b>Axios</b> — pour la récupération des données via API REST</li>
            <li><b>ESLint</b> — pour garantir la qualité et la cohérence du code</li>
            <li><b>API REST</b> (backend local) — pour fournir les données médicales et démographiques</li>
          </ul>
        </div>
        <div className="bg-blue-800/80 rounded-xl p-4 mb-6 w-full text-blue-100 text-left">
          <h2 className="font-semibold text-xl mb-2">Métriques et indicateurs</h2>
          <ul className="list-disc list-inside">
            <li><b>APL (Accessibilité Potentielle Localisée)</b> : mesure la facilité d'accès aux médecins généralistes, calculée selon la méthode HMEP.</li>
            <li><b>Ratio passages/médecin</b> : évalue la pression sur les médecins par département.</li>
            <li><b>Statistiques nationales</b> : effectif total, densité médicale, répartition par spécialité.</li>
            <li><b>Zones à risque</b> : identification des départements où l'offre médicale pourrait diminuer prochainement.</li>
          </ul>
        </div>
        <div className="bg-blue-800/80 rounded-xl p-4 mb-6 w-full text-blue-100 text-left">
          <h2 className="font-semibold text-xl mb-2">Expérience utilisateur</h2>
          <ul className="list-disc list-inside">
            <li>Interface moderne, épurée et responsive grâce à Tailwind CSS.</li>
            <li>Navigation fluide, survol et clic pour afficher les détails par département.</li>
            <li>Accessibilité renforcée : contrastes élevés, navigation clavier, design adaptatif.</li>
          </ul>
        </div>
        <div className="bg-blue-800/80 rounded-xl p-4 mb-6 w-full text-blue-100 text-left">
          <h2 className="font-semibold text-xl mb-2">L'équipe pédagogique</h2>
          <p>
            Ce projet a été réalisé dans le cadre d'un travail pédagogique, avec le soutien et l'encadrement de l'équipe enseignante.<br/>
            <b>Encadrante :</b> <br/>
            <ul className="list-disc list-inside">
              <li>Mélanie COURTINE</li>
            </ul>
            <br/>
            <b>Développeurs :</b> <br/>
            <ul className="list-disc list-inside">
              <li>Faten Ikram Sayeh</li>
              <li>Meriem Zoughbi</li>
              <li>Dieu-Donné Fianko</li>
            </ul>
            <br/>
            Un immense merci à tous ceux qui ont contribué, de près ou de loin, à la réussite de ce projet !
          </p>
        </div>
        <div className="bg-blue-800/80 rounded-xl p-4 w-full text-blue-100 text-left">
          <h2 className="font-semibold text-xl mb-2">Pour aller plus loin</h2>
          <ul className="list-disc list-inside">
            <li>Données issues de sources fiables : Assurance Maladie, INSEE, etc.</li>
            <li>Possibilités d'évolution : ajout de filtres temporels, intégration de données socio-économiques, analyses prédictives, export de rapports.</li>
            <li>Pour toute question ou suggestion, n'hésitez pas à contacter l'équipe pédagogique !</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Landing; 