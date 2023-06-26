import React, { useState, useEffect } from 'react'
import { Button } from "@material-tailwind/react";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { TextTransition, presets } from 'react-text-transition';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Speech from 'speak-tts';
import { Alert } from 'react-bootstrap';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import { VoiceAssist, VoiceData , Selection } from '../../Recoil/recoil';




function Responce() {

  const [sp, setSp] = useState('Hello there , How can i help you today?')
  const [Timesp, setTimeSp] = useState('what is the purpose of your visit?')
  const [AllVoice , setAllVoice] = useRecoilState(VoiceAssist)
  const [Voicedata , setVoicedata] = useRecoilState(VoiceData)
  const [selection , setSelection] = useRecoilState(Selection)
  const navigate = useNavigate()
  const speech = new Speech()



  const Assist = async () => {
    await SpeechRecognition.startListening();
    console.log("This is voice"+transcript);
    setVoicedata(transcript)
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

    console.log("Hello",transcript);

  }


  useEffect(() => {

  
    const speakText = () => {
      setSp('what is the purpose of your visit?')
      console.log("This is voice "+AllVoice);
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

  useEffect(()=>{
    console.log("Position number" , selection);

  Assist()
  console.log("Speak data", Voicedata);




  
  },[Assist])





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


          <img className='w-[70px] md:w-[80px] lg:w-[120px] ml-[50px] ' src={User} />



        </div>


        <div className='mt-[15px] ml-[20px] md:ml-[30px] md:mt-[19px] lg:mt-[29px] lg:ml-[70px] sm:ml-[20px]  '>

          <h1 className='font-light text-[17px] md:text-[28px]  '>{sp}</h1>






        </div>



      </div>

      <div className='w-full h-[80px] bg-white-700 mt-[20px] md:mt-[60px] lg:mt-[120px] flex-row left-5 right-5 '>



        <div className=' flex  space-x-4 md:space-x-12  lg:space-x-10] '>

          <div className='w-[1px] md:w-2 lg:w-5 lg:table-fixed flex   '>

          </div>


      
      

          <Button onClick={() => setSelection(0)} className='w-[130px] h-[38px] md:w-[250px] md:h-[60px] lg:w-[290px] lg:h-[65px] bg-orange-600  content-center '>
            <h1 className='text-[8px]  md:text-[17px] '>To meet a persone</h1>
          </Button>

          <Button onClick={()=> setSelection(1)} className='w-[130px] h-[38px] md:w-[250px] md:h-[60px] lg:w-[290px] lg:h-[65px] border-1 border-orange-600  content-center '>
            <h1 className='text-[8px] md:text-[17px] text-orange-600'>Book An Appointment </h1>
          </Button>

          <Button onClick={()=> setSelection(2)} className='w-[130px] h-[38px] md:w-[250px] md:h-[60px] lg:w-[290px] lg:h-[65px] border-1 border-orange-600  content-center '>
            <h1 className='text-[8px]  md:text-[17px]   text-orange-600'>Business Enquiry</h1>
          </Button>

          <Button onClick={()=> setSelection(3)} className='w-[130px] h-[38px] md:w-[250px] md:h-[60px] lg:w-[290px] lg:h-[65px] border-1 border-orange-600  content-center '>
            <h1 className='text-[8px]  md:text-[17px]   text-orange-600'>Service Query</h1>
          </Button>


          <div className='w-[1px]'>





          </div>





        </div>




      </div>

      <div className='bg-white-300 w-full h-[120px] mt-[100px] '>

        <input className='w-1/2 h-[80px] ml-[15px] md:ml-[60px] rounded pb-[90px] pl-[5px] border-1 border-orange-600 md:h-[120px] ' />

      </div>

      <div className='bg-white-400 w-full h-[60px] mt-[1px] md:m-[12px]  '>

        <Button className=' bg-orange-600 h-[40px] w-[100px] ml-[15px] md:ml-[50px] md:h-[60px] md:w-[140px]   '>

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
