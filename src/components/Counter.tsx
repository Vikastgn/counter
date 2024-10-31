import React, {useEffect, useState} from 'react';
import '../Counter.css';
import {Button} from "./Button";

export const Counter = () => {
    let initialCount
    let initialmaxValue
    let countAsString = localStorage.getItem('counter');
    let maxValueAsString = localStorage.getItem('maxValue');
    if (countAsString) {
         initialCount = JSON.parse(countAsString)
    }
    if (maxValueAsString) {
        initialmaxValue = JSON.parse(maxValueAsString)
    }

    const [count, setCount] = useState<number>(initialCount || 0 );
    const [maxValue, setMaxValue] = useState<number>(initialmaxValue  || 5);
    const [startValue, setStartValue] = useState<number>(initialCount || 0)
    const [isInvalid, setIsInvalid] = useState<boolean>(false); // Для отслеживания недопустимого значения
    const [isSetPressed, setIsSetPressed] = useState<boolean>(initialCount >= 0); // Для отслеживания нажатия кнопки Set


    useEffect(() => {
        localStorage.setItem('counter', JSON.stringify(count));
    },[count])

    const increment = () => {
        if (count < maxValue) {
            setCount(count + 1);
        }

    };

    const reset = () => {
        setCount(startValue);
    };

    const applySettings = () => {
        if (startValue >= 0 && startValue < maxValue) {
            setCount(startValue); // устанавливаем текущее значение счетчика равным стартовому
            setIsInvalid(false)//Сбрасываем состояние ошибки, значение теперь допустимо
            setIsSetPressed(true); // Устанавливаем флаг, что кнопка Set была нажата
            localStorage.setItem('counter', JSON.stringify(startValue));
            localStorage.setItem('maxValue', JSON.stringify(maxValue));
        }else {
            setIsInvalid(true); // Устанавливаем в true, если значение недопустимо
        }
    };

    const handleMaxValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.currentTarget.value);
        setMaxValue(value);
        setIsInvalid(value <= 0 || value <=startValue); // Проверяем на недопустимое значение
        setIsSetPressed(false);
    };

    const handleStartValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.currentTarget.value);
        setStartValue(value);
        setIsInvalid(value < 0 || value >=maxValue); // Проверяем на недопустимое значение
        setIsSetPressed(false);
    };

    const isEqual = startValue === maxValue;

    return (
        <div className="counter-container">
            <div className="counter-box">
                <label>
                    <span>Max Value:</span>
                    <input
                        type="number"
                        value={maxValue}
                        onChange={handleMaxValueChange}
                        className={isEqual || isInvalid ? 'error-input' : ''}
                    />
                </label>
                <label>
                    <span>Start Value:</span>
                    <input
                        type="number"
                        value={startValue}
                        onChange={handleStartValueChange}
                        className={isEqual || isInvalid ? 'error-input' : ''}
                    />
                </label>
                <div className="button-container">
                    <Button title={"Set"} onClick={applySettings} disabled={isInvalid || isEqual || count >= maxValue}/>
                </div>
            </div>
            <div className="counter-box">
                <h1 className={count === maxValue ? 'red' : ''}>
                    {isInvalid || isEqual ? <span className="red">Incorrect value! </span>
                    : !isSetPressed ? 'Enter values and press "set"'
                            : count
                    }
                </h1>
                <div className="button-container">
                    <Button title={"Inc"} onClick={increment} disabled={count >= maxValue}/>
                    <Button title={"Reset"} onClick={reset}/>
                </div>
            </div>
        </div>
    );
};