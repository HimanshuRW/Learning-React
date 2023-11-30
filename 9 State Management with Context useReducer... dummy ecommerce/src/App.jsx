import { useReducer } from "react";
import Header from "./components/Header.jsx";
import Shop from "./components/Shop.jsx";
import Product from "./components/Product.jsx";
import Cart_Context from "./store/Cart_Context.jsx";
import { DUMMY_PRODUCTS } from "./dummy-products.js";

function reducerFunc(currentState, action) {
  if (action.type == "ADD_ITEM") {
    console.log("ADD_ITEM inside reducerFunc");
    const updatedItems = [...currentState.items];

    const existingCartItemIndex = updatedItems.findIndex(
      (cartItem) => cartItem.id === action.id
    );
    const existingCartItem = updatedItems[existingCartItemIndex];

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      const product = DUMMY_PRODUCTS.find((product) => product.id === action.id);
      updatedItems.push({
        id: action.id,
        name: product.title,
        price: product.price,
        quantity: 1,
      });
    }
    console.log("Updated items ",updatedItems);

    return {
      items: updatedItems
    };
  }

  if(action.type == "UPDATE_CART"){
    
    console.log("UPDATE_CART inside reducerFunc");
    const updatedItems = [...currentState.items];
    const updatedItemIndex = updatedItems.findIndex(
      (item) => item.id === action.payload.productId
    );

    const updatedItem = {
      ...updatedItems[updatedItemIndex],
    };

    updatedItem.quantity += action.payload.amount;

    if (updatedItem.quantity <= 0) {
      updatedItems.splice(updatedItemIndex, 1);
    } else {
      updatedItems[updatedItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
    };
  
  }
}

function App() {

  const [myState, callReducer] = useReducer(reducerFunc,{
    items : []
  });

  function handleAddItemToCart(id) {
    callReducer({
      type : "ADD_ITEM",
      id : id 
    });
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    callReducer({
      type : "UPDATE_CART",
      payload : {
        productId,
        amount
      }
    });
  }

  let cart_context_value = {
    // set the intial value.. just like we an intial value for useState
    my_items: myState.items,
    addItemToCart: handleAddItemToCart,
  };

  console.log("aap called : ",myState);
  return (
    <Cart_Context.Provider value={cart_context_value}>
      <Header
        cart={myState}
        onUpdateCartItemQuantity={handleUpdateCartItemQuantity}
      />
      <Shop>
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product} />
          </li>
        ))}
      </Shop>
    </Cart_Context.Provider>
  );
}

export default App;
