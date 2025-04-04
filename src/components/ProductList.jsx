import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import "./ProductList.css";
import CartItem from "./CartItem";
import plantsArray from "./data";
import { addItem } from "../CartSlice";
import { styleA, styleObj, styleObjUl } from "./styles";
import CartIcon from "./CartIcon";
// eslint-disable-next-line react/prop-types
function ProductList({ onHomeClick }) {
    const [showCart, setShowCart] = useState(false);
    const [showPlants, setShowPlants] = useState(true);
    const [addedToCart, setAddedToCart] = useState({});
    const dispatch = useDispatch(); // State to control the visibility of the About Us page

    const handleHomeClick = (e) => {
        e.preventDefault();
        onHomeClick();
    };

    const handleCartClick = (e) => {
        e.preventDefault();
        setShowCart(true); // Set showCart to true when cart icon is clicked
    };
    const handlePlantsClick = (e) => {
        e.preventDefault();
        setShowCart(false);
        setShowPlants(true); // Hide the cart when navigating to About Us
    };

    const handleContinueShopping = (e) => {
        e.preventDefault();
        setShowCart(false);
        setShowPlants(true);
    };
    const handleAddToCart = (plant) => {
        dispatch(addItem(plant));
        setAddedToCart((prevState) => ({ ...prevState, [plant.name]: true }));
    };
    return (
        <div>
            <div className="navbar" style={styleObj}>
                <div className="tag">
                    <div className="luxury">
                        <img src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" alt="" />
                        <a href="/" onClick={(e) => handleHomeClick(e)}>
                            <div>
                                <h3 style={{ color: "white" }}>Paradise Nursery</h3>
                                <i style={{ color: "white" }}>Where Green Meets Serenity</i>
                            </div>
                        </a>
                    </div>
                </div>
                <div style={styleObjUl}>
                    <div>
                        {" "}
                        <a href="#" onClick={(e) => handlePlantsClick(e)} style={styleA}>
                            Plants
                        </a>
                    </div>
                    <div>
                        {" "}
                        <a href="#" onClick={(e) => handleCartClick(e)} style={styleA}>
                            <CartIcon />
                        </a>
                    </div>
                </div>
            </div>
            {!showCart ? (
                <div className="product-grid">
                    {plantsArray.map((plants, index) => (
                        <div key={index}>
                            <h1 style={{ textAlign: "center", margin: "20px 0" }}>
                                <div>{plants.category}</div>
                            </h1>
                            <div className="product-list">
                                {plants.plants.map((plant, plantIndex) => (
                                    <div className="product-card" key={plantIndex}>
                                        <img className="product-image" src={plant.image} alt={plant.name} />
                                        <div className="product-title">{plant.name}</div>
                                        {/*Similarly like the above plant.name show other details like description and cost*/}
                                        <button
                                            className="product-button"
                                            onClick={() => handleAddToCart(plant)}
                                            disabled={addedToCart[plant.name]}
                                        >
                                            {addedToCart[plant.name] ? "Added to Cart" : "Add to Cart"}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <CartItem onContinueShopping={handleContinueShopping} setAddedToCart={setAddedToCart} />
            )}
        </div>
    );
}

export default ProductList;
