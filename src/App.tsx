import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const [total, setTotal] = useState(0);
  const [input, setInput] = useState('0');
  const [formulaScreen, setFormularScreen] = useState<string[]>([]);
  const [showedTotal, setShowedTotal] = useState(false);

  const inputNumber = (number:string) => {

    if (showedTotal) {
      setShowedTotal(false);
      setInput('0');
      setFormularScreen([])
    }


    if(number === '0' && input === '0') {
      // do nothing
      console.log('no possible');
    } else if (number !== '0' && input === '0') {
      setInput(number);
    } else {
      const newNumberString = input + number; 
      setInput(newNumberString)
    }

  }


  const getTotal = (equationArray: string | any[]) => {
    let result = parseFloat(equationArray[0]);

    // Iterate over the array, starting from index 1
    for (let i = 1; i < equationArray.length; i += 2) {
      const operator = equationArray[i];
      const operand = parseFloat(equationArray[i + 1]);
  
      // Check the operator and perform the corresponding operation
      switch (operator) {
        case '+':
          result += operand;
          break;
        case '-':
          result -= operand;
          break;
        case '*':
          result *= operand;
          break;
        case '/':
          // Check for division by zero
          if (operand === 0) {
            return NaN; // or handle the error as needed
          }
          result /= operand;
          break;
        default:
          // Handle unknown operators or invalid input
          return NaN; // or throw an error
      }
    }
    return result;
  }

  const workItOut = () => {
    const numberToAdd = input;
    const equationArray = [...formulaScreen, numberToAdd];
    const total = getTotal(equationArray);

    setFormularScreen(equationArray)

    setInput(total.toString());
    setShowedTotal(true);
    setTotal(total);

    
  }

  const updateFormular = (operator: string) => {
    if (input.length !== 0) {
      if (showedTotal) {
        setShowedTotal(false)
        setFormularScreen([total.toString(), operator]);
        setTotal(0);
        setInput('0');
      } else {
        const numberToAdd = input.toString();
  
        if (formulaScreen.length === 0) {
          setFormularScreen([numberToAdd, operator]);
          setInput('0')
        } else {
          setFormularScreen([...formulaScreen, numberToAdd, operator]);
          setInput('0');
        }
      }
    }



  }

  const handleKey = (event:any) => {

    const key: string = event.target.id;

    switch(key){
      case 'clear': 
        setTotal(0);
        setFormularScreen([])
        setInput('0')
        console.log(key)
        break;
      case 'divide':
        console.log(key)
        updateFormular('/');
        //divide
        break;
      case 'multiply':
        console.log(key)
        updateFormular('*');
        // multiply
        break;
      case 'subtract':
        console.log(key)
        if (input.length === 0) {
          inputNumber('-')
        } else {
          updateFormular('-');
        }
        
        //subtract
        break;
      case 'add':
        console.log(key)
        updateFormular('+');
        //add
        break;
      case 'equals':
        console.log(key)
        if (!showedTotal) {
          workItOut();
        }
       
        // equals
        break;
      case 'decimal':
        console.log(key)
        inputNumber('.')
        // decimal
        break;
      case 'zero': 
        console.log(key)
        inputNumber('0')
        break;
      case 'one':
        console.log(key)
        inputNumber('1')
        // one
        break;
      case 'two':
        console.log(key)
        inputNumber('2')
        //two
        break;
      case 'three':
        console.log(key)
        inputNumber('3')
        break;
      case 'four':
        console.log(key)
        inputNumber('4')
        break;
      case 'five':
        console.log(key)
        inputNumber('5')
        break;
      case 'six':
        console.log(key)
        inputNumber('6')
        break;
      case 'seven':
        console.log(key)
        inputNumber('7')
        break;
      case 'eight':
        console.log(key)
        inputNumber('8')
        break;
      case 'nine':
        console.log(key)
        inputNumber('9')

        break;
      default:
        break;
    }
  };

  return (
    <div className="App">
      <div className="calculator">
        <div id="display-wrapper">
          <div className="formulaScreen">{formulaScreen.join(' ')}</div>
          <div id="display" className="outputScreen">{input}</div>  
        </div>
        <div className="keys">
          <div className="key wide" id="clear" onClick={handleKey}>AC</div>
          <div className="key" id="divide" onClick={handleKey}>/</div>
          <div className="key" id="multiply" onClick={handleKey}>X</div>
          <div className="key" id="seven" data-value='7' onClick={handleKey}>7</div>
          <div className="key" id="eight" data-value='8' onClick={handleKey}>8</div>
          <div className="key" id="nine" data-value='9' onClick={handleKey}>9</div>
          <div className="key" id="subtract" onClick={handleKey}>-</div>
          <div className="key" id="four" data-value='4' onClick={handleKey}>4</div>
          <div className="key" id="five" data-value='5' onClick={handleKey}>5</div>
          <div className="key" id="six" data-value='6' onClick={handleKey}>6</div>
          <div className="key" id="add"  onClick={handleKey}>+</div>
          <div className='bottom-rows'>
          <div className="key" id="one" data-value='1' onClick={handleKey}>1</div>
          <div className="key" id="two" data-value='8' onClick={handleKey}>2</div>
          <div className="key" id="three" data-value='9' onClick={handleKey}>3</div>
            
            <div className="key wide" id="zero" data-value='0' onClick={handleKey}>0</div>
            <div className="key" id="decimal" onClick={handleKey}>.</div>
          </div>
          <div id="equals" onClick={handleKey}>=</div>

          
        </div>

      </div>
    </div>
  );
}

export default App;
