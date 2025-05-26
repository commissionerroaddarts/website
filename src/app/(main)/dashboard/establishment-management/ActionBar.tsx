"use client";

import ThemeButton from "@/components/buttons/ThemeButton";

interface ActionBarProps {
  onUpdateValidation?: () => void;
  onUpdateStatus?: () => void;
  onApply?: () => void;
  onDelete?: () => void;
}

export function ActionBar({
  onUpdateValidation,
  onUpdateStatus,
  onApply,
  onDelete,
}: Readonly<ActionBarProps>) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <ThemeButton
        onClick={onUpdateValidation}
        text="Update Validation Status"
      />
      <ThemeButton onClick={onUpdateStatus} text="Update Status" />
      <ThemeButton onClick={onApply} text="Apply Changes" />
      <ThemeButton onClick={onDelete} text="Delete"></ThemeButton>
    </div>
  );
}
