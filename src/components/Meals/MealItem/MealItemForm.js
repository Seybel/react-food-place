import { useRef, useState } from 'react';
import Input from '../../UI/Input';

import classes from './MealItemForm.module.css';

const MealItemForm = (props) => {
    const [isAmountValid, setIsAmountValid] = useState(true)
    const amountInputRef = useRef();

    const submitHandler = (evt) => {
        evt.preventDefault();

        const emptyAmount = amountInputRef.current.value.trim().length === 0;
        const enteredAmount = +amountInputRef.current.value;

        if(emptyAmount || enteredAmount < 1) {
            setIsAmountValid(false);
            return;
        };
        // Add to cart
        props.onAddToCart(enteredAmount)
    }

  return (
    <form className={classes.form} onSubmit={ submitHandler }>
      <Input
        ref={amountInputRef}
        label='Amount'
        input={{
          id: 'amount_' + props.id,
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
        }}
      />
      <button type='submit'>+ Add</button>
      {!isAmountValid && <p>Enter valid amount</p>}
    </form>
  );
};

export default MealItemForm;