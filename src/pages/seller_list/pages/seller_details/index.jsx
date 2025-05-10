import NavbarItem from "@/components/navbar/navbar_item";
import { useParams } from "react-router-dom";
import SellerDetailsCard from "./components/SellerDetailsCard";

const SellerDetails = () => {
  const { id } = useParams();
  return (
    <div className="flex flex-col gap-4">
      <NavbarItem title="Seller Details" isBack />
      <SellerDetailsCard id={id}/>
    </div>
  );
};

export default SellerDetails;
