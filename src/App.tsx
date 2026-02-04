import { useState, useEffect } from 'react';
import LessonView from './components/LessonView';
import { vocabularyLessons } from './data'; 
import { createDynamicLesson } from './utils/lessonFactory';
import type { Lesson } from './types';

function App() {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  // État pour l'onglet actif
  const [activeTense, setActiveTense] = useState<'presente' | 'perfeito' | 'imperfeito' | 'futuro_proximo'>('presente');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('completed_lessons') || '[]');
    setCompletedIds(saved);
  }, [selectedLesson]);

  // Configuration des verbes réguliers
  const REGULAR_CONFIG = [
    { id: 'AR', label: 'Groupe -AR', isSingle: false },
    { id: 'ER', label: 'Groupe -ER', isSingle: false },
    { id: 'IR', label: 'Groupe -IR', isSingle: false },
    { id: 'ALL', label: 'Tous les verbes', isSingle: false },
  ];

  // Configuration des verbes irréguliers
  const IRREGULAR_CONFIG = [
    { id: 'ser', label: 'Verbe SER', isSingle: true },
    { id: 'estar', label: 'Verbe ESTAR', isSingle: true },
    { id: 'ter', label: 'Verbe TER', isSingle: true },
    { id: 'ir', label: 'Verbe IR', isSingle: true },
    { id: 'fazer', label: 'Verbe FAZER', isSingle: true },
    { id: 'dizer', label: 'Verbe DIZER', isSingle: true },
    { id: 'poder', label: 'Verbe PODER', isSingle: true },
    { id: 'querer', label: 'Verbe QUERER', isSingle: true },
    { id: 'saber', label: 'Verbe SABER', isSingle: true },
    { id: 'ver', label: 'Verbe VER', isSingle: true },
    { id: 'vir', label: 'Verbe VIR', isSingle: true },
    { id: 'trazer', label: 'Verbe TRAZER', isSingle: true },
    { id: 'sair', label: 'Verbe SAIR', isSingle: true }
  ];

  // Gestion des thèmes visuels par onglet
  const themes = {
    presente: { color: 'border-l-[#FF0000]', text: 'text-[#FF0000]', bg: 'bg-[#FF0000]' },
    perfeito: { color: 'border-l-[#006600]', text: 'text-[#006600]', bg: 'bg-[#006600]' },
    imperfeito: { color: 'border-l-purple-500', text: 'text-purple-500', bg: 'bg-purple-500' },
    futuro_proximo: { color: 'border-l-blue-500', text: 'text-blue-500', bg: 'bg-blue-500' }
  };

  // Fonction utilitaire pour éviter la répétition du bouton
  const renderVerbButton = (item: any) => {
    const lessonId = `dynamic-${item.id}-${activeTense}`;
    const isDone = completedIds.includes(lessonId);
    const theme = themes[activeTense];

    return (
      <button 
        key={lessonId}
        onClick={() => setSelectedLesson(createDynamicLesson(item.id, activeTense, item.isSingle))}
        className={`w-full bg-white p-4 rounded-xl shadow-sm border-l-4 ${theme.color} flex justify-between items-center active:scale-95 transition-all group`}
      >
        <div className="text-left flex items-center gap-3">
          {isDone && <span className="text-green-500 bg-green-50 rounded-full p-1 text-xs">✅</span>}
          <p className={`font-bold text-gray-800 group-hover:${theme.text} transition-colors uppercase text-sm`}>
            {item.label}
          </p>
        </div>
        <span className={`${theme.text} font-bold text-xl group-hover:translate-x-1 transition-transform`}>→</span>
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900 pb-10">
      <header className="bg-white shadow-md sticky top-0 z-50">
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
          <div className="space-y-10 animate-fade-in">
            
            <section className="space-y-4">
              {/* TITRE MODIFIÉ : GRAMÁTICA */}
              <div className="flex items-center gap-3 px-2 mb-6">
                <span className="text-xl">📖</span>
                <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">Gramática</h2>
                <div className="flex-1 h-[2px] bg-slate-200 rounded-full"></div>
              </div>
              
              {/* NAVIGATION PAR ONGLETS */}
              <div className="flex p-1 bg-gray-200 rounded-xl mb-4 overflow-x-auto no-scrollbar">
                <div className="flex gap-1 min-w-full">
                  {(['presente', 'perfeito', 'imperfeito', 'futuro_proximo'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setActiveTense(t)}
                      className={`flex-1 flex-none px-4 py-2 text-[10px] font-black uppercase tracking-tighter rounded-lg transition-all ${
                        activeTense === t 
                          ? `bg-white shadow-sm ${themes[t].text}` 
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {/* Mapping des noms pour l'affichage utilisateur */}
                      {t === 'presente' && 'Presente'}
                      {t === 'perfeito' && 'P. Perfeito'}
                      {t === 'imperfeito' && 'P. Imperfeito'}
                      {t === 'futuro_proximo' && 'Futur Proche'}
                    </button>
                  ))}
                </div>
              </div>

              {/* LISTE DYNAMIQUE FILTRÉE */}
              {/* Verbes réguliers */}
              <div className="space-y-8"> 
                <div className="space-y-3">
                  {/* TITRE MODIFIÉ : VERBOS REGULARES */}
                  <h3 className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase ml-2 tracking-wider italic">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                    Verbos Regulares
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {REGULAR_CONFIG.map(renderVerbButton)}
                  </div>
                </div>

                {/* Verbes irréguliers */}
                <div className="space-y-3">
                  {/* TITRE MODIFIÉ : VERBOS IRREGULARES */}
                  <h3 className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase ml-2 tracking-wider italic">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                    Verbos Irregulares
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {IRREGULAR_CONFIG.map(renderVerbButton)}
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION VOCABULAIRE */}
            <section className="space-y-4 pt-4">
              {/* TITRE MODIFIÉ : VOCABULÁRIO */}
              <div className="flex items-center gap-3 px-2 mb-6">
                <span className="text-xl">📙</span>
                <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">Vocabulário</h2>
                <div className="flex-1 h-[2px] bg-slate-200 rounded-full"></div>
              </div>

              <div className="grid grid-cols-2 gap-3"> {/* Ici on passe en 2 colonnes */}
                {vocabularyLessons.map((lesson) => {
                  const isDone = completedIds.includes(lesson.data.id);
                  return (
                    <button 
                      key={lesson.data.id}
                      onClick={() => setSelectedLesson(lesson.data)}
                      className="bg-white p-3 rounded-xl shadow-sm border-b-4 border-b-orange-400 active:scale-95 transition-all flex flex-col items-center text-center gap-2"
                    >
                      {isDone && <span className="text-green-500 text-xs">✅</span>}
                      <p className="font-bold text-gray-800 uppercase text-[10px] leading-tight">
                        {lesson.data.title}
                      </p>
                    </button>
                  );
                })}
              </div>
            </section>

          </div>
        ) : (
          <div className="animate-fade-in">
            <button 
              onClick={() => setSelectedLesson(null)}
              className="flex items-center text-[#006600] font-bold mb-6 hover:opacity-70 transition group"
            >
              <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span> Menu Principal
            </button>
            <LessonView data={selectedLesson} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;