import { Box } from "@mui/material";
import Link from "next/link";

export default function AdminSidebar() {
  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "",
      href: "/dashboard",
    },
    {
      id: "establishment",
      label: "Establishment Management",
      icon: "",
      href: "/dashboard/establishments",
    },
    {
      id: "review",
      label: "Review Moderation",
      icon: "",
      href: "/dashboard/reviews",
    },
    {
      id: "user",
      label: "User Management",
      icon: "",
      href: "/dashboard/users",
    },
  ];

  // Get the current route to determine the active menu item
  const currentPath =
    typeof window !== "undefined" ? window.location.pathname : "";
  const activeItem = menuItems.find((item) =>
    currentPath.startsWith(item.href)
  )?.id;

  return (
    <aside
      className="w-72 p-6 min-h-screen rounded-lg"
      style={{
        background: "rgba(255, 255, 255, 0.15)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(255, 255, 255, 0.18)",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
      }}
    >
      <Box className="flex flex-col justify-between">
        <div className="flex flex-col gap-2">
          {menuItems.map((item) => (
            <Link
              href={item.href}
              passHref
              key={item.id}
              className={`flex gap-2 w-full px-5 py-4 !text-white text-sm text-center rounded-full ${
                activeItem === item.id
                  ? "bg-[#8224E3] hover:bg-[#8224E3]/80"
                  : "bg-transparent hover:bg-[#2d272f]"
              }`}
            >
              {item.icon && <span>{item.icon}</span>}
              {item.label}
            </Link>
          ))}
        </div>
      </Box>
    </aside>
  );
}
