import React, { forwardRef, useImperativeHandle, useRef, useState } from "react";
import "./ProgressArea.scss";
import music1 from "../../music/music-1.mp3";
import { useDispatch } from "react-redux";
import { playMusic, stopMusic } from "../../store/musicPlayerReducer";

function ProgressArea(props, ref) {
    const audio = useRef();
    const progressBar = useRef();
    const dispatch = useDispatch();
    const [currentTime, setCurrentTime] = useState("00:00");
    const [duration, setDuration] = useState("00:00");

    useImperativeHandle(ref, () => ({
        play:()=>{
            audio.current.play()
        },
        pause:()=>{
            audio.current.pause()
        }
    }))

    const onPlay = () => {
        dispatch(playMusic())
    }
    const onPause = () => {
        dispatch(stopMusic())
    }
    const getTime = (time) => {
        const minute = `0${parseInt(time/60,10)}`;
        const seconds =`0${parseInt(time%60)}`;
        return `${minute}:${seconds.slice(-2)}`; // 한자리 숫자일때 앞에 0을 붙여주기 위함
    }
    const onTimeUpdate = (event) => {
        if(event.target.readyState === 0){
            // 음악이 재생될 준비가 되지 않았다면 Return
            return;
        }
        const currentTime = event.target.currentTime; // 현재시간
        const duration = event.target.duration; //전체 음악 시간
        const progressBarWidth = (currentTime/duration) * 100; // 전체 시간에서 현재 시간을 나누고 곱하기 100 하면 %값으로 나옴
        progressBar.current.style.width = `${progressBarWidth}%`;
        setCurrentTime(getTime(currentTime));
        setDuration(getTime(duration));
    }

    return (
        <div className="progress-area">
            <div className="progress-bar" ref={progressBar}>
                <audio
                    autoPlay
                    ref={audio}
                    src={music1}
                    onPlay={onPlay}
                    onPause={onPause}
                    onTimeUpdate={onTimeUpdate}
                ></audio>
                </div>
                <div className="music-timer">
                <span>{currentTime}</span>
                <span>{duration}</span>
            </div>
        </div>
    );
}

export default forwardRef(ProgressArea);
