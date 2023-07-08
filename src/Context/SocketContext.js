import React, { createContext, useContext, useEffect } from 'react';
import { io } from 'socket.io-client';

// Create a context for the socket
const SocketContext = createContext();

// Custom hook to access the socket context
export const useSocket = () => useContext(SocketContext);

// Socket provider component
export const SocketProvider = ({ url, options, children }) => {
  // Create the socket instance
  const socket = io(url, options);

  useEffect(() => {
    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  // Provide the socket context to the children components
  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
