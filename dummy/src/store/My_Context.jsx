import { createContext } from "react";

const MyContext = createContext({
    current_parent_state : 0,
    set_parent_state : ()=>{}
});

export default MyContext;