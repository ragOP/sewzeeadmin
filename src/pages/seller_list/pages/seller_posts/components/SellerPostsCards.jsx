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
import { isEmptyArray } from "@/utils/is_empty_array";
import { Skeleton } from "@/components/ui/skeleton";

const SellerPostsCards = ({ id }) => {
  const {
    data: sellerPosts = [],
    isLoading: isSellerPostsLoading,
    error: sellerPostsError,
  } = useQuery({
    queryKey: ["seller-posts", id],
    queryFn: () => fetchSellerPostsById({ id }),
  });

  return (
    <div className="px-4">
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h3">Seller Posts</Typography>
      </div>

      {isSellerPostsLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index} className="w-full">
            <CardHeader>
              <Skeleton className="h-4 w-32 mb-2" />
              <Skeleton className="h-3 w-48" />
            </CardHeader>
            <CardContent className="space-y-3">
              <Skeleton className="w-full h-48 rounded-lg" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-5/6" />
              <Skeleton className="h-3 w-3/4" />
              <div className="flex justify-between pt-2">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-3 w-20" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      ) : sellerPostsError ? (
        <div className="text-red-500 text-center">Failed to load data.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isEmptyArray(sellerPosts) ? (
            <Card className="col-span-full flex flex-col items-center justify-center py-10 text-center">
            <Package className="w-10 h-10 text-muted-foreground mb-2" />
            <Typography variant="h4">No posts found</Typography>
            <Typography className="text-muted-foreground text-sm mt-1">
              You haven’t posted anything yet.
            </Typography>
          </Card>
          ) : (
            sellerPosts.map((post) => (
              <Card key={post._id} className="w-full">
                <CardHeader>
                  <CardTitle className="text-base">
                    Posted on {formatDate(post.createdAt)}
                  </CardTitle>
                  {post.isPool && (
                    <CardDescription className="mt-1 text-sm text-muted-foreground">
                      Poll: {post.poolQuestion}
                    </CardDescription>
                  )}
                </CardHeader>

                <CardContent className="space-y-3">
                  {post.image && (
                    <img
                      src={post.image}
                      alt="Post"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  )}

                  <p className="text-gray-700">{post.content}</p>

                  {post.isPool && (
                    <div className="bg-muted p-3 rounded-lg space-y-1 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Option 1:</span>{" "}
                        {post.poolAnswers?.[0] || "N/A"}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Option 2:</span>{" "}
                        {post.poolAnswers?.[1] || "N/A"}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Total Votes: {post.totalVotes}
                      </p>
                    </div>
                  )}

                  <div className="flex justify-between text-sm text-muted-foreground mt-2">
                    <span>❤️ {post.likes.length} Likes</span>
                    <span>💬 {post.comments.length} Comments</span>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SellerPostsCards;
