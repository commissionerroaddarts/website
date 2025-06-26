import React, { Suspense } from "react";
import DashboardEstablishment from "@/components/dashboard/establishments/DashboardEstablishments";
import LoadingIndicator from "@/components/global/LoadingIndicator";

const DashboardHome = () => {
  return (
    <Suspense fallback={<LoadingIndicator />}>
      <DashboardEstablishment />
    </Suspense>
  );
};

export default DashboardHome;
