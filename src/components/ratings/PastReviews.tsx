import { StarIcon } from "lucide-react";
import Image from "next/image";

// Sample review data - in a real app, you would fetch this based on the ID
const getReviews = (id: string) => [
  {
    id: 1,
    name: "Elizabeth",
    rating: 5,
    timeAgo: "1 day ago",
    comment:
      "This listing is absolutely perfect. Very clean, well organized, and had everything we needed. Highly recommend",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    name: "John",
    rating: 4,
    timeAgo: "1 day ago",
    comment:
      "This listing is absolutely perfect. Very clean, well organized, and had everything we needed. Highly recommend",
    avatar: "/placeholder.svg?height=80&width=80",
  },
];

export default function PastReviews({ id }: { readonly id?: string }) {
  const reviews = getReviews(id || "1");

  // Calculate average rating
  const averageRating =
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  return (
    <div className="relative">
      <div className="absolute right-0 bottom-0">
        <Image src="/road_darts.png" alt="Target" width={150} height={150} />
      </div>

      <h2 className="text-3xl font-bold mb-6 text-center">Past Reviews</h2>

      <div className="flex flex-col items-center mb-8">
        <div className="text-6xl font-bold">{averageRating.toFixed(1)}</div>
        <div className="text-xl mb-2">Based on {reviews.length} reviews</div>

        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <StarIcon
              key={star}
              size={36}
              fill={star <= Math.round(averageRating) ? "#ffc341" : "white"}
              stroke={star <= Math.round(averageRating) ? "#ffc341" : "white"}
            />
          ))}
        </div>
      </div>

      <div className="space-y-8 mb-8">
        {reviews.map((review) => (
          <div key={review.id} className="flex">
            <div className="mr-4">
              <div className="w-16 h-16 rounded-full overflow-hidden">
                <Image
                  src={review.avatar || "/placeholder.svg"}
                  alt={review.name}
                  width={64}
                  height={64}
                  className="object-cover"
                />
              </div>
            </div>

            <div className="flex-1">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h3 className="text-2xl font-bold">{review.name}</h3>
                  <div className="flex items-center">
                    <div className="flex mr-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <StarIcon
                          key={star}
                          size={20}
                          fill={
                            star <= review.rating ? "#ffc341" : "transparent"
                          }
                          stroke={
                            star <= review.rating ? "#ffc341" : "transparent"
                          }
                        />
                      ))}
                    </div>
                    <span className="text-xl">{review.rating.toFixed(1)}</span>
                  </div>
                </div>
                <div className="text-lg">{review.timeAgo}</div>
              </div>
              <p className="text-lg">{review.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
