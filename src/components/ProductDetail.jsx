import React, { useState, useRef, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import PageTitle from "./PageTitle";
import { toast } from "react-toastify";
import { useCart } from "../store/Cart-Context";

function ProductDetail() {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;
  const zoomRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [backgroundPosition, setBackgroundPosition] = useState("center");
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (quantity < 1) {
      toast.error("Quantity must be at least 1");
      return;
    }
    addToCart(product, quantity);
    toast.success(`Added ${quantity} ${product.name} to cart!`);
  };

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setBackgroundPosition(`${x}% ${y}%`);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setBackgroundPosition("center");
  };

  // If product is not passed via state, show error
  if (!product) {
    return (
      <div className="min-h-[852px] py-12 bg-normalbg dark:bg-darkbg font-primary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-primary dark:text-light mb-4">
            Product Not Found
          </h2>
          <button
            onClick={() => navigate("/")}
            className="py-2 px-6 bg-primary dark:bg-light text-white dark:text-black text-lg font-semibold rounded-md hover:bg-dark dark:hover:bg-lighter transition"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const handleQuantityChange = (type) => {
    if (type === "increment") {
      setQuantity((prev) => prev + 1);
    } else if (type === "decrement" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleViewCart = () => {
    navigate("/cart");
  };

  return (
    <div className="min-h-[852px] py-12 bg-normalbg dark:bg-darkbg font-primary">
      <div className="max-w-6xl mx-auto px-4">
        <PageTitle title="Product Details" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
          {/* Product Image with Zoom */}
          <div
            className="relative flex items-center justify-center bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg overflow-hidden cursor-zoom-in"
            ref={zoomRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              backgroundImage: isHovering ? `url(${product.imageUrl})` : "none",
              backgroundSize: "200%",
              backgroundPosition: backgroundPosition,
              backgroundRepeat: "no-repeat",
              minHeight: "500px",
            }}
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className={`max-w-full h-auto max-h-[500px] object-contain rounded-md transition-opacity duration-300 ${
                isHovering ? "opacity-0" : "opacity-100"
              }`}
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center space-y-6">
            {/* Product Name */}
            <h1 className="text-4xl font-bold text-primary dark:text-light">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-primary dark:text-light">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xl line-through text-gray-500 dark:text-gray-400">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            {/* Description */}
            <div className="border-t border-b border-gray-300 dark:border-gray-600 py-6">
              <h3 className="text-xl font-semibold text-primary dark:text-light mb-3">
                Description
              </h3>
              <p className="text-gray-700 dark:text-lighter leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Category */}
            {product.category && (
              <div>
                <span className="inline-block px-4 py-2 bg-primary/10 dark:bg-light/10 text-primary dark:text-light rounded-full text-sm font-semibold">
                  {product.category}
                </span>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="space-y-3">
              <label className="text-lg font-semibold text-primary dark:text-light">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleQuantityChange("decrement")}
                  disabled={quantity <= 1}
                  className="w-12 h-12 flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-primary dark:text-light font-bold text-xl rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  -
                </button>
                <span className="text-2xl font-bold text-primary dark:text-light min-w-[3rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange("increment")}
                  className="w-12 h-12 flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-primary dark:text-light font-bold text-xl rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3 px-6 bg-primary dark:bg-light text-white dark:text-black text-lg font-semibold rounded-md hover:bg-dark dark:hover:bg-lighter transition shadow-md"
              >
                Add to Cart
              </button>
              <button
                onClick={handleViewCart}
                className="flex-1 py-3 px-6 bg-transparent border-2 border-primary dark:border-light text-primary dark:text-light text-lg font-semibold rounded-md hover:bg-primary/10 dark:hover:bg-light/10 transition"
              >
                View Cart
              </button>
            </div>

            {/* Back to Products Link */}
            <button
              onClick={() => navigate("/")}
              className="text-primary dark:text-light underline hover:text-dark dark:hover:text-lighter transition text-left"
            >
              ← Back to Products
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
