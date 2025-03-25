"use client";

import Image from "next/image";
import { Box, Grid, Typography } from "@mui/material";
import ThemeOutlineButton from "../buttons/ThemeOutlineButton";

interface Category {
  id: number;
  name: string;
  imageUrl: string;
}

interface CategoryGridProps {
  categories: Category[];
  onCategoryClick?: (id: number) => void;
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

const CategoryGrid: React.FC<CategoryGridProps> = ({
  categories,
  onCategoryClick,
}) => (
  <Box sx={{ textAlign: "center", py: 4 }}>
    <Typography variant="h4" gutterBottom>
      Explore Our Locations
    </Typography>
    <Grid container spacing={2} justifyContent="center" mt={3}>
      {categories.map((category) => (
        <Grid item key={category.id} xs={12} sm={6} md={4} lg={4}>
          <CategoryCard
            category={category}
            onClick={() => onCategoryClick?.(category.id)}
          />
        </Grid>
      ))}
    </Grid>

    <ThemeOutlineButton text="View All Locations" />
  </Box>
);

export default CategoryGrid;
