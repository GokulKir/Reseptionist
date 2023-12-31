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
  PorposeOfVisit,
  VoicePass,
  gustId,
  UnknownVoice,
} from "../../Recoil/recoil";
import { Icon } from "@iconify/react";
import MovingText from "react-moving-text";
import { useFaceDetection } from "react-use-face-detection";
import Swal from "sweetalert2";
import { useSocket } from "../../Context/SocketContext";
import moment from "moment";
// import axios from 'axios'
import {
  preferedText,
  wishingPage,
  visitPurpose,
} from "../../constant/TextConstatnt";
// import axios from "../../utils/axios";
import { SingleUserByName } from "../../api/apiCalls";
import { EmployeeData } from "../../Recoil/recoil";
import { useSnackbar } from 'react-simple-snackbar'


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
  const [condition, setcondition] = useState(preferedText);
  const [employeeDetails, setEmployeeDetails] = useRecoilState(EmployeeData);
  const [selection, setSelection] = useState(0);
  const [givenName, setgivenName] = useState();
  const [giventime, setgivenTime] = useState();
  const [listUsers, setListUsers] = useRecoilState(ListUsers);
  const [purposeOfVisit, setPorposeOfVisit] = useRecoilState(PorposeOfVisit);
  const purposeOfVisitValue = useRecoilValue(PorposeOfVisit);

  const GusterId = useRecoilValue(gustId)

  useEffect(()=>{

    console.log("Data>>>>>>>>>>>>> This is Data",gustId);

  },[])

  const PassVoice = useRecoilState(VoicePass);


  const options = {
    position: 'top-center',
    style: {
      backgroundColor: '#fff',
      border: '#FB8C00',
      color: '#FB8C00',
      fontFamily: 'Menlo, monospace',
      fontSize: '20px',
      textAlign: 'center',
    },
    closeStyle: {
      color: 'lightcoral',
      fontSize: '16px',
    },
  }


  const [ta, setTa] = useState("meet a");
  const navigate = useNavigate();
  const [DisplayName, setDisplayName] = useState(null);
  const id = useId();
  const [data, setData] = useState();
  const [OnetimeSpeak, setOnetimeSpeak] = useState(true);
  const socket = useSocket();
  const [meetAlert, setMeetAlert] = useState(true);
  const [oneTimeAlert, setOneTimeAlert] = useState(true);
  const [EmSelection, setEmselection] = useState(false);
  const [nameTranscribe, setNameTranscribe] = useState("");
  const [userData, setUserData] = useState([]);
  const [userdisplayName, setUserdisplayName] = useState("");
  const [userNameConfirmation, setUserNameConfirmation] = useState(false);
  const [nameConformation, setNameConformation] = useState(false);
  const  [MeetPending , setMeetPending] = useState(false);
  const [speechSpoken, setSpeechSpoken] = useState(false);

 const  UnPersone = useRecoilValue(UnknownVoice)


 


 useEffect(() => {
  let speakMessage = null;

  const speakAndNavigate = async () => {
    speakMessage = new SpeechSynthesisUtterance("Hello there, how can I help you today? What is the purpose of your visit?");
    const message = "Hello there, how can I help you today? What is the purpose of your visit?";
    if(UnPersone === "Unknown") {   
         console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$+++++++++++++++",UnPersone);
    
      window.speechSynthesis.speak(speakMessage);
      setSpeechSpoken(true); // Mark speech as spoken
    }
  };

  speakAndNavigate();

  // Cleanup function to cancel speech if needed
  return () => {
    if (speakMessage) {
      window.speechSynthesis.cancel();
    }
  };
}, [speechSpoken]);


  useSnackbar(options)

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

    const callUser = () => {
      socket.on("userList", (data) => {
        // const jsonData = JSON.parse(data);
        // const { allUser } = jsonData;
        // setData(allUser);

        const userJson = JSON.parse(data);
        setData(userJson);
        console.log("API Response:", userJson);
      });
    };
    socket.emit("getAllUsers", { message: "Hello from the client" });
    setTimeout(() => {
      callUser();
    }, 1000);
  }, []);

  useEffect(() => {
    if (data) {
      // const foundUser = data.find((user) => user?.display_name === "Harish");

      const foundUser = data.find((obj) => obj.display_name.includes(Talk));
      console.log(data, "😯");
      if (
        foundUser ||
        `meet a ${foundUser}` ||
        `meet sheduled a ${foundUser}`
      ) {
        AlertBox();
        setgivenName(foundUser?.display_name);

      const confirmed = new SpeechSynthesisUtterance("Condacting" + foundUser.display_name);
      window.speechSynthesis.speak(confirmed);
        // console.log("Matched userData", display_name);
      }
    }
  }, [data, Talk]);

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

  const MeetAlert = async () => {
    setMeetAlert(false);
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

    setTimeout(() => {
      navigate("/NotRes");
    }, 9000);

    if (givenName) {
      AlertBox();
    }
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
    setTalk(transcript);
    if (transcript.length > 0) {
      setNameTranscribe(transcript);
    }

    if (meetAlert && transcript.length > 0 && oneTimeAlert) {
      console.log(transcript, "🫥");
      setPorposeOfVisit(transcript);
      setTimeout(() => {
        setOneTimeAlert(false);
      }, 9000);
    }
  };

  useEffect(() => {
    if (EmSelection && !userNameConfirmation) {
      const confirmed = new SpeechSynthesisUtterance(condition);
      window.speechSynthesis.speak(confirmed);
    }
  }, [EmSelection]);

  useEffect(() => {
    if (userNameConfirmation) {
      const confirmed = new SpeechSynthesisUtterance(
        `Do you want to meet with ${userdisplayName}`
      );
      window.speechSynthesis.speak(confirmed);
    }
  }, [userNameConfirmation]);

  useEffect(() => {
    if (EmSelection) {
      setTimeout(() => {
        SingleUserByName(nameTranscribe).then((getUserData) => {
          if (getUserData) {

            setUserData(getUserData);
            
          }
        });
      }, 4000);

      let nameNotRecognized = setTimeout(() => {
        if (!nameConformation) {
          setMeetPending(true)
        }
      }, 50000);
      if (nameConformation) {
        clearTimeout(nameNotRecognized);
      }
    }
  }, [nameTranscribe, nameConformation]);

  useEffect(() => {
    if (userData.length > 0) {
      setUserdisplayName(userData[0]?.display_name);
    }
  }, [userData]);
  useEffect(() => {
    if (userdisplayName) {
      setEmselection(false);
      setUserNameConfirmation(true);
    }
  }, [userdisplayName]);


  useEffect(() => {
    if (userNameConfirmation) {
      if (nameTranscribe.toLowerCase().includes("yes")) {
        navigate("/contactform");
        setNameConformation(false);
        setEmployeeDetails(userData);
      }
      if (nameTranscribe.toLowerCase().includes("no")) {
        setMeetPending(true)
        // navigate("/NotRes");
      }
      // setUserNameConfirmation(false)
    }

  }, [userNameConfirmation, nameTranscribe]);


  useEffect(() => {
    if (!oneTimeAlert) {
      setEmselection(true);
    }
  }, [oneTimeAlert]);

  useEffect(() => {
    const text = "meet";
    let oneTimeAlertData = true;

    if ( text || text.includes("please meet a person") || text.includes("please shedule a meeting") || text.includes("please shedule a meet") || text.includes('shedule a meet') || text.includes('shedule a meet') || text.includes('shedule meet')
    ) {
      console.log("Meet sheduled");
      const confirmed = new SpeechSynthesisUtterance(condition);
      window.speechSynthesis.speak(confirmed);
      setcondition("");
      // setEmselection(true);

      // setTimeout(() => {
      //   if(oneTimeAlertData){
      //   const visitPurposeConfig = new SpeechSynthesisUtterance(visitPurpose);
      //   window.speechSynthesis.speak(visitPurposeConfig);
      //   }
      //   oneTimeAlertData = false;
      // }, 1000);
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

  useEffect(()=>{
    if(MeetPending === true) {

      if (nameTranscribe.toLowerCase().includes("ok")) {
             navigate('/NotRes')
      }

    }
  },[MeetPending, nameTranscribe])



  useEffect(() => {
    if(PassVoice === true) {

      console.log("VoiceData+++++++++"+PassVoice);
    const speak = () => {
     
      const speech = new SpeechSynthesisUtterance();

      speech.text = 'Hello there how can i help you today , What is the purpose of visit?';
      speech.volume = 1;
      speech.rate = 1;
      speech.pitch = 1;

      window.speechSynthesis.speak(speech);
    };

    const timeoutId = setTimeout(speak, 8000);

    return () => {
      clearTimeout(timeoutId); 
    };
  }
  }, []);


  const NavigateMeet = () => {
    navigate('/NotRes')
    setMeetPending(false)
  }

  const yes = () => {

    navigate("/contactform");
    setEmselection(false)
  
  }


  const MeetPendingComponent = () => {
    return (
      <div class="backdrop-blursm bg-black  inset-0 backdrop-blur-sm bg-opacity-25 fixed justify-center items-center flex ">
        <div className="flex justify-center  w-[450px] h-[330px] bg-white rounded shadow ">

     
        

        

          <div className="mt-[30px]">
            <div className="flex justify-center">
              <Icon
                className="w-[60px] h-[60px] "
                color="FB8C00"
                icon="uiw:warning" 
              />
            </div>

            <div className="mt-[50px] mx-[20px]">
              <p className="text-[18px] text-black  font-bold">Name is not recognized</p>

            
            </div>
      <div className="flex justify-center mt-[48px]">

            <Button onClick={()=> NavigateMeet()}
                
                  text="Cancel"
                  className="w-[120px] h-[41px] flex  border-2   border-orange-600 content-center justify-center "
                >
                  <p className="text-stone-950 mt-[-9px]">OK</p>
                </Button>

            </div>

            </div>


         


          
        </div>

      </div>
    )
  }




  useEffect(() => {
    const speakText = () => {
      // setSp(visitPurpose);
      const speech = new Speech();
      speech
        .init({
          volume: 0.5,
          lang: "en-GB",
          text: Timesp,
          rate: 1,
          pitch: 1,
          voice: "Google UK English Female",
          splitSentences: false,
          listeners: {
            onvoiceschanged: (voices) => {
              // console.log("Voices changed", voices);
            },
          },
        })
        .then(() => {
          console.log("Text spoken successfully");
        })
        .catch((e) => {
          console.error("Failed to speak text:", e);
        });
      setOnetimeSpeak(false);
    };
    if (OnetimeSpeak) {
      setTimeout(() => {
        speakText();
      }, 1000);
    }
    // setTimeout(() => {
    // }, 1000);

    if (visitPurpose) {
      startListening();
    }
  }, []); 

  /*/ Meet sheduling/*/

  useEffect(() => {
    if (Talk === "please shedule meet") {
      console.log("Give answer to meet");
      // setEmselection(true);
    }
  }, []);

  const Navigation = () => {
    // navigate('/NotRes')
    AlertBox();
  };

  const PersonName = ({ condition, nameTranscribe, userNameConfirmation }) => {
    return (
      <div class="backdrop-blursm bg-black  inset-0 backdrop-blur-sm bg-opacity-25 fixed justify-center items-center flex ">
        <div className="flex justify-center  w-[550px] h-[390px] bg-white rounded shadow ">
          <div className="mt-[40px]">
            <div className="flex justify-center">
              <Icon
                className="w-[60px] h-[60px] "
                color="FB8C00"
                icon="fluent:person-32-filled"
              />
            </div>

       

            <div className="mt-[30px] mx-[20px]">
              <p className="text-[16px] text-black  font-bold">{condition}</p>

              <p className="text-[16px] text-black">{nameTranscribe}</p>
            </div>

            

            {!userNameConfirmation && (
              <div className="flex justify-center mt-[30px]">
                <Button
                  onClick={() => setEmselection(false)}
                  text="Cancel"
                  className="w-[120px] h-[41px] flex  border-2   border-orange-600 content-center justify-center "
                >
                  <p className="text-stone-950 mt-[-9px]">Cancel</p>
                </Button>
              </div>
            )}
            {userNameConfirmation && (
              <div className="flex justify-between mt-[30px]">
                <Button
                  onClick={() => yes()}
                  text="Cancel"
                  className="w-[120px] h-[41px] flex  border-2   border-orange-600 content-center justify-center "
                >
                  <p className="text-stone-950 mt-[-9px]">Yes</p>
                </Button>
                <Button
                  onClick={() => navigate("/NotRes")}
                  text="Cancel"
                  className="w-[120px] h-[41px] flex  border-2   border-orange-600 content-center justify-center "
                >
                  <p className="text-stone-950 mt-[-9px]">NO</p>
                </Button>
              </div>
            )}
          </div>

          <div></div>

          {/* 
      <div className="mt-[20px] ">

<p>Which employee would you prefered to?</p>



</div> */}
        </div>
      </div>
    );
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

          


    
       
          <p>{Talk}</p>
        </div>
      </div>



      <div className="w-full h-[80px] bg-white-700 mt-[20px] md:mt-[60px] lg:mt-[120px] flex-row left-5 right-5 ">
        <div className=" flex  space-x-4 md:space-x-12  lg:space-x-10] ">
          <div className="w-[1px] md:w-2 lg:w-5 lg: flex   "></div>
          <Button
            onClick={() => setEmselection(true)}
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
      
      {EmSelection === true ? (
        <PersonName condition={condition} nameTranscribe={nameTranscribe} />
      ) : null}
      {userNameConfirmation && (
        <PersonName
          condition={`Do you want to meet with ${userdisplayName}`}
          nameTranscribe={nameTranscribe}
          userNameConfirmation
        />
      )}
      {MeetPending == true ? <MeetPendingComponent/> : null}
    </div>
  );
}

export default Responce;
