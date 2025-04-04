/* eslint-disable no-unused-vars */
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, decrementQuantity, incrementQuantity } from "../CartSlice";
import "./CartItem.css";

// eslint-disable-next-line react/prop-types
const CartItem = ({ onContinueShopping, setAddedToCart }) => {
    const cart = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const items = useSelector((state) => state.cart.items);

    // Calculate total amount for all products in the cart
    const calculateTotalAmount = () => {
        return items.reduce((total, item) => total + calculateTotalCost(item), 0);
    };

    const handleContinueShopping = (e) => {
        onContinueShopping(e);
    };

    const handleIncrement = (index) => {
        dispatch(incrementQuantity(index));
    };

    const handleDecrement = (index) => {
        if (items[index].quantity == 1) {
            handleRemove(index);
        } else {
            dispatch(decrementQuantity(index));
        }
    };

    const handleRemove = (index) => {
        dispatch(removeItem(index));
        setAddedToCart((prevState) => ({ ...prevState, [items[index].name]: false }));
    };

    // Calculate total cost based on quantity for an item
    const calculateTotalCost = (item) => {
        return item.quantity * parseFloat(item.cost.slice(1));
    };

    return (
        <div className="cart-container">
            <h2 style={{ color: "black" }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
            <div>
                {cart.map((item, index) => (
                    <div className="cart-item" key={item.name}>
                        <img className="cart-item-image" src={item.image} alt={item.name} />
                        <div className="cart-item-details">
                            <div className="cart-item-name">{item.name}</div>
                            <div className="cart-item-cost">{item.cost}</div>
                            <div className="cart-item-quantity">
                                <button
                                    className="cart-item-button cart-item-button-dec"
                                    onClick={() => handleDecrement(index)}
                                >
                                    -
                                </button>
                                <span className="cart-item-quantity-value">{item.quantity}</span>
                                <button
                                    className="cart-item-button cart-item-button-inc"
                                    onClick={() => handleIncrement(index)}
                                >
                                    +
                                </button>
                            </div>
                            <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
                            <button className="cart-item-delete" onClick={() => handleRemove(index)}>
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div style={{ marginTop: "20px", color: "black" }} className="total_cart_amount"></div>
            <div className="continue_shopping_btn">
                <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>
                    Continue Shopping
                </button>
                <br />
                {items.length > 0 && <button className="get-started-button1">Checkout</button>}
            </div>
        </div>
    );
};

export default CartItem;
