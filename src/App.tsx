import { useState, useEffect } from 'react';
import LessonView from './components/LessonView';
import { vocabularyLessons } from './data'; 
import { createDynamicLesson } from './utils/lessonFactory';
import type { Lesson } from './types';

function App() {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [completedIds, setCompletedIds] = useState<string[]>([]);

  // Chargement de la progression au démarrage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('completed_lessons') || '[]');
    setCompletedIds(saved);
  }, [selectedLesson]);

  // Configuration des groupes de conjugaison dynamiques
  const grammarGroups = [
    // Groupes réguliers
    { id: 'AR', tense: 'present', label: 'Présent -AR', isSingle: false, color: 'border-l-[#FF0000]', text: 'text-[#FF0000]' },
    { id: 'ER', tense: 'present', label: 'Présent -ER', isSingle: false, color: 'border-l-[#FF0000]', text: 'text-[#FF0000]' },
    { id: 'IR', tense: 'present', label: 'Présent -IR', isSingle: false, color: 'border-l-[#FF0000]', text: 'text-[#FF0000]' },
    { id: 'AR', tense: 'passe', label: 'Passé -AR', isSingle: false, color: 'border-l-[#FF0000]', text: 'text-[#FF0000]' },
    { id: 'ER', tense: 'passe', label: 'Passé -ER', isSingle: false, color: 'border-l-[#FF0000]', text: 'text-[#FF0000]' },
    { id: 'IR', tense: 'passe', label: 'Passé -IR', isSingle: false, color: 'border-l-[#FF0000]', text: 'text-[#FF0000]' },
    { id: 'ALL', tense: 'futuro_proximo', label: 'Futur proche', isSingle: false, color: 'border-l-[#FF0000]', text: 'text-[#FF0000]' },
    
    // Verbes Irréguliers
    { id: 'ser', tense: 'present', label: 'Verbe SER', isSingle: true, color: 'border-l-blue-500', text: 'text-blue-500' },
    { id: 'estar', tense: 'present', label: 'Verbe ESTAR', isSingle: true, color: 'border-l-blue-500', text: 'text-blue-500' },
    { id: 'ter', tense: 'present', label: 'Verbe TER', isSingle: true, color: 'border-l-blue-500', text: 'text-blue-500' },
    { id: 'ir', tense: 'present', label: 'Verbe IR', isSingle: true, color: 'border-l-blue-500', text: 'text-blue-500' },
  ];

  // Rendu
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900">
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
          <div className="space-y-8 animate-fade-in">
            
            {/* SECTION GRAMMAIRE (Génération Dynamique) */}
            <section className="space-y-4">
              <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest ml-2">Gramática</h2>
              <div className="grid grid-cols-1 gap-3">
                {grammarGroups.map((group) => {
                  const lessonId = `dynamic-${group.id}-${group.tense}`;
                  const isDone = completedIds.includes(lessonId);
                  return (
                    <button 
                      key={lessonId}
                      onClick={() => setSelectedLesson(createDynamicLesson(group.id, group.tense, group.isSingle))}
                      className={`w-full bg-white p-4 rounded-xl shadow-sm border-l-4 ${group.color} flex justify-between items-center active:scale-95 transition-all group`}
                    >
                      <div className="text-left flex items-center gap-3">
                        {isDone && (
                          <span className="text-green-500 bg-green-50 rounded-full p-1 text-xs">✅</span>
                        )}
                        <p className={`font-bold text-gray-800 group-hover:${group.text} transition-colors uppercase text-sm`}>
                          {group.label}
                        </p>
                      </div>
                      <span className={`${group.text} font-bold text-xl group-hover:translate-x-1 transition-transform`}>→</span>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* SECTION VOCABULAIRE (Statique) */}
            <section className="space-y-4">
              <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest ml-2">Vocabulário</h2>
              <div className="grid grid-cols-1 gap-3">
                {vocabularyLessons.map((lesson) => {
                  const isDone = completedIds.includes(lesson.data.id);
                  return (
                    <button 
                      key={lesson.data.id}
                      onClick={() => setSelectedLesson(lesson.data)}
                      className="w-full bg-white p-4 rounded-xl shadow-sm border-l-4 border-l-orange-400 flex justify-between items-center active:scale-95 transition-all group"
                    >
                      <div className="text-left flex items-center gap-3">
                        {isDone && (
                          <span className="text-green-500 bg-green-50 rounded-full p-1 text-xs">✅</span>
                        )}
                        <p className="font-bold text-gray-800 group-hover:text-orange-400 transition-colors uppercase text-sm">
                          {lesson.data.title}
                        </p>
                      </div>
                      <span className="text-orange-400 font-bold text-xl group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                  );
                })}
              </div>
            </section>

          </div>
        ) : (
          /* VUE DE LA LEÇON SELECTIONNÉE */
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