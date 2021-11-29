import React, {useState, useEffect, useRef} from 'react'
import {useCookies} from 'react-cookie'
import useSound from 'use-sound'

const App = () => {
    const seconds = useRef(0)
    const intervalClass:any = null
    const [time, setTime] = useState("25:00")
    const [timeInput, setTimeInput] = useState(10)
    const [timerVal, setTimerVal] = useState("START")
    const [timerGoing, setTimerGoing] = useState(false)
    const [interval, setinterval] = useState(intervalClass)
    const [completedCookies, setCompletedCookie] = useCookies(['completed'])
    const [totalCookies, setTotalCookie] = useCookies(['total'])

    const [play] = useSound("https://jamiejcole.github.io/pomodoro/ringtone.mp3", {volume: 5})

    //Handling the start button being pressed
    const handleStartPressed = () => {
        if (timerGoing === false && timeInput !== 0) {
            seconds.current = timeInput
            setTimerGoing(true)
            countDown()
            setTimerVal("STOP")
        } else if (timerGoing === true){
            stopTimer()
        }
    }

    const stopTimer = () => {
        clearInterval(interval)
        setTimerGoing(false)
        setTimerVal("START")
    }


    const handleTimeChange = (evt:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        let buttonData = evt.currentTarget.name
        if (seconds.current === 0 && buttonData !== 'custom') {
            setTimeInput(parseInt(buttonData)*60)
            setTime(buttonData+":00")
        }
    }

    const countDown = () => {
        let nextSecond = seconds.current - 1
        seconds.current = nextSecond
        setTime(secondsToTime(nextSecond))

        if (seconds.current === 0) {
            addCookies()
            stopTimer()
            setTimerGoing(false)
            setTimerVal("START")
        }
        const newInterval = setInterval(() => {
            let nextSecond = seconds.current - 1
            seconds.current = nextSecond
            setTime(secondsToTime(nextSecond))

            if (seconds.current === 0) {
                addCookies()
                clearInterval(newInterval)
                setTimerGoing(false)
                play()
                setTimerVal("START")
            }
        }, 1000)

        setinterval(newInterval)
    }

    const addCookies = () => {
        const totalTime = parseInt(totalCookies.total) + timeInput
        console.log(totalTime, timeInput)
        setCompletedCookie('completed', parseInt(completedCookies.completed)+1, {path: '/'})
        setTotalCookie('total', totalTime)
    }
    

    // Converting seconds to HH:MM:SS
    const secondsToTime = (seconds:number) => {
        let hours = Math.floor(seconds / 3600);
        seconds %= 3600;
        let minutes = Math.floor(seconds / 60);
        seconds = seconds % 60;

        var formattedHours:string
        var formattedMinutes:string
        var formattedSeconds:string

        if (hours < 10) {formattedHours = "0" + hours} else {formattedHours = String(hours)}
        if (minutes < 10) {formattedMinutes = "0" + minutes} else {formattedMinutes = String(minutes)}
        if (seconds < 10) {formattedSeconds = "0" + seconds} else {formattedSeconds = String(seconds)}

        if (hours < 1) {
            return(formattedMinutes+":"+formattedSeconds)
        } else {
            return(formattedHours + ":" + formattedMinutes + ":" + formattedSeconds)
        }
        
    }

    // Clearing interval when component is unmounted
    useEffect(() => {
        if (completedCookies.completed === undefined || totalCookies.total === undefined) {
            setCompletedCookie('completed', 0, {path: '/'})
            setTotalCookie('total', 0, {path: '/'})
        }


        return () => {
            stopTimer()
        } //eslint-disable-next-line
      }, [])

    return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-bgDark font-rubik gap-y-28 text-white">
            <span className="text-4xl font-bold">Pomodoro!</span>
            <div className="flex flex-col items-center justify-center gap-y-10">
                <div className="w-425 h-300 bg-default rounded-2xl shadow-2xl flex flex-col items-center justify-center gap-y-6 pt-7">
                    <div className="flex gap-x-5 text-lg w-full px-7">
                        <button onClick={evt => handleTimeChange(evt)} name="25" className="timerBtn">25m</button>
                        <button onClick={evt => handleTimeChange(evt)} name="10" className="timerBtn">10m</button>
                        <button onClick={evt => handleTimeChange(evt)} name="5" className="timerBtn">5m</button>
                        <button onClick={evt => handleTimeChange(evt)} name="custom" className="timerBtn">Custom</button>
                    </div>
                    <div>
                        <span className="text-7xl font-bold">{time}</span>
                        <input className="hidden"></input>
                    </div>
                    <div className="flex flex-col">
                        <button onClick={() => handleStartPressed()} className="bg-buttonWhite text-buttonText py-5 px-8 rounded-xl border-2 duration-150 transition-all border-buttonBorder z-10 font-bold transform hover:translate-y-2 active:translate-y-5 active:bg-default">{timerVal}</button>
                        <div className="bg-buttonBg h-14 rounded-xl border-2 border-buttonBorder z-5 transform -translate-y-10 font-bold text-buttonText"/>
                    </div>
                </div>
                <div className="flex flex-col gap-y-5 items-center justify-center">
                    <span className="text-4xl font-bold">Pomodoros Completed: {completedCookies.completed}</span>
                    <span className="text-4xl font-bold">Total Time: {secondsToTime(parseInt(totalCookies.total))}</span>
                </div>
            </div>
        </div>
    )

};


export default App;