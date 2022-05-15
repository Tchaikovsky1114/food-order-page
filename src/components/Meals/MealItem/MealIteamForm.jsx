import styled from '@emotion/styled';
import React from 'react';
import { useRef, useState } from 'react';
import Input from '../../UI/Input';

const Form = styled.form`
  text-align: right;
  button {
    font: inherit;
    cursor: pointer;
    background-color: #8a2b06;
    border: 1px solid #8a2b06;
    color: white;
    padding: 0.25rem 2rem;
    border-radius: 20px;
    font-weight: bold;
  }
  button:hover,
  button:active {
    background-color: #641e03;
    border-color: #641e03;
  }
`;

const MealIteamForm = ({ addToCartHandler }) => {
  // snapshot과 update function
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }
    addToCartHandler(enteredAmountNumber);
  };
  return (
    <Form onSubmit={submitHandler}>
      <Input
        label="Amount"
        input={{
          id: 'amount',
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
        }}
        ref={amountInputRef}
      />
      <button>+ Add</button>
      {!amountIsValid && <div>please correct to write right amount</div>}
    </Form>
  );
};

export default MealIteamForm;
