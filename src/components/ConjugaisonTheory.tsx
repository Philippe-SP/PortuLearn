import React from 'react';

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
        <div key={idx} className="grid grid-cols-3 py-1.5 text-sm border-b border-blue-50 last:border-0 items-center">
          <span className="text-gray-500 font-medium">{rule.pronoun}</span>
          <span className="font-mono text-[#006600] font-bold bg-green-50 px-1 rounded">{rule.suffix}</span>
          <span className="italic text-gray-700">{rule.example}</span>
        </div>
      ))}
    </div>
  );
};

export default ConjugaisonTheory;