import './App.css';
import Header from "./components/Layout/Header";
import {Fragment, useContext} from "react";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartContext, {CartContextProvider} from "./store/cart-context";

function App() {
    const ctx=useContext(CartContext);

  return (
    <Fragment>
        {ctx.isShown && <Cart />}
        <Header />
        <main>
            <Meals />
        </main>
    </Fragment>
  );
}

export default App;
