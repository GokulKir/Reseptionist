import React, { useState, useEffect, useId } from "react";
import { Button } from "@material-tailwind/react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { TextTransition, presets } from "react-text-transition";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Speech from "speak-tts";
import "./Res.css";
import { Alert } from "react-bootstrap";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import {
  VoiceAssist,
  VoiceData,
  Question,
  ListUsers,
} from "../../Recoil/recoil";
import { Icon } from "@iconify/react";
import MovingText from "react-moving-text";
import { useFaceDetection } from "react-use-face-detection";
import Swal from "sweetalert2";
import { useSocket } from "../../Context/SocketContext";
import moment from "moment";

import {preferedText,wishingPage,visitPurpose} from '../../constant/TextConstatnt'


const Logo = require("../../assets/Robo.png");
const Robo = require("../../assets/Logo.png");

function Responce() {
  const [sp, setSp] = useState(wishingPage);
  const [Timesp, setTimeSp] = useState(visitPurpose);
  const [AllVoice, setAllVoice] = useRecoilState(VoiceAssist);
  const [Voicedata, setVoicedata] = useRecoilState(VoiceData);
  const [Talk, setTalk] = useState("");
  const [Typed, setTyped] = useState();
  const [Qa, setQa] = useRecoilState(Question);
  const [condition, setcondition] = useState(
    preferedText
  );
  

  const [selection, setSelection] = useState(0);
  const [givenName, setgivenName] = useState();
  const [giventime, setgivenTime] = useState();
  const [listUsers, setListUsers] = useRecoilState(ListUsers);
  const [EmSelection , setEmselection] = useState(false) 
  const [ConfirmSelection , setConfirmselection] = useState(false)
  const [ta, setTa] = useState("meet a");
  const navigate = useNavigate();
  const [DisplayName, setDisplayName] = useState(null);
  const id = useId();
  const [data, setData] = useState();
  const [OnetimeSpeak, setOnetimeSpeak] = useState(true)
  const socket = useSocket();



  const PersonName = () => {
    return (
    

  <div class="backdrop-blursm bg-black  inset-0 backdrop-blur-sm bg-opacity-25 fixed justify-center items-center flex ">
     <div className="flex justify-center  w-[450px] h-[290px] bg-white rounded shadow ">

      <div className="mt-[40px]">
        <div className="flex justify-center">

      <Icon className="w-[60px] h-[60px] " color="FB8C00" icon="fluent:person-32-filled" />

      </div>

      <div className="mt-[50px]">
        
        <p className="text-[16px] text-black  font-bold">Which employe would you prefered to ?</p>
        
        </div>


        <div className="flex justify-center mt-[30px]">
        <Button onClick={()=> setEmselection(false)} text='Cancel' className="w-[120px] h-[41px] flex  border-2   border-orange-600 content-center justify-center ">
 
          <p className="text-stone-950 mt-[-9px]">Cancel</p>
          
          </Button>          
        </div>

      </div>

     

      <div>

      </div>












      

{/* 
      <div className="mt-[20px] ">

<p>Which employee would you prefered to?</p>



</div> */}


     </div>


  </div>
       
    
    )
   }



   const ConfirmSpeak = () => {
    return (
      <div class="backdrop-blursm bg-black  inset-0 backdrop-blur-sm bg-opacity-25 fixed justify-center items-center flex ">


<div className="flex justify-center  w-[450px] h-[290px] bg-white rounded shadow ">

<div className="mt-[40px] ">
  <div className="flex justify-center">

<Icon className="w-[60px] h-[60px] " color="FB8C00" icon="fluent:person-32-filled" />

</div>

<div className="mt-[50px]">
  
  <p className="text-[16px] text-black  font-bold">Let me confirm, so you are here to meet {givenName}</p>
  
  </div>

   <div className="flex ">
  <div className="flex justify-center mt-[30px] flex-row ">
  <Button onClick={()=> setEmselection(false)} text='Cancel' className="w-[120px] h-[41px] flex  border-2   border-green-500  content-center justify-center ">

    <p className="text-stone-950 mt-[-9px]">Yes</p>
    
    </Button>     



     <Button onClick={()=> setEmselection(false)} text='Cancel' className="w-[120px] h-[41px] flex  border-2   border-red-500  content-center justify-center  ml-[70px]">

    <p className="text-stone-950 mt-[-9px]">No</p>
    
    </Button>      
  </div>

  </div>

</div>



<div>
</div>
</div>
        
      </div>
    )
   }
 
 

  useEffect(() => {
    const currentTime = moment().format("YYYY-MM-DD HH:mm:ss");

    // socket.on("allusers", (data) => {
    //   const jsonData = JSON.parse(data);
    //   const { allUser } = jsonData;

    //   setData(allUser);
    //   console.log(allUser,"allUser***");
    //   console.log("Current data" + currentTime);

    //   socket.emit("payload", {});

    //   socket.on("apiResponse", (data) => {
    //   const jsonData = JSON.parse(data);
    //   console.log("API Response:", jsonData);


    //     // Handle the API response here
    //   });



    //   // socket.emit("payload", { message: currentTime });

    //   // socket.on("apiResponse", (data) => {
    //   //     console.log("API Response:", data);
    //   //     // Handle the API response here
    //   // });
    // });


   
  
 //API Calling single user//
  

    const callUser = ()=>{
      socket.on("userList", (data) => {
        // const jsonData = JSON.parse(data);
        // const { allUser } = jsonData;
        // setData(allUser);
  
        const userJson = JSON.parse(data);
        setData(userJson)
        console.log("API Response:", userJson);
      });
    }
    socket.emit("getAllUsers", { message: "Hello from the client" });
setTimeout(() => {
  callUser()
}, 1000);

  }, []);

  useEffect(() => {
    if (data) {
      // const foundUser = data.find((user) => user?.display_name === "Harish");

      const foundUser = data.find(obj => obj.display_name.includes(Talk));
      console.log(data);

      console.log('====================================');
      console.log(foundUser);
      console.log('====================================');

      if (
        foundUser ||
        `meet a ${foundUser}` ||
        `meet sheduled a ${foundUser}`
      ) {
        console.log('====================================');
        console.log('🤒');
        console.log('====================================');
        setEmselection(true)
        setgivenName(foundUser?.display_name);

      const confirmed = new SpeechSynthesisUtterance("Condacting" + foundUser.display_name);
      window.speechSynthesis.speak(confirmed);
        // console.log("Matched userData", display_name);
      }
    }
  }, [data])

   //API Calling single user//



  


  useEffect(() => {
    console.log(listUsers, "listUsers");
  }, [listUsers]);



  useEffect(() => {
    if (DisplayName?.display_name) {
      console.log(DisplayName, "DisplayName");
      const confirmed = new SpeechSynthesisUtterance(condition);
      // window.speechSynthesis.speak(DisplayName?.display_name);
    }
  }, [DisplayName]);

  const MeetaPerson = () => {
 
    setSelection(0);
  };



  const MeetAlert = () => {
    const confirmed = new SpeechSynthesisUtterance(condition);
    window.speechSynthesis.speak(confirmed);

    Swal.fire({
      title: condition,
      text: "Please name the person?",
      icon: "question",
      confirmButtonText: "Cancel",
      timer: 9000,
    }).then((res) => {
      console.log("responce", res);
    });

    setEmselection(true)


    // Swal.fire({
    //   title: "Which employee would you prefered to?",
    //   text: "Please name the person?",
    //   icon: "question",
    //   confirmButtonText: "Cancel",
    //   timer: 9000,
    // }).then((res) => {
    //   console.log("responce", res);
    // });

    // setTimeout(() => {
    //   navigate("/NotRes");
      
    // }, 9000);
  };


  const AlertBox = () => {
      Swal.fire({
        title: "Confirm",
        text: `Let me confirm, so you are here to meet ${givenName}`,
        icon: "info",
        confirmButtonText: "Yes",
        confirmButtonColor: "#FB8C00",
        iconColor: "#22c2e6",
        showCancelButton: true,
        cancelButtonText: "No",
        cancelButtonColor: "#757575",
        buttonsStyling: false,
        customClass: {
          confirmButton: "swal-confirm-button",
          cancelButton: "swal-cancel-button",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          console.log("Is conformed");
          navigate("/Conditions");
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          console.log("Is Rejected");
          navigate("/NotRes");
        }
      });
  };





  const Assist = async () => {
    await SpeechRecognition.startListening();
    console.log("This is voice" + transcript);
    setTalk(transcript);
  };
  const {
    transcript,
    interimTranscript,
    finalTranscript,
    resetTranscript,
    listening,
  } = useSpeechRecognition({
    language: "en-US",
    continuous: true,
  });

  const [alert, setAlert] = React.useState({
    type: "error",
    text: "This is a alert message",
    show: false,
  });
  function onCloseAlert() {
    setAlert({
      type: "",
      text: "",
      show: false,
    });
  }
  function onShowAlert(type) {
    setAlert({
      type: type,
      text: "Demo alert",
      show: true,
    });
  }

  const Info = () => {
    return (
      <div
        class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4"
        role="alert"
      >
        <p class="font-bold">Be Warned</p>
        <p>Something not ideal might be happening.</p>
      </div>
    );
  };

  const startListening = async () => {
    await SpeechRecognition.startListening();
    console.log(transcript);
    setTalk(transcript);

    console.log(transcript);
  };

  useEffect(() => {
    const text = "meet a person";

    if ( text || text.includes("please meet a person") || text.includes("please shedule a meeting") || text.includes("please shedule a meet") || text.includes('shedule a meet') || text.includes('shedule a meet') || text.includes('shedule meet')
    ) {
      console.log("Meet sheduled");
      const confirmed = new SpeechSynthesisUtterance(condition);
      window.speechSynthesis.speak(confirmed);
      setcondition("");
      MeetAlert();
      // AlertBox()
    }
  }, []);



  useEffect(() => {
    startListening();
  }, [startListening]);


  // useEffect(() => {
  //   console.log("This id");

  //   const speakText = () => {
  //     setSp(visitPurpose)
  //     console.log("This is voice " + AllVoice);
  //     const mettingPurposeSpeach = new SpeechSynthesisUtterance(Timesp);
  //     window.speechSynthesis.speak(mettingPurposeSpeach);
  //   };
  //   // speakText()

  //   // const intervalId = setInterval(speakText, 10000);

  //   setTimeout(() => {
  //     speakText();
  //   }, 1000);


  //   // Clean up the interval when the component unmounts
  //   // return () => clearInterval(intervalId);

  //   if (visitPurpose) {
  //     startListening();
  //   }
  // }, []);




useEffect(() => {
  const speakText = () => {
    setSp(visitPurpose);
    console.log("This is voice 🤢😈🤐" + AllVoice);
    const speech = new Speech();
  speech
    .init({
      volume: 0.5,
      lang: "en-GB",
      text: Timesp,
      rate: 1,
      pitch: 1,
      'voice':'Google UK English Female',
      'splitSentences': false,
      listeners: {
        onvoiceschanged: voices => {
          console.log("Voices changed", voices);
        }
      }
    }).then(() => {
      console.log("Text spoken successfully");
    })
    .catch((e) => {
      console.error("Failed to speak text:", e);
    });
    // const mettingPurposeSpeach = new SpeechSynthesisUtterance(Timesp,()=>{
    //   console.log('====================================');
    //   console.log('INITIAL LOG******');

    //   console.log('====================================');
    // });
    // window.speechSynthesis.speak(mettingPurposeSpeach);
    setOnetimeSpeak(false)
  };
if(OnetimeSpeak){
  speakText();
}
  // setTimeout(() => {
  // }, 1000);

  if (visitPurpose) {
    startListening();
  }
}, []);


  useEffect(() => {
    console.log("This id");

 
    

   






  const speakText = () => {
    setSp("What is the purpose of your visit?");
  
    console.log("This is voice " + AllVoice);
    const meetingPurposeSpeech = new SpeechSynthesisUtterance(Timesp);
    window.speechSynthesis.speak(meetingPurposeSpeech);
  };
   
  useEffect(()=>{

    setTimeout(() => {
      speakText()
    }, 10000);

  },[])





  /*/ Meet sheduling/*/

  useEffect(() => {
    if (Talk === "please shedule meet") {
      console.log("Give answer to meet");
      MeetAlert();
    }
  }, []);

  const Navigation = () => {
    // navigate('/NotRes')
    AlertBox();
  };

  return (
    <div>


      <div className="bg-white-500 w-full h-[80px]">
        <div className="ml-[26px] mt-[15px] bg">
          <img className="w-[130px]  md:w-[160px] lg:w-[180px]" src={Logo} />
          <Say speak="A quick brown fox jumped over the lazy dogs." />

        </div>
      </div>

      <div className="w-full h-[120px] flex  mt-[10px] flex-row">
        <div className="w-[120px] h-[120px]  ">
          <img
            className="w-[70px] md:w-[80px] lg:w-[120px] ml-[30px] "
            src={Robo}
          />
        </div>

        <div className="mt-[17px] ml-[0px] md:ml-[30px] md:mt-[21px] lg:mt-[29px] lg:ml-[60px] sm:ml-[10px]  ">
 
          <MovingText
            className="font-light text-[18px] md:text-[29px]"
            type="slideInFromBottom"
            duration="1000ms"
            delay="0s"
            direction="normal"
            timing="ease"
            iteration="1"
            fillMode="none"
          >
            {sp}
          </MovingText>
        </div>
      </div>



      <div className="w-full h-[80px] bg-white-700 mt-[20px] md:mt-[60px] lg:mt-[120px] flex-row left-5 right-5 ">
        <div className=" flex  space-x-4 md:space-x-12  lg:space-x-10] ">
          <div className="w-[1px] md:w-2 lg:w-5 lg: flex   "></div>
          <Button
            onClick={() => MeetAlert()}
            className="w-[130px] h-[38px] md:w-[250px] md:h-[60px] lg:w-[290px] lg:h-[65px] bg-orange-600  content-center "
          >
            <h1 className="text-[8px]  md:text-[17px] ">To meet a person</h1>
          </Button>
          <div className="w-[1px]"></div>
        </div>
      </div>
      <div className="text-left fixed w-full bottom-0  pl-[20px]  ">
        <Link style={{ color: "#000" }} to={"https://www.devlacus.com/"}>
          <p className="text-[11px] md:text-[13px] lg:text-[15px]  ">
            HUBO | All rights reserved @ 2023 Devlacus Technologies
          </p>
        </Link>
      </div>


      {ConfirmSelection === true  ?

<ConfirmSpeak/>

 : null
}


{EmSelection === true  ?


<PersonName/>

 : null
}


    </div>
  );
}

export default Responce;
