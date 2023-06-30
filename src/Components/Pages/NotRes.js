import React from 'react'
import { Icon } from '@iconify/react';
import { Button } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import {Collapse} from 'react-collapse';




function NotRes() {
  const navigate = useNavigate()



  const SubmitButton = () => {

    navigate('/Responce')
   
  }


  return (
    <div className=''>


      <div className='flex justify-center'>
      <div className='w-11/12 h-[80px] bg-orange-500 mt-[20px]  rounded  '>
   <p className='text-white mt-2 ml-3 text-[14px] md:text-[18px] font-light'>I am sorry , but couldn't catch you . Could you please select the concerned from the drop down list on the Tab next to me.</p>
      </div>
      </div>


      <div className='flex justify-center'>

<div className='w-11/12 h-[80px] md:h-[90px] lg:h-[100px] bg-white-400 mt-9  shadow-xl border-1 border-grey-50 rounded'>

  <div className='flex flex-row  justify-between'>

    <div className='w-[120px] h-[40px] md:mt-[30px] ml-[20px] mt-[25px] lg:mt-[35px]'>

    <p className=''>Department</p>


    </div>


    <div className='mr-[25px] mt-[20px] w-[40px] h-[40px] ' style={{ display: 'grid', placeItems: 'center' }}>
      <button onClick={()=> console.log("Clicked")}>
  <Icon icon="bxs:up-arrow" rotate={2} />
  </button>
</div>
  </div>

  </div> 


  


  


  
  
     
  </div>  

  


  <div className='flex justify-center'>

<div className='w-11/12 h-[80px] md:h-[90px] lg:h-[100px] bg-white-400 mt-9  shadow-xl border-1 border-grey-50 rounded'>

  <div className='flex flex-row  justify-between'>

    <div className='w-[120px] h-[40px] md:mt-[30px] ml-[20px] mt-[25px] lg:mt-[35px]'>

    <p className=''>Persone</p>


    </div>


    <div className='mr-[25px] mt-[20px] w-[40px] h-[40px] ' style={{ display: 'grid', placeItems: 'center' }}>
      <button onClick={()=> console.log("Clicked")}>
  <Icon icon="bxs:up-arrow" rotate={2} />
  </button>
</div>

  </div>


  
  
  </div> 


  




  


  
  
     
  </div>  


  <div className='flex justify-center'>

<div className='w-11/12 h-[80px] md:h-[90px] lg:h-[100px] bg-white-400 mt-9  shadow-xl border-1 border-grey-50 rounded'>

  <div className='flex flex-row  justify-between'>

    <div className='w-[200px] h-[40px] md:mt-[30px] ml-[20px] mt-[25px] lg:mt-[35px]'>

    <p className=''>Purpose of visit (text area)</p>

    </div>

  </div>

  </div> 


  
  
     
  </div>  



<div className='flex justify-center'>


  <div className='w-10/12 h-[120px] mt-[80px] flex justify-center pt-[40px]'>

    <Button onClick={()=> SubmitButton()} className='w-[210px] h-[60px] md:w-[260px] lg:w-[290px]  bg-orange-500 flex justify-center content-center'>

     <p>Submit</p>

    </Button>

  </div>



</div>


  
    </div>
  )
}

export default NotRes
