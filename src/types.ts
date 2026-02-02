export interface Rule {
  pronoun: string;
  suffix: string;
  example: string;
}

export interface VocabItem {
  word: string;
  translation: string;
}

export interface Lesson {
  id: string;
  title: string;
  category: string; // "AR", "ER", "IR", "VOCAB", etc.
  theory: {
    description: string;
    rules?: Rule[];        // Optionnel
    vocabulary?: VocabItem[]; // Optionnel
  };
  exercices: {
    id: string;
    title: string;
    category: string;
    options: string[];
    correctAnswer: string;
  }[];
}