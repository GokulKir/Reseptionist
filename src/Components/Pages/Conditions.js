import React, { useEffect } from 'react';
import ReactLoading from 'react-loading';
import Swal from 'sweetalert2';


function Conditions() {


    useEffect(()=>{

 setTimeout(() => {

  Swal.fire({
    title: 'Confirm',
    text: 'meet confirmed' ,
    icon: 'success',
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
     
    } else if (result.dismiss === Swal.DismissReason.cancel) {
         console.log("Is Rejected");
       
    }
  });
  
 }, 2500);


    },[])

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='justify-center'>
        <h1 className='text-center md:mb-7'>Checking</h1>
        <ReactLoading className=' ml-6 md:ml-12' type={'bars'} color={'#FB8C00'} height={127} width={75} />
      </div>
    </div>
  );
}

export default Conditions;