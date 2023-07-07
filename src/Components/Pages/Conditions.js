import React, { useEffect } from 'react';
import ReactLoading from 'react-loading';

function Conditions() {

    const Checked = ()=>{
    
        

  
    }

    useEffect(()=>{



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