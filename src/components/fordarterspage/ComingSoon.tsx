"use client";

import { useState, useEffect } from "react";

export default function RoadDartsLanding() {
  const [timeLeft, setTimeLeft] = useState({
    days: 14,
    hours: 7,
    minutes: 23,
    seconds: 27,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return {
            ...prev,
            days: prev.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="flex flex-col items-center justify-center px-6  text-center">
      <h1
        className="text-4xl md:text-7xl lg:text-8xl font-bold mb-3 bg-clip-text text-transparent leading-tight"
        style={{
          background:
            "linear-gradient(91.8deg, #FFFFFF -19.13%, #9C56E5 103.86%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        COMING SOON!!
      </h1>

      <div className="max-w-2xl mb-8">
        <p className="text-xl md:text-2xl text-[#645467] mb-2">
          On the road or close to home?
        </p>
        <p className="text-xl md:text-2xl text-[#645467]">
          Post a match request to the Road Darts community.
        </p>
      </div>

      {/* Countdown Timer */}
      <div className="relative">
        <div className="bg-[#502e55]/30 backdrop-blur-sm border border-[#645467]/30 rounded-2xl p-8 min-w-[400px]">
          <div className="bg-[#ec6dff] text-white px-6 py-2 rounded-full text-sm font-semibold mb-6 inline-flex items-center">
            <svg
              className="w-4 h-4 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
            DAYS LEFT
          </div>

          <div className="flex items-center justify-center space-x-4 text-4xl md:text-5xl font-bold">
            <span className="text-white">
              {timeLeft.days.toString().padStart(2, "0")}
            </span>
            <span className="text-[#645467]">:</span>
            <span className="text-white">
              {timeLeft.hours.toString().padStart(2, "0")}
            </span>
            <span className="text-[#645467]">:</span>
            <span className="text-white">
              {timeLeft.minutes.toString().padStart(2, "0")}
            </span>
            <span className="text-[#645467]">:</span>
            <span className="text-white">
              {timeLeft.seconds.toString().padStart(2, "0")}
            </span>
          </div>

          <div className="flex justify-center space-x-8 mt-4 text-sm text-[#645467]">
            <span>DAYS</span>
            <span>HOURS</span>
            <span>MINUTES</span>
            <span>SECONDS</span>
          </div>
        </div>
      </div>
    </main>
  );
}
