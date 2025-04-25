"use client";
import AddEstablishmentForm from "@/components/addestablishment/AddEstablishmentForm";
import { useAppSelector } from "@/store";

const AddListing = () => {
  const selectedPlan = useAppSelector((state) => state.plan.selectedPlan);

  if (!selectedPlan) {
    return <p>No plan selected.</p>;
  }

  return <AddEstablishmentForm />;
};

export default AddListing;
