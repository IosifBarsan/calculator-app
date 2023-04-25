import React, {useState} from 'react'

export default function Calculator() {
  'use strict';
  const [calc, setCalc] = useState('');
  const [result, setResult] = useState('');

  const opr = ['/', '*', '+', '-', '.', '%'];

  const customEval = (expr) => {
    return Function('"use strict";return (' + expr + ')')();
  }

  const updateCalc = (value) => {
    if (
      (opr.includes(value) && calc === '') ||
      (opr.includes(value) && opr.includes(calc.slice(-1)))
    ) {
      return;
    }
    setCalc(calc + value);
    if (!opr.includes(value)) {
      setResult(customEval(calc + value).toString());
    }
  };

  const createDigit = () => {
    const digits = [];

    for (let i = 1; i < 10; i++) {
      digits.push(
        <button onClick={() => updateCalc(i.toString())} key={i}>
          {i}
        </button>
      );
    }
    return digits;
  };

  const calculate = () => {
    setCalc(customEval(calc).toString());
  };

  const reset = () => {
    if (calc === '') {
      return;
    }

    setCalc('');
    setResult('');
  };

  return (
    <div className="calculator">
      <div className="screen">
        {result ? <span>({result})</span> : ''} {calc || '0'}
      </div>
      <div className="operators">
        <button onClick={reset}>DEL</button>
        <button onClick={() => updateCalc('/')}>/</button>
        <button onClick={() => updateCalc('*')}>*</button>
        <button onClick={() => updateCalc('+')}>+</button>
        <button onClick={() => updateCalc('-')}>-</button>
        <button onClick={() => updateCalc('%')}>%</button>
      </div>
      <div className="digits">
        {createDigit()}
        <button onClick={() => updateCalc('0')}>0</button>
        <button onClick={() => updateCalc('.')}>.</button>
        <button onClick={calculate}>=</button>
      </div>
    </div>
  );
}
