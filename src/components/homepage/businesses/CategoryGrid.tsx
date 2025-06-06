"use client";

import Image from "next/image";
import { Box, Grid2, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

interface Category {
  id: number;
  name: string;
  imageUrl: string;
}

interface CategoryGridProps {
  categories: Category[];
}

const CategoryCard: React.FC<{ category: Category; onClick?: () => void }> = ({
  category,
  onClick,
}) => (
  <Box
    sx={{
      position: "relative",
      borderRadius: 2,
      overflow: "hidden",
      cursor: "pointer",
      boxShadow: 3,
      transition: "transform 0.2s ease-in-out",
      "&:hover": {
        transform: "scale(1.05)",
      },
    }}
    onClick={onClick}
  >
    <Image
      src={category.imageUrl}
      alt={category.name}
      width={400}
      // Apply blur effect
      height={300}
      style={{ width: "100%", height: "300px", objectFit: "cover" }}
    />
    {/* Overlay */}
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.5)",
        opacity: 0,
        transition: "opacity 0.3s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "&:hover": {
          opacity: 1,
        },
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: "#fff",
          background: "rgba(0, 0, 0, 0.7)",
          padding: "8px 16px",
          borderRadius: 1,
        }}
      >
        {category.name}
      </Typography>
    </Box>
  </Box>
);

const CategoryGrid: React.FC<CategoryGridProps> = ({ categories }) => {
  const router = useRouter();
  const handleLocationClick = (locationName: string) => () => {
    // Handle the click event for the location card
    if (!locationName) return;
    // Perform any action you want with the location name
    router.push(`/establishments?city=${locationName}`);
  };

  return (
    <Box
      sx={{ textAlign: "center", py: 4 }}
      className="flex flex-col items-center"
    >
      <Typography variant="h4" gutterBottom>
        Explore Our Locations
      </Typography>
      <Grid2 container spacing={2} justifyContent="center" mt={3}>
        {categories.map((category, index) => (
          <Grid2
            size={{
              xs: 12,
              sm: index % 4 === 0 ? 6 : 3, // First item of each row is 6, others are 3
              md: index % 4 === 0 ? 6 : 3,
              lg: index % 4 === 0 ? 6 : 3,
            }}
            key={category.id}
          >
            <CategoryCard
              category={category}
              onClick={handleLocationClick(category.name)} // Pass the category name to the click handler
            />
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default CategoryGrid;
