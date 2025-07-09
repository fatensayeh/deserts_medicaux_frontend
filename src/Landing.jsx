import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-500 via-cyan-400 to-blue-900">
      <div className="bg-blue-900/80 rounded-2xl shadow-xl px-8 py-12 flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-200">Déserts Médicaux en France</h1>
        <p className="text-lg text-blue-100 mb-6 text-center max-w-xl">
          Bienvenue ! Cette application vous permet d'explorer et de comprendre la situation de l'accès aux soins en France à travers des cartes et des statistiques interactives.
        </p>
        <Link to="/carte" className="mt-4 px-6 py-2 rounded bg-cyan-500 hover:bg-cyan-600 text-white font-semibold shadow transition">Découvrir l'application</Link>
      </div>
    </div>
  )
}

export default Landing; 