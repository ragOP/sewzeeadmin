import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Eye } from "lucide-react";

import CustomTable from "@/components/custom_table";
import Typography from "@/components/typography";
import ActionMenu from "@/components/action_menu";
import { fetchSellers } from "../helpers/fetchSellers";

const SellerTable = ({ setSellersLength, payload }) => {
  const navigate = useNavigate();
  const {
    data: sellers,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["sellers", payload],
    queryFn: () => fetchSellers({payload}),
  });

  useEffect(() => {
    setSellersLength(sellers?.length || 0);
  }, [sellers]);

  const handleRowClick = (row) => {
    navigate(`/dashboard/seller_list/details/${row._id}`);
  };

  const onViewPosts = (seller) => {
    navigate(`/dashboard/seller_list/posts/${seller._id}`);
  };

  const columns = [
    {
      key: "logo",
      label: "Logo",
      render: (value) => (
        <img
          src={value}
          alt="Seller Logo"
          className="h-10 w-10 object-cover rounded-full"
        />
      ),
    },
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
      key: "website",
      label: "Website",
      render: (value) => (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          {value}
        </a>
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
      key: "state",
      label: "State",
      render: (value) => (
        <Typography className="text-gray-600">{value}</Typography>
      ),
    },
    {
      key: "actions",
      label: "Action",
      render: (_, row) => (
        <ActionMenu
          options={[
            {
              label: "View Post",
              icon: Eye,
              action: () => onViewPosts(row),
            },
          ]}
        />
      ),
    },
  ];

  return (
    <CustomTable
      columns={columns}
      data={sellers || []}
      isLoading={isLoading}
      error={error}
      emptyStateMessage="No sellers found"
      // onRowClick={handleRowClick}
    />
  );
};

export default SellerTable;
