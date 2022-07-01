interface DisplayInterface {
    displayTimeBreak: boolean,
    timeBreakMinute: string | number,
    timeBreakSecond: string | number,
    sessionTimeMinute: string | number,
    sessionTimeSecond: string | number
}

export const Display = ({displayTimeBreak, timeBreakMinute, timeBreakSecond, sessionTimeMinute, sessionTimeSecond}: DisplayInterface) => {
    return <>
    {displayTimeBreak ? `${timeBreakMinute}:${timeBreakSecond}`: `${sessionTimeMinute}:${sessionTimeSecond}`}
    </>
}