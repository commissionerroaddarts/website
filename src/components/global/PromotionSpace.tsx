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
  readonly minHeight?: string;
}

const PromotionSpace = ({
  checkOwner,
  businessId,
  promotion,
  minHeight,
}: PromotionProps) => {
  const [editing, setEditing] = useState(false);
  const [promotionState, setPromotionState] = useState(
    promotion?.description ?? "Update your current promotions here..."
  );
  const [inputValue, setInputValue] = useState(
    promotion?.description !== "" ? promotion?.description : ""
  );

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setInputValue(promotionState);
    setEditing(true);
  };

  const handleSave = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setPromotionState(inputValue ?? "");
    setEditing(false);
    // Optionally, call an API to persist the promotion here
    try {
      const response = await insertBusinessPromotion(
        inputValue ?? "",
        businessId
      );
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
        maxWidth: "100%",
        background:
          " linear-gradient(133.79deg, rgba(211, 211, 211, 0.37) -25.05%, rgba(63, 15, 80, 0.42) 90.07%)",
        borderRadius: "20px",
        padding: "1rem",
        display: "flex",
        justifyContent: "center",
        alignItems: editing ? "start" : "center",
        marginTop: "10px",
        minHeight: minHeight ?? "100%",
        border: "0.5px solid #FFFFFF",
      }}
    >
      {editing ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "start",
            flexDirection: "column",
            width: "100%",
            gap: 1,
          }}
        >
          <textarea
            name="promotionText"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Update your current promotions here..."
            style={{
              flex: 1,
              border: "none",
              borderBottom: "1px solid white!important",
              padding: "0.2rem",
              fontSize: "0.9rem",
              width: "100%",
              resize: "vertical",
              color: "white",
              outline: "none",
            }}
            rows={6}
            maxLength={200}
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
            alignItems: "start",
            flexDirection: "column",
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
            {promotionState}
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
