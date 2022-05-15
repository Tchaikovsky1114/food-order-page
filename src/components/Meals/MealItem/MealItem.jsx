import styled from '@emotion/styled';
import React from 'react';
import MealIteamForm from './MealIteamForm';
import { useContext } from 'react';
import CartContext from '../../../store/cart-context';
const MealBox = styled.li`
    display: flex;
  justify-content: space-between;
  margin: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #ccc;
`
const Name = styled.h3`
  margin: 0 0 0.25rem 0;  
`

const Description = styled.div`
  font-style: italic;  
`

const Price = styled.div`
    margin-top: 0.25rem;
  font-weight: bold;
  color: #ad5502;
  font-size: 1.25rem;
`
const MealItem = ({id,name,description,price}) => {
  const prices =`${price.toFixed(2)}`
  const cartContext = useContext(CartContext)
  const addToCartHandler = amount => {
    cartContext.addItem({
      id: id,
      name: name,
      amount: amount,
      price:price
    })
  }

  return (
    <MealBox>
      <div>
        <Name>{name}</Name>
      <Description>{description}</Description>
      <Price>${prices}</Price>
      </div>

      <div>
      <MealIteamForm addToCartHandler={addToCartHandler}/>
      </div>
    </MealBox>
  );
};

export default MealItem;