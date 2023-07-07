import React, { useState, useEffect,useRef } from "react";
import { Col, Container, Row, Image, Stack } from "react-bootstrap";
import "../../index.css";
import { Button } from "@material-tailwind/react";
import { ThemeProvider } from "styled-system";
import { Link, useNavigate } from "react-router-dom";
import { useSpeechSynthesis } from "react-speech-kit";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Speech from "speak-tts";
import { TextTransition, presets } from "react-text-transition";
import { useRecoilState } from "recoil";
import { VoiceAssist } from "../../Recoil/recoil";
import mqtt from 'mqtt';
// import mqtt from "mqtt"; 

function Talk() {
  const [sp, setSp] = useState("Hello there , How can i help you today?");
  const [talk, setTalk] = useState();
  const [VoiceAssistant, setVoiceAssistant] = useRecoilState(VoiceAssist);
  const navigate = useNavigate();
  const { speak } = useSpeechSynthesis();
  const speech = new Speech();

//   const host = "broker.emqx.io";
//   const port = "1883";
//   const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;
//   const connectUrl = `mqtt://${host}:${port}`;


const handleConnectionLost = (responseObject) => {
    if (responseObject.errorCode !== 0) {
      console.log('onConnectionLost:', responseObject.errorMessage);
    }
  };

  const handleMessageArrived = (message) => {
    console.log('Message arrived:', message.payloadString);
    // Handle the received message
  };

  const handlePublish = (topic, payload) => {
    clientRef.current.send(topic, payload);
  };

  const clientRef = useRef(null); // Add this line to create a ref for the client

  useEffect(() => {
    const host = 'sonic.domainenroll.com';
    const port = 1883; // Specify the MQTT broker's port if different from the default
    const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;
    const connectUrl = `mqtt://${host}:${port}`;

    const client = mqtt.connect(connectUrl, {
      clientId,
      clean: true,
      connectTimeout: 4000,
    });

    client.on('connect', () => {
      console.log('Connected to MQTT broker');
      client.subscribe('test', (err) => {
        if (!err) {
          client.publish('test', 'Hello from React MQTT example');
        }
      });
    });

    client.on('message', (topic, message) => {
      console.log(`Received message: ${message.toString()} on topic: ${topic}`);
    });

    return () => {
      client.end();
      console.log('Disconnected from MQTT broker');
    };
  }, []);


//   useEffect(() => {
//     // var options = {
//     //   protocol: "ws",
//     //   username: "sonic.domainenroll.com",
//     //   password: "domainenroll:de120467",
//     //   keepalive: 20,
//     //   // clientId uniquely identifies client
//     //   // choose any string you wish
//     // };
//     // var client = mqtt.connect("mqtt://52.44.54.40:8083", options);
//     var client = mqtt.connect(connectUrl, {
//       clientId,
//       clean: true,
//       connectTimeout: 4000,
//       username: "emqx",
//       password: "public",
//       reconnectPeriod: 1000,
//     });
//     console.log(client, "888");

//     client.subscribe("/nodejs/mqtt", () => {
//       console.log("connected successfull");

//       client.publish('/nodejs/mqtt', 'nodejs mqtt test', { qos: 0, retain: false }, (error) => {
//         if (error) {
//           console.error(error,"its🤐")
//         }}
//         )

//     });
//     // const client = mqtt.connect('mqtt://mqtt-dashboard.com');

//     client.on("connect", function () {
//       console.log("Connected to MQTT broker");
//       // Perform any actions after successful connection
//     });

//     // client.on("close", function () {
//     //   console.log("Connection closed");
//     //   // Perform any actions when the connection is closed
//     // });

//     client.on("error", function (err) {
//       console.log("MQTT error:", err);
//       // Handle any MQTT errors
//     });

//     // Return a cleanup function to disconnect from MQTT when the component unmounts
//     return () => {
//       client.end();
//       console.log("Disconnected from MQTT broker");
//     };
//   }, []);



  // const client = mqtt.connect("mqtt://sonic.domainenroll.com");
  // useEffect(() => {
  //     client.on("connect", function () {
  //         client.subscribe("/test", function (err) {
  //           if (!err) {
  //             client.publish("test", "Hello mqttyy");
  //           }
  //         });
  //       });

  //       client.on("message", function (topic, message) {
  //         // message is Buffer
  //         console.log(message.toString());
  //         client.end();
  //       });
  // }, [])

  const Logo =
    "https://mail.google.com/mail/u/0?ui=2&ik=7fe5f027a2&attid=0.4&permmsgid=msg-f:1769128226806473374&th=188d34bfc0eaa29e&view=att&disp=safe&realattid=f_lj2ql1ym1";
  const User =
    "https://mail.google.com/mail/u/0?ui=2&ik=7fe5f027a2&attid=0.3&permmsgid=msg-f:1769128226806473374&th=188d34bfc0eaa29e&view=att&disp=safe&realattid=f_lj2ql1yt3";

  const ResponceP = () => {
    const ResponceP = () => {
      console.log("Responce");
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
      navigate("/Responce");
    };
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
    navigate("/Responce");
  };

  const startRecord = async () => {
    await SpeechRecognition.startListening();
    console.log(transcript);
    setVoiceAssistant(transcript);

    const text = "Nora" || "hi Nora" || "hey Nora" || "i Nora";

    if (transcript === text) {
      speak({ text: sp });

      setSp("");

      navigate("/Responce");
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
            src={User}
          />
        </div>

        <div>
          <h1 className="text-[30px]  md:text-[60px] lg:text-[70px] mt-[24px] font-light	">
            Call me
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
       {/* <Client
        client={clientRef.current} // Pass the client from the ref
        // ...
      /> */}
    </div>
  );
}

export default Talk;
