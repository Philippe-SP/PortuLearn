import React from 'react';
import type { Rule } from '../types';
import { speakPortuguese } from '../utils/speak';

interface Props {
  rules: Rule[];
}

const ConjugaisonTheory: React.FC<Props> = ({ rules }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-inner p-4">
      {/* HEADER DU TABLEAU */}
      <div className="flex pb-2 border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
        <span className="w-1/4">Pronom</span>
        <span className="w-1/4 text-center">Suffixe</span>
        <span className="w-2/4 text-right">Exemple</span>
      </div>
      
      {/* LIGNES DE CONJUGAISON */}
      <div className="divide-y divide-gray-50">
        {rules.map((rule, idx) => (
          <div key={idx} className="flex items-center py-3">
            {/* PRONOM + AUDIO */}
            <div className="w-1/4 flex items-center gap-2">
              <button 
                onClick={() => speakPortuguese(rule.example)}
                className="text-xs bg-red-100 p-1.5 rounded-full active:scale-90 transition"
              >
                🔊
              </button>
              <span className="text-gray-500 text-xs sm:text-sm leading-tight">
                {rule.pronoun}
              </span>
            </div>

            {/* SUFFIXE (Au centre) */}
            <div className="w-1/4 text-center">
              <span className="text-gray-400 text-xs font-mono">
                {rule.suffix}
              </span>
            </div>

            {/* EXEMPLE (À droite, bien visible) */}
            <div className="w-2/4 text-right">
              <span className="font-bold text-[#FF0000] text-lg">
                {rule.example}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConjugaisonTheory;