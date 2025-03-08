  export interface ProductResponse {
  _id: string;
  name: string;
  description: string;
  price: string | number;
  originalPrice?: string | number;
  category: string;
  image: string | { url: string } | null;
  stock: number;
  discount?: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: string;
  originalPrice: string;
  category: string;
  imageUrl: string;
  stock: number;
  discount: string;
}


