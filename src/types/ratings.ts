export interface Rating {
  _id?: string;
  business: string;
  rating: RatingsObject;
  img?: string;
  text: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PostRatingFormData {
  boardCondition: number;
  throwingLaneConditions: number;
  lightingConditions: number;
  spaceAllocated: number;
  gamingAmbience: number;
  business?: string;
  text: string;
  img?: string;
}

export interface RatingsObject {
  boardCondition: number;
  throwingLaneConditions: number;
  lightingConditions: number;
  spaceAllocated: number;
  gamingAmbience: number;
  overallRating?: number;
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
    profileImg?: string;
  };
  business: {
    _id: string;
    name: string;
    media?: {
      logo: "";
    };
  };
  img?: string;
  ratings: RatingsObject;
  text: string;
  createdAt?: string; // ISO Date string
  updatedAt?: string; // ISO Date string
}

export interface SubmittedUserReview {
  _id: string;
  ratings: RatingsObject;
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
