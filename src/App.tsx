import { useState } from 'react';
import LessonView from './components/LessonView';
import { grammarLessons, vocabularyLessons } from './data'; // On importe juste nos deux listes
import type { Lesson } from './types';

function App() {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  // Petite fonction utilitaire pour générer les boutons (évite la répétition de code)
  const renderLessonButtons = (lessons: any[], borderColor: string, textColor: string) => (
    <div className="space-y-3">
      {lessons.map((lesson) => (
        <button 
          key={lesson.data.id}
          onClick={() => setSelectedLesson(lesson.data)}
          className={`w-full bg-white p-4 rounded-xl shadow-sm border-l-4 ${borderColor} flex justify-between items-center active:scale-95 transition-all group`}
        >
          <div className="text-left">
            <p className={`font-bold text-gray-800 group-hover:${textColor} transition-colors`}>
              {lesson.data.title}
            </p>
            <p className="text-xs text-gray-500">{lesson.desc}</p>
          </div>
          <span className={`${textColor.replace('text-', 'text-')} font-bold text-xl group-hover:translate-x-1 transition-transform`}>→</span>
        </button>
      ))}
    </div>
  );

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
            
            <section className="space-y-4">
              <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest ml-2">Gramática</h2>
              {renderLessonButtons(grammarLessons, "border-l-[#FF0000]", "text-[#FF0000]")}
            </section>

            <section className="space-y-4">
              <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest ml-2">Vocabulário</h2>
              {renderLessonButtons(vocabularyLessons, "border-l-[#006600]", "text-[#006600]")}
            </section>

          </div>
        ) : (
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