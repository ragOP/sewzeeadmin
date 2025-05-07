import NavbarItem from "@/components/navbar/navbar_item";
import CustomActionMenu from "@/components/custom_action";
import { useEffect, useState } from "react";
import ProductTable from "./components/ProductTable";
import { useDebounce } from "@uidotdev/usehooks";

const AllProducts = () => {
  // const navigate = useNavigate();

  const paramInitialState = {
    page: 1,
    per_page: 50,
    search: "",
  };
  const [productsLength, setProductsLength] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [params, setParams] = useState(paramInitialState);

  const debouncedSearch = useDebounce(searchText, 500);

  // const onAdd = () => {
  //   navigate("/dashboard/users/add");
  // };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    if (params.search !== debouncedSearch) {
      setParams((prev) => ({
        ...prev,
        search: debouncedSearch,
      }));
    }
  }, [debouncedSearch]);

  return (
    <div className="flex flex-col">
      <NavbarItem title="All Products" />

      <div className="py-1 px-4">
        <CustomActionMenu
          title="Products"
          total={productsLength}
          disableAdd
          handleSearch={handleSearch}
          searchText={searchText}
        />
        <ProductTable setProductsLength={setProductsLength} params={params} />
      </div>
    </div>
  );
};

export default AllProducts;
