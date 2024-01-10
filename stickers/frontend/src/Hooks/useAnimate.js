import { useEffect, useState } from 'react';

export default function useAnimate(setPage) {
  const [isVisible,setVisible] = useState(false);
  useEffect(()=>{
    console.log("ayaaaaa");
    setTimeout(()=>{
      setVisible(true);
    },5);
    return () => {
      // Cleanup function to reset isVisible when component unmounts
      setVisible(false);
    };
  },[]);

  function goto(url){
    setVisible(false);
    setTimeout(()=>{
      console.log("time up",url);
      setPage(url);
    },500);
  }

  return {isVisible,goto};
}