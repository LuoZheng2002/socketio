import { useRef, useState } from "react";

type Props={
    nickname: string;
}

export default function Lobby(){
    const [settingNickname, setSettingNickname] = useState(false);

    const nicknameRef = useRef();
    const renderNickname = ()=>{
        if (!settingNickname){
            
        }
    }

    return (
        <div>
            <div>
                <span>Hello, {nickname}!</span> <button>Change </button>
            </div>
        </div>
    )
}