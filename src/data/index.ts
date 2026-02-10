/******* Liste des lecons vocabulaire (statiques) *******/

// Lecons vocabulaire
import colors from './colors.json';
import animals1 from './animals-1.json';
import animals2 from './animals-2.json';
import numbers from './numbers.json';
import objects from './objects.json';
import emotions from './emotions.json';
import food from './food.json';
import restaurant from './restaurant.json';
import politeness from './politeness.json';
import familly from './familly.json';
import human from './human.json';
import calendar from './calendar.json';
import city from './city.json';
import clothes from './clothes.json';
import transport from './transport.json';
import adjectif from './adjectif.json';
import kitchen from './kitchen.json';
import liaison from './liaison.json';
import interogation from './interogation.json';
import preposition from './preposition.json';

// Lecons entrainement
import phonetic from './phonetic.json';
import situation from './situation.json';

import type { Lesson } from '../types';

export interface LessonEntry {
  data: Lesson;
  desc: string;
}

export const vocabularyLessons: LessonEntry[] = [
  // VOCABULAIRE
  { data: colors as Lesson, desc: "Les couleurs" },
  { data: animals1 as Lesson, desc: "Les animaux: Niveau 1" },
  { data: animals2 as Lesson, desc: "Les animaux: Niveau 2" },
  { data: numbers as Lesson, desc: "Les nombres de 1 à 100" },
  { data: objects as Lesson, desc: "Les objets du quotidien" },
  { data: emotions as Lesson, desc: "Emotions et Etats" },
  { data: food as Lesson, desc: "Nourriture et boissons" },
  { data: restaurant as Lesson, desc: "Les essentiels au restaurant/café" },
  { data: politeness as Lesson, desc: "Les formules de politesse" },
  { data: familly as Lesson, desc: "Les membres de la famille" },
  { data: human as Lesson, desc: "Les parties du corp humain" },
  { data: calendar as Lesson, desc: "Le vocabulaire du calendrier" },
  { data: city as Lesson, desc: "Les lieux dans une ville" },
  { data: clothes as Lesson, desc: "Les vêtements" },
  { data: transport as Lesson, desc: "Les moyens de transport" },
  { data: adjectif as Lesson, desc: "Les adjectifs communs" },
  { data: kitchen as Lesson, desc: "Les essentiels de la cuisine" },
  { data: liaison as Lesson, desc: "Les connecteurs logiques" },
  { data: interogation as Lesson, desc: "Le kit de l'interrogation" },
  { data: preposition as Lesson, desc: "Se situer dans l'espace" },

  // ENTRAINEMENT
  { data: phonetic as Lesson, desc: "Les subtilités de la prononciation" },
  { data: situation as Lesson, desc: "Exercice de situations réelles" },
];