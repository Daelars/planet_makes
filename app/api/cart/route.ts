import { NextRequest, NextResponse } from "next/server";
import {
  getCart,
  getCartItems,
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  clearCart,
} from "@/app/actions/cart";
import { auth } from "@clerk/nextjs/server";

/**
 * GET handler - Retrieves the user's cart with all items
 *
 * @param request The incoming request
 * @returns JSON response with cart data or error message
 */
async function handleGetRequest() {
  try {
    // Use the existing server action to fetch cart data
    const cart = await getCart();

    // If cart doesn't exist, return an empty cart structure
    if (!cart) {
      return NextResponse.json({
        items: [],
        itemCount: 0,
        totalAmount: 0,
      });
    }

    // Calculate totals for the response
    const itemCount = cart.cartItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    const totalAmount = cart.cartItems.reduce(
      (sum, item) => sum + item.quantity * (item.product.price || 0),
      0
    );

    // Format the response
    return NextResponse.json({
      id: cart.id,
      items: cart.cartItems.map((item) => ({
        id: item.id,
        productId: item.productId,
        quantity: item.quantity,
        product: {
          id: item.product.id,
          name: item.product.name,
          price: item.product.price,
          image: item.product.imageUrl,
        },
      })),
      itemCount,
      totalAmount,
    });
  } catch (error) {
    console.error("Error fetching cart:", error);
    return NextResponse.json(
      { error: "Failed to retrieve cart" },
      { status: 500 }
    );
  }
}

/**
 * POST handler - Adds an item to the cart
 *
 * Expected JSON body: { productId: string, quantity?: number, color?: string, size?: string }
 *
 * @param request The incoming request
 * @returns JSON response with success status or error message
 */
async function handlePostRequest(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const {
      productId,
      quantity = 1,
      color = "default",
      size = "standard",
    } = body;

    // Validate required parameters
    if (!productId) {
      return NextResponse.json(
        { error: "Missing required parameter: productId" },
        { status: 400 }
      );
    }

    // Call the server action to add item to cart
    const result = await addToCart(productId, quantity, color, size);

    // Return success response
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error adding to cart:", error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

/**
 * DELETE handler - Removes an item from cart or clears the entire cart
 *
 * Expected JSON body for item removal: { cartItemId: string }
 * Expected JSON body for cart clearing: { clearAll: true }
 *
 * @param request The incoming request
 * @returns JSON response with success status or error message
 */
async function handleDeleteRequest(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const { cartItemId, clearAll } = body;

    // Check if we're clearing the entire cart
    if (clearAll === true) {
      const result = await clearCart();
      return NextResponse.json(result);
    }

    // Otherwise, validate required parameters for item removal
    if (!cartItemId) {
      return NextResponse.json(
        { error: "Missing required parameter: cartItemId" },
        { status: 400 }
      );
    }

    // Call the server action to remove item from cart
    const result = await removeFromCart(cartItemId);

    // Return success response
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error removing from cart:", error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

/**
 * PATCH handler - Updates cart item quantity
 *
 * Expected JSON body: { cartItemId: string, quantity: number }
 *
 * @param request The incoming request
 * @returns JSON response with success status or error message
 */
async function handlePatchRequest(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const { cartItemId, quantity } = body;

    // Validate required parameters
    if (!cartItemId) {
      return NextResponse.json(
        { error: "Missing required parameter: cartItemId" },
        { status: 400 }
      );
    }

    if (quantity === undefined || quantity === null) {
      return NextResponse.json(
        { error: "Missing required parameter: quantity" },
        { status: 400 }
      );
    }

    // Validate quantity is a positive number
    if (!Number.isInteger(quantity) || quantity < 1) {
      return NextResponse.json(
        { error: "Quantity must be a positive integer" },
        { status: 400 }
      );
    }

    // Call the server action to update item quantity
    const result = await updateCartItemQuantity(cartItemId, quantity);

    // Return success response
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error updating cart item:", error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

/**
 * Main handler function for cart API requests
 * Supports GET, POST, DELETE and PATCH methods
 *
 * @param request The incoming request
 * @returns Response based on the request method
 */
export async function GET() {
  // Authenticate the user
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }

  return handleGetRequest();
}

export async function POST(request: NextRequest) {
  // Authenticate the user
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }

  return handlePostRequest(request);
}

export async function DELETE(request: NextRequest) {
  // Authenticate the user
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }

  return handleDeleteRequest(request);
}

export async function PATCH(request: NextRequest) {
  // Authenticate the user
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }

  return handlePatchRequest(request);
}
