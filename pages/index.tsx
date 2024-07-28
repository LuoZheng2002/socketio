import { useEffect, useRef, useState } from "react"
import { io, Socket } from "socket.io-client";


export default function Home() {

  const socketRef = useRef(null as Socket | null);
  const [count,setCount] = useState(0);
  useEffect(() => {
    const socket = io();
    socketRef.current = socket;
    // Handle the response event from the server
    socket.on('message', (data) => {
      setCount(data);
    });
  }, []);
  return (
    <div>
      <div>Count: { count}</div>
    </div>
  )
}