export const speakPortuguese = (text: string) => {
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);

  // Mots-clés qui indiquent que la phrase est une consigne en français
  const frenchKeywords = [
    "comment", "qu'est-ce", "quels", "quelle", "choisissez", 
    "cliquez", "une femme", "un homme", "si j'ai", "le nombre", "le contraire"
  ];

  const lowerText = text.toLowerCase();
  
  // DÉTECTION DE LA LANGUE
  // Si le texte commence par un mot-clé français, on utilise la voix FR
  if (frenchKeywords.some(keyword => lowerText.startsWith(keyword))) {
    utterance.lang = 'fr-FR';
  } else {
    // Sinon, on reste sur du Portugais authentique
    utterance.lang = 'pt-PT';
  }

  utterance.rate = 0.9; 
  utterance.pitch = 1;

  window.speechSynthesis.speak(utterance);
};