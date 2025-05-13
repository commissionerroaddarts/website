import { useAppState } from "@/hooks/useAppState";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const StarRating = ({
  rating,
  size,
}: {
  rating: number | undefined;
  size: string;
}) => {
  return (
    <div className="flex  items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`${size} ${
            rating && star <= rating ? "text-yellow-500" : "text-gray"
          }`}
          fill={rating && star <= rating ? "currentColor" : "none"}
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      ))}
    </div>
  );
};

export const StarRatingWithPopup = ({
  id,
  averageRating,
}: {
  id: string | number;
  averageRating: number;
}) => {
  const { user } = useAppState();
  const { isLoggedIn } = user || {};
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const router = useRouter();
  const handleMouseEnter = (star: number) => setHoveredStar(star);
  const handleMouseLeave = () => setHoveredStar(null);

  const handleStarClick = (star: number) => {
    if (!isLoggedIn) {
      router.push(`/login?business=${id}`);
    } else {
      router.push(`/rate/${id}?rating=${star}`);
    }
  };

  return (
    <>
      {/* Rating */}
      <div className="flex items-center mb-2">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              onClick={() => handleStarClick(star)}
              onMouseEnter={() => handleMouseEnter(star)}
              onMouseLeave={handleMouseLeave}
              className={`h-4 w-4 cursor-pointer ${
                (hoveredStar && star <= hoveredStar) || star <= averageRating
                  ? "text-yellow-500"
                  : "text-gray"
              }`}
              fill={
                (hoveredStar && star <= hoveredStar) || star <= averageRating
                  ? "currentColor"
                  : "none"
              }
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
          ))}
        </div>
        {averageRating > 0 ? (
          <span className="text-gray text-xs ml-2">
            {averageRating?.toFixed(1)}
          </span>
        ) : (
          <span className="text-gray text-xs ml-2">
            Be the first to review!
          </span>
        )}
      </div>
    </>
  );
};
