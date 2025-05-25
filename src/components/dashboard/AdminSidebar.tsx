import { Box } from "@mui/material";
import { LogOut } from "lucide-react";
import ThemeOutlineButton from "../buttons/ThemeOutlineButton";

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
      icon: "",
    },
    {
      id: "review",
      label: "Review Moderation",
      icon: "",
    },
    {
      id: "advertisement",
      label: "Advertisement Management",
      icon: "",
    },
    {
      id: "user",
      label: "User Management",
      icon: "",
    },
  ];

  return (
    <aside className="w-72  min-h-screen">
      <Box className="flex flex-col justify-between">
        <div className="flex flex-col gap-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`flex gap-2 w-full px-5 py-4 !text-white rounded-full ${
                activeItem === item.id
                  ? "bg-[#ec6dff] hover:bg-[#ec6dff]/80"
                  : "bg-transparent hover:bg-[#2d272f]"
              }`}
            >
              {item.icon && <span>{item.icon}</span>}
              {item.label}
            </button>
          ))}
        </div>

        <div className="pt-8 pl-4">
          <ThemeOutlineButton
            icon={<LogOut className="w-4 h-4" />}
            text="Logout"
          />
        </div>
      </Box>
    </aside>
  );
}
