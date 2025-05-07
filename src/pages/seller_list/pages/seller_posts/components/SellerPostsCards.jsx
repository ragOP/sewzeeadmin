import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import Typography from "@/components/typography";
import { formatDate } from "@/utils/format_date";
import { ChevronDown, ShoppingCart, Package } from "lucide-react";
import { fetchSellerPostsById } from "../helpers/fetchSellerPostsById";
import { useQuery } from "@tanstack/react-query";

const SellerPostsCards = ({ id }) => {
  console.log(id);
  const {
    data: sellerPosts = [],
    isLoading: isSellerPostsLoading,
    error: sellerPostsError,
  } = useQuery({
    queryKey: ["seller-posts", id],
    queryFn: () => fetchSellerPostsById({id}),
  });

  return (
    <div className="px-4">
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h3">Seller Posts</Typography>
      </div>

      {isSellerPostsLoading ? (
        <div className="flex justify-center items-center h-40">
          <Typography>Loading...</Typography>
        </div>
      ) : sellerPostsError ? (
        <div className="text-red-500 text-center">Failed to load data.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sellerPosts.map((post) => (
            <Card key={post._id} className="w-full">
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>
                  {formatDate(post.createdAt)}
                </CardDescription>
              </CardHeader>
              <CardContent>{post.description}</CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SellerPostsCards;
