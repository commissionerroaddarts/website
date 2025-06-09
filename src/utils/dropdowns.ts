export const categoryOptions = [
  { label: "Bar & Grill", value: "Bar and Grill" },
  { label: "Restaurant", value: "Restaurant" },
  { label: "Gaming Hall", value: "Gaming Hall" },
  { label: "Arcades", value: "Arcades" },
  { label: "Retail/Shop", value: "Retail/Shop" },
];

export const boardTypeOptions = [
  { label: "Steel Tip", value: "Steel Tip" },
  { label: "Soft Tip", value: "Soft Tip" },
  { label: "Both", value: "Both" },
];

export const createScrollHandler =
  (
    setVisibleFn: React.Dispatch<React.SetStateAction<number>>,
    totalLength: number
  ) =>
  (e: React.UIEvent<HTMLUListElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      setVisibleFn((prev) => Math.min(prev + 10, totalLength));
    }
  };
