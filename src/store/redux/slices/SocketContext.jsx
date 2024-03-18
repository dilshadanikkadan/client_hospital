import React, { createContext, useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useIdUser } from '../../others/BlockedUserCheck';

const SocketContext = createContext();

const SocketProvider = ({ children }) => {
    let iduser;
    const jwtToken = localStorage.getItem('persist:root');
    if (jwtToken) {
        try {
            if (JSON.parse(jwtToken)?.user !== "null" || JSON.parse(jwtToken)?.admin !== "null" || JSON.parse(jwtToken)?.doctor !== "null") {
                const decodedToken = JSON.parse(atob(jwtToken.split('.')[1]));

                const userId = decodedToken.id;
                iduser = userId
            }

        } catch (error) {
         
        }
    }

    const [socket, setSocket] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        console.log(data);
        const newSocket = io('http://localhost:3000');
        setSocket(newSocket);
        newSocket.on('connect', () => {
            newSocket.emit("sendId", { socketId: newSocket.id, _id: iduser })
            console.log("Socket connected successfully!");
        });

        newSocket.on('data', newData => {
            console.log(newData);
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
