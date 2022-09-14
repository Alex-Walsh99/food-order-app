import classes from "./Checkout.module.css";
import useInput from "../../hooks/use-input";
import {useEffect, useState} from "react";

const Checkout = props => {

    const {
        value: enteredName,
        valueIsValid: nameIsValid,
        shouldReportError: nameShouldReportError,
        valueChangeHandler: nameChangeHandler,
        inputBlurHandler: nameBlurHandler,
        reset: nameInputReset
    } = useInput(value => value.trim() !== '');

    const {
        value: enteredAddress,
        valueIsValid: addressIsValid,
        shouldReportError: addressShouldReportError,
        valueChangeHandler: addressChangeHandler,
        inputBlurHandler: addressBlurHandler,
        reset: addressInputReset
    } = useInput(value => value.trim() !== '');

    const {
        value: enteredCity,
        valueIsValid: cityIsValid,
        shouldReportError: cityShouldReportError,
        valueChangeHandler: cityChangeHandler,
        inputBlurHandler: cityBlurHandler,
        reset: cityInputReset
    } = useInput(value => value.trim() !== '');

    const {
        value: enteredPostal,
        valueIsValid: postalIsValid,
        shouldReportError: postalShouldReportError,
        valueChangeHandler: postalChangeHandler,
        inputBlurHandler: postalBlurHandler,
        reset: postalInputReset
    } = useInput(value => value.trim() !== '');

    const [formIsValid, setFormIsValid] = useState(false);

    useEffect(() => {
        if(nameIsValid && addressIsValid && cityIsValid && postalIsValid)
            setFormIsValid(true)
        else
            setFormIsValid(false)
    }, [nameIsValid, addressIsValid, cityIsValid, postalIsValid]);

    const formSubmissionHandler = event => {
        event.preventDefault();

        if(nameShouldReportError)
            return;
        if(addressShouldReportError)
            return;
        if(cityShouldReportError)
            return;
        if(postalShouldReportError)
            return;

        if(!formIsValid){
            return;
        }
        props.onConfirm({
            name: enteredName,
            address: enteredAddress,
            city: enteredCity,
            postalCode: enteredPostal

        });

        nameInputReset()
        addressInputReset()
        cityInputReset()
        postalInputReset()
    }

    const nameInputClasses = nameShouldReportError ? `${classes.control} ${classes.invalid}` : classes.control
    const addressInputClasses = addressShouldReportError ?`${classes.control} ${classes.invalid}` : classes.control
    const cityInputClasses = cityShouldReportError ?`${classes.control} ${classes.invalid}` : classes.control
    const postalInputClasses = postalShouldReportError ?`${classes.control} ${classes.invalid}` : classes.control


    return <form className={classes.form} onSubmit={formSubmissionHandler}>
        <div className={nameInputClasses}>
            <label htmlFor='name'>Your Name</label>
            <input type='text' id='name' value={enteredName} onChange={nameChangeHandler} onBlur={nameBlurHandler}/>
        </div>
        <div className={addressInputClasses}>
            <label htmlFor='address'>Address</label>
            <input type='text' id='address' value={enteredAddress} onChange={addressChangeHandler} onBlur={addressBlurHandler}/>
        </div>
        <div className={cityInputClasses}>
            <label htmlFor='city'>City</label>
            <input type='text' id='city' value={enteredCity} onChange={cityChangeHandler} onBlur={cityBlurHandler}/>
        </div>
        <div className={postalInputClasses}>
            <label htmlFor='postal'>Postal Code</label>
            <input type='text' id='postal' value={enteredPostal} onChange={postalChangeHandler} onBlur={postalBlurHandler}/>
        </div>
        <div className={classes.actions}>
            <button type='button' onClick={props.onCancel}>
                Cancel
            </button>
            <button className={classes.submit}>Confirm</button>
        </div>
    </form>
}
export default Checkout;
