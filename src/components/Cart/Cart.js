import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cartActions } from '../../redux/cartSlice';
import { ToastContainer, toast } from 'react-toastify';
import { useTransition, animated } from 'react-spring';
import './Cart.css';

const Cart = () => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const transitions = useTransition(cart.items, {
  });

  const removeFromCart = (id) => {
    dispatch(cartActions.removeItem(id));
    toast.info("Item removed from cart");
  };

  const increaseItemQuantity = (id) => {
    dispatch(cartActions.increaseQuantity(id));
  };

  const decreaseItemQuantity = (id) => {
    dispatch(cartActions.decreaseQuantity(id));
  };

  return (
    <div className="cart-container">
      <ToastContainer />
      <h2 className="cart-title">Shopping Cart</h2>
      {transitions((style, item) => (
        <animated.div style={style} key={item.id} className="cart-item">
          <img src={item.image} alt={item.name} className="cart-item-image" />
          <div className="cart-item-details">
            <span className="cart-item-name">{item.name}</span>
            <span className="cart-item-price">${item.price} x {item.quantity}</span>
            <div className="cart-item-quantity">
              <button onClick={() => increaseItemQuantity(item.id)} className="quantity-button">+</button>
              <span>{item.quantity}</span>
              <button onClick={() => decreaseItemQuantity(item.id)} className="quantity-button">-</button>
            </div>
          </div>
          <button onClick={() => removeFromCart(item.id)} className="remove-button">Remove</button>
        </animated.div>
      ))}
      <p className="cart-total">Total: ${cart.totalAmount.toFixed(2)}</p>

    </div>
  );
};

export default Cart;
