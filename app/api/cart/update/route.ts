import { NextRequest, NextResponse } from "next/server";
import { updateCartItemQuantity } from "@/app/actions/cart";
import { auth } from "@clerk/nextjs/server";

/**
 * API endpoint for updating cart item quantity
 *
 * Expected JSON body: { cartItemId: string, quantity: number }
 *
 * @param request The incoming request
 * @returns JSON response with success status or error message
 */
export async function PATCH(request: NextRequest) {
  try {
    // Authenticate the user
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

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
    console.error("Error in /api/cart/update:", error);

    // Return appropriate error response
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
