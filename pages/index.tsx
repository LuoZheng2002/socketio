import Game from "@/components/game";
import Signedin from "@/components/signedin";
import Signin from "@/components/signin";
import { useEffect, useRef, useState } from "react"
import { io, Socket } from "socket.io-client";


export default function Home() {
  
  // socket, id, nickname (obtained after log in)
  const [scene, setScene] = useState('signin');
  const usernameRef = useRef('');
  const setUsername = (username: string)=>{
    usernameRef.current = username;
  }
  
  const renderComponent = ()=>{
    switch (scene) {
      case 'signin':
        return <Signin></Signin>;
      case 'signedin':
        return <Signedin></Signedin>;
      default:
        console.log('Unknown scene at index.tsx');
        return <Signin></Signin>;
      }
  }
  
  return (
    <div className="w-screen h-screen bg-blue-500">
      {renderComponent()}
    </div>
  )
}