import React, { useState } from 'react';
import type { Lesson } from '../types';
import ConjugaisonTheory from './ConjugaisonTheory';
import VocabularyTheory from './VocabularyTheory';

interface LessonViewProps {
  data: Lesson;
}

const LessonView: React.FC<LessonViewProps> = ({ data }) => {
  const [isQuizMode, setIsQuizMode] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  
  // Nouvel état pour le feedback visuel
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const currentExercice = data.exercices[currentIndex];

  // Calcul du pourcentage pour la barre de progression
  const progressPercentage = ((currentIndex + 1) / data.exercices.length) * 100;

  const handleAnswer = (option: string) => {
    if (option === currentExercice.correctAnswer) {
      setFeedback('correct');
    } else {
      setFeedback('wrong');
    }
  };

  const nextQuestion = () => {
    setFeedback(null);
    if (currentIndex < data.exercices.length - 1) {
        setCurrentIndex(currentIndex + 1);
    } else {
        setIsFinished(true); 
    }
  };

  if (isFinished) {
    return (
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl overflow-hidden mt-10 p-8 text-center animate-bounce-short">
        <div className="text-6xl mb-4">🇵🇹</div>
        <h2 className="text-3xl font-black text-green-800 mb-2">Parabéns!</h2>
        <p className="text-gray-600 mb-6">
            Tu as terminé la leçon <span className="font-bold">{data.title}</span> avec succès.
        </p>
        
        <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-4 mb-6">
            <p className="text-green-800 font-medium">Score : 100%</p>
        </div>

        <button 
            onClick={() => window.location.reload()} // Ou une fonction pour revenir au menu
            className="w-full bg-[#006600] text-white py-3 rounded-xl font-bold hover:bg-green-900 active:scale-95 transition-all"
        >
            Retour au menu
        </button>
        </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl overflow-hidden mt-10 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">{data.title}</h1>

      {!isQuizMode ? (
        /* --- MODE THÉORIE (inchangé) --- */
        <div className="mt-6">
          <p className="text-gray-600 italic mb-6 leading-relaxed">
            {data.theory.description}
          </p>

          {/* Choix du bon composant */}
          {data.theory.vocabulary ? (
            <VocabularyTheory vocabulary={data.theory.vocabulary} />
          ) : data.theory.rules ? (
            <ConjugaisonTheory rules={data.theory.rules} />
          ) : (
            <p>Erreur : aucune donnée de théorie trouvée.</p>
          )}

          <button
            onClick={() => setIsQuizMode(true)}
            className="w-full mt-8 bg-[#006600] text-white py-4 rounded-2xl font-black text-lg shadow-lg active:scale-95 transition-all"
          >
            Commencer
          </button>
        </div>
      ) : (
        /* --- MODE QUIZ --- */
        <div className="space-y-6">
          
          {/* BARRE DE PROGRESSION */}
          <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden flex">
            <div 
                className="bg-green-600 h-full transition-all duration-500" 
                style={{ width: `${progressPercentage}%` }}
            ></div>
            <div className="bg-red-600 w-1 h-full"></div>
          </div>

          <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400">
            <h2 className="text-lg font-medium text-yellow-800">{currentExercice.title}</h2>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {currentExercice.options.map((option) => (
              <button
                key={option}
                disabled={feedback === 'correct'} // Désactive les boutons si on a trouvé la réponse
                onClick={() => handleAnswer(option)}
                className={`p-4 border-2 rounded-lg transition font-medium ${
                  feedback === 'correct' && option === currentExercice.correctAnswer
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-800'
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          {/* MESSAGE DE VALIDATION INLINE */}
          {feedback && (
            <div className={`p-4 rounded-lg animate-bounce text-center font-bold ${
              feedback === 'correct' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {feedback === 'correct' ? 'Muito bem! 🎉' : 'Errado... Tenta outra vez! ❌'}
              
              {feedback === 'correct' && (
                <button 
                  onClick={nextQuestion}
                  className="block w-full mt-3 bg-green-600 text-white py-2 rounded-lg"
                >
                  Continuer
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
    
  );
};

export default LessonView;