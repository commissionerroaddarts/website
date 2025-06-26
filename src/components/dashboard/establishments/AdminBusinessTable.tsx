"use client";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Paper,
  Skeleton,
  IconButton,
} from "@mui/material";
import { Business } from "@/types/business";
import { Edit, Delete } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DeleteListingDialog from "@/components/global/DeleteListingDialog";

interface Props {
  businesses: Business[];
  isLoading: boolean;
}

const AdminBusinessTable = ({ businesses, isLoading }: Props) => {
  const router = useRouter();

  const [openConfirm, setOpenConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState<string>("");
  const handleOpenConfirm = (e: any, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setId(id);
    setOpenConfirm(true);
  };
  return (
    <TableContainer
      component={Paper}
      className="bg-[#2b0450] text-white shadow-lg rounded-lg"
    >
      <DeleteListingDialog
        _id={id}
        loading={loading}
        setLoading={setLoading}
        openConfirm={openConfirm}
        setOpenConfirm={setOpenConfirm}
      />
      <Table>
        <TableHead>
          <TableRow className="bg-[#8224E3] text-white">
            <TableCell className="text-white">Business Name</TableCell>
            <TableCell className="text-white">Category</TableCell>
            <TableCell className="text-white">Address</TableCell>
            <TableCell className="text-white">Status</TableCell>
            <TableCell className="text-white">Validation Status</TableCell>
            <TableCell className="text-white">Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell colSpan={5}>
                    <Skeleton variant="rectangular" height={40} />
                  </TableCell>
                </TableRow>
              ))
            : businesses.map((business) => (
                <TableRow
                  key={business._id}
                  className="bg-[#3a2a3e] text-white"
                >
                  <TableCell>{business.name}</TableCell>
                  <TableCell>{business.category ?? "N/A"}</TableCell>
                  <TableCell>
                    {business.location?.address ?? "Unknown"}
                  </TableCell>
                  <TableCell>{business.status ?? "Pending"}</TableCell>
                  <TableCell>
                    {business.validation?.status ?? "Pending"}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() =>
                          router.push(`/edit-establishment/${business.slug}`)
                        }
                      >
                        <Edit size={18} />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={(e) => handleOpenConfirm(e, business._id)}
                      >
                        <Delete size={18} />
                      </IconButton>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdminBusinessTable;
