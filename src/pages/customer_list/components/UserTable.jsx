import { useQuery } from "@tanstack/react-query";
import CustomTable from "@/components/custom_table";
import Typography from "@/components/typography";
import { format } from "date-fns";
import { useEffect } from "react";
import { fetchUsers } from "../helpers/fetchUsers";

const UsersTable = ({ setUsersLength, params }) => {
  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users", params],
    queryFn: () => fetchUsers({ params }),
  });

  useEffect(() => {
    setUsersLength(users?.length);
  }, [users]);

  const columns = [
    {
      key: "name",
      label: "Name",
      render: (value) => (
        <Typography variant="p" className="font-medium">
          {value}
        </Typography>
      ),
    },
    {
      key: "number",
      label: "Phone",
      render: (value) => (
        <Typography className="text-gray-600">{value}</Typography>
      ),
    },
    {
      key: "city",
      label: "City",
      render: (value) => (
        <Typography className="text-gray-600">{value || "N/A"}</Typography>
      ),
    },
    {
      key: "email",
      label: "Email",
      render: (value) => (
        <Typography className="text-gray-600">{value}</Typography>
      ),
    },
    {
      key: "address",
      label: "Address",
      render: (value) => (
        <Typography className="text-gray-600">{value}</Typography>
      ),
    },
    {
      key: "gender",
      label: "Gender",
      render: (value) => (
        <span className="capitalize bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm">
          {value}
        </span>
      ),
    },
    {
      key: "dob",
      label: "DOB",
      render: (value) => (
        <Typography>
          {value ? format(new Date(value), "dd/MM/yyyy") : "N/A"}
        </Typography>
      ),
    },
  ];

  return (
    <CustomTable
      columns={columns}
      data={users}
      isLoading={isLoading}
      error={error}
      emptyStateMessage="No users found"
    />
  );
};

export default UsersTable;
