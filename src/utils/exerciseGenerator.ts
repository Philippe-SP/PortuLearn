/* --- Génération d'exercices --- */
export const generateVerbExercises = (verb: any, tense: string, groupId: string) => {
  const conjugaisons = verb.conjugaisons[tense];
  const pronouns = Object.keys(conjugaisons);

  return pronouns.map((pronoun) => {
    const correctAnswer = conjugaisons[pronoun];
    
    // Pour les distracteurs, on prend les autres formes du MÊME verbe
    const otherForms = pronouns
      .filter(p => p !== pronoun)
      .map(p => conjugaisons[p]);

    return {
      title: `${pronoun} ___ ${verb.context}. (${verb.infinitif})`,
      correctAnswer: correctAnswer,
      options: [correctAnswer, ...otherForms.sort(() => Math.random() - 0.5).slice(0, 3)].sort(() => Math.random() - 0.5),
      type: Math.random() > 0.5 ? 'input' : 'qcm'
    };
  });
};