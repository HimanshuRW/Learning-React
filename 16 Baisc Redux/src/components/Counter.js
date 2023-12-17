import classes from './Counter.module.css';
import {useSelector,useDispatch} from 'react-redux';
import {counterActions} from '../redux/index.js';

const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector(state=> state.counter.counter);
  const show = useSelector(state=> state.counter.show);

  const increment_handler = ()=>{
    // dispatch({
    //   type : 'increment'
    // });
    dispatch(counterActions.increment());
  }
  
  const decrement_handler = ()=>{
    dispatch(counterActions.decrement());
  }

  const toggleCounterHandler = () => {
    dispatch(counterActions.toggler());
  };
  const increase = () => {
    dispatch(counterActions.increase(10));
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {show && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={increment_handler}>Increment</button>
        <button onClick={increase}>Increase By 10</button>
        <button onClick={decrement_handler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
