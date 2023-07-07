import React,{useEffect, useState} from 'react'
import { Icon } from '@iconify/react';
import { Button } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import {Collapse} from 'react-collapse';
import { Dropdown, Selection } from 'react-dropdown-now';
import 'react-dropdown-now/style.css';
import './NotRes'


function NotRes() {
  const navigate = useNavigate()
  const [Option , setOpation] = useState(false)
  const [open, setOpen] = React.useState(false);
  const [data , setData] = useState("Department")

  const Data = [
    {
      id: 1,
      name: "Design department"
    },
    {
      id: 2,
      name: "Hardware department"
    },
    {
      id: 3,
      name: "Software department"
    },
    {
      id: 4,
      name: "HR department"
    },
    {
      id: 5,
      name: "Mechanical department"
    },
    {
      id: 6,
      name: "Technical department"
    },
    {
      id: 7,
      name: "Manager department"
    }
  ];


 useEffect(()=>{
  console.log(data);
 })

 

  const SubmitButton = () => {
    navigate('/Conditions')
  }

const Dropdown = () =>{
  setOpation(!Option)
  console.log("Option status",Option);
}

const handleOpen = () => {
  setOpen(!open);
};





  return (
    <div className=''>


      <div className='flex justify-center'>
      <div className='w-11/12 h-[80px] bg-orange-500 mt-[20px]  rounded  '>
   <p className='text-white mt-2 ml-3 text-[14px] md:text-[18px] font-light'>I am sorry , but couldn't catch you . Could you please select the concerned from the drop down list on the Tab next to me.</p>
      </div>
      </div>


      <div className='flex justify-center'>

<div className='w-11/12 h-[80px] md:h-[90px] lg:h-[100px] bg-white-400 mt-9  border-1 border-grey-50 rounded'>

  <div className='flex flex-row  justify-between'>

    <div className='w-[2000px] h-[40px] md:mt-[30px] ml-[20px] mt-[25px] lg:mt-[35px]'>

    <p className=''>{data}</p>


    </div>


    <div className='mr-[38px] mt-[20px] w-[40px] h-[40px] ' style={{ display: 'grid', placeItems: 'center' }}>
      

  <button onClick={()=> handleOpen()}>
  <Icon icon="bxs:up-arrow" rotate={2} />
  </button>

  
</div>
  </div>

  </div> 






  


  
  
     
  </div> 



        <div  className="flex justify-center">
          {open ? (
            <ul className="w-11/12 mr-[40px] absolute">
              <div>
              {Data.map((obj, i) => (

                <li key={i} className="w-full h-[40px] bg-slate-400 rounded mt-0.6 shadow-md border-1 content-center justify-center">
                  <Button onClick={()=>  setData(obj.name)} className='w-full h-full text-white'>{obj.name}</Button>
                </li>

))}

              </div>
            </ul>
          ) : null}
        </div>








  <div className='flex justify-center'>

<div className='w-11/12 h-[80px] md:h-[90px] lg:h-[100px] bg-white-400 mt-9   border-1 border-grey-50 rounded'>

  <div className='flex flex-row  justify-between'>

    <div className='w-[120px] h-[40px] md:mt-[30px] ml-[20px] mt-[25px] lg:mt-[35px]'>

    <p className=''>Persone</p>


    </div>


    <div className='mr-[25px] mt-[20px] w-[40px] h-[40px] ' style={{ display: 'grid', placeItems: 'center' }}>
      <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" onClick={()=> console.log("Clicked")}>
      <Icon icon="bxs:up-arrow" rotate={2} />


  </button>
</div>

  </div>


  
  
  </div> 


  




  


  
  
     
  </div>  


  <div className='flex justify-center'>

<div className='w-11/12 h-[80px] md:h-[90px] lg:h-[100px] bg-white-400 mt-9   border-1 border-grey-50 rounded'>

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
