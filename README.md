# Déserts Médicaux en France — Application Interactive

## Présentation du projet

Ce projet propose une application web interactive permettant de visualiser, d'analyser et de comparer la situation des déserts médicaux en France à l'échelle départementale. L'objectif est de mettre en lumière les inégalités d'accès aux soins, d'identifier les zones à risque et de fournir des outils d'aide à la décision pour les acteurs de la santé.

L'application s'appuie sur des indicateurs reconnus et des données récentes, tout en offrant une expérience utilisateur moderne et pédagogique.

---

## Technologies utilisées

- **React 19** : Framework principal pour la construction d'interfaces utilisateur réactives. *Choisi pour sa popularité, sa communauté, et sa capacité à créer des interfaces dynamiques et modulaires.*
- **Vite** : Outil de build et de développement rapide pour React. *Permet un rechargement ultra-rapide et une expérience développeur moderne.*
- **React Router DOM** : Gestion de la navigation entre les différentes pages de l'application. *Indispensable pour une SPA (Single Page Application) avec plusieurs vues et une navigation fluide.*
- **React Leaflet & Leaflet** : Affichage de cartes interactives et visualisation géospatiale. *Permet d'intégrer facilement des cartes dynamiques et d'afficher des données géographiques riches.*
- **Tailwind CSS** : Framework CSS utilitaire pour un design moderne et responsive. *Facilite la création d'interfaces élégantes, adaptatives et cohérentes sans écrire de CSS personnalisé.*
- **Axios** : Requêtes HTTP pour la récupération des données depuis l'API. *Simple, robuste et largement utilisé pour interagir avec des APIs REST.*
- **ESLint** : Linting et qualité du code. *Garantit la cohérence, la lisibilité et la maintenabilité du code tout au long du projet.*
- **API REST** (backend non inclus ici) : Fournit les données médicales et démographiques. *Permet de séparer la logique métier et la présentation, et de simuler un environnement de production réel.*

---

## Structure de l'application

- **TopBar** : Barre de navigation fixe, accès rapide à toutes les sections.
- **Accueil** : Introduction et contexte sur les déserts médicaux.
- **Carte (Ratio passages/médecin)** : Visualisation de la pression sur les médecins par département.
- **Carte APL (Accessibilité)** : Carte interactive de l'Accessibilité Potentielle Localisée.
- **Tableau APL** : Tableau détaillé des scores APL par département.
- **Statistiques nationales** : Tableaux et graphiques sur la densité médicale et l'effectif par spécialité.
- **Zones à risque (démographie médicale)** : Identification des départements à risque de désertification médicale.
- **À propos** : Informations sur le projet.

---

## Les métriques utilisées

### 1. **APL — Accessibilité Potentielle Localisée**

- **Définition** : L'APL mesure la facilité d'accès aux médecins généralistes pour chaque département. Elle est calculée selon la méthode HMEP, prenant en compte la répartition géographique des médecins et de la population.
- **Interprétation** : Un APL élevé indique une meilleure accessibilité aux soins. Un score faible signale un risque de désert médical.
- **Visualisation** : Carte colorée (du rouge au vert) et tableau interactif.

### 2. **Ratio passages/médecin**

- **Définition** : Nombre de passages journaliers aux urgences rapporté à l'effectif de médecins dans chaque département.
- **Intérêt** : Permet d'identifier la pression exercée sur les médecins par la demande de soins. Un ratio élevé peut signaler une surcharge ou un manque de praticiens.
- **Visualisation** : Carte mosaïque, chaque département étant coloré selon son ratio.

### 3. **Statistiques nationales**

- **Effectif total** : Nombre total de médecins par département.
- **Densité médicale** : Nombre de médecins pour 100 000 habitants, déclinée par spécialité (généralistes, spécialistes, chirurgiens-dentistes, pharmaciens).
- **Utilité** : Permet de comparer la répartition des professionnels de santé sur le territoire et d'identifier les zones sous-dotées.

### 4. **Zones à risque (démographie médicale)**

- **Ratio retraités actifs/médecins** : Proportion de médecins retraités mais encore en activité par rapport à l'effectif total.
- **Part de médecins de plus de 55 ans** : Indicateur d'anticipation du renouvellement des effectifs.
- **Intérêt** : Ces métriques permettent d'anticiper les zones où l'offre médicale pourrait diminuer prochainement, en raison des départs à la retraite.

---

## Expérience utilisateur & design

- **Interface moderne** : Utilisation de Tailwind CSS pour un rendu épuré, responsive et agréable.
- **Cartes interactives** : Navigation fluide, survol et clic pour afficher les détails par département.
- **Tableaux dynamiques** : Tri, légendes, et explications pédagogiques intégrées.
- **Accessibilité** : Contrastes élevés, navigation clavier, responsive design.

---

## Exemple de parcours utilisateur

1. **Accueil** : Comprendre le contexte des déserts médicaux.
2. **Carte (Ratio passages/médecin)** : Visualiser la pression sur les médecins.
3. **Carte APL** : Explorer l'accessibilité aux soins sur le territoire.
4. **Tableau APL** : Comparer les scores APL et accéder au détail par département.
5. **Statistiques nationales** : Analyser la densité médicale et l'effectif par spécialité.
6. **Zones à risque** : Identifier les départements à surveiller pour l'avenir.

---

## Pour aller plus loin

- **Données** : Les données utilisées proviennent d'une API REST locale, simulant des données réelles issues de l'Assurance Maladie, de l'INSEE, etc.
- **Évolutions possibles** : Ajout de filtres temporels, intégration de données socio-économiques, analyse prédictive, export de rapports.

---

## Conclusion

Ce projet met à disposition des outils modernes pour comprendre et anticiper la problématique des déserts médicaux en France. Il combine rigueur des indicateurs, interactivité et pédagogie, afin de servir aussi bien les étudiants, les enseignants que les décideurs.

---

*Projet réalisé avec React, Vite, Leaflet, Tailwind CSS et une API REST locale. Pour toute question ou suggestion, contactez l'équipe pédagogique.*

---

## Comment lancer le projet

1. **Cloner le dépôt**

   ```bash
   git clone <url-du-depot>
   cd desert_medicaux_frontend
   ```

2. **Installer les dépendances**

   ```bash
   npm install
   ```

3. **Lancer le serveur de développement**

   ```bash
   npm run dev
   ```

4. **Accéder à l'application**

   Ouvrez votre navigateur à l'adresse indiquée dans le terminal (généralement [http://localhost:5173](http://localhost:5173)).

> **Remarque :** L'application nécessite que l'API backend soit également lancée sur [http://localhost:8000](http://localhost:8000) pour fonctionner correctement.
