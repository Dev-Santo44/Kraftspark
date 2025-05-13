import React from "react";
import { Button } from "@mui/material";
import "./../../assets/styles/pages/Store.css";
const ProductCard = ({ product, addToCart }) => {
  return (
    <div className="product-card">
      <img
        src={product.imageUrl}
        alt={product.post_title}
        className="product-image"
      />
      <div className="product-info">
        <h3 className="product-title">{product.post_title}</h3>
        <p className="product-price">Starting at ${product.price}</p>
        <Button
          sx={{
            width: "100%",
            backgroundColor: "#4f46e5",
            color: "white",
            fontWeight: 600,
            borderRadius: "0.5rem",
            "&:hover": {
              backgroundColor: "#4338ca",
            },
          }}
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};
export default ProductCard;
