import React, { useState } from 'react';
import s from './keypad.module.css';
import Button from '../button';
import cx from 'classnames';

export default function Keypad({ onCalc, onKeyPressed }) {
  let [calc, setCalc] = useState({
    signs: [],
    numbers: [],
    currentValue: "",
  });

  const handleButtonClick = (button) => {
    if (button === "C") {
      resetClickHandler()
    }
    else if (button === "+/-") {
      invertClickHandler()
    }
    else if (button === "%") {
      percentClickHandler()
    }
    else if (button === "=") {
      equalsClickHandler()
    }
    else if (["÷", "x", "-", "+"].indexOf(button) > -1) {
      signClickHandler(button)
    }
    else if (button === ".") {
      commaClickHandler(button)
    }
    else {
      numClickHandler(button)
    }
    onKeyPressed(button)
  };

  const resetClickHandler = () => {
    setCalc({
      ...calc,
      signs: [],
      numbers: [],
      currentValue: "",
    });
  };

  const invertClickHandler = () => {
    const num = !parseFloat(calc.currentValue) ? 0 : parseFloat(calc.currentValue) * -1
    setCalc({
      ...calc,
      currentValue: num,
    });
  };

  const percentClickHandler = () => {
    const num = !calc.currentValue ? 0 : parseFloat(calc.currentValue) / 100;
    setCalc({
      ...calc,
      currentValue: num,
    });
  };

  const equalsClickHandler = () => {
    const updateNumbers = [...calc.numbers, parseFloat(calc.currentValue)]
    setCalc({
      ...calc,
      numbers: updateNumbers,
      currentValue: "",
    });
    onCalc(updateNumbers, calc.signs);
  };

  const signClickHandler = (value) => {
    const updateSigns = [...calc.signs, value]
    const updateNumbers = [...calc.numbers, parseFloat(calc.currentValue)]
    setCalc({
      ...calc,
      signs: updateSigns,
      numbers: updateNumbers,
      currentValue: "",
    });
  };

  const commaClickHandler = (value) => {
    setCalc({
      ...calc,
      currentValue: !calc.currentValue.includes(".") ? calc.currentValue + value : calc.currentValue,
    });
  };

  const numClickHandler = (value) => {
    if (calc.currentValue.length < 16) {
      setCalc({
        ...calc,
        currentValue: calc.currentValue === "0" && value === "0"
          ? "0"
          : parseFloat(calc.currentValue) % 1 === 0
            ? Number(calc.currentValue + value)
            : calc.currentValue + value
      });
    }
  };


  const buttons = [
    { text: 'C', isDark: true },
    { text: '+/-', isDark: true },
    { text: '%', isDark: true },
    { text: '÷', isDark: true },
    { text: '7' },
    { text: '8' },
    { text: '9' },
    { text: 'x', isDark: true },
    { text: '4' },
    { text: '5' },
    { text: '6' },
    { text: '-', isDark: true },
    { text: '1' },
    { text: '2' },
    { text: '3' },
    { text: '+', isDark: true },
    { text: '0', isLarge: true },
    { text: '.' },
    { text: '=', isDark: true },
  ];

  return (
    <div className={s.keypad}>
      {buttons.map((button) => (
        <Button
          key={button.text}
          text={button.text}
          onClick={handleButtonClick}
          className={cx(
            button.isLarge && s['button-2x'],
            button.isDark && s.dark,
          )}
        />
      ))}
    </div>
  );
}
