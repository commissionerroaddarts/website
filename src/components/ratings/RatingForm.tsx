"use client";

import type React from "react";
import { useState } from "react";
import { StarIcon } from "lucide-react";
import Image from "next/image";

export default function RatingForm({ id }: { id?: string }) {
  const [rating, setRating] = useState(1);
  const [review, setReview] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ id, rating, review });
    // Here you would typically send the data to your backend
    setRating(1);
    setReview("");
  };

  return (
    <div className="relative mb-16">
      <div className="absolute left-0 top-0">
        <Image src="/road_darts.png" alt="Target" width={120} height={120} />
      </div>

      <div className="pl-32 pt-8">
        <h1 className="text-4xl font-bold mb-6">Rate the Establishment</h1>

        <div className="flex space-x-2 mb-8">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className="focus:outline-none"
            >
              <StarIcon
                size={48}
                fill={star <= rating ? "#ffc341" : "white"}
                stroke={star <= rating ? "#ffc341" : "white"}
                className="cursor-pointer"
              />
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Tell us about your experience..."
              className="w-full bg-transparent border-b border-white/50 pb-2 focus:outline-none text-xl"
            />
          </div>

          <button
            type="submit"
            className="bg-purple-400 hover:bg-purple-500 text-white font-bold py-3 px-12 rounded-md text-xl transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
