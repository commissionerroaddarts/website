"use client";

import ThemeButton from "@/components/buttons/ThemeButton";

interface ActionBarProps {
  setOpenDialog: (open: boolean) => void;
  onDelete?: () => void;
}

export function ActionBar({
  setOpenDialog,
  onDelete,
}: Readonly<ActionBarProps>) {
  return (
    <div className="flex flex-wrap gap-2 bg-[#3a2a3e] p-3 ">
      <ThemeButton
        onClick={() => setOpenDialog(true)}
        text="Update Status"
        fontSize="0.7rem"
      />
      <ThemeButton
        onClick={onDelete}
        text="Delete"
        fontSize="0.7rem"
        backgroundColor="#c62828"
      />
    </div>
  );
}
