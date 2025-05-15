import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import Typography from "@/components/typography";
import { formatDate } from "@/utils/format_date";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchSellerById } from "../helpers/fetchSellerById";

const SellerDetailsCard = ({ id }) => {
  const {
    data,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["seller-posts", id],
    queryFn: () => fetchSellerById({ id }),
    enabled: !!id, 
  });

  const sellerDetails = data?.response?.data;

  return (
    <div className="px-4">
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h3">Seller Details</Typography>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-4">
          <Card className="w-full">
            <CardHeader>
              <Skeleton className="h-6 w-1/3 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="w-24 h-24 rounded-md" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-full" />
            </CardContent>
          </Card>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center">Failed to load seller details.</div>
      ) : sellerDetails ? (
        <Card className="w-full">
          <CardHeader>
            <CardTitle>{sellerDetails?.name || "N/A"}</CardTitle>
            <CardDescription>{sellerDetails?.description || "No description"}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <img
                src={sellerDetails?.logo || "/placeholder.png"}
                alt="Seller Logo"
                className="w-24 h-24 rounded-md object-cover border"
              />
              <div>
                <Typography variant="h4">
                  {sellerDetails?.name || "N/A"}
                </Typography>
                <p className="text-muted-foreground">
                  {sellerDetails?.email || "N/A"}
                </p>
                <p className="text-sm text-muted-foreground">
                  Created on: {formatDate(sellerDetails?.createdAt) || "N/A"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm">
              <div><strong>Business Type:</strong> {sellerDetails?.business_type || "N/A"}</div>
              <div>
                <strong>Website:</strong>{" "}
                {sellerDetails?.website ? (
                  <a
                    href={sellerDetails.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    {sellerDetails.website}
                  </a>
                ) : "N/A"}
              </div>
              <div><strong>Bank Name:</strong> {sellerDetails?.bank_name || "N/A"}</div>
              <div><strong>Account Number:</strong> {sellerDetails?.account_no || "N/A"}</div>
              <div><strong>IFSC Code:</strong> {sellerDetails?.ifsc_code || "N/A"}</div>
              <div><strong>UPI ID:</strong> {sellerDetails?.upi || "N/A"}</div>
              <div>
                <strong>Address:</strong>{" "}
                {[sellerDetails?.address, sellerDetails?.localty, sellerDetails?.city, sellerDetails?.state, sellerDetails?.country]
                  .filter(Boolean)
                  .join(", ") || "N/A"}
              </div>
              <div><strong>Branch:</strong> {sellerDetails?.branch_name || "N/A"}</div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="text-center text-muted-foreground">No seller details found.</div>
      )}
    </div>
  );
};

export default SellerDetailsCard;
