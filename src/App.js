
import { useReducer } from "react";
import DigitButton from "./Digitbutton";
import "./style.css";
import OperationButton from "./OperationButton";

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION : 'choose-operation',
  CLEAR :'clear',
  DELETE_DIGIT : 'delete-digit',
  EVALUATE: 'evaluate'
}

function reducer(state,{type,payload}){
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if(state.overwrite){
        return{
          ...state,
          currentOprend:payload.digit,
          overwrite:false,
        }
      }
      if(payload.digit ==="0" && state.currentOprend == "0"){
        return state
      }
      if(payload.digit ==="." && state.currentOprend.includes(".")){
        return state
      }
      return{
        ...state,
        currentOprend: `${state.currentOprend ||""}${payload.digit}`,
      }
      case ACTIONS.CHOOSE_OPERATION:
      if(state.currentOprend == null && state.previousOprend == null){
        return state
      }

      if(state.currentOprend == null){
        return{
          ...state,
          operation:payload.operation,
        }

      }

      if(state.previousOprend == null){
        return{
          ...state,
          operation: payload.operation,
          previousOprend : state.currentOprend,
          currentOprend:null,
          
        }
      }

      return{
        ...state,
        previousOprend: evaluate(state),
        operation: payload.operation,
        currentOprend:null
      }

    case ACTIONS.CLEAR:
      return{}

    case ACTIONS.DELETE_DIGIT:
      if(state.overwrite){
        return{
          ...state,
          overwrite:false,
          currentOprend:null,
        }
      }

      if(state.currentOprend==null) return state

      if(state.currentOprend.length == 1){
        return{...state,currentOprend:null}
      }

      return{
        ...state,
        currentOprend:state.currentOprend.slice(0,-1)
      }

    case ACTIONS.EVALUATE:
      if(state.operation == null ||
        state.currentOprend== null||
        state.previousOprend== null
        ){
          return state
        }

        return{
          ...state,
          overwrite:true,
          previousOprend:null,
          operation:null,
          currentOprend: evaluate(state),
        }
  }
}

function evaluate({currentOprend,previousOprend,operation}){
  const prev = parseFloat(previousOprend)
  const current = parseFloat(currentOprend)
  if (isNaN(prev) || isNaN(current)) return""
  let computation = ""
  switch(operation){
    case "+":
      computation = prev + current
      break
    case "-":
      computation = prev - current
      break
    case "*":
      computation = prev * current
      break
    case "%":
      computation = prev / current
      break
  }

  return computation.toString()
}

  const INTEGER_FORMATTER = new Intl.NumberFormat("en-us",{
    minimumFractionDigits:0,
  })

  function formatOprend(operand){
    if(operand == null) return
    const [integer, decimal] = operand.split('.')
    if(decimal == null) return INTEGER_FORMATTER.format(integer)
    return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
  }

function App() {
  const[{currentOprend,previousOprend,operation},dispatch] =useReducer(
    reducer,
    {}
    )
  
  return (
    <div className="calculator-grid">
      
      <div className="output">
        <div className="span"><span>Simple Calculator</span></div>
      
          <div className="previous-operand"> {formatOprend(previousOprend)}{operation}</div>
          <div className="current-operand">{formatOprend(currentOprend)}</div>
      </div>
      
      <button className="span-two" 
        onClick={()=>dispatch({type:ACTIONS.CLEAR})}>AC</button>
      <button onClick={()=>dispatch({type:ACTIONS.DELETE_DIGIT})} >DEL</button>
      <OperationButton operation="%" dispatch={dispatch} />
      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />
      <OperationButton operation="*" dispatch={dispatch} />
      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />
      <OperationButton operation="+" dispatch={dispatch} />
      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />
      <OperationButton operation="-" dispatch={dispatch} />
      <DigitButton digit="." dispatch={dispatch} />
      <DigitButton digit="0" dispatch={dispatch} />
      <button className="span-two" onClick={()=>dispatch({type:ACTIONS.EVALUATE})}>=</button>
    </div>
  );
}

export default App;
