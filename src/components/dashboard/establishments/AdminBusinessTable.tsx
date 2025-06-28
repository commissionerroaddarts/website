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
  Tooltip,
} from "@mui/material";
import { Business, FilterValues } from "@/types/business";
import { ArrowDown, ArrowUp, Edit, Eye, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DeleteListingDialog from "@/components/global/DeleteListingDialog";
import { ActionBar } from "@/components/dashboard/establishments/ActionBar";
import { bulkUpdateBusinesses } from "@/services/businessService";
import { toast } from "react-toastify";
import BulkUpdateDialog from "./BulkUpdateDialog";
import BulkDeleteDialog from "./BulkDeleteDialog";

interface Props {
  businesses: Business[];
  isLoading: boolean;
  filterParams: FilterValues;
  setFilterParams: React.Dispatch<React.SetStateAction<FilterValues>>;
}

const AdminBusinessTable = ({
  businesses,
  isLoading,
  filterParams,
  setFilterParams,
}: Props) => {
  const router = useRouter();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState<string>("");
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedBusinesses, setSelectedBusinesses] = useState<string[]>([]);
  const allSelected =
    businesses.length > 0 && selectedBusinesses.length === businesses.length;
  // filtered list of selected business objects
  const selectedBusinessObjects = businesses.filter((b) =>
    selectedBusinesses.includes(b._id)
  );

  const handleOpenConfirm = (e: any, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setId(id);
    setOpenConfirm(true);
  };

  const handleBulkApply = async (payload: { id: string; data: any }[]) => {
    try {
      await bulkUpdateBusinesses(payload);
      toast.success("Businesses updated");
      setSelectedBusinesses([]);
      router.refresh();
    } catch (err) {
      console.error("Failed to update businesses:", err);
      toast.error("Failed to update businesses");
    }
  };

  return (
    <TableContainer
      component={Paper}
      className="bg-[#2b0450] text-white shadow-lg rounded-lg"
    >
      <BulkUpdateDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        selectedBusinesses={selectedBusinessObjects}
        onSubmit={handleBulkApply}
      />

      <BulkDeleteDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        selectedBusinesses={selectedBusinessObjects}
      />

      <DeleteListingDialog
        _id={id}
        loading={loading}
        setLoading={setLoading}
        openConfirm={openConfirm}
        setOpenConfirm={setOpenConfirm}
      />
      {selectedBusinesses.length > 0 && (
        <ActionBar
          setOpenDialog={setOpenDialog}
          onDelete={() => setOpenDeleteDialog(true)}
        />
      )}
      <Table>
        <TableHead>
          <TableRow className="bg-[#8224E3] text-white">
            <TableCell padding="checkbox">
              <Tooltip
                title="Select all businesses to update their status all at once"
                arrow
              >
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedBusinesses(businesses.map((b) => b._id));
                    } else {
                      setSelectedBusinesses([]);
                    }
                  }}
                  className="cursor-pointer"
                />
              </Tooltip>
            </TableCell>

            <TableCell className="text-white">
              Business Name
              <Tooltip title="Click to sort by business name (A-Z)" arrow>
                <IconButton
                  size="small"
                  color="primary"
                  onClick={() => {
                    setFilterParams((prev) => ({
                      ...prev,
                      sort: prev.sort === "name" ? "nearest" : "name",
                    }));
                  }}
                >
                  {filterParams.sort === "name" ? (
                    <ArrowUp size={18} color="white" />
                  ) : (
                    <ArrowDown size={18} color="white" />
                  )}
                </IconButton>
              </Tooltip>
            </TableCell>
            <TableCell className="text-white">Category</TableCell>
            <TableCell className="text-white">Address</TableCell>
            <TableCell className="text-white">Status</TableCell>
            <TableCell className="text-white">Validation Status</TableCell>
            <TableCell className="text-white">Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {isLoading ? (
            <BusinessTableRowsLoading />
          ) : (
            <BusinessTableRows
              businesses={businesses}
              handleOpenConfirm={handleOpenConfirm}
              selectedBusinesses={selectedBusinesses}
              setSelectedBusinesses={setSelectedBusinesses}
            />
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const BusinessTableRowsLoading = () =>
  Array.from({ length: 6 }).map((_, _index) => {
    const uniqueKey = `skeleton-row-${Math.random().toString(36)}`;
    return (
      <TableRow key={uniqueKey}>
        <TableCell colSpan={5}>
          <Skeleton variant="rectangular" height={40} />
        </TableCell>
      </TableRow>
    );
  });

const BusinessTableRows = ({
  businesses,
  handleOpenConfirm,
  selectedBusinesses,
  setSelectedBusinesses,
}: {
  businesses: Business[];
  handleOpenConfirm: (e: any, id: string) => void;
  selectedBusinesses: string[];
  setSelectedBusinesses: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const router = useRouter();
  const handleCheckboxChange = (id: string) => {
    setSelectedBusinesses((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return businesses.map((business) => {
    const isSelected = selectedBusinesses.includes(business._id);
    const combinedAddress = `${business.location?.state}, ${business.location?.city}, ${business.location?.zipcode}, ${business.location?.country}`;
    const address = business.location?.address ?? combinedAddress ?? "Unknown";
    return (
      <TableRow key={business._id} className="bg-[#3a2a3e] text-white">
        <TableCell padding="checkbox">
          <Tooltip
            title={`Select ${business.name} to update it's status`}
            arrow
          >
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => handleCheckboxChange(business._id)}
              className="cursor-pointer "
            />
          </Tooltip>
        </TableCell>
        <TableCell>{business.name}</TableCell>
        <TableCell>{business.category ?? "N/A"}</TableCell>
        <TableCell>{address}</TableCell>
        <TableCell>{business.status ?? "Pending"}</TableCell>
        <TableCell>{business.validation?.status ?? "Pending"}</TableCell>
        <TableCell>
          <div className="flex gap-1">
            {/* view establishment icon button */}
            <Tooltip title="View Establishment" arrow>
              <IconButton
                size="small"
                color="primary"
                onClick={() => router.push(`/establishment/${business.slug}`)}
              >
                <Eye size={18} color="white" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit Establishment" arrow>
              <IconButton
                size="small"
                color="primary"
                onClick={() =>
                  router.push(`/edit-establishment/${business.slug}`)
                }
              >
                <Edit size={18} color="white" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete Establishment" arrow>
              <IconButton
                size="small"
                color="error"
                onClick={(e) => handleOpenConfirm(e, business._id)}
              >
                <Trash size={18} color="white" />
              </IconButton>
            </Tooltip>
          </div>
        </TableCell>
      </TableRow>
    );
  });
};

export default AdminBusinessTable;
