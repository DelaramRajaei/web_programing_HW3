import './Counter.css';
import React, { useState, useEffect } from 'react';
import CounterButton from './Button';

const Counter = () => {
    const [counter, setCounter] = useState(0);
    const [counterStatus, setCounterStatus] = useState(false);
    const [startBtnText, setStartBtnText] = useState('start');
    const [upDownStatus, setUpDownStatus] = useState(true);
    const [upDownBtnText, setUpDownBtnText] = useState('Down counting');


    useEffect(() => {
        let intervalId;
        if (counterStatus) {
            intervalId = setInterval(() => {
                setCounter(counter + (upDownStatus ? 1 : -1));
            }, 1000);
        } else {
            clearInterval(intervalId);
        }
        return () => {
            clearInterval(intervalId);
        }
    });

    const resetCounter = () => {
        changeStatus(false);
        setCounter(0);
        changeUpDownStatus(true);
    }

    const changeStatus = (status) => {
        setCounterStatus(status);
        setStartBtnText(status ? 'pause' : 'start');
    }

    const changeUpDownStatus = (status) => {
        setUpDownStatus(status);
        setUpDownBtnText(status ? 'Down counting' : 'Up counting');
    }

    return <div className="counter-container">
        <p className='counter-text'>
            Counter: {counter}
        </p>
        <div className='buttons-group'>
            <CounterButton title="Reset" callback={resetCounter}></CounterButton>
            <CounterButton title={startBtnText} callback={() => { changeStatus(!counterStatus) }}></CounterButton>
            <CounterButton title={upDownBtnText} callback={() => { changeUpDownStatus(!upDownStatus) }}></CounterButton>
        </div>
    </div>;
}

export default Counter;