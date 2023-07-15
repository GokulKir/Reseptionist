// import { useEffect, useRef } from "react";
// import Speech from "speak-tts";

// const useSpeechSynthesis = () => {
//   const speech = useRef(null);

//   useEffect(() => {
//     speech.current = new Speech();
//     speech.current.init({
//       volume: 0.5,
//       lang: "en-GB",
//       rate: 1,
//       pitch: 1,
//       // voice: "Google UK English Female",
//       voice: "Google US English",
//       splitSentences: false
//     });

//     return () => {
//       speech.current.cancel();
//       speech.current = null;
//     };
//   }, []);

//   const speak = text => {
//     if (speech.current) {
//       speech.current.speak({
//         text,
//         queue: false
//       });
//     }
//   };

//   return speak;
// };

// export default useSpeechSynthesis;



import { useEffect, useRef } from "react";
import Speech from "speak-tts";

const useSpeechSynthesis = () => {
  const speech = useRef(null);

  useEffect(() => {
    console.log('====================================');
    console.log();
    console.log('====================================');
    speech.current = new Speech();
    speech.current.init({
      volume: 0.5,
      lang: "en-GB",
      rate: 1,
      pitch: 1,
      voice: "Google US English",
      splitSentences: false
    });

    return () => {
      speech.current.cancel();
      speech.current = null;
    };
  }, []);

  const speak = text => {
    console.log(text,speech.current,"text🥴********");
    if (speech.current) {
      try {
        speech.current.speak({
          text,
          queue: false
        });
      } catch (error) {
        console.log(error,"👻");
      }
     
    }
  };

  return speak;
};

export default useSpeechSynthesis;

