import { useState } from 'react';
import LessonView from './components/LessonView';
import presentArData from './data/present-ar.json';
import presentErData from './data/present-er.json';
import presentIrData from './data/present-ir.json';
import passeArData from './data/passe-ar.json';
import passeErData from './data/passe-er.json';
import passeIrData from './data/passe-ir.json';
import futureData from './data/future.json';
import colorsData from './data/colors.json';
import animals1Data from './data/animals-1.json';
import animals2Data from './data/animals-2.json';
import numbersData from './data/numbers.json';
import objectsData from './data/objects.json';
import emotionsData from './data/emotions.json';
import foodData from './data/food.json';
import verbeActionData from './data/verbe-action.json';
import politenessData from './data/politeness.json';
import type { Lesson } from './types';

function App() {
  // On stocke la leçon sélectionnée. Si c'est null, on est sur le menu.
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  // Differentes lecons
  const allLessons = [
    { data: presentArData, desc: "Présent: Verbes réguliers en -AR" },
    { data: presentErData, desc: "Présent: Verbes réguliers en -ER" },
    { data: presentIrData, desc: "Présent: Verbes réguliers en -IR" },
    { data: passeArData, desc: "Passé composé: Verbes réguliers en -AR" },
    { data: passeErData, desc: "Passé composé: Verbes réguliers en -ER" },
    { data: passeIrData, desc: "Passé composé: Verbes réguliers en -IR" },
    { data: futureData, desc: "Futur proche: Verbes réguliers" },
    { data: colorsData, desc: "Les couleurs" },
    { data: animals1Data, desc: "Les animaux: Niveau 1" },
    { data: animals2Data, desc: "Les animaux: Niveau 2" },
    { data: numbersData, desc: "Les nombres de 1 à 100" },
    { data: objectsData, desc: "Les objets du quotidien" },
    { data: emotionsData, desc: "Emotions et Etats" },
    { data: foodData, desc: "Nourriture et boissons" },
    { data: verbeActionData, desc: "Les verbes d'action basiques" },
    { data: politenessData, desc: "Les formules de politesse" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900">
      {/* HEADER STYLE PORTUGAL */}
      <header className="bg-white shadow-md">
        <div className="h-2 flex">
          <div className="flex-1 bg-[#006600]"></div>
          <div className="flex-1 bg-[#FF0000]"></div>
        </div>
        <div className="p-4 text-center">
          <h1 className="text-2xl font-black tracking-tighter">
            <span className="text-[#006600]">PORTU</span>
            <span className="text-[#FF0000]">LEARN</span>
          </h1>
        </div>
      </header>

      <main className="p-4 max-w-md mx-auto">
        {!selectedLesson ? (
          /* --- MENU PRINCIPAL AVEC SECTIONS --- */
          <div className="space-y-8">
            
            {/* SECTION 1 : CONJUGAISON */}
            <section className="space-y-4">
              <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest ml-2">
                Gramática (Conjugaison)
              </h2>
              <div className="space-y-3">
                {allLessons
                  .filter(l => l.data.category !== 'VOCAB')
                  .map((lesson) => (
                    <button 
                      key={lesson.data.id}
                      onClick={() => setSelectedLesson(lesson.data as any)}
                      className="w-full bg-white p-4 rounded-xl shadow-sm border-l-4 border-l-[#FF0000] flex justify-between items-center active:scale-95 transition-all group"
                    >
                      <div className="text-left">
                        <p className="font-bold text-gray-800 group-hover:text-[#FF0000] transition-colors">
                          {lesson.data.title}
                        </p>
                        <p className="text-xs text-gray-500">{lesson.desc}</p>
                      </div>
                      <span className="text-[#FF0000] font-bold text-xl group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                  ))}
              </div>
            </section>

            {/* SECTION 2 : VOCABULAIRE */}
            <section className="space-y-4">
              <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest ml-2">
                Vocabulário (Thèmes)
              </h2>
              <div className="space-y-3">
                {allLessons
                  .filter(l => l.data.category === 'VOCAB')
                  .map((lesson) => (
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
                      <span className="text-[#006600] font-bold text-xl group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                  ))}
              </div>
            </section>

          </div>
        ) : (
          /* --- VUE DE LA LEÇON --- */
          <div className="animate-fade-in">
            <button 
              onClick={() => setSelectedLesson(null)}
              className="flex items-center text-[#006600] font-bold mb-4 hover:opacity-70 transition"
            >
              <span className="mr-2">←</span> Menu Principal
            </button>
            <LessonView data={selectedLesson} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;