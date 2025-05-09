import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Typography from "@/components/typography";

import { formatDate } from "@/utils/format_date";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState } from "react";
import { fetchProductById } from "../helpers/fetchProductById";
import { approveProductById } from "../helpers/approveProductById";

const ProductItems = ({ id }) => {
  const queryClient = useQueryClient();
  const [isApproved, setIsApproved] = useState(false);

  const {
    data: product = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById({ id }),
    onSuccess: () => toast.success("Product fetched successfully."),
    onError: (error) => {
      toast.error("Failed to fetch product." || error.message);
    },
  });

  const { mutate: approveProduct, isPending: isApproving } = useMutation({
    mutationFn: () => approveProductById({ id }),
    onSuccess: () => {
      setIsApproved(true);
      toast.success("Product approved successfully.");
      queryClient.invalidateQueries({ queryKey: ["product", id] });
    },
    onError: (error) => {
      toast.error("Failed to approve product." || error.message);
    },
  });

  if (error) {
    return (
      <div className="text-center text-red-500 p-6">
        Failed to load product data. Please try again.
      </div>
    );
  }

  return (
    <div className="px-4 py-6 w-full mx-auto">
      <Typography variant="h3" className="mb-4">
        Product Details
      </Typography>

     {isLoading ? (
      <div className="p-4 space-y-4 w-full mx-auto">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} className="h-8 w-full rounded-md" />
      ))}
    </div>
     ) : (
      <Card>
      <CardHeader>
        <div className="flex justify-between gap-4 flex-wrap">
          <div className="space-y-2">
            <CardTitle>{product?.name}</CardTitle>
            <CardDescription>
              {product?.type} | Category: {product?.category}
            </CardDescription>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge variant="outline">{product?.status.toUpperCase()}</Badge>
              {product?.onsale && <Badge variant="destructive">🔥 On Sale</Badge>}
              <Badge variant="secondary">Stock: {product?.instock}</Badge>
            </div>
          </div>

          <div className="text-right">
            <Typography
              variant="small"
              className="line-through text-muted-foreground"
            >
              ₹{product?.price}
            </Typography>
            <Typography variant="h4">₹{product?.salesprice}</Typography>
            <p className="text-sm text-muted-foreground mt-1">
              Discount: {product?.discount}%
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Typography className="font-semibold mb-1">Description:</Typography>
        <Typography className="text-muted-foreground">
          {product?.description}
        </Typography>

        <div className="mt-4 flex flex-wrap gap-2">
          {product?.color.length > 0 && (
            <Badge>Color: {product?.color.join(", ")}</Badge>
          )}
          {product?.size.length > 0 && (
            <Badge>Size: {product?.size.join(", ")}</Badge>
          )}
        </div>

        {product?.createdAt && (
          <p className="text-sm text-muted-foreground mt-4">
            Created At: {formatDate(product?.createdAt)}
          </p>
        )}

        {product?.images.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
            {product?.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`product-img-${i}`}
                className="rounded-lg border shadow-sm object-cover w-full h-48"
              />
            ))}
          </div>
        ) : (
          <p className="mt-6 text-sm text-muted-foreground">
            No product images available.
          </p>
        )}
      </CardContent>

        {product?.status.toLowerCase() !== "approved" && (
            <CardFooter className="flex justify-end border-t pt-4">
          <Button onClick={() => approveProduct()} disabled={isApproving}>
            {isApproving ? "Approving..." : "Approve Product"}
          </Button>
      </CardFooter>
        )}
    </Card>
     )}
    </div>
  );
};

export default ProductItems;
