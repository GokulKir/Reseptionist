import React, { useState, useEffect } from "react";
import { Col, Container, Row, Image, Stack } from "react-bootstrap";
import "../../index.css";
import { Button } from "@material-tailwind/react";
import { ThemeProvider } from "styled-system";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import { useSpeechSynthesis } from 'react-speech-kit';
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Speech from "speak-tts";
import { TextTransition, presets } from "react-text-transition";
import { useRecoilState, useRecoilValue } from "recoil";
import { gustId, ListUsers, VoiceAssist, VoicePass } from "../../Recoil/recoil";
import mqtt, { log } from "mqtt/dist/mqtt";
import { useSocket } from "../../Context/SocketContext";
import { wishingPage } from "../../constant/TextConstatnt";
import { Icon } from "@iconify/react";


const Logo = require("../../assets/Robo.png");
const Robo = require("../../assets/Logo.png");

function Talk() {
  const [sp, setSp] = useState(wishingPage);
  const [talk, setTalk] = useState();
  const [VoiceAssistant, setVoiceAssistant] = useRecoilState(VoiceAssist);
  const navigate = useNavigate();
  // const { speak } = useSpeechSynthesis();
  const speech = new Speech();
  const socket = useSocket();
  const [DisplatName, setDisplatName] = useState(null);
  const [PassVoice , setPassVoice] = useRecoilState(VoicePass)
  const GusterId = useRecoilValue(gustId)
  const res = new SpeechSynthesisUtterance("hello there how can i help you today What is the purpose of visit?");


  // useEffect(() => {iii
  // socket.on('message',(data)=>{
  //  console.log(data,"socket data");
  //   const jsonData = JSON.parse(data);
  //   console.log("JSON data", jsonData);
  //   const { user, allUser } = jsonData;

  //   const message = new SpeechSynthesisUtterance(user.display_name);
  //   window.speechSynthesis.speak();
  //     });

  // }, [])
  useEffect(()=>{

    console.log("+++++"+GusterId);

  },[])
  const displayNameTrigger = (DisplayUserName) => {
    if (DisplayUserName === "Unknown") {
      console.log("Unknown Display" + DisplayUserName);
    }
  
    console.log("====================================");
    console.log(DisplayUserName);
    console.log("====================================");
  
    try {
      // const responce = new SpeechSynthesisUtterance('');
  
      if (DisplayUserName !== null) {
        const responce = new SpeechSynthesisUtterance("Hello " + DisplayUserName);
  
        if (!(DisplayUserName === "Unknown")) {
          window.speechSynthesis.speak(responce);
        }
  
        if (DisplayUserName === "Unknown") {
          const textToSpeach = (data) => {
            const speech = new Speech();
  
            console.log("====================================");
            console.log("im in with", data);
            console.log("====================================");
            const speakAfterDelay = () => {
              setTimeout(() => {
                speech.speak({
                  text: data,
                });
              }, 5000);
            };
  
            speech.init().then(() => {
              speakAfterDelay();
            });
  
            // Cleanup function
            return () => {
              speech.cancel();
            };
          };
  
          if (DisplayUserName === "Unknown") {
            console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
            navigate("/Responce");
            textToSpeach("Hello there, how can I help you today? What is the purpose of your visit?");
          } else {
            if (DisplayUserName) {
              textToSpeach("Hello " + DisplayUserName);
            }
          }
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  
  

  // useEffect(() => {
  //   socket.on("message", (data) => {
  //       // console.log(data, "Socket data");
  //     const jsonData = JSON.parse(data);
  //     //   console.log("JSON data", jsonData);
  //     const { user } = jsonData;
  //     console.log("User******", user);
  //     if (user.user == "Unknown") {
  //       // setDisplatName("Unknown");
  //       displayNameTrigger("Unknown")
  //       return;
  //     }
  //     console.log("User******", user.display_name);

  //     // setDisplatName(user.display_name);
  //     displayNameTrigger(user.display_name)
  //   });
  // }, []);

  useEffect(() => {
    console.log("Setting up socket event listener...");
  
    const handleSocketMessage = (data) => {
      console.log("Received message from server:", data);
      const jsonData = JSON.parse(data);
      const { user } = jsonData;
      console.log("User******", user);
  
      if (user.user === "Unknown") {
        displayNameTrigger("Unknown");
      } else {
        displayNameTrigger(user.display_name);
      }
    };
  
    socket.on("message", handleSocketMessage);
  
    // Cleanup function to unsubscribe the event listener when the component is unmounted
    return () => {
      console.log("Cleaning up socket event listener...");
      socket.off("message", handleSocketMessage);
    };
  }, []);
  
  



  useEffect(() => {



    console.log("Database******",DisplatName);
  

    if(DisplatName === "Unknown"){
      console.log("Unknown Display"+DisplatName);
    }


    
    console.log("====================================");
    console.log(DisplatName);
    console.log("====================================");

    try {

      // const responce = new SpeechSynthesisUtterance('');

      if(DisplatName !== null){
        const responce = new SpeechSynthesisUtterance("Hello" + DisplatName);

      
      if (!(DisplatName === "Unknown")) {
        window.speechSynthesis.speak(responce);
      }

      if (DisplatName === "Unknown") {
      
        //   let responce = new SpeechSynthesisUtterance("Hello" + DisplatName);
        const textToSpeach = (data) => {
          const speech = new Speech();

          console.log("====================================");
          console.log("im in with", data);
          console.log("====================================");
          const speakAfterDelay = () => {
            setTimeout(() => {
              speech.speak({
                text: data,
              });
            }, 5000);
          };

          speech.init().then(() => {
            speakAfterDelay();
          });

          // Cleanup function
          return () => {
            speech.cancel();
          };
        };
      

        if (DisplatName === "Unknown") {
          console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
          // window.speechSynthesis.speak(responce);
          navigate("/Responce");

          // window.speechSynthesis.speak(res);
          textToSpeach("hello there how can i help you today What is the purpose of visit?")
        } else {
       

            if (DisplatName) {
              textToSpeach("Hello" + DisplatName);
            }

          
        
          // window.speechSynthesis.speak(responce);
        }
      }
        //   new SpeechSynthesisUtterance("");

        //   setDisplatName(null);
      }
    } catch (error) {
      console.log(error.message);
    }
 
  }, [DisplatName]);



  // const Logo = 'https://mail.google.com/mail/u/0?ui=2&ik=7fe5f027a2&attid=0.4&permmsgid=msg-f:1769128226806473374&th=188d34bfc0eaa29e&view=att&disp=safe&realattid=f_lj2ql1ym1';
  // const User = 'https://mail.google.com/mail/u/0?ui=2&ik=7fe5f027a2&attid=0.3&permmsgid=msg-f:1769128226806473374&th=188d34bfc0eaa29e&view=att&disp=safe&realattid=f_lj2ql1yt3';

  const {
    transcript,
    interimTranscript,
    finalTranscript,
    resetTranscript,
    listening,
  } = useSpeechRecognition({
    language: "en-US",
    continuous: true,
    navigate,
  });

  const ResponcePage = () => {
    const speech = new Speech();
    speech
      .speak({
        text: sp,
      })
      .then(() => {
        console.log("Text spoken successfully");
      })
      .catch((e) => {
        console.error("Failed to speak text:", e);
      });
    navigate("/responce");
  };

  const startRecord = async () => {
    await SpeechRecognition.startListening();

    console.log(transcript);

   if(transcript.length > 0) {
     setPassVoice(true)
   }

    setVoiceAssistant(transcript);

    const text = "Nora";

    if (
      transcript === text ||
      text.includes("hi Nora") ||
      text.includes("i Nora") ||
      text.includes("hey Nora") ||
      text.includes("hey Nara") ||
      text.includes("hi Nara")
    ) {
      const Talking = new SpeechSynthesisUtterance(sp);

      if (Talking) {
        window.speechSynthesis.speak(Talking);
      }
      setPassVoice(true)
      setSp("");
      navigate("/responce");
    }
  };

  useEffect(() => {
    startRecord();
  }, [startRecord]);

  return (
    <div className="">
      <div className="w-full h-25 bg-white-500 flex justify-center mt-20">
        <h1 className="text-2xl font-light  ">Welcome to</h1>
      </div>

      <div className="w-full h-50 bg-white-500 flex justify-center mt-[42px]">
        <img className="w-[200px] md:w-[300px] lg:w-[330px] " src={Logo} />
      </div>

      <div className="w-full h-50  flex  mt-[140px]  md:max-lg:flex  flex-row justify-center space-x-4 pr-[10px]">
        <div className="">
          <img
            className=" w-[80px] md:w-[120px] lg:w-[140px] sm:w-[90px] md:max-lg:flex"
            src={Robo}
          />
        </div>

        <div>
          <h1 className="text-[30px]  md:text-[60px] lg:text-[70px] mt-[24px] font-light	">
            I'm
          </h1>
        </div>

        <div>
          <h1 className="text-[30px]  md:text-[60px] lg:text-[70px] mt-[24px] font-bold">
            Norah!
          </h1>
        </div>

        <div className=""></div>
      </div>

      <div className="w-full h-[70px]  mt-[40px] flex justify-center pr-[100px]">
        <Button
          onClick={ResponcePage}
          className="group relative w-[90px] h-[55px] md:w-[98px] md:h-[65px] justify-center lg:w-[200px] overflow-hidden rounded-lg bg-[#F14F13]"
        >
          <span class="text-white  group-hover:text-white text-[10px] md:text-[15px] mx-auto">
            Hi Norah!
          </span>
        </Button>
      </div>

      <div className="text-left fixed w-full bottom-0  pl-[20px]  ">
        <Link style={{ color: "#000" }} to={"https://www.devlacus.com/"}>
          <p className="text-[11px] md:text-[13px] lg:text-[15px]  ">
            HUBO | All rights reserved @ 2023 Devlacus Technologies
          </p>
        </Link>
      </div>
    </div>
  );
}

export default Talk;
