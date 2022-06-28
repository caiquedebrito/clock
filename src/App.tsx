import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [sessionTime, setSessionTime] = useState(25)
  const [timeBreak, setTimeBreak] = useState(5)
  const [isClockOn, setIsClockOn] = useState(false)

  const [sessionTimeConfig, setSessionTimeConfig] = useState({
    id: 0,
    minute: 25,
    second: 0
  })

  const [timeBreakConfig, setTimeBreakConfig] = useState({
    id: 0,
    minute: 5,
    second: 0
  })
  const [displayTimeBreak, setDisplayTimeBreak] = useState(false)

  useEffect(() => {
    if (sessionTimeConfig.second === 0 && sessionTimeConfig.minute === 0 && !displayTimeBreak) {
      clearInterval(sessionTimeConfig.id)
      startTimeBreak()
      setDisplayTimeBreak(true)
      setSessionTimeConfig(state => {
        return {...state, minute: sessionTime}
      })
    }

    if (timeBreakConfig.minute === 0 && timeBreakConfig.second === 0 && displayTimeBreak) {
      clearTimeout(timeBreakConfig.id)
      setDisplayTimeBreak(false)
      setTimeBreakConfig(state => {
        return {...state, minute: timeBreak}
      })
      startClock()
    }
  }, [sessionTimeConfig, timeBreakConfig])

  const decrementSessionTime = () => {
    if (!isClockOn) {
      
      setSessionTimeConfig(state => {
        if (state.minute > 1) {
          return {...state, minute: state.minute - 1}
        }
        return {...state}
      })
      setSessionTime(state => state > 1 ? state - 1 : state)
    }
  }
  const incrementSessionTime = () => {
    if (!isClockOn) {
      setSessionTimeConfig(state => {
        if (state.minute < 60) {
          return {...state, minute: state.minute + 1}
        }
        return {...state}
      })
      setSessionTime(state => state < 60 ? state + 1 : state)
    }
  }

  const decrementTimeBreak = () => {
    if (!isClockOn) {
      setTimeBreak(state => {
        if (state > 1) {
          return state - 1
        }
        return state
      })
    }
  }
  const incrementTimeBreak = () => {
    if (!isClockOn) {
      setTimeBreak(state => {
        if (state < 10) {
          return state + 1
        }
        return state
      })
    }
  }

  const startTimeBreak = () => {
    setTimeBreakConfig(state => {
      return {...state, minute: timeBreak}
    })

    const id = setInterval(() => {
      setTimeBreakConfig(state => {
        if (state.second === 0) {
          return {...state, minute: state.minute - 1, second: 59}
        }

        return {...state, second: state.second - 1}
      })
    }, 1000)

    setTimeBreakConfig(state => {
      return {...state, id: id}
    })
  }

  const startClock = () => {
    if (!isClockOn) {
      setIsClockOn(!isClockOn)
      const id = setInterval(() => {
        setSessionTimeConfig(state => {
          if (state.second === 0) {
            return {...state, minute: state.minute - 1, second: 59}
          }
          return {...state, second: state.second - 1}
        })
  
      }, 1000)
  
      setSessionTimeConfig(state => {
        return {...state, id: id}
      })
    }
    
  }

  const pauseClock = () => {
    if (isClockOn) {
      setIsClockOn(false)
      clearInterval(sessionTimeConfig.id)
      clearInterval(timeBreakConfig.id)
    }
  }

  const resetClock = () => {
    setIsClockOn(false)
    setDisplayTimeBreak(false)
    clearInterval(sessionTimeConfig.id)
    clearInterval(timeBreakConfig.id)
    setSessionTimeConfig(state => {
      return {...state, second: 0, minute: sessionTime}
    })
    setTimeBreakConfig(state => {
      return {...state, second: 0, minute: timeBreak}
    })
  }

  const Display = () => {
    return displayTimeBreak ? `${timeBreakConfig.minute}:${timeBreakConfig.second}`: `${sessionTimeConfig.minute}:${sessionTimeConfig.second}`
  }

  return (
    <div className="app">
      <h1>25 + 5 clock</h1>
     <div className="clock">
      <div className="display">
        <div id="timer-label">{displayTimeBreak ? "Break" : "Session"}</div>
        <div className="time" id="time-left">
          <Display />
        </div>
        <div className="controls">
          <button onClick={startClock} id="start_stop">play</button>
          <button onClick={pauseClock}>pause</button>
          <button onClick={resetClock} id="reset">reset</button>
        </div>
      </div>
    
      <div className="painel">
        <div className="session-painel">
          <div id="session-label">Session length</div>
          <div id="session-length">
            {sessionTime}
          </div>
          <div className="buttons-container">
            <button id="session-decrement" onClick={decrementSessionTime}>-</button>
            <button id="session-increment" onClick={incrementSessionTime}>+</button>
          </div>
        </div>

        <div className='break-painel'>
          <div id="break-label">Break length</div>
          <div id='break-length'>{timeBreak}</div>
          <div className="buttons-container">
            <button id="break-decrement" onClick={decrementTimeBreak}>-</button>
            <button id="break-increment" onClick={incrementTimeBreak}>+</button>
          </div>
        </div>
      </div>
     </div>
    </div>
  )
}

export default App