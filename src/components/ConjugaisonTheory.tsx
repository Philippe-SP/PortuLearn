import React from 'react';
import { speakPortuguese } from '../utils/speak';

interface Rule {
  pronoun: string;
  suffix: string;
  example: string;
}

interface Props {
  rules: Rule[];
}

const ConjugaisonTheory: React.FC<Props> = ({ rules }) => {
  return (
    <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 shadow-inner">
      {/* Header du tableau */}
      <div className="grid grid-cols-3 font-bold text-blue-900 border-b border-blue-200 pb-2 mb-2 text-sm">
        <span>Pronom</span>
        <span>Suffixe</span>
        <span>Exemple</span>
      </div>
      
      {/* Liste des règles */}
      {rules.map((rule, idx) => (
        <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-50">
          <span className="text-gray-500 w-12">{rule.pronoun}</span>
          
          <button 
            onClick={() => speakPortuguese(rule.example)}
            className="flex-1 text-left flex items-center gap-2 group"
          >
            <span className="font-bold text-[#FF0000] text-lg group-hover:underline">
              {rule.example}
            </span>
            <span className="text-xs opacity-0 group-hover:opacity-100 transition">🔊</span>
          </button>
        </div>
      ))}
    </div>
  );
};

export default ConjugaisonTheory;