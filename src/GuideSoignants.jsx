import React from 'react';

function GuideSoignants() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-500 via-cyan-400 to-blue-900 flex flex-col items-center justify-center py-16 px-4 relative overflow-x-auto pt-14">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1500&q=80')] bg-cover bg-center opacity-30 blur-sm animate-fade-in"></div>
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col gap-10 bg-blue-900/80 rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-200 drop-shadow-lg mb-4">Guide pratique pour les soignants en zones sous-dotées</h2>
        <p className="text-blue-100 text-lg mb-6 text-center">Vous êtes professionnel de santé et souhaitez vous installer dans une zone sous-dotée ? Ce guide vous accompagne à chaque étape, de la réflexion à l'installation, et vous informe sur les aides, démarches et ressources disponibles.</p>
        <div className="bg-blue-800/80 rounded-xl p-6 text-blue-100">
          <h3 className="font-semibold text-xl mb-2">1. Pourquoi s'installer en zone sous-dotée ?</h3>
          <ul className="list-disc list-inside mb-4">
            <li>Répondre à un besoin de santé publique et améliorer l'accès aux soins.</li>
            <li>Bénéficier d'un cadre de vie attractif et d'une patientèle fidèle.</li>
            <li>Profiter d'aides financières et d'un accompagnement personnalisé.</li>
          </ul>
          <h3 className="font-semibold text-xl mb-2">2. Les aides et dispositifs existants</h3>
          <ul className="list-disc list-inside mb-4">
            <li><b>Contrats d'aide à l'installation</b> (CAIM, CESP, etc.)</li>
            <li><b>Exonérations fiscales</b> et sociales</li>
            <li><b>Primes à l'installation</b> et subventions régionales</li>
            <li><b>Accompagnement par les ARS</b> et collectivités locales</li>
            <li><b>Dispositifs de télémédecine</b> et d'exercice coordonné</li>
          </ul>
          <h3 className="font-semibold text-xl mb-2">3. Démarches à suivre</h3>
          <ol className="list-decimal list-inside mb-4">
            <li>Identifier les zones sous-dotées via la carte interactive du site ou les ARS.</li>
            <li>Prendre contact avec l'ARS et les collectivités locales.</li>
            <li>Constituer un dossier d'installation (diplômes, projet, etc.).</li>
            <li>Choisir un mode d'exercice (libéral, salarié, maison de santé, etc.).</li>
            <li>Déposer les demandes d'aides et suivre les démarches administratives.</li>
          </ol>
          <h3 className="font-semibold text-xl mb-2">4. Ressources utiles</h3>
          <ul className="list-disc list-inside mb-4">
            <li><a href="https://sante.gouv.fr/" className="underline text-cyan-200" target="_blank" rel="noopener noreferrer">Ministère de la Santé</a></li>
            <li><a href="https://www.ameli.fr" className="underline text-cyan-200" target="_blank" rel="noopener noreferrer">Assurance Maladie</a></li>
            <li><a href="https://www.ars.sante.fr" className="underline text-cyan-200" target="_blank" rel="noopener noreferrer">Agences Régionales de Santé (ARS)</a></li>
            <li><a href="https://www.conseil-national.medecin.fr/" className="underline text-cyan-200" target="_blank" rel="noopener noreferrer">Ordre National des Médecins</a></li>
          </ul>
          <h3 className="font-semibold text-xl mb-2">5. Conseils pratiques</h3>
          <ul className="list-disc list-inside mb-4">
            <li>Visiter la zone et rencontrer les acteurs locaux (élus, professionnels, habitants).</li>
            <li>Évaluer le potentiel de patientèle et les besoins spécifiques du territoire.</li>
            <li>Se renseigner sur les possibilités d'exercice coordonné (MSP, CPTS, etc.).</li>
            <li>Anticiper les besoins logistiques (logement, locaux, matériel).</li>
            <li>Se faire accompagner par des structures spécialisées (ARS, URPS, Ordre, etc.).</li>
          </ul>
        </div>
        <div className="text-center text-blue-200 mt-8">
          <b>Pour toute question ou accompagnement personnalisé, contactez votre ARS ou l'Ordre des Médecins de votre région.</b>
        </div>
      </div>
    </div>
  );
}

export default GuideSoignants; 