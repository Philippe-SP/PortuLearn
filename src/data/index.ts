// src/data/index.ts
import presentAr from './present-ar.json';
import presentEr from './present-er.json';
import presentIr from './present-ir.json';
import passeAr from './passe-ar.json';
import passeEr from './passe-er.json';
import passeIr from './passe-ir.json';
import future from './future.json';
import colors from './colors.json';
import animals1 from './animals-1.json';
import animals2 from './animals-2.json';
import numbers from './numbers.json';
import objects from './objects.json';
import emotions from './emotions.json';
import food from './food.json';
import verbeAction from './verbe-action.json';
import politeness from './politeness.json';

import type { Lesson } from '../types';

export interface LessonEntry {
  data: Lesson;
  desc: string;
}

export const grammarLessons: LessonEntry[] = [
  { data: presentAr as Lesson, desc: "Présent: Verbes réguliers en -AR" },
  { data: presentEr as Lesson, desc: "Présent: Verbes réguliers en -ER" },
  { data: presentIr as Lesson, desc: "Présent: Verbes réguliers en -IR" },
  { data: passeAr as Lesson, desc: "Passé composé: Verbes réguliers en -AR" },
  { data: passeEr as Lesson, desc: "Passé composé: Verbes réguliers en -ER" },
  { data: passeIr as Lesson, desc: "Passé composé: Verbes réguliers en -IR" },
  { data: future as Lesson, desc: "Futur proche: Verbes réguliers" },
];

export const vocabularyLessons: LessonEntry[] = [
  { data: colors as Lesson, desc: "Les couleurs" },
  { data: animals1 as Lesson, desc: "Les animaux: Niveau 1" },
  { data: animals2 as Lesson, desc: "Les animaux: Niveau 2" },
  { data: numbers as Lesson, desc: "Les nombres de 1 à 100" },
  { data: objects as Lesson, desc: "Les objets du quotidien" },
  { data: emotions as Lesson, desc: "Emotions et Etats" },
  { data: food as Lesson, desc: "Nourriture et boissons" },
  { data: verbeAction as Lesson, desc: "Les verbes d'action basiques" },
  { data: politeness as Lesson, desc: "Les formules de politesse" },
];