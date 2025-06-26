import { Skeleton } from "@mui/material";
import { User } from "@/types/user";
import UserCard from "@/components/dashboard/users/UserCard"; // Update path if different

interface Props {
  users: User[];
  isLoading: boolean;
}

const UserGrid = ({ users, isLoading }: Props) => {
  return (
    <section className="container mx-auto mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <div key={`user-skeleton-${index}`} className="p-4">
                <Skeleton variant="rectangular" height={200} />
                <Skeleton variant="text" />
                <Skeleton variant="text" width="60%" />
              </div>
            ))
          : users.map((user) => <UserCard key={user._id} user={user} />)}
      </div>
    </section>
  );
};

export default UserGrid;
