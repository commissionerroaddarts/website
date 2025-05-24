"use client";

import { Button } from "@mui/material";
import { Grid3X3, Menu } from "lucide-react";

interface RightSidebarProps {
  onGridView?: () => void;
  onMenuView?: () => void;
}

export default function AdminRightSidebar() {
  const handleGridView = () => {
    console.log("Switch to grid view");
  };

  const handleMenuView = () => {
    console.log("Switch to menu view");
  };
  return (
    <aside className="w-16 p-4 flex flex-col gap-4">
      <Button
        variant="contained"
        className="text-white hover:bg-[#2d272f] bg-[#ec6dff] rounded-lg"
        onClick={handleGridView}
      >
        <Grid3X3 className="h-5 w-5" />
      </Button>
      <Button
        variant="contained"
        className="text-white hover:bg-[#2d272f] bg-[#ec6dff] rounded-lg"
        onClick={handleMenuView}
      >
        <Menu className="h-5 w-5" />
      </Button>
    </aside>
  );
}
