import {useState} from 'react';

function App(){

    const [calc,setCalc] = useState("");
    const [result,setResult] = useState("");
    const ops = ['/','*','+', '-','.'];

    const updateCalc = value =>{
        if(
            ops.includes(value) && calc === '' ||

            ops.includes(value) && ops.includes(calc.slice(-1)) 
        ){
            return;

        }
            
            setCalc(calc + value);

            if(!ops.includes(value)){
                setResult(eval(calc +value).toString());
                
            }
            
           
    }

    const createDigits = () =>{
        const digits = [];
        

        for(let i = 1; i< 10 ;i++){
            digits.push(
                <button  
                onClick={()=>updateCalc(i.toString())} 
                key={i} >
                {i}
                
                </button>
            )
            
        }

        return digits;
        

    }
    const calculate = () =>{
        setCalc(eval(calc).toString());
        setResult("")

    }

    const deletelast =() =>{
        if(calc == ''){
            return;
        }
        const value = calc.slice(0,-1);
        setCalc(value);
    }
    const Clear =() =>{
        if(calc == '' && result==''){
            return;
        }
        const value = calc.slice(0,-100000000000000) && result.slice(0,-1000000000000000);
        setCalc(value);
        setResult(value)
        
        
    }
    return(
        <div className="App">
            <div className="calculator">
                <div className='display1'><span>&nbsp;</span> {result ? <span>{result}</span>: ''}</div>
                <div className="display">
                    {calc || "0"}
                </div>
                <div className="operators">
                    <button onClick={()=>updateCalc('/')}>/</button>
                    <button onClick={()=>updateCalc('*')}>*</button>
                    <button onClick={()=>updateCalc('+')}>+</button>
                    <button onClick={()=>updateCalc('-')}>-</button>
                    <button onClick={Clear}>AC</button>
                    <button onClick={deletelast}>DEL</button>
                </div>

                <div className="digits">
                    {createDigits()}
                    <button onClick={()=>updateCalc('0')}>0</button>
                    <button onClick={()=>updateCalc('.')}>.</button>

                    <button onClick={calculate}>=</button>
                </div>
            </div>
        </div>
    );
}
export default App;