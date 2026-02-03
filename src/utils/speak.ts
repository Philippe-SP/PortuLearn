export const speakPortuguese = (text: string) => {
  // On arrête les lectures en cours pour éviter les chevauchements
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  
  // On force la langue en Portugais (Portugal)
  // 'pt-PT' pour le Portugal, 'pt-BR' pour le Brésil
  utterance.lang = 'pt-PT';
  utterance.rate = 0.9; // On ralentit légèrement (1 est la vitesse normale)
  utterance.pitch = 1;

  window.speechSynthesis.speak(utterance);
};