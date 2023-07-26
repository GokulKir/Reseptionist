import React, { useEffect } from 'react';
import { useSocket } from '../Context/SocketContext';
import { gustId } from '../Recoil/recoil';
import { useRecoilState } from 'recoil';

function SocketAllInstanceWrapper({ children}) {
  const socket = useSocket();
  const [givenGustId, setGivenGustId] = useRecoilState(gustId);

  useEffect(() => {
    socket.on('userIdDetails', (data) => {
      console.log(data,"Data>>>>>>>>");
      if (data) {
        localStorage.setItem('gustID', data.data.value);
        // setfirst(data.data.value);
        setGivenGustId(data.data.value);
      }
    });
  }, []);


  return <div>{children}</div>;
}

export default SocketAllInstanceWrapper;
