import React, { createContext, useState, useEffect } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        const newSocket = io('http://localhost:3000');
        setSocket(newSocket);

        newSocket.on('data', newData => {
            setData(prevData => [...prevData, newData]);
        });



        return () => {
            newSocket.disconnect();
        };
    }, []);
    const sendDataToServer = (newData) => {
        console.log(newData);
        socket.emit('sendData', newData);
    };
    return (
        <SocketContext.Provider value={{ socket, data, sendDataToServer }}>
            {children}
        </SocketContext.Provider>
    );
};

export { SocketProvider, SocketContext };
