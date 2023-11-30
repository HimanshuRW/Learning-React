import { useContext } from "react";
import Cart_Context from "../store/Cart_Context";


export default function Product({
  id,
  image,
  title,
  price,
  description,
}) {

  const cart_context_value = useContext(Cart_Context);
  return (
    <article className="product">
      <img src={image} alt={title} />
      <div className="product-content">
        <div>
          <h3>{title}</h3>
          <p className='product-price'>${price}</p>
          <p>{description}</p>
        </div>
        <p className='product-actions'>
          <button onClick={() => cart_context_value.addItemToCart(id)}>Add to Cart</button>
        </p>
      </div>
    </article>
  );
}
