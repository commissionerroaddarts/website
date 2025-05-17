"use client";
import { Box, Typography } from "@mui/material";
import { useState } from "react";

const PromotionSpace = () => {
  const [editing, setEditing] = useState(false);
  const [promotion, setPromotion] = useState(
    "Update your current promotions here..."
  );
  const [inputValue, setInputValue] = useState(promotion);

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setInputValue(promotion);
    setEditing(true);
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPromotion(inputValue);
    setEditing(false);
    // Optionally, call an API to persist the promotion here
  };

  return (
    <Box
      sx={{
        maxWidth: "45%",
        backgroundColor: "#5A2A84",
        borderRadius: "20px",
        padding: "1rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "10px",
        minHeight: "60px",
      }}
    >
      {editing ? (
        <Box
          sx={{ display: "flex", alignItems: "center", width: "100%", gap: 1 }}
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{
              flex: 1,
              borderRadius: "8px",
              border: "none",
              padding: "0.5rem",
              fontSize: "0.9rem",
            }}
            autoFocus
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={handleSave}
            style={{
              background: "#fff",
              color: "#5A2A84",
              border: "none",
              borderRadius: "8px",
              padding: "0.5rem 1rem",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "0.7rem",
            }}
          >
            Save
          </button>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            justifyContent: "space-between",
            gap: 1,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "#fff",
              fontWeight: "bold",
              fontSize: "0.8rem",
              flex: 1,
            }}
          >
            {promotion}
          </Typography>
          <button
            onClick={handleEdit}
            style={{
              background: "#fff",
              color: "#5A2A84",
              border: "none",
              borderRadius: "8px",
              padding: "0.3rem 0.8rem",
              cursor: "pointer",
              fontWeight: "bold",
              marginLeft: "0.5rem",
              fontSize: "0.7rem",
            }}
          >
            Edit
          </button>
        </Box>
      )}
    </Box>
  );
};
export default PromotionSpace;
