"use client";
import { insertBusinessPromotion } from "@/services/businessService";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";

interface PromotionProps {
  readonly checkOwner: boolean;
  readonly businessId: string;
  readonly promotion: {
    title?: string;
    description?: string;
  } | null;
}

const PromotionSpace = ({
  checkOwner,
  businessId,
  promotion,
}: PromotionProps) => {
  const [editing, setEditing] = useState(false);
  const [promotionState, setPromotionState] = useState(
    promotion?.title ?? "Update your current promotions here..."
  );
  const [inputValue, setInputValue] = useState(promotionState);

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setInputValue(promotionState);
    setEditing(true);
  };

  const handleSave = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setPromotionState(inputValue);
    setEditing(false);
    // Optionally, call an API to persist the promotion here
    try {
      const response = await insertBusinessPromotion(inputValue, businessId);
      if (response.success) {
        toast.success("Promotion saved successfully");
      } else {
        toast.error("Failed to save promotion");
      }
    } catch (error) {
      toast.error("Error saving promotion");
      console.error("Error saving promotion:", error);
    }
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
            name="promotionText"
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
            {promotion?.description}
          </Typography>
          {checkOwner && (
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
          )}
        </Box>
      )}
    </Box>
  );
};
export default PromotionSpace;
