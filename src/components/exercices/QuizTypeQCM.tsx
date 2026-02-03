import React from 'react';

interface Props {
  exercise: {
    title: string;
    options: string[];
    correctAnswer: string;
  };
  feedback: 'correct' | 'wrong' | null;
  onAnswer: (option: string) => void;
}

const QuizTypeQCM: React.FC<Props> = ({ exercise, feedback, onAnswer }) => {
  return (
    <div className="space-y-6">
      <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400">
        <h2 className="text-lg font-medium text-yellow-800">{exercise.title}</h2>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {exercise.options.map((option) => (
          <button
            key={option}
            disabled={feedback === 'correct'}
            onClick={() => onAnswer(option)}
            className={`p-4 border-2 rounded-lg transition font-medium ${
              feedback === 'correct' && option === exercise.correctAnswer
                ? 'border-green-500 bg-green-50'
                : 'border-gray-200 hover:border-gray-800'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizTypeQCM;