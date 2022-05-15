import CartContext from "./cart-context";
import { useReducer } from "react";



const initialCartState = {
  items: [],
  totalAmount:0
}

// action은 dispatcher를 통해 전달받는다.
// state는 reducer에 의해 관리되는 state의 최신 snapshot이다.
// cartReducer는 컴포넌트(CartProvider)에서 아무것도 필요로 하지 않기에 외부에서 정의하며
// 또한 컴포넌트가 재평가 될 때마다 항상 재생성 될 필요도 없다.
// reducer함수는 state객체와 action을 받는다.
// 받는 state는 reducer에 의해 관리되는 state의 최신 state snapshot이다.
// 그리고 snapshot은 reducer 함수에서 새 snapshot을 반환해야 한다.

const cartReducer = (state,action) => {
  if(action.type === 'ADD'){
    
    const updatedTotalAmount = state.totalAmount + (action.item.price * action.item.amount);
    //이미 Cart에 존재하는 상품 (state.item.id)가 있다면 해당 인덱스를 반환한다.
    // (ex) p1 === p1) - 해당 Index를 get.
    const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);

    // 존재하지 않는 item이라면 null
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;


      // findIndex를 통해 이미 같은 id의 상품이 존재한다면 처리하는 로직이다.
    if(existingCartItem){
    
      // updatedItem은 각각의 메뉴 품목이다.
      // 구조분해할당으로, 기존의 값은 그대로 두고,amount의 양만 1씩 증가시킨다.
      let updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount
    
      }
    //updatedItems에 전개연산자로 기존의 배열을 그대로 유지하게 함
    updatedItems = [...state.items];

    // updatedItem을 updatedItems[existingCartItemIndex]로 덮어 씌워 최신의 snapshot(amount가 변경된)을 유지하게 한다. 
    updatedItems[existingCartItemIndex] = updatedItem;
    }else{
      // existingCartItem이 없다면(findIndex로 같은 id를 찾지 못했으니 새로운 상품) 그대로 Cart에 쌓는다.
      updatedItems = [...state.items,action.item]
    }
    // 변경한 값으로 return.
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };
  }



  if(action.type === 'REMOVE'){

    const existingCartItemIndex = state.items.findIndex((item) => item.id === action.id);
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;

    if(existingItem.amount === 1){
      updatedItems = state.items.filter((item) => item.id !== action.id )
    }else{
      const updatedItem = {...existingItem, amount: existingItem.amount - 1};
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    }
  }

  return initialCartState;
}

const CartProvider = (props) => {
  // cartReducer를 pointing 한다. (실제 실행은 react가 실행한다.)
  // 배열의 첫번째 요소는 항상 state snapshot이다.
  // 두번째 요소는 state를 update하는 function으로 reducer 함수에 action을 전달한다.

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