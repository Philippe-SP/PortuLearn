export interface Rule {
  pronoun: string;
  suffix: string;
  example: string;
}

export interface VocabItem {
  word: string;
  translation: string;
}

export interface Exercise {
  id: string;
  title: string;
  category: string;
  type?: 'qcm' | 'input';
  options: string[];
  correctAnswer: string;
}

export interface Lesson {
  id: string;
  title: string;
  category: string;
  theory: {
    description: string;
    rules?: Rule[];
    vocabulary?: VocabItem[];
  };
  exercices: Exercise[];
}