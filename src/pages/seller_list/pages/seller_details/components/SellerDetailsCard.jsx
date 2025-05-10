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
    data: sellerDetails = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["seller-posts", id],
    queryFn: () => fetchSellerById({ id }),
  });

  return (
    <div className="px-4">
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h3">Seller Details</Typography>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 1 }).map((_, index) => (
            <Card key={index} className="w-full">
              <CardHeader>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-3 w-full" />
              </CardHeader>
              <CardContent className="space-y-3">
                <Skeleton className="w-full h-48 rounded-lg" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : error ? (
        <div className="text-red-500 text-center">Failed to load data.</div>
      ) : (
        <Card className="w-full">
          <CardHeader>
            <CardTitle>{sellerDetails.name}</CardTitle>
            <CardDescription>{sellerDetails.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <img
                src={sellerDetails.logo}
                alt="Seller Logo"
                className="w-24 h-24 rounded-md object-cover border"
              />
              <div>
                <Typography variant="h4">{sellerDetails.name}</Typography>
                <p className="text-muted-foreground">{sellerDetails.email}</p>
                <p className="text-sm text-muted-foreground">
                  Created on: {formatDate(sellerDetails.createdAt)}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm">
              <div>
                <strong>Business Type:</strong> {sellerDetails.business_type}
              </div>
              <div>
                <strong>Website:</strong>{" "}
                <a
                  href={sellerDetails.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {sellerDetails.website}
                </a>
              </div>
              <div>
                <strong>Bank Name:</strong> {sellerDetails.bank_name}
              </div>
              <div>
                <strong>Account Number:</strong> {sellerDetails.account_no}
              </div>
              <div>
                <strong>IFSC Code:</strong> {sellerDetails.ifsc_code}
              </div>
              <div>
                <strong>UPI ID:</strong> {sellerDetails.upi}
              </div>
              <div>
                <strong>Address:</strong> {sellerDetails.address}, {sellerDetails.localty}, {sellerDetails.city}, {sellerDetails.state}, {sellerDetails.country}
              </div>
              <div>
                <strong>Branch:</strong> {sellerDetails.branch_name}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SellerDetailsCard;
