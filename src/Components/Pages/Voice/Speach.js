export const TextToSpeech = ({ text }) => {
    const Speak = () => {
      const speech = new SpeechSynthesisUtterance();
  
      speech.text = text;
      speech.volume = 1;
      speech.rate = 1;
      speech.pitch = 1;
  
      window.speechSynthesis.speak(speech);
    };
}

