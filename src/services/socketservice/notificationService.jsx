import { useContext } from "react";
import io from "socket.io-client"
import { SocketContext } from "../../store/redux/slices/SocketContext";

const socket = io('https://www.medifly.site/',{
    transports: ['websocket']
});

export const notificationService = (notification) => {
    const { sendDataToServer } = useContext(SocketContext);
    sendDataToServer('Hello from AnotherComponent');
}