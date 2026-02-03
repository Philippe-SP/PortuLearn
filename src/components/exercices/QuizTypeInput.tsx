import React, { useState } from 'react';

interface Props {
  exercise: {
    title: string;
    correctAnswer: string;
  };
  feedback: 'correct' | 'wrong' | null;
  onAnswer: (answer: string) => void;
}

const QuizTypeInput: React.FC<Props> = ({ exercise, feedback, onAnswer }) => {
  const [userInput, setUserInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (feedback !== 'correct' && userInput.trim() !== '') {
      onAnswer(userInput.trim());
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-4 bg-blue-50 border-l-4 border-blue-400">
        <h2 className="text-lg font-medium text-blue-800">Tape la bonne réponse :</h2>
        <p className="mt-2 text-xl font-semibold text-gray-700">{exercise.title}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          disabled={feedback === 'correct'}
          placeholder="Écris ici..."
          className={`w-full p-4 border-2 rounded-xl text-lg outline-none transition-all ${
            feedback === 'correct' 
              ? 'border-green-500 bg-green-50' 
              : 'border-gray-200 focus:border-blue-500'
          }`}
          autoFocus
        />
        
        {feedback !== 'correct' && (
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold active:scale-95 transition-all"
          >
            Vérifier
          </button>
        )}
      </form>
    </div>
  );
};

export default QuizTypeInput;