"use client";
import LoadingIndicator from "@/components/global/LoadingIndicator";
import { SearchX } from "lucide-react";
import React, { useEffect, useState } from "react";
import UserGrid from "@/components/dashboard/users/UserPageGrid";
import { Box, Pagination } from "@mui/material";
import { fetchUsers } from "@/services/userService";
import { User } from "@/types/user";
import { useRouter, useSearchParams } from "next/navigation";
import useDebounce from "@/hooks/useDebounce";

const maxLimit = 10;

interface FilterParams {
  search: string | null;
  role: string | null;
  status: string | null;
  username: string | null;
  email: string | null;
  phone: string | null;
  sort: "asc" | "desc"; // Default sort
}

interface FetchUsersResponse {
  data: User[];
  totalPages: number;
}

const MainUsers = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const searchParams = useSearchParams();
  const searchPage = parseInt(searchParams.get("page") ?? "1", 10);
  const searchLimit = parseInt(
    searchParams.get("limit") ?? maxLimit.toString(),
    10
  );

  const [filterParams, setFilterParams] = useState<FilterParams>({
    search: null,
    role: null,
    status: null,
    username: null,
    email: null,
    phone: null,
    sort: "asc", // Default sort
  });

  const debouncedSearch = useDebounce(filterParams?.search, 500);

  useEffect(() => {
    if (searchPage && !isNaN(searchPage) && searchPage > 0) {
      setPage(searchPage);
    } else {
      setPage(1); // Fallback default
    }

    if (searchLimit && !isNaN(searchLimit) && searchLimit > 0) {
      setLimit(searchLimit);
    } else {
      setLimit(maxLimit); // Fallback default
    }
  }, []);

  useEffect(() => {
    setPage(1);
    setFilterParams((prev) => ({ ...prev, search: debouncedSearch }));
  }, [debouncedSearch]);

  useEffect(() => {
    if (page && limit) {
      updateQuery();
    }
  }, [page, limit]);

  useEffect(() => {
    setPage(1);
    updateQuery();
  }, [filterParams?.sort]);

  const getUsers = async () => {
    try {
      setLoading(true);

      const validFilterParams = Object.fromEntries(
        Object.entries(filterParams).filter(([_, value]) => {
          if (Array.isArray(value)) {
            return value.some((v) => v !== null && v !== undefined && v !== "");
          }
          return (
            value !== null && value !== undefined && value !== "" && value !== 0
          );
        })
      );

      const validPage = Number.isInteger(page) && page > 0 ? page : 1;
      const validLimit =
        Number.isInteger(limit) && limit > 0 ? limit : maxLimit;

      const { data, totalPages: total }: FetchUsersResponse = await fetchUsers(
        validPage,
        validLimit,
        validFilterParams
      );

      setUsers(data);
      setTotalPages(total);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuery = () => {
    const params = new URLSearchParams();

    if (!params.has("page")) params.append("page", page.toString());
    if (!params.has("limit")) params.append("limit", limit.toString());

    Object.entries(filterParams).forEach(([key, value]) => {
      if (["lat", "lng"].includes(key)) return;

      if (Array.isArray(value)) {
        const validValues = value.filter(
          (v) => v !== null && v !== undefined && v !== ""
        );
        if (validValues.length > 0) {
          validValues.forEach((v) => params.append(key, v.toString()));
        }
      } else if (
        value !== null &&
        value !== undefined &&
        value !== "" &&
        value !== 0
      ) {
        params.set(key, value.toString());
      }
    });

    router.push(`/dashboard/users?${params.toString()}`);
    getUsers();
  };

  let content;
  if (loading) {
    content = <LoadingIndicator />;
  } else if (users.length > 0) {
    content = <UserGrid users={users} isLoading={loading} />;
  } else {
    content = <NoUsersFound />;
  }

  return (
    <Box>
      {content}

      {users.length > 0 && totalPages > 1 && (
        <Box className="flex justify-center my-4">
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
};

const NoUsersFound = () => {
  return (
    <Box
      sx={{
        background:
          "linear-gradient(152.76deg, #3F0F50 21.4%, #5D1178 54.49%, #200C27 85.73%)",
      }}
      className="flex justify-center items-center flex-col py-4 gap-3 rounded-lg shadow-md"
    >
      <SearchX size={50} color="white" strokeWidth={2} />
      <h1 className="text-2xl md:text-4xl text-center font-bold capitalize">
        No results found!
      </h1>
    </Box>
  );
};

export default MainUsers;
