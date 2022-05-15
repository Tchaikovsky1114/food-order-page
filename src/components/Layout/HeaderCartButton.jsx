import styled from '@emotion/styled';
import React from 'react';
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';
import { useContext } from 'react';
const Button = styled.button`
  
  cursor: pointer;
  font: inherit;
  border: none;
  background-color: #4d1601;
  color: white;
  padding: 0.75rem 3rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 25px;
  font-weight: bold;
  &:hover,
  &:active{
    background-color: #2c0d00;
  }
  svg{
    width: 1.35rem;
  height: 1.35rem;
  margin-right: 0.5rem;
  }
`

const Badge = styled.span`
  background-color: #b94517;
  padding: 0.25rem 1rem;
  border-radius: 25px;
  margin-left: 1rem;
  font-weight: bold;  
`


// .button:hover .badge,
// .button:active .badge {
//   background-color: #92320c;
// }

// .bump {
//   animation: bump 300ms ease-out;
// }

// @keyframes bump {
//   0% {
//     transform: scale(1);
//   }
//   10% {
//     transform: scale(0.9);
//   }
//   30% {
//     transform: scale(1.1);
//   }
//   50% {
//     transform: scale(1.15);
//   }
//   100% {
//     transform: scale(1);
//   }
// }
const HeaderCartButton = ({showCartHandler}) => {
  const cartContext = useContext(CartContext);

  const numberOfCartItems = cartContext.items.reduce((cur,item)=>{
    return cur + item.amount;
  }, 0);
  return (
    <Button onClick={showCartHandler}>
      <span>
        <CartIcon />
      </span>
      <span>장바구니</span>
      <Badge>
        {numberOfCartItems}
      </Badge>
    </Button>
  );
};

export default HeaderCartButton;