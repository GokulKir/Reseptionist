import React, { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import Swal from 'sweetalert2';
import Popup from 'reactjs-popup';
import { Icon } from '@iconify/react';
import { Button } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';


function Conditions() {
  const [Popup , setPopup] = useState(false)
  const [Clicked , setClicked] = useState(false)
  
  const navigate = useNavigate()
    
  const Allow = () => {

     navigate('/contactform')

  }


  const Deny =  () => {

  }




  











  const CameraPermission = () => {
    return (
     <div>
       





<div class="backdrop-blursm bg-black  inset-0 backdrop-blur-sm bg-opacity-25 fixed justify-center items-center flex ">


    <div className='w-[440px] h-[340px] bg-white rounded shadow-sm '>


      <div className='flex justify-end mr-[12px] mt-[12px] '>

        <button onClick={()=> setPopup(false)}>

    <Icon  color='#000 w-[10px] h-[10px]'  icon="mdi:remove" />

    </button>

 

    </div>


      <div className='flex justify-center mt-[30px]'>

    <Icon className='w-[50px] h-[50px]' icon="mdi:camera"  />

    </div>


    <div className='justify-center items-center flex mt-[10px]'>
      <p className='text-base text-slate-950 font-medium'>Allow camera to access</p>
    </div>


    <div className='flex justify-center'>

      <Button onClick={()=> Allow()} className='w-[280px] h-[40px] border-2 border-orange-500 flex   items-center , justify-center mt-[43px] '>

        <p className='text-black items-center justify-center m-14 font-medium'>Allow</p>

      </Button>


      

    </div>


    <div className='flex justify-center'>

<Button className='w-[280px] h-[40px] border-2 border-orange-500 flex   items-center , justify-center mt-[8px] '>

  <p className='text-black items-center justify-center m-14 font-medium'>Deny</p>

</Button>




</div>


    </div>
</div>
</div>
   
    )
  }




  useEffect(()=> {

    setTimeout(() => {

      setPopup(true)
      
    }, 5000);

  },[])

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
    <div className='flex justify-center items-center h-screen'>
      <div className='justify-center'>
        <h1 className='text-center md:mb-7'>Checking</h1>
        {Popup === true ?
        <CameraPermission/> : null }
        <ReactLoading  className=' ml-6 md:ml-12' type={'bars'} color={'#FB8C00'} height={127} width={75} />
      </div>
    </div>
  );
}

export default Conditions;