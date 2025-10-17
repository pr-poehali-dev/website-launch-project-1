export interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviewsCount: number;
  description: string;
  specifications: Record<string, string>;
  inStock: boolean;
}
