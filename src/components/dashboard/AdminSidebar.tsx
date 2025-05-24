import { Button } from "@mui/material";
import { LogOut } from "lucide-react";

interface SidebarProps {
  readonly activeItem?: string;
}

export default function AdminSidebar({
  activeItem = "establishment",
}: SidebarProps) {
  const menuItems = [
    {
      id: "establishment",
      label: "Establishment Management",
      icon: "👥",
    },
    {
      id: "review",
      label: "Review Moderation",
      icon: "📋",
    },
    {
      id: "advertisement",
      label: "Advertisement Management",
      icon: "📢",
    },
    {
      id: "user",
      label: "User Management",
      icon: "👤",
    },
  ];

  return (
    <aside className="w-64 p-4 space-y-2">
      {menuItems.map((item) => (
        <Button
          key={item.id}
          className={`w-full justify-start text-white rounded-full ${
            activeItem === item.id
              ? "bg-[#ec6dff] hover:bg-[#ec6dff]/80"
              : "bg-transparent hover:bg-[#2d272f]"
          }`}
          variant={activeItem === item.id ? "contained" : "text"}
        >
          <span className="mr-2">{item.icon}</span>
          {item.label}
        </Button>
      ))}

      <div className="pt-8">
        <Button
          variant="outlined"
          className="w-full justify-start text-white border-[#8224e3] hover:bg-[#2d272f] rounded-full"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
