import React, { useState, useEffect, useId } from 'react'
import { Button } from "@material-tailwind/react";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { TextTransition, presets } from 'react-text-transition';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Speech from 'speak-tts';
import './Res.css'
import { Alert } from 'react-bootstrap';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import { VoiceAssist, VoiceData,  Question } from '../../Recoil/recoil';
import { Icon } from '@iconify/react';
import MovingText from 'react-moving-text'
import { useFaceDetection } from 'react-use-face-detection';
import Swal from 'sweetalert2'
import { useSocket } from '../../Context/SocketContext';
import moment from 'moment';






function Responce() {

  const [sp, setSp] = useState('Hello there , How can i help you today?')
  const [Timesp, setTimeSp] = useState('what is the purpose of your visit?')
  const [AllVoice, setAllVoice] = useRecoilState(VoiceAssist)
  const [Voicedata, setVoicedata] = useRecoilState(VoiceData)
  const [Talk , setTalk] = useState('')
  const [Typed , setTyped] = useState()
  const [Qa, setQa] = useRecoilState(Question)
  const [condition , setcondition] = useState('Check the condition')
  const [selection , setSelection] = useState(0)
  const [givenName , setgivenName] = useState()
  const [giventime , setgivenTime] = useState()
  const [ta , setTa] = useState('meet a')
  const navigate = useNavigate()
  const [DisplayName, setDisplayName] = useState(null)
  const speech = new Speech()
  const id  = useId()
 const [data , setData] = useState()
  const socket = useSocket()


  const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
  

 

  useEffect(()=>{

    socket.on("message", (data) => {
      console.log(data, "Socket data");
      const jsonData = JSON.parse(data);
      console.log("JSON data", jsonData);
      const { user, allUser } = jsonData;
      console.log("User******", user);
      console.log("All Users*******", allUser);
      setDisplayName(user)
      setData(allUser);
      
      
      if (allUser && allUser.length > 0 ) {
        const foundUser = allUser.find((user) => user.display_name === Talk);
        if (foundUser  || `meet a ${foundUser}` || `meet sheduled a ${foundUser}`) {
          AlertBox()
          setgivenName(foundUser.display_name);
          // console.log("Matched userData", display_name);

        }
      }



    });

   


  
    
  },[])


  useEffect(() => {
    if(DisplayName?.display_name){
      console.log(DisplayName,'DisplayName');
    const confirmed = new SpeechSynthesisUtterance(condition);
    // window.speechSynthesis.speak(DisplayName?.display_name);
    }
  }, [DisplayName])
  
  


   



  const MeetaPerson = () => {

    AlertBox()
    setSelection(0)

  }


  const  MeetAlert = () => {
   
    console.log('Which person to meet?');



    Swal.fire({
      title: 'which person to meet?',
      text: "Please name the person?",
      icon: 'question',
      confirmButtonText: 'Cancel',
   
    }).then((res)=>{
      console.log("responce" , res);
    })

    if(givenName) {
      AlertBox()
    }
  }



  const name = "Jestin"


  const AlertBox = () => {
    Swal.fire({
      title: 'Confirm',
      text: `Let me confirm, so you are here to meet ${givenName}`,
      icon: 'info',
      confirmButtonText: 'Yes',
      confirmButtonColor: '#FB8C00',
      iconColor: '#22c2e6',
      showCancelButton: true,
      cancelButtonText: 'No',
      cancelButtonColor: '#757575',
      buttonsStyling: false,
      customClass: {
        confirmButton: 'swal-confirm-button',
        cancelButton: 'swal-cancel-button'
      },
    }).then((result) => {
      if (result.isConfirmed) {
         console.log("Is conformed");
         navigate('/Conditions')
      } else if (result.dismiss === Swal.DismissReason.cancel) {
           console.log("Is Rejected");
           navigate('/NotRes')
      }
    });
  }


  const Assist = async () => {
    await SpeechRecognition.startListening();
    console.log("This is voice" + transcript);
    setTalk(transcript)

  
  }



  const {
    transcript,
    interimTranscript,
    finalTranscript,
    resetTranscript,
    listening,
  } = useSpeechRecognition({
    language: 'en-US',
    continuous: true,
  });


  const [alert, setAlert] = React.useState({
    type: 'error',
    text: 'This is a alert message',
    show: false
  })



  function onCloseAlert() {
    setAlert({
      type: '',
      text: '',
      show: false
    })
  }

  function onShowAlert(type) {
    setAlert({
      type: type,
      text: 'Demo alert',
      show: true
    })
  }

  const Info = () => {

    return (
      <div class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
        <p class="font-bold">Be Warned</p>
        <p>Something not ideal might be happening.</p>
      </div>
    )
  }


  const startListening = async () => {
    

    await SpeechRecognition.startListening();
    console.log(transcript);
    setTalk(transcript)

    console.log("Hello", transcript);

    const text = 'meet a person' 

    if (transcript === text) {

      console.log("Meet sheduled")


      const confirmed = new SpeechSynthesisUtterance(condition);
      window.speechSynthesis.speak(confirmed);

      setcondition('')
      MeetAlert()

      // AlertBox()

    
      
    }

  }



  useEffect(()=>{

    startListening()
  
   

 

  },[startListening])


  useEffect(() => {

    console.log("This id");


    const speakText = () => {
      setSp('what is the purpose of your visit?')
      console.log("This is voice " + AllVoice);
      const message = new SpeechSynthesisUtterance('What is the purpose of your visit?');
      window.speechSynthesis.speak(message);
    };

    const intervalId = setInterval(speakText, 10000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);

    if ('what is the purpose of your visit?') {

      startListening()

    }


  }, []);


  /*/ Meet sheduling/*/

  useEffect(()=>{

    if(Talk === "please shedule meet" ) {
      console.log("Give answer to meet");
      MeetAlert()
     
    }

  

  },[])


  const Navigation = () => {
    // navigate('/NotRes')
    AlertBox()
  }




  // useEffect(() => {
  //   console.log("Position number", selection);

  //   Assist()
  //   console.log("Speak data", Voicedata);
  //   console.log("Qa", Qa);

  // console.log("This is input data",Typed);
  // setTalk(Typed);



  // }, [Assist])

  // const TypedData = () => {
  //   console.log('Typed data',Typed);
  //   navigate('/NotRes')
  // }


  // useEffect(()=>{
  //    setTimeout(() => {

  //     if(Talk === 'My name is Gokul') {
  //       console.log("Responce sussesed");
  //     }else {
  //       console.log("Responce sussesed");
  //       navigate('/NotRes')
  
  //     }
      
  //    }, 12000);

  // },[])


  const Logo1 = "https://mail.google.com/mail/u/0?ui=2&ik=7fe5f027a2&attid=0.1&permmsgid=msg-f:1769128226806473374&th=188d34bfc0eaa29e&view=att&disp=safe&realattid=f_lj2ql1y80"
  const User = 'https://mail.google.com/mail/u/0?ui=2&ik=7fe5f027a2&attid=0.3&permmsgid=msg-f:1769128226806473374&th=188d34bfc0eaa29e&view=att&disp=safe&realattid=f_lj2ql1yt3';


  

  return (
    <div>

      <div className='bg-white-500 w-full h-[80px]'>

        <div className='ml-[26px] mt-[15px] bg'>
          <img className='w-[130px]  md:w-[160px] lg:w-[180px]' src={Logo1} />

        </div>




      </div>

      <div className='w-full h-[120px] flex  mt-[10px] flex-row'>

        <div className='w-[120px] h-[120px]  '>


          <img className='w-[70px] md:w-[80px] lg:w-[120px] ml-[30px] ' src={User} />



        </div>


        <div className='mt-[17px] ml-[0px] md:ml-[30px] md:mt-[21px] lg:mt-[29px] lg:ml-[60px] sm:ml-[10px]  '>


          <MovingText className='font-light text-[18px] md:text-[29px]'
      type="slideInFromBottom"
      duration="1000ms"
      delay="0s"
      direction="normal"
      timing="ease"
      iteration="1"
      fillMode="none">
       {sp}
    </MovingText>






        </div>





      </div>

      <div className='w-full h-[80px] bg-white-700 mt-[20px] md:mt-[60px] lg:mt-[120px] flex-row left-5 right-5 '>



        <div className=' flex  space-x-4 md:space-x-12  lg:space-x-10] '>

          <div className='w-[1px] md:w-2 lg:w-5 lg:table-fixed flex   '>



          </div>


         





          {selection === 0 ? 

<Button onClick={() => MeetAlert()} className='w-[130px] h-[38px] md:w-[250px] md:h-[60px] lg:w-[290px] lg:h-[65px] bg-orange-600  content-center '>
  <h1 className='text-[8px]  md:text-[17px] '>To meet a person</h1>
</Button>

:


<Button onClick={()=> setSelection(0)} className='w-[130px] h-[38px] md:w-[250px] md:h-[60px] lg:w-[290px] lg:h-[65px] border-1 border-orange-600  content-center '>
<h1 className='text-[8px] md:text-[17px] text-orange-600'>To meet a person </h1>
</Button>

}

{selection === 1  ?

<Button onClick={()=> setSelection(1)} className='w-[130px] h-[38px] md:w-[250px] md:h-[60px] lg:w-[290px] lg:h-[65px] bg-orange-600  content-center '>
<h1 className='text-[8px] md:text-[17px] text-white-600'> Book An Appointment </h1>
</Button>


:
// Book An Appointment

<Button onClick={()=> setSelection(1)} className='w-[130px] h-[38px] md:w-[250px] md:h-[60px] lg:w-[290px] lg:h-[65px] border-1 border-orange-600  content-center '>
<h1 className='text-[8px] md:text-[17px] text-orange-600'> Book An Appointment </h1>
</Button>

}

{selection === 2 ?

<Button onClick={()=> setSelection(2)} className='w-[130px] h-[38px] md:w-[250px] md:h-[60px] lg:w-[290px] lg:h-[65px] border-1 bg-orange-600  content-center '>
  <h1 className='text-[8px]  md:text-[17px]   text-white-600'>Business Enquiry</h1>
</Button>
:

<Button onClick={()=> setSelection(2)} className='w-[130px] h-[38px] md:w-[250px] md:h-[60px] lg:w-[290px] lg:h-[65px] border-1 border-orange-600  content-center '>
<h1 className='text-[8px]  md:text-[17px]   text-orange-600'>Business Enquiry</h1>
</Button>

}

{selection === 3 ?

<Button onClick={()=> setSelection(3)} className='w-[130px] h-[38px] md:w-[250px] md:h-[60px] lg:w-[290px] lg:h-[65px] border-1 bg-orange-600  content-center '>
  <h1 className='text-[8px]  md:text-[17px]   text-white-600'>Service Query</h1>
</Button>

:

<Button onClick={()=> setSelection(3)} className='w-[130px] h-[38px] md:w-[250px] md:h-[60px] lg:w-[290px] lg:h-[65px] border-1 border-orange-600  content-center '>
<h1 className='text-[8px]  md:text-[17px]   text-orange-600'>Service Query</h1>
</Button>

}

          <div className='w-[1px]'>






          </div>





        </div>




      </div>

      <div className='bg-white-300 w-full h-[120px] mt-[100px]  '>

        <input onChange={setTyped} className='w-1/2 h-[80px] ml-[15px] md:ml-[60px] rounded pb-[90px] pl-[5px] border-1 border-orange-600 md:h-[120px] pt-[20px] ' />

      </div>

      <div className='bg-white-400 w-full h-[60px] mt-[1px] md:m-[12px]  '>

        <Button onClick={()=> Navigation()} className=' bg-orange-600 h-[40px] w-[100px] ml-[15px] md:ml-[50px] md:h-[60px] md:w-[140px]   '>

          <h1 className='text-[14px] mt-[-3px] md:text-[17px] md:mt-[3px]'>Send</h1>


        </Button>

      </div>


      <div className="text-left fixed w-full bottom-0  pl-[20px]  ">

        <Link style={{ color: '#000' }} to={'https://www.devlacus.com/'}>
          <p className="text-[11px] md:text-[13px] lg:text-[15px]  ">HUBO | All rights reserved @ 2023 Devlacus Technologies</p>
        </Link>

      </div>

    </div >
  )
}









export default Responce
