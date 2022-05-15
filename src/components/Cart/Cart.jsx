import React from 'react';
import Modal from '../UI/Modal';
import styled from '@emotion/styled';
import { useContext } from 'react';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
const CartItems = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 20rem;
  overflow: auto;
`;

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: 1.5rem;
  margin: 1rem 0;
`;

const Actions = styled.div`
  text-align: right;
  button {
    font: inherit;
    cursor: pointer;
    background-color: transparent;
    border: 1px solid #8a2b06;
    padding: 0.5rem 2rem;
    border-radius: 25px;
    margin-left: 1rem;
    &:hover,
    &:active {
      background-color: #5a1a01;
      border-color: #5a1a01;
      color: white;
    }

    /* button:first-of-type {
      color: #8a2b06;
    }
    .actions .button {
    background-color: #8a2b06;
    color: white;
} */
  }
`;

const Cart = ({ showCartHandler }) => {
  const cartContext = useContext(CartContext);

  const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;
  // state가 아닌 변수로 조절
  const hasItems = cartContext.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartContext.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartContext.addItem({...item,amount:1})
  };

  const cartItems = 
    <CartItems>
      {cartContext.items.map((item) => (
        <CartItem
          key={item.id}
          id={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          // bind를 통해 함수가 실행될 때 받을 인수를 미리 구성할 수 있다.
          // bind의 사용이 어색하다면 , 함수가 실행될 때 Arrow function으로 묶어 인자를 전달할 수 있다.
          // 함수 호출부에서 onClick={()=> onRemove(props.item.id)}
          // bind의 예시를 남겨두기 위해 onAdd에서는 그대로 bind 시용.
          onRemove={cartItemRemoveHandler}
          onAdd={cartItemAddHandler.bind(null,item)}
        />
      ))}
    </CartItems>
  ;

  return (
    <Modal>
      <div>???{cartItems}</div>

      <Total>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </Total>
      <Actions>
        <button onClick={showCartHandler}>Close</button>
        {hasItems && <button>Order</button>}
      </Actions>
    </Modal>
  );
};

export default Cart;
