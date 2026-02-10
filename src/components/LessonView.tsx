import React, { useState, useMemo, useEffect } from 'react';
import type { Lesson } from '../types';
import ConjugaisonTheory from './ConjugaisonTheory';
import VocabularyTheory from './VocabularyTheory';
import QuizTypeQCM from './exercices/QuizTypeQCM';
import QuizTypeInput from './exercices/QuizTypeInput';
import { speakPortuguese } from '../utils/speak';

interface LessonViewProps {
  data: Lesson;
}

// Fonction utilitaire pour mélanger
const shuffleArray = <T,>(array: T[]): T[] => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

const LessonView: React.FC<LessonViewProps> = ({ data }) => {
  const [isQuizMode, setIsQuizMode] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [currentDisplayType, setCurrentDisplayType] = useState<'qcm' | 'input'>('qcm');
  const [errors, setErrors] = useState(0);

  // LOGIQUE MISE À JOUR : Mélange et pioche 10 questions si c'est la catégorie SITUAÇÃO
  const shuffledExercises = useMemo(() => {
    const mixed = shuffleArray(data.exercices);
    
    // Si c'est la leçon de phraséologie (SITUAÇÃO), on limite à 10
    if (data.category === 'SITUAÇÃO') {
      return mixed.slice(0, 10);
    }
    
    // Pour les autres leçons, on garde tout le tableau
    return mixed;
  }, [data.id, data.exercices]);

  const currentExercice = shuffledExercises[currentIndex];

  useEffect(() => {
    const exercice = shuffledExercises[currentIndex];
    if (!exercice) return;

    if (exercice.type === 'input') {
      setCurrentDisplayType('input');
    } else if (exercice.type === 'qcm') {
      setCurrentDisplayType('qcm');
    } else {
      setCurrentDisplayType(Math.random() > 0.5 ? 'input' : 'qcm');
    }
  }, [currentIndex, shuffledExercises]);

  const normalizeText = (text: string) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();
  };

  const handleAnswer = (option: string) => {
    const userAnswer = normalizeText(option);
    const correctAnswer = normalizeText(currentExercice.correctAnswer);

    if (userAnswer === correctAnswer) {
      setFeedback('correct');
      
      // LOGIQUE DE VOIX INTELLIGENTE
      if (data.category === 'SITUAÇÃO') {
        // Pour les situations, on ne veut SURTOUT PAS lire la consigne "Tu es au resto..."
        // On lit uniquement la bonne réponse portugaise.
        speakPortuguese(currentExercice.correctAnswer);
      } else {
        // Pour la conjugaison et le vocabulaire, on garde ta logique de lecture de phrase complète
        const textToSpeak = currentExercice.title
          .replace(/\s*\(.*?\)\s*/g, ' ')
          .replace(/___+/g, currentExercice.correctAnswer);
        
        speakPortuguese(textToSpeak);
      }
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

  if (isFinished) {
    const completed = JSON.parse(localStorage.getItem('completed_lessons') || '[]');
    if (!completed.includes(data.id)) {
      completed.push(data.id);
      localStorage.setItem('completed_lessons', JSON.stringify(completed));
    }

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
            onClick={() => {
              const utterance = new SpeechSynthesisUtterance("");
              window.speechSynthesis.speak(utterance);
              setIsQuizMode(true);
            }}
            className="w-full mt-8 bg-[#006600] text-white py-4 rounded-2xl font-black text-lg"
          >
            Commencer
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
            <div 
              className="bg-green-600 h-full transition-all duration-500" 
              style={{ width: `${((currentIndex + 1) / shuffledExercises.length) * 100}%` }}
            ></div>
          </div>

          <div className="space-y-4">
            {currentDisplayType === 'input' ? (
              <QuizTypeInput 
                key={`input-${currentIndex}`}
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

            {!feedback && currentExercice.translation && (
              <p className="text-center text-sm text-gray-400 italic">
                "{currentExercice.translation}"
              </p>
            )}
          </div>

          {feedback && (
            <div className={`p-4 rounded-lg text-center font-bold ${
              feedback === 'correct' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700 animate-shake'
            }`}>
              <div className="mb-1">
                {feedback === 'correct' ? 'Muito bem! 🎉' : 'Errado... Tenta outra vez! ❌'}
              </div>
              
              {feedback === 'correct' && currentExercice.translation && (
                <div className="text-sm font-normal italic text-green-600 mb-2 opacity-80 border-t border-green-200 pt-2 mt-2">
                  Traduction : {currentExercice.translation.replace('___', `(${currentExercice.correctAnswer})`)}
                </div>
              )}

              {feedback === 'correct' && (
                <button onClick={nextQuestion} className="block w-full mt-3 bg-green-600 text-white py-2 rounded-lg font-bold transition-transform active:scale-95">
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