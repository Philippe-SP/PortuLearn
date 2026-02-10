import { useState, useEffect } from 'react';
import LessonView from './components/LessonView';
import { vocabularyLessons } from './data'; 
import { createDynamicLesson } from './utils/lessonFactory';
import type { Lesson } from './types';

function App() {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [activeTense, setActiveTense] = useState<'presente' | 'perfeito' | 'imperfeito' | 'futuro_proximo'>('presente');
  
  // NOUVEL ÉTAT : Filtrage pour la section basse
  const [activeFilter, setActiveFilter] = useState<'todos' | 'vocab' | 'treino'>('todos');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('completed_lessons') || '[]');
    setCompletedIds(saved);
  }, [selectedLesson]);

  const REGULAR_CONFIG = [
    { id: 'AR', label: 'Groupe -AR', isSingle: false },
    { id: 'ER', label: 'Groupe -ER', isSingle: false },
    { id: 'IR', label: 'Groupe -IR', isSingle: false },
    { id: 'ALL', label: 'Tous les verbes', isSingle: false },
  ];

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

  const themes = {
    presente: { color: 'border-l-[#FF0000]', text: 'text-[#FF0000]', bg: 'bg-[#FF0000]' },
    perfeito: { color: 'border-l-[#006600]', text: 'text-[#006600]', bg: 'bg-[#006600]' },
    imperfeito: { color: 'border-l-purple-500', text: 'text-purple-500', bg: 'bg-purple-500' },
    futuro_proximo: { color: 'border-l-blue-500', text: 'text-blue-500', bg: 'bg-blue-500' }
  };

  // NOUVELLE LOGIQUE : Gestion des couleurs par catégorie
  const getLessonTheme = (category: string) => {
    switch (category) {
      case 'TREINO': return { border: 'border-b-indigo-600', bg: 'bg-white' }; // Oral
      case 'SITUAÇÃO': return { border: 'border-b-pink-600', bg: 'bg-white' }; // Phraséologie
      case 'PRONÚNCIA': return { border: 'border-b-yellow-400', bg: 'bg-white' }; // Subtilités
      default: return { border: 'border-b-orange-400', bg: 'bg-white' }; // Vocabulaire classique
    }
  };

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
              <div className="flex items-center gap-3 px-2 mb-6">
                <span className="text-xl">📖</span>
                <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">Gramática</h2>
                <div className="flex-1 h-[2px] bg-slate-200 rounded-full"></div>
              </div>
              
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
                      {t === 'presente' && 'Presente'}
                      {t === 'perfeito' && 'P. Perfeito'}
                      {t === 'imperfeito' && 'P. Imperfeito'}
                      {t === 'futuro_proximo' && 'Futur Proche'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-8"> 
                <div className="space-y-3">
                  <h3 className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase ml-2 tracking-wider italic">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                    Verbos Regulares
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {REGULAR_CONFIG.map(renderVerbButton)}
                  </div>
                </div>

                <div className="space-y-3">
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

            {/* SECTION APPRENTISSAGE FILTRABLE */}
            <section className="space-y-4 pt-4">
              <div className="flex items-center gap-3 px-2 mb-6">
                <span className="text-xl">📙</span>
                <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">Apprentissage</h2>
                <div className="flex-1 h-[2px] bg-slate-200 rounded-full"></div>
              </div>

              {/* PILLS DE FILTRAGE */}
              <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar">
                {[
                  { id: 'todos', label: 'Todos' },
                  { id: 'vocab', label: 'Vocabulário' },
                  { id: 'treino', label: 'Treino' }
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setActiveFilter(f.id as any)}
                    className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                      activeFilter === f.id 
                        ? 'bg-slate-900 text-white shadow-md' 
                        : 'bg-white text-slate-400 border border-slate-200'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3">
                {vocabularyLessons
                  .filter(lesson => {
                    if (activeFilter === 'todos') return true;
                    if (activeFilter === 'vocab') return lesson.data.category === 'VOCAB';
                    if (activeFilter === 'treino') return lesson.data.category !== 'VOCAB';
                    return true;
                  })
                  .map((lesson) => {
                    const isDone = completedIds.includes(lesson.data.id);
                    const isTraining = lesson.data.category !== 'VOCAB';
                    const theme = getLessonTheme(lesson.data.category);
                    
                    return (
                      <button 
                        key={lesson.data.id}
                        onClick={() => setSelectedLesson(lesson.data)}
                        className={`${
                          isTraining ? 'col-span-2 py-4' : 'col-span-1 p-3'
                        } bg-white rounded-xl shadow-sm border-b-4 ${theme.border} active:scale-95 transition-all flex flex-col items-center text-center gap-2`}
                      >
                        <div className="flex items-center gap-2">
                          {isDone && <span className="text-green-500 text-xs">✅</span>}
                          <p className={`font-bold text-gray-800 uppercase ${isTraining ? 'text-xs tracking-wider' : 'text-[10px]'} leading-tight`}>
                            {lesson.data.title}
                          </p>
                        </div>
                        {isTraining && (
                          <span className="text-[8px] font-black text-slate-300 uppercase tracking-[0.2em]">
                            {lesson.data.category === 'TREINO' ? 'Exercício Oral' : 
                             lesson.data.category === 'SITUAÇÃO' ? 'Mise en situation' : 'Phonétique'}
                          </span>
                        )}
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