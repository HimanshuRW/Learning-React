import { createContext } from "react";


// just to define boiler plate.. no rigid need.. but helps in autocomplition
// we can set and update the the value of Cart_Context which is an object
// anywhere freely within Context.Provider component
// Context.provider make an enviroment inside it where any component 
// can access/edit Context from anywhere
const Cart_Context = createContext({
    my_items : [],
    addItemToCart : ()=>{}
});

export default Cart_Context;