import React, { useState, useMemo, useEffect } from 'react';
import type { Lesson } from '../types';
import ConjugaisonTheory from './ConjugaisonTheory';
import VocabularyTheory from './VocabularyTheory';
import QuizTypeQCM from './exercices/QuizTypeQCM';
import QuizTypeInput from './exercices/QuizTypeInput';

interface LessonViewProps {
  data: Lesson;
}

// Fonction utilitaire pour mélanger
const shuffleArray = <T,>(array: T[]): T[] => [...array].sort(() => Math.random() - 0.5);

const LessonView: React.FC<LessonViewProps> = ({ data }) => {
  const [isQuizMode, setIsQuizMode] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  // Etat pour le type d'exercice actuel
  const [currentDisplayType, setCurrentDisplayType] = useState<'qcm' | 'input'>('qcm');
  
  // Nouveaux états pour le score
  const [errors, setErrors] = useState(0);

  // Mélange les exercices UNIQUEMENT quand la leçon change
  const shuffledExercises = useMemo(() => shuffleArray(data.exercices), [data.id]);
  const currentExercice = shuffledExercises[currentIndex];

  // 2. Initialiser le type quand on change de question
  useEffect(() => {
    const exercice = shuffledExercises[currentIndex];
    
    if (exercice.type === 'input') {
      setCurrentDisplayType('input');
    } else if (exercice.type === 'qcm') {
      setCurrentDisplayType('qcm');
    } else {
      // Si aucun type n'est forcé, on choisit l'aléatoire ICI
      // Il ne changera plus jusqu'à la prochaine question
      setCurrentDisplayType(Math.random() > 0.5 ? 'input' : 'qcm');
    }
  }, [currentIndex, shuffledExercises]);

  const handleAnswer = (option: string) => {
    const userAnswer = option.trim().toLowerCase();
    const correctAnswer = currentExercice.correctAnswer.trim().toLowerCase();

    if (userAnswer === correctAnswer) {
      setFeedback('correct');
    } else {
      setFeedback('wrong');
      setErrors(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    setFeedback(null);
    if (currentIndex < shuffledExercises.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsFinished(true);
    }
  };

  // --- RENDU : FIN DE LEÇON ---
  if (isFinished) {
    const totalQuestions = shuffledExercises.length;
    return (
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-8 text-center animate-bounce-short">
        <div className="text-6xl mb-4">🇵🇹</div>
        <h2 className="text-3xl font-black text-green-800 mb-2">Parabéns!</h2>
        <p className="text-gray-600 mb-6">Leçon terminée : <strong>{data.title}</strong></p>
        
        <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-4 mb-6">
          <p className="text-green-800 font-medium">Erreurs commises : {errors}</p>
        </div>

        <button 
          onClick={() => window.location.reload()} 
          className="w-full bg-[#006600] text-white py-3 rounded-xl font-bold"
        >
          Retour au menu
        </button>
      </div>
    );
  }

  // --- RENDU : PRINCIPAL ---
  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">{data.title}</h1>

      {!isQuizMode ? (
        <div className="mt-6">
          <p className="text-gray-600 italic mb-6">{data.theory.description}</p>
          {data.theory.vocabulary ? (
            <VocabularyTheory vocabulary={data.theory.vocabulary} />
          ) : (
            <ConjugaisonTheory rules={data.theory.rules || []} />
          )}
          <button
            onClick={() => setIsQuizMode(true)}
            className="w-full mt-8 bg-[#006600] text-white py-4 rounded-2xl font-black text-lg"
          >
            Commencer
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* BARRE DE PROGRESSION */}
          <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
            <div 
              className="bg-green-600 h-full transition-all duration-500" 
              style={{ width: `${((currentIndex + 1) / shuffledExercises.length) * 100}%` }}
            ></div>
          </div>

          {/* LOGIQUE DE SÉLECTION D'EXERCICE */}
          {currentDisplayType === 'input' ? (
            <QuizTypeInput 
              key={`input-${currentIndex}`} // La "key" force React à bien séparer les composants
              exercise={currentExercice as any} 
              feedback={feedback} 
              onAnswer={handleAnswer} 
            />
          ) : (
            <QuizTypeQCM 
              key={`qcm-${currentIndex}`}
              exercise={currentExercice as any} 
              feedback={feedback} 
              onAnswer={handleAnswer} 
            />
          )}

          {/* FEEDBACK ET BOUTON SUIVANT */}
          {feedback && (
            <div className={`p-4 rounded-lg text-center font-bold ${
              feedback === 'correct' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700 animate-shake'
            }`}>
              {feedback === 'correct' ? 'Muito bien! 🎉' : 'Errado... Tenta outra vez! ❌'}
              {feedback === 'correct' && (
                <button onClick={nextQuestion} className="block w-full mt-3 bg-green-600 text-white py-2 rounded-lg">
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