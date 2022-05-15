import CartContext from "./cart-context";
import { useReducer } from "react";



const initialCartState = {
  items: [],
  totalAmount:0
}

// action은 dispatcher를 통해 전달받는다.
// state는 reducer에 의해 관리되는 state의 최신 snapshot이다.
const cartReducer = (state,action) => {
  if(action.type === 'ADD'){
    const updatedItems = [...state.items,action.item];
    const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };
  }
  if(action.type === 'REMOVE'){
    return;
  }

  return initialCartState;
}

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer,initialCartState);

  const addItemToCartHandler = item => {
    dispatchCartAction({type:'ADD', item:item})
  };

  const removeItemFromCartHandler = id =>{
    dispatchCartAction({type:'REMOVE', id:id})
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  }
  return <CartContext.Provider value={cartContext}>
    {props.children}
  </CartContext.Provider>
};

export default CartProvider;