function Landing() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-500 via-cyan-400 to-blue-900 flex items-center justify-center relative overflow-hidden pt-14">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80')] bg-cover bg-center opacity-40 blur-sm"></div>
      <div id="box" className="relative z-10 flex flex-col items-center justify-center px-6 py-12 rounded-2xl bg-blue-900/70 shadow-2xl backdrop-blur-md max-w-lg w-full transition-transform duration-300 hover:scale-105 hover:shadow-3xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-200 drop-shadow-lg">Déserts Médicaux en France</h1>
        <p className="text-lg md:text-xl text-blue-100 leading-relaxed text-center">
          Découvrez la réalité des déserts médicaux en France à travers une expérience interactive et visuelle.<br/>
          Ce projet met en lumière les zones sous-dotées en professionnels de santé, leurs impacts, et les enjeux pour l'accès aux soins.
        </p>
      </div>
    </div>
  )
}

export default Landing; 