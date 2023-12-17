import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Home from './pages/Home.js';
import Products from './pages/Products.js';
import Product from './pages/Product.js';
import Root from './pages/Root.js';
import Error from './pages/Error.js';

const router = createBrowserRouter([
  {
    path : "/root",
    element : <Root />,
    children : [
      { index : true, path : '', element : <Home /> },
      { path : '/products', element : <Products /> },
      { path : 'products/:productId', element : <Product /> },
      { path : '*', element : <Error /> }
    ]
  },
])

function App() {
  return <RouterProvider router={router}/>;
}

export default App;
