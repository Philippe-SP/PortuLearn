import verbsDataRaw from '../data/verbs.json';
import type { Exercise, Lesson, Rule } from '../types';

interface VerbEntry {
  infinitif: string;
  group: string;
  context: string;
  conjugaisons: Record<string, Record<string, string>>;
}

// Récupération des verbes dans verbs.json
const verbsData = verbsDataRaw as Record<string, VerbEntry>;

export const createDynamicLesson = (identifier: string, tense: string, isSingleVerb: boolean = false): Lesson => {
    
  // Sélection des verbes : "ALL" (tous), isSingleVerb (un seul) ou par Groupe (AR, ER, IR)
    const filteredVerbs = identifier === "ALL" 
    ? Object.values(verbsData) 
    : (isSingleVerb 
        ? [verbsData[identifier]] 
        : Object.values(verbsData).filter(v => v.group === identifier)
        );

    // Sécurité : on vérifie qu'on a bien trouvé au moins un verbe
    if (!filteredVerbs[0]) {
    throw new Error(`Aucun verbe trouvé pour l'identifiant: ${identifier}`);
    }

  // --- BLOC GENERATION FUTUR PROCHE ---
  // Si le temps demandé est 'futuro_proximo', on injecte les données dynamiquement pour éviter de saturer le fichier verbs.json
  const processedVerbs = filteredVerbs.map(verb => {
    if (tense === 'futuro_proximo') {
      return {
        ...verb,
        conjugaisons: {
          ...verb.conjugaisons,
          futuro_proximo: {
            "Eu": `vou ${verb.infinitif.toLowerCase()}`,
            "Tu": `vais ${verb.infinitif.toLowerCase()}`,
            "Ele": `vai ${verb.infinitif.toLowerCase()}`,
            "Nós": `vamos ${verb.infinitif.toLowerCase()}`,
            "Vós": `ides ${verb.infinitif.toLowerCase()}`,
            "Eles": `vão ${verb.infinitif.toLowerCase()}`
          }
        }
      };
    }
    return verb;
  });
  // ------------------------------------

  if (!processedVerbs[0] || !processedVerbs[0].conjugaisons[tense]) {
    throw new Error("Verbe ou Groupe non trouvé pour ce temps");
  }

  const exampleVerb = processedVerbs[0];
  const conj = exampleVerb.conjugaisons[tense];

  // THÉORIE
  const rules: Rule[] = Object.entries(conj).map(([p, v]) => {
    let suffix = "";
    if (!isSingleVerb) {
      // Pour le futur proche, on met en évidence le verbe "Ir" (le premier mot)
      if (tense === 'futuro_proximo') {
        suffix = v.split(" ")[0]; 
      } else {
        suffix = v.slice(-2); 
      }
    }
    return { pronoun: p, example: v, suffix: suffix };
  });

  let allPossibleExercises: Exercise[] = [];

  processedVerbs.forEach((verb) => {
    const vConj = verb.conjugaisons[tense];
    Object.entries(vConj).forEach(([pronoun, correct]) => {
      const options = Object.values(vConj)
        .filter(val => val !== correct)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

      allPossibleExercises.push({
        id: `gen-${tense}-${verb.infinitif}-${pronoun}`,
        title: `${pronoun} ___ ${verb.context}. (${verb.infinitif})`,
        category: "Conjugaison",
        type: Math.random() > 0.6 ? 'input' : 'qcm',
        options: [correct, ...options].sort(),
        correctAnswer: correct
      });
    });
  });

  const finalExercises = allPossibleExercises
    .sort(() => Math.random() - 0.5)
    .slice(0, 8); 

  // Formatage du titre pour le futur proche
  const displayTense = tense === 'present' ? 'Presente' : (tense === 'passe' ? 'Passado' : 'Futuro Próximo');

  return {
    id: `dynamic-${identifier}-${tense}`,
    title: isSingleVerb ? `Verbo ${exampleVerb.infinitif}` : `Verbos em -${identifier} (${displayTense})`,
    category: "Conjugaison",
    theory: {
      description: isSingleVerb 
        ? `Apprends le verbe ${exampleVerb.infinitif} au ${displayTense}.`
        : `Entraîne-toi sur les verbes du groupe ${identifier}.`,
      rules: rules
    },
    exercices: finalExercises
  };
};