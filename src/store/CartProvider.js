import { useReducer } from "react";
import CartContext from "./cart-context";

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const updatedItems = state.items.concat(action.item);
      const updatedAmount =
        state.totalAmount + action.item?.price * action.item?.amount;
      return {
        items: updatedItems,
        totalAmount: updatedAmount,
      };
    }

    case "REMOVE_CART_ITEM": {
      return {};
    }

    default:
      return state;
  }
};
const CartProvider = ({ children }) => {
  const defaultCartState = {
    items: [],
    totalAmount: 0,
  };

  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD_TO_CART", item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE_CART_ITEM", id });
  };

  const cartCtx = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartCtx}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
