export interface Rating {
  _id?: string;
  business: string;
  rating: number;
  img: string;
  text: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface RatingResponse {
  success: boolean;
  error?: string;
  data?: Rating[] | Rating;
}

export interface BusinessReview {
  _id: string;
  user: {
    _id: string;
    email: string;
    username: string;
    profileImage?: string;
  };
  business: {
    _id: string;
    name: string;
  };
  rating: number;
  text: string;
  createdAt?: string; // ISO Date string
  updatedAt?: string; // ISO Date string
}

export interface SubmittedUserReview {
  _id: string;
  rating: number;
  text: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ReviewApiResponse {
  success: boolean;
  averageRating: number;
  totalReviews: number;
  totalPages: number;
  page: number;
  limit: number;
  submittedReview: SubmittedUserReview | null;
  data: BusinessReview[];
}

export interface ReviewResponseError {
  code: number;
  message: string;
}

export interface PostReviewResponse {
  success: boolean;
  message: string;
  error: ReviewResponseError | null;
}
