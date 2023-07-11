import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Image, Stack } from 'react-bootstrap';
import '../../index.css';
import { Button, dialog } from "@material-tailwind/react";
import { ThemeProvider } from 'styled-system';
import { Link, useNavigate } from 'react-router-dom';
import { useSpeechSynthesis } from 'react-speech-kit';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Speech from 'speak-tts';
import { TextTransition, presets } from 'react-text-transition';
import { useRecoilState } from 'recoil';
import { VoiceAssist } from '../../Recoil/recoil';
import mqtt, { log } from 'mqtt/dist/mqtt'
import { useSocket } from '../../Context/SocketContext';
import moment from 'moment' 

function Talk() {

    

    const [sp, setSp] = useState('Hello there , How can i help you today?')
    const [talk, setTalk] = useState()
    const [VoiceAssistant, setVoiceAssistant] = useRecoilState(VoiceAssist)
    const [Diaplpog, setDiaplpog] = useState(null)
    const navigate = useNavigate();
    const { speak } = useSpeechSynthesis();
    const speech = new Speech()
    const socket = useSocket();
    

    useEffect(() => {
        socket.on('message',(data)=>{
            
            console.log(data,"socket data");
            const jsonData = JSON.parse(data);
      console.log("JSON data", jsonData);
      const { user, allUser } = jsonData;
      console.log(user.display_name,"user.display_name***");
      setDiaplpog(user.display_name,()=>console.log("the value is updated"))

        });

        socket.on('allusers',(data)=>{
            
            console.log(data,"socket data");
        });

        const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');

// console.log(currentTime); // Example output: 2023-07-10 15:30:45

      const mockData = {
        user_id:'9f94e975-5727-45ab-b155-b2672d1605df',
        date_time:currentTime
      }

        socket.emit("payload",mockData);

        socket.on("apiResponse", (data) => {
            console.log("API Response:", data);
            // Handle the API response here
        });
    }, [])


    // useEffect(() => {
    //     const callMessage =(data)=>{
    //     window.speechSynthesis.speak(data);

    //     }
    //     console.log('====================================');
    //     console.log(Diaplpog);
    //     console.log('====================================');
    //     if(Diaplpog){
    //         console.log("2222**");
    //     const message = new SpeechSynthesisUtterance(Diaplpog);
    //     callMessage(message)


    
    //         navigate('/Responce');
    //     }
    // }, [Diaplpog])
    
    
    

    const Logo = 'https://mail.google.com/mail/u/0?ui=2&ik=7fe5f027a2&attid=0.4&permmsgid=msg-f:1769128226806473374&th=188d34bfc0eaa29e&view=att&disp=safe&realattid=f_lj2ql1ym1';
    const User = 'https://mail.google.com/mail/u/0?ui=2&ik=7fe5f027a2&attid=0.3&permmsgid=msg-f:1769128226806473374&th=188d34bfc0eaa29e&view=att&disp=safe&realattid=f_lj2ql1yt3';

    const ResponceP = () => {
        const ResponceP = () => {
            console.log("Responce");
            const speech = new Speech()

            speech
                .speak({
                    text: sp,
                })
                .then(() => {
                    console.log('Text spoken successfully');
                })
                .catch((e) => {
                    console.error('Failed to speak text:', e);
                });
            navigate('/Responce');
        };
    };
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

    const ResponcePage = () => {
        const speech = new Speech()

        speech
            .speak({
                text: sp,
            })
            .then(() => {
                console.log('Text spoken successfully');
            })
            .catch((e) => {
                console.error('Failed to speak text:', e);
            });
        navigate('/Responce');

    }



    const startRecord = async () => {



        await SpeechRecognition.startListening();
        console.log(transcript);
        setVoiceAssistant(transcript)




        const text = "Nora" || "hi Nora" || "hey Nora" || 'i Nora'

        if (transcript === text) {
        console.log(text,"**********");



            speak({ text: sp })

            setSp('')

            navigate('/Responce')

        }


    }




    useEffect(() => {
        startRecord()

    }, [startRecord])


    return (

        <div className="" >

            <div className='w-full h-25 bg-white-500 flex justify-center mt-20'>

                <h1 className='text-2xl font-light  '>Welcome to</h1>



            </div>



            <div className='w-full h-50 bg-white-500 flex justify-center mt-[42px]'>

                <img className='w-[200px] md:w-[300px] lg:w-[330px] ' src={Logo} />

            </div>


            <div className='w-full h-50  flex  mt-[140px]  md:max-lg:flex  flex-row justify-center space-x-4 pr-[10px]'>

                <div className=''>

                    <img className=' w-[80px] md:w-[120px] lg:w-[140px] sm:w-[90px] md:max-lg:flex' src={User} />

                </div>

                <div>
                    <h1 className='text-[30px]  md:text-[60px] lg:text-[70px] mt-[24px] font-light	' >Call me</h1>

                </div>

                <div>
                    <h1 className='text-[30px]  md:text-[60px] lg:text-[70px] mt-[24px] font-bold' >Norah!</h1>

                </div>


                <div className=''>

                </div>




            </div>

            <div className='w-full h-[70px]  mt-[40px] flex justify-center pr-[100px]'>


                <Button onClick={ResponcePage} className="group relative w-[90px] h-[55px] md:w-[98px] md:h-[65px] justify-center lg:w-[200px] overflow-hidden rounded-lg bg-[#F14F13]">
                    <span class="text-white  group-hover:text-white text-[10px] md:text-[15px] mx-auto">Hi Norah!</span>
                </Button>

            </div>



            <div className="text-left fixed w-full bottom-0  pl-[20px]  ">

                <Link style={{ color: '#000' }} to={'https://www.devlacus.com/'}>
                    <p className="text-[11px] md:text-[13px] lg:text-[15px]  ">HUBO | All rights reserved @ 2023 Devlacus Technologies</p>
                </Link>

            </div>



        </div>

    );
}

export default Talk;