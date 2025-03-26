import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Sales Performance: sum total of completed orders
    const salesAggregate = await prisma.order.aggregate({
      _sum: { total: true },
      where: { status: "COMPLETED" },
    });
    const salesPerformance = salesAggregate._sum.total || 0;

    // User Activity: count users
    const userActivity = await prisma.user.count();

    // Total order quantity for percentage calculation
    const totalQuantityAggregate = await prisma.orderItem.aggregate({
      _sum: { quantity: true },
    });
    const grandTotal = totalQuantityAggregate._sum.quantity || 1;

    // Top Products: group by productId and return top 3 with percentage
    const topProductsRaw = await prisma.orderItem.groupBy({
      by: ["productId"],
      _sum: { quantity: true },
      orderBy: { _sum: { quantity: "desc" } },
      take: 3,
    });
    const topProducts = await Promise.all(
      topProductsRaw.map(async (item) => {
        const product = await prisma.product.findUnique({
          where: { id: item.productId },
        });
        return {
          name: product?.name || "Unknown Product",
          percentage: Math.round(
            ((item._sum.quantity || 0) / grandTotal) * 100,
          ),
        };
      }),
    );

    // Traffic Sources: simulated data
    const trafficSources = [
      { name: "Direct", percentage: 45, color: "blue" },
      { name: "Social Media", percentage: 30, color: "purple" },
      { name: "Search", percentage: 25, color: "green" },
    ];

    return NextResponse.json({
      salesPerformance,
      userActivity,
      topProducts,
      trafficSources,
    });
  } catch (error) {
    console.error("Error in analytics API:", error);
    return NextResponse.error();
  }
}
