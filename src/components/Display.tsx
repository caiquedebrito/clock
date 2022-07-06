import { useEffect, useState } from "react"

interface DisplayInterface {
    displayTimeBreak: boolean,
    timeBreakMinute: number,
    timeBreakSecond: number,
    sessionTimeMinute: number,
    sessionTimeSecond:  number
}

export const Display = ({
    displayTimeBreak,
    timeBreakMinute, 
    timeBreakSecond, 
    sessionTimeMinute, 
    sessionTimeSecond
}: DisplayInterface) => {
    const [display, setDisplay] = useState("")

    useEffect(() => {
        formatTimer()
        formatLastSeconds()
    }, [sessionTimeMinute, sessionTimeSecond, timeBreakMinute, timeBreakSecond, displayTimeBreak])

    const formatTimer = () => {
        let minutes: string | number
        let seconds: string | number

        if (displayTimeBreak) {
            minutes = timeBreakMinute < 10 ? "0" + timeBreakMinute : timeBreakMinute
            seconds = timeBreakSecond < 10 ? "0" + timeBreakSecond : timeBreakSecond
        } else {
            minutes = sessionTimeMinute < 10 ? "0" + sessionTimeMinute : sessionTimeMinute
            seconds = sessionTimeSecond < 10 ? "0" + sessionTimeSecond : sessionTimeSecond
        }
        
        setDisplay(`${minutes}:${seconds}`)
    }

    const formatLastSeconds = () => {
        const timer = document.querySelector(".timer")

        if ((sessionTimeMinute === 0 && sessionTimeSecond <= 10 && !displayTimeBreak) || (timeBreakMinute === 0 && timeBreakSecond <= 10 && displayTimeBreak)) {
            timer?.classList.add("red")
        } else {
            timer?.classList.remove("red")
        }
    }
    
    return <div className="timer">{ display }</div>
}