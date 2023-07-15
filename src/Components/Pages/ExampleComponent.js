import React, { useEffect, useRef } from "react";
import useSpeechSynthesis from "../../hooks/useSpeechSynthesis";

function ExampleComponent() {
  const speak = useSpeechSynthesis();
  const buttonRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      buttonRef.current.click(); // Programmatically click the button
    }, 5000);
  }, []);

  const handleClick = () => {
    speak("Hello, Jestin!");
  };

  return (
    <div>
      <button ref={buttonRef} onClick={handleClick}>
        Speak
      </button>
    </div>
  );
}

export default ExampleComponent;
