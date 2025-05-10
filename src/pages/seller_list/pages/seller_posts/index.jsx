import NavbarItem from "@/components/navbar/navbar_item";
import { useParams } from "react-router-dom";
import SellerPostsCards from "./components/SellerPostsCards";

const SellerPosts = () => {
  const { id } = useParams();
  return (
    <div className="flex flex-col gap-4">
      <NavbarItem title="Seller Posts" isBack />
      <SellerPostsCards id={id}/>
    </div>
  );
};

export default SellerPosts;
