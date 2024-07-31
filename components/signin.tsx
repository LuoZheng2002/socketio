import Image from "next/image";
import style from "./signin.module.css";
import ayaka from "images/ayaka.jpg";
import { useRef, useState } from "react";

type Props={
    gotoSignedin: ()=>void;
    gotoSignup: ()=>void;
}

export default function Signin({gotoSignedin, gotoSignup}: Props) {

    const usernameRef = useRef(''); // or email
    const passwordRef = useRef('');
    const [message, setMessage] = useState('');
    const handleSignin = async ()=>{
        const res = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username:usernameRef.current, password: passwordRef.current }),
          });
          const data = await res.json();

          if (res.ok) {
            console.log('Successfully signed in');
            gotoSignedin(); // pass username; username stored in "signedin" only, connect socket; mongo db 
            // dbconnect() -> 
            // room
            // create a room; join
          } else {
            console.log('failed to sign in');
            setMessage(data.message);
          }
    };

    const handleSignup = ()=>{
        gotoSignup();
    }

    return (
        <div className="flex flex-col h-full text-[2vw] p-[1vw] relative">
            <Image className="absolute left-0 top-0 w-full h-full" fill={true} objectFit="cover" src={ayaka} alt='ayaka' ></Image>
            <div className="absolute left-0 top-0 w-full h-full bg-[#ffcae238]">
                <div className="text-[4vw] text-center font-bold">Happy Involuting!</div>
                <div className="text-[3vw] font-bold">Sign In</div>
                <div className="font-bold">User name or email:</div>
                <input className={style.input} placeholder="user name or email"></input>
                <div className="font-bold">Password:</div>
                <input className={style.input} placeholder="password"></input>
                <div>
                    <button className={style.button + " mr-[7vw]"} onClick={handleSignin}>Sign in</button>
                    <button className={style.button} onClick={handleSignup}>I don't have an account</button>
                </div>
                <div className="text-[1vw] text-red-600">{message}</div>
            </div>
        </div>
    )
}