import { useContext } from "react";
import io from "socket.io-client"
import { SocketContext } from "../../store/redux/slices/SocketContext";

const socket = io('http://localhost:3000');

const data = "neymar"
export const notificationService = (notification) => {
    const { sendDataToServer } = useContext(SocketContext);

    sendDataToServer('Hello from AnotherComponent');
}