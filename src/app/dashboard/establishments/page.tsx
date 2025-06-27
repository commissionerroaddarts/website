import React, { Suspense } from "react";
import LoadingIndicator from "@/components/global/LoadingIndicator";
import DashboardEstablishment from "@/components/dashboard/establishments/DashboardEstablishments";

const AdminEstablishmentManagement = () => {
  return (
    <Suspense fallback={<LoadingIndicator />}>
      <DashboardEstablishment />
    </Suspense>
  );
};

export default AdminEstablishmentManagement;
