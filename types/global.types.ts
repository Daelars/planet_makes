// Base interfaces
export interface ProductImage {
  id: string;
  imageUrl: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  collection?: string;
  isOnSale?: boolean;
  originalPrice?: number;
  images: ProductImage[];
  details?: string[];
  rating?: number;
  reviewsCount?: number;
  inStock?: boolean;
  colors?: string[];
  sizes?: string[];
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  color?: string;
  size?: string;
  price: number;
}

export interface Order {
  id: string;
  userId: string;
  status: OrderStatus;
  total: number;
  stripeId?: string;
  createdAt: Date;
  updatedAt: Date;
  orderItems: OrderItem[];
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
}

// Enums
export enum OrderStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  FAILED = "FAILED",
}

export enum PaymentStatus {
  PENDING = "PENDING",
  SUCCEEDED = "SUCCEEDED",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED",
}

export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
}

// Component Props
export interface MenuLinkProps {
  label: string;
  delay?: number;
  isOpen: boolean;
}

export interface ProductCardProps {
  product: Product;
  isAdmin?: boolean;
}

// Analytics Types
export type SectionName =
  | "Sales Performance"
  | "User Activity"
  | "Top Products"
  | "Traffic Sources";
export type ProductName =
  | "Wireless Headphones"
  | "Smart Watch"
  | "Bluetooth Speaker";

export interface ProductInteractionProps {
  product: ProductName;
  source: string;
}

export interface TimeSpentProps {
  section: SectionName;
  time_seconds: number;
}
