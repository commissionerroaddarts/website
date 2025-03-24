"use client";
import { useAppSelector } from "../../../store";

const AddListing = () => {
  const selectedPlan = useAppSelector((state) => state.plan.selectedPlan);

  if (!selectedPlan) {
    return <p>No plan selected.</p>;
  }

  return (
    <div>
      <h1>Selected Plan ID: {selectedPlan.name}</h1>
    </div>
  );
};

export default AddListing;
