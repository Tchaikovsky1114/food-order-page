import { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/CartProvider";

function App() {
  // 컴포넌트가 재실행 될때마다 최신 snapshot을 확인하기 위해
  // setState의 함수에 접근하여 업데이트를 예약한다.
  const [isShowCart, setIsShowCart] = useState(false);

  const showCartHandler = () => {
    setIsShowCart(prev => !prev);
  }
  return (
    <CartProvider>
      {isShowCart && <Cart showCartHandler={showCartHandler} />}
      <Header showCartHandler={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
