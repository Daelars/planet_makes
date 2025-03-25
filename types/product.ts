export interface ProductImage {
  id: string;
  imageUrl: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string | null;
  collection: string;
  isOnSale: boolean;
  originalPrice?: number;
  images: ProductImage[];
  details: string[];
}
