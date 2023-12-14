import logo from './logo.svg';
import './App.css';
import { Fragment, useEffect, useState } from 'react';
import ChildA from './components/ChildA.jsx';
import ChildB from './components/ChildB.jsx';
import MyContext from './store/My_Context.jsx';

let p ="parent";


console.log("in the parent file");

function App({children}) {
  const [currentState,set_state] = useState(1000);

  console.log("in the parent starting funtion");
  
  useEffect(()=>{
    console.log("in the use Effect of parent");
    console.log("--------------------------------------------------");
    p+=' a';

    return ()=>console.log("in the retunr of useEffect of parent");
  });
  
  function update(){
    console.log("in the update of parent");
    set_state(before => before +1);
  }
  console.log("in the parent end funtion");

  let contextValue = {current_parent_state:currentState,set_parent_state:set_state};
  return (
    <MyContext.Provider value={contextValue}>
      {console.log("in the rendering of parent")}
      <h1 onClick={update} >Parent -  state : {currentState}    p : {p}</h1>
      {/* <ChildA propA={currentState} parentUpdate={update} />
      <ChildB propB={currentState} /> */}
      {children}
    </MyContext.Provider>
  );
}

export default App;
