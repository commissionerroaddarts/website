"use client";
import React from "react";
import { ActionBar } from "./ActionBar";
import { Grid2 } from "@mui/material";
import AdminRightSidebar from "@/components/dashboard/(main)/AdminRightSidebar";

const AdminEstablishmentManagement = () => {
  const handleUpdateValidation = () => {
    console.log("Update validation status");
  };

  const handleUpdateStatus = () => {
    console.log("Update status");
  };

  const handleApply = () => {
    console.log("Apply changes");
  };

  const handleDelete = () => {
    console.log("Delete selected items");
  };
  return (
    <Grid2 container spacing={2} className="p-6">
      <Grid2 size={{ xs: 12 }}>
        <h2 className="text-lg font-semibold">Establishment List</h2>
      </Grid2>
      <ActionBar
        onUpdateValidation={handleUpdateValidation}
        onUpdateStatus={handleUpdateStatus}
        onApply={handleApply}
        onDelete={handleDelete}
      />
      <AdminRightSidebar />
    </Grid2>
  );
};

export default AdminEstablishmentManagement;
