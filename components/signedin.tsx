import { useEffect, useRef, useState } from "react";
import Lobby from "./lobby";
import { io, Socket } from "socket.io-client";

type Props={
    
}

export default function Signedin({}: Props){

    const socketRef = useRef(null as Socket | null);
    
    const [scene, setScene] = useState("lobby");
    useEffect(() => {
        const socket = io();
        socketRef.current = socket;
        // Handle the response event from the server
        socket.on('message', (data) => {

        });
      }, []);
    const renderComponent = ()=>{
        if (scene == 'lobby'){
            return <Lobby></Lobby>;
        }
        
    };


    return (
        <div className="w-screen h-screen bg-blue-500">
            {renderComponent()}
        </div>
    )
}