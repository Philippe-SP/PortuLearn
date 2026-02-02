import { useState } from 'react';
import LessonView from './components/LessonView';
import presentArData from './data/present-ar.json';
import presentErData from './data/present-er.json';
import presentIrData from './data/present-ir.json';
import passeArData from './data/passe-ar.json';
import passeErData from './data/passe-er.json';
import passeIrData from './data/passe-ir.json';
import colorsData from './data/colors.json';
import animals1Data from './data/animals-1.json';
import numbersData from './data/numbers.json';
import type { Lesson } from './types';

function App() {
  // On stocke la leçon sélectionnée. Si c'est null, on est sur le menu.
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  // Differentes lecons
  const allLessons = [
    { data: presentArData, desc: "Conjugaison: Verbes réguliers en -AR" },
    { data: presentErData, desc: "Conjugaison: Verbes réguliers en -ER" },
    { data: presentIrData, desc: "Conjugaison: Verbes réguliers en -IR" },
    { data: passeArData, desc: "Conjugaison: Verbes réguliers en -AR" },
    { data: passeErData, desc: "Conjugaison: Verbes réguliers en -ER" },
    { data: passeIrData, desc: "Conjugaison: Verbes réguliers en -IR" },
    { data: colorsData, desc: "Vocabulaire: Couleurs" },
    { data: animals1Data, desc: "Vocabulaire: Animaux (N1)" },
    { data: numbersData, desc: "Vocabulaire: Nombres (1-100)" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900">
      {/* HEADER STYLE PORTUGAL */}
      <header className="bg-white shadow-md">
        {/* Bande de couleur supérieure */}
        <div className="h-2 flex">
          <div className="flex-1 bg-[#006600]"></div> {/* Vert */}
          <div className="flex-1 bg-[#FF0000]"></div> {/* Rouge */}
        </div>
        <div className="p-4 text-center">
          <h1 className="text-2xl font-black tracking-tighter">
            PORTU<span className="text-[#FF0000]">LEARN</span>
          </h1>
        </div>
      </header>

      <main className= "p-4 max-w-md mx-auto">
        {!selectedLesson ? (
          /* --- MENU PRINCIPAL --- */
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">
              Escolha uma lição
            </h2>
            
            {allLessons.map((lesson) => (
              <button 
                key={lesson.data.id}
                onClick={() => setSelectedLesson(lesson.data as any)}
                className="w-full bg-white p-4 rounded-xl shadow-sm border-l-4 border-l-[#006600] flex justify-between items-center active:scale-95 transition-all group"
              >
                <div className="text-left">
                  <p className="font-bold text-gray-800 group-hover:text-[#006600] transition-colors">
                    {lesson.data.title}
                  </p>
                  <p className="text-xs text-gray-500">{lesson.desc}</p>
                </div>
                <span className="text-[#006600] font-bold text-xl group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </button>
            ))}
          </div>
        ) : (
          /* --- VUE DE LA LEÇON --- */
          <div className="animate-fade-in">
            {/* BOUTON RETOUR */}
            <button 
              onClick={() => setSelectedLesson(null)}
              className="flex items-center text-[#006600] font-bold mb-4 hover:opacity-70 transition"
            >
              <span className="mr-2">←</span> Menu Principal
            </button>
            <LessonView 
              data={selectedLesson}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;