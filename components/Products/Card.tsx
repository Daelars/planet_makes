import React from "react";
// ...existing imports...

const Card = ({
  product,
}: {
  product: { id: number /* ...existing properties... */ };
}) => {
  // ...existing code...

  async function handleAddToCart() {
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id, quantity: 1 }),
      });
      const result = await res.json();
      // (optional) show confirmation or update UI
      console.log(result.message);
    } catch (error) {
      console.error("Error adding product to cart", error);
    }
  }

  return (
    <div className="product-card">
      {/* ...existing code... */}
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default Card;
