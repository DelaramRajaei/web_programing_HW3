import React, { useState } from 'react';
import Keypad from '../keypad';
import Screen from '../screen';
import s from './calculator.module.css';
import { number } from 'prop-types';

export default function Calculator() {
  let [calc, setCalc] = useState({
    result: 0,
    computation: "",
    display: "0"
  });

  const calculate = (numbers, signs) => {
    const newArr = numbers.filter( value => !Number.isNaN(value));
    numbers.splice(0,numbers.length,...newArr)
    if (numbers.length === (signs.length + 1)) {
      let string = numbers[0];
      for (let i = 0; i < signs.length; ++i) {
        string += signs[i] + numbers[i + 1]
      }
      setCalc({
        ...calc,
        computation: string,
      });
      let flag = true
      while (signs.length > 0) {
        if (flag) {
          flag = multi_div({ numbers, signs });
        }
        if (!flag) {
          sum_minus({ numbers, signs });
        }
      }
      setCalc({ ...calc, display: numbers[0] });
    }
  };

  const multi_div = ({ numbers, signs }) => {
    let index = signs.findIndex(v => v === "x" || v === "÷")
    if (index >= 0) {
      const result = "x" === signs[index]
        ? numbers[index] * numbers[index + 1]
        : numbers[index + 1] === 0
          ? 0
          : numbers[index] / numbers[index + 1];
      numbers = numbers.splice(index, 2, result)
      signs = signs.splice(index, 1)
      return true;
    }
    else {
      return false;
    }
  };

  const sum_minus = ({ numbers, signs }) => {
    let index = signs.findIndex(v => v === "+" || v === "-")
    if (index > -1) {
      const result = "+" === signs[index]
        ? numbers[index] + numbers[index + 1]
        : numbers[index] - numbers[index + 1];
      numbers = numbers.splice(index, 2, result)
      signs = signs.splice(index, 1)
    };
  }

  const updateDisplay = (char) => {
    if (char === 'C'){
      const display = '0'
      setCalc({ ...calc, display: display });
    }
    else if (char !== '=') {
      const display = (calc.display === '0' ? '' : calc.display) + char.toString()
      setCalc({ ...calc, display: display });
    }
  }
  return (
    <div className={s.calculator}>
      <Screen text={calc.display} />
      <Keypad onKeyPressed={updateDisplay} onCalc={calculate} />
    </div>
  );
}
