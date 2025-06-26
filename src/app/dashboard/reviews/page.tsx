import React, { Suspense } from "react";
import AllUserReviews from "@/components/dashboard/reviews/AllUserReviews";
import LoadingIndicator from "@/components/global/LoadingIndicator";

export default function ReviewModerationPage() {
  return (
    <Suspense fallback={<LoadingIndicator />}>
      <AllUserReviews />
    </Suspense>
  );
}
