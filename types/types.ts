export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description?: string;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  color?: string;
  size?: string;
}

export interface MenuLinkProps {
  label: string;
  delay?: number;
  isOpen: boolean;
}
