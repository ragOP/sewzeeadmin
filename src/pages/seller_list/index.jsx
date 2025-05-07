import NavbarItem from "@/components/navbar/navbar_item";
import CustomActionMenu from "@/components/custom_action";
import { useEffect, useState } from "react";
import SellerTable from "./components/SellerTable";

const SellerList = () => {
  const [sellersLength, setSellersLength] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [payload, setPayload] = useState({
    business_type: "brand",
  });

  return (
    <div className="flex flex-col">
      <NavbarItem title="Sellers" />

      <div className="py-1 px-4">
        <CustomActionMenu
          title="Sellers"
          total={sellersLength}
          disableAdd
          payload={payload}
          setPayload={setPayload}
        />
        <SellerTable setSellersLength={setSellersLength} payload={payload} />
      </div>
    </div>
  );
};

export default SellerList;
