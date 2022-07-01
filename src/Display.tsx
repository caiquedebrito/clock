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

    }, [sessionTimeMinute, sessionTimeSecond, timeBreakMinute, timeBreakSecond, displayTimeBreak])
    

    return <div>
    {
       display
    }
    </div>
}