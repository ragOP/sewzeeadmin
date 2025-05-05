import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Typography from "@/components/typography";
import { formatDate } from "@/utils/format_date";
import { ChevronDown, ShoppingCart, Package } from "lucide-react";
import { fetchUserCartById } from "../helpers/fetchUserCartById";
import { fetchUserWishlistById } from "../helpers/fetchUserWishlistById";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

const CustomerItems = ({ id }) => {
  const [viewType, setViewType] = useState("cart");

  const {
    data: cartItems = [],
    isLoading: isCartLoading,
    error: cartError,
  } = useQuery({
    queryKey: ["user-cart", id],
    queryFn: () => fetchUserCartById(id),
    enabled: viewType === "cart",
  });

  const {
    data: wishlistItems = [],
    isLoading: isWishlistLoading,
    error: wishlistError,
  } = useQuery({
    queryKey: ["user-wishlist", id],
    queryFn: () => fetchUserWishlistById(id),
    enabled: viewType === "wishlist",
  });

  const isLoading = viewType === "cart" ? isCartLoading : isWishlistLoading;
  const error = viewType === "cart" ? cartError : wishlistError;
  return (
    <div className="px-4">
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h3">Customer Details</Typography>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 px-4 py-2 rounded-md border bg-card hover:bg-accent transition-colors">
            <span className="flex items-center gap-2">
              {viewType === "cart" ? (
                <>
                  <ShoppingCart className="h-4 w-4" />
                  <span>Cart Items</span>
                </>
              ) : (
                <>
                  <Package className="h-4 w-4" />
                  <span>Wishlist</span>
                </>
              )}
            </span>
            <ChevronDown className="h-4 w-4 ml-2" />
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuLabel>View Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setViewType("cart")}>
              <ShoppingCart className="h-4 w-4 mr-2" />
              <span>Cart Items</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setViewType("wishlist")}>
              <Package className="h-4 w-4 mr-2" />
              <span>Wishlist</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <Typography>Loading...</Typography>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center">Failed to load data.</div>
      ) : viewType === "cart" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <Card key={item._id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{item.name}</CardTitle>
                      <CardDescription>
                        Added on {formatDate(item.createdAt)}
                      </CardDescription>
                    </div>
                    <div className="bg-primary/10 text-primary px-2 py-1 rounded-md">
                      <Typography variant="small" className="font-medium">
                        ₹{item.price.toFixed(2)}
                      </Typography>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-md overflow-hidden bg-gray-100">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <Typography variant="p" className="font-medium">
                        Quantity: {item.instock}
                      </Typography>
                      <Typography
                        variant="small"
                        className="text-muted-foreground"
                      >
                        Total: ${(item.price * item.instock).toFixed(2)}
                      </Typography>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t">
                  <div className="flex justify-between w-full">
                    <Typography
                      variant="small"
                      className="text-muted-foreground"
                    >
                      Item #{item.name}
                    </Typography>
                    <button className="text-sm text-primary hover:underline">
                      View Details
                    </button>
                  </div>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full flex justify-center items-center h-40">
              <Typography>No cart items found</Typography>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {wishlistItems.length > 0 ? (
            wishlistItems.map((product) => (
              <Card key={product._id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{product.name}</CardTitle>
                      <CardDescription>
                        Added on {formatDate(product.createdAt)}
                      </CardDescription>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {product.category && (
                          <span className="bg-muted text-muted-foreground px-2 py-0.5 rounded text-xs">
                            <span className="font-medium">Category:</span>{" "}
                            {product.category}
                          </span>
                        )}
                        {product.type && (
                          <span className="bg-muted text-muted-foreground px-2 py-0.5 rounded text-xs">
                            <span className="font-medium">Type:</span>{" "}
                            {product.type}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="bg-primary/10 text-primary px-2 py-1 rounded-md">
                      <Typography variant="small" className="font-medium">
                        ₹{product.price.toFixed(2)}
                      </Typography>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-md overflow-hidden bg-gray-100">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t">
                  <div className="flex justify-between w-full">
                    <Typography
                      variant="small"
                      className="text-muted-foreground"
                    >
                      Product #{product.name}
                    </Typography>
                    <button className="text-sm text-primary hover:underline">
                      View Details
                    </button>
                  </div>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full flex justify-center items-center h-40">
              <Typography>No wishlist items found</Typography>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomerItems;
