import React from 'react';
import { speakPortuguese } from '../utils/speak';

interface VocabItem {
  word: string;
  translation: string;
}

interface Props {
  vocabulary: VocabItem[];
}

const VocabularyTheory: React.FC<Props> = ({ vocabulary }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-inner p-4">
      <div className="space-y-3">
        <div className="grid grid-cols-2 pb-2 border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-widest">
          <span>Português</span>
          <span className="text-right">Français</span>
        </div>
        
        {vocabulary.map((item, idx) => (
          <div key={idx} className="grid grid-cols-2 py-2 border-b border-gray-50 items-center">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => speakPortuguese(item.word)}
                className="text-xs bg-green-100 p-1 rounded-full hover:bg-green-200 transition"
              >
                🔊
              </button>
              <span className="font-bold text-[#006600] text-lg">{item.word}</span>
            </div>
            <span className="text-gray-600 italic text-right">{item.translation}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VocabularyTheory;