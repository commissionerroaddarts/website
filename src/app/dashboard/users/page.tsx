import React, { Suspense } from "react";
import MainUsers from "@/components/dashboard/users/MainUsers";
import LoadingIndicator from "@/components/global/LoadingIndicator";

const AdminUserManagementPage = () => {
  return (
    <Suspense fallback={<LoadingIndicator />}>
      <MainUsers />
    </Suspense>
  );
};

export default AdminUserManagementPage;
