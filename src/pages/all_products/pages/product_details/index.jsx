import NavbarItem from "@/components/navbar/navbar_item";
import { useParams } from "react-router-dom";
import ProductItems from "./components/ProductItems";

const ProductDetails = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <div className="flex flex-col gap-4">
      <NavbarItem title="Product Details" />
      <ProductItems id={id}/>
    </div>
  );
};

export default ProductDetails;
