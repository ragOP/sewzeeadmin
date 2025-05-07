import { useQuery } from "@tanstack/react-query";
import CustomTable from "@/components/custom_table";
import Typography from "@/components/typography";
import { format } from "date-fns";
import { useEffect } from "react";
import { fetchProducts } from "../helpers/fetchProducts";
import { useNavigate } from "react-router";

const ProductTable = ({ setProductsLength, params }) => {
  const navigate = useNavigate();
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", params],
    queryFn: () => fetchProducts({ params }),
  });

  useEffect(() => {
    setProductsLength(products?.length);
  }, [products]);

  const handleRowClick = (row) => {
    navigate(`/dashboard/products/details/${row._id}`); 
  };
  

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
      key: "status",
      label: "Status",
      render: (value) => (
        <Typography className="text-gray-600 capitalize">{value}</Typography>
      ),
    },
    {
      key: "type",
      label: "Type",
      render: (value) => (
        <Typography className="text-gray-600">{value}</Typography>
      ),
    },
    {
      key: "price",
      label: "Price",
      render: (value) => (
        <Typography className="text-gray-600">₹ {value}</Typography>
      ),
    },
    {
      key: "salesprice",
      label: "Sale Price",
      render: (value) => (
        <Typography className="text-gray-600">₹ {value}</Typography>
      ),
    },
    {
      key: "category",
      label: "Category",
      render: (value) => (
        <Typography className="text-gray-600">{value}</Typography>
      ),
    },
    {
      key: "onsale",
      label: "On Sale",
      render: (value) => (
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          value ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
        }`}>
          {value ? "Yes" : "No"}
        </span>
      ),
    },
  ];
  
  

  return (
    <CustomTable
      columns={columns}
      data={products}
      isLoading={isLoading}
      error={error}
      emptyStateMessage="No products found"
      onRowClick={handleRowClick}
    />
  );
};

export default ProductTable;
