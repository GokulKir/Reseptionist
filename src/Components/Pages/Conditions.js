import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { Icon } from "@iconify/react";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import {
  AcceptedConfirmation,
  RejectedConfirmation,
  AcceptedConfirmationSpeak,
} from "../../constant/TextConstatnt";
import { useSocket } from "../../Context/SocketContext";
import Swal from "sweetalert2";
import { useRecoilValue } from "recoil";
function Conditions() {
  const [Popup, setPopup] = useState(false);
  const [Clicked, setClicked] = useState(false);
  const [Confirmation, setConfirmation] = useState(null);
  const navigate = useNavigate();
  const socket = useSocket();

  const CameraPermission = () => {
    return (
      <div>
        <div class="backdrop-blursm bg-black  inset-0 backdrop-blur-sm bg-opacity-25 fixed justify-center items-center flex ">
          <div className="w-[440px] h-[340px] bg-white rounded shadow-sm ">
            <div className="flex justify-end mr-[12px] mt-[12px] ">
              <button onClick={() => setPopup(false)}>
                <Icon color="#000 w-[10px] h-[10px]" icon="mdi:remove" />
              </button>
            </div>

            <div className="flex justify-center mt-[30px]">
              <Icon className="w-[50px] h-[50px]" icon="mdi:camera" />
            </div>

            <div className="justify-center items-center flex mt-[10px]">
              <p className="text-base text-slate-950 font-medium">
                Allow camera to access
              </p>
            </div>

            <div className="flex justify-center">
              <Button
                className="w-[280px] h-[40px] border-2 border-orange-500 flex   items-center , justify-center mt-[43px] "
                onClick={() => {
                  console.log("onclick");
                }}
              >
                <p className="text-black items-center justify-center m-14 font-medium">
                  Allow
                </p>
              </Button>
            </div>

            <div className="flex justify-center">
              <Button className="w-[280px] h-[40px] border-2 border-orange-500 flex   items-center , justify-center mt-[8px] ">
                <p className="text-black items-center justify-center m-14 font-medium">
                  Deny
                </p>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // this is for camara

  // useEffect(()=> {

  //   setTimeout(() => {

  //     setPopup(true)

  //   }, 5000);

  // },[])

    
   
  useEffect(() => {
    // setTimeout(() => {
    // navigate('/contactform')
    // }, 15000);

    socket.on("userIdDetails", (data) => {
      if (data) {
        setInterval(() => {
          const gustData = localStorage.getItem("gustID");

          if (gustData === "accepted") {
            console.log("===============😱🤫=====================");
            console.log(gustData);
            console.log("====================================");
            setConfirmation(true);
          } 
          if(gustData === "rejected") {
            setConfirmation(false);
          }
        }, 5000);
      }
    });

    // const gustData = localStorage.getItem('gustID')
    // if(gustData=='accepted'){
    //   setConfirmation(true)XX
    // }
  }, []);


  

  useEffect(() => {
    console.log("====================================");
    console.log(Confirmation, "😁🥹");
    console.log("====================================");

    if (Confirmation) {
      socket.emit("confirmuser", { message: "accepted" });
      const confirmed = new SpeechSynthesisUtterance(AcceptedConfirmationSpeak);
      window.speechSynthesis.speak(confirmed);
      Swal.fire({
        title: AcceptedConfirmation,
        text: "",
        icon: "success",
        confirmButtonText: "Cancel",
        timer: 10000,
      }).then((res) => {
        console.log("responce", res);
      });
    }
    if (Confirmation === false) {
      socket.emit("confirmuser", { message: "rejected" });
      const confirmed = new SpeechSynthesisUtterance(RejectedConfirmation);
      window.speechSynthesis.speak(confirmed);
      Swal.fire({
        title: RejectedConfirmation,
        text: "",
        icon: "success",
        confirmButtonText: "Cancel",
        timer: 9000,
      }).then((res) => {
        console.log("responce", res);
      });
    }
  }, [Confirmation]);





  const PersonName = ({ condition, userNameConfirmation }) => {
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
              {/* <p className="text-[16px] text-black">{nameTranscribe}</p> */}
            </div>

            {!userNameConfirmation && (
              <div className="flex justify-center mt-[30px]">
                <Button
                  onClick={() => setConfirmation(true)}
                  text="Cancel"
                  className="w-[120px] h-[41px] flex  border-2   border-orange-600 content-center justify-center "
                >
                  <p className="text-stone-950 mt-[-9px]">Ok</p>
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

  //     useEffect(()=>{

  //  setTimeout(() => {

  //   Swal.fire({
  //     title: 'Confirm',
  //     text: 'meet confirmed' ,
  //     icon: 'success',
  //     confirmButtonText: 'Yes',
  //     confirmButtonColor: '#FB8C00',
  //     iconColor: '#22c2e6',
  //     showCancelButton: true,
  //     cancelButtonText: 'No',
  //     cancelButtonColor: '#757575',
  //     buttonsStyling: false,
  //     customClass: {
  //       confirmButton: 'swal-confirm-button',
  //       cancelButton: 'swal-cancel-button'
  //     },
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //        console.log("Is conformed");

  //     } else if (result.dismiss === Swal.DismissReason.cancel) {
  //          console.log("Is Rejected");

  //     }
  //   });
  //  }, 2500);

  //     },[])

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="justify-center">
        <h1 className="text-center md:mb-7">Checking</h1>
        {Popup === true ? <CameraPermission /> : null}
        <ReactLoading
          className=" ml-6 md:ml-12"
          type={"bars"}
          color={"#FB8C00"}
          height={127}
          width={75}
        />
      </div>
      {console.log(Confirmation, "Confirmation*****")}
      {Confirmation && <PersonName condition={AcceptedConfirmation} />}
    </div>
  );
}

export default Conditions;
