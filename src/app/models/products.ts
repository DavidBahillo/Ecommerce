import { UserReview } from "./user-review";

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  category: string;
  reviews: UserReview[];
};
