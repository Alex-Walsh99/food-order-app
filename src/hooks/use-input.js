import {useReducer} from "react";

const initialInputState = {
    value:'',
    isTouched: false
};

const inputStateReducer = (state, action) => {

    switch (action.type) {
        case 'INPUT':
            return {
                value: action.value,
                isTouched: state.isTouched
            }
        case 'BLUR':
            return {
                value: state.value,
                isTouched: true
            }
        case 'RESET':
            return {
                value: '',
                isTouched: false
            }
        default:
            break;
    }
    return initialInputState;
};
const useInput = (validatorFunc) => {

    const [inputState, dispatchInputState] = useReducer(inputStateReducer, initialInputState);

    const valueIsValid = validatorFunc(inputState.value);
    const shouldReportError = !valueIsValid && inputState.isTouched;

    const valueChangeHandler = event => {
        dispatchInputState({type: 'INPUT', value: event.target.value});
    };

    const inputBlurHandler = () => {
        dispatchInputState({type: 'BLUR'});
    }

    const reset = () => {
        dispatchInputState({type: 'RESET'});
    }

    return {
        value: inputState.value,
        valueIsValid: valueIsValid,
        shouldReportError,
        valueChangeHandler,
        inputBlurHandler,
        reset
    }
}

export default useInput;