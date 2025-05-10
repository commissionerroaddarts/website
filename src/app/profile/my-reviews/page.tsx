import Preloader from "@/components/global/Preloader";
import ViewUserReviews from "@/components/profilepage/tabs/ViewUserReviews";
import React, { Suspense } from "react";

const ViewReviewsPage = () => {
  return (
    <Suspense fallback={<Preloader />}>
      <ViewUserReviews />
    </Suspense>
  );
};

export default ViewReviewsPage;
