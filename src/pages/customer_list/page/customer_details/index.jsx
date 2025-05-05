import NavbarItem from "@/components/navbar/navbar_item";
import { useParams } from "react-router-dom";
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
import { fetchUserCartById } from "./helpers/fetchUserCartById";
import { fetchUserWishlistById } from "./helpers/fetchUserWishlistById";
import { ChevronDown, ShoppingCart, Package } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

const CustomerDetails = () => {
  const { id } = useParams();
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
    <div className="flex flex-col gap-4">
      <NavbarItem title="Customer Details" />

      <div className="px-4">
        <div className="flex justify-between items-center mb-4">
          <Typography variant="h3">Customer ID: {id}</Typography>

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
                <Card key={item.id} className="overflow-hidden">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{item.wishlist_name}</CardTitle>
                        <CardDescription>Added on {item.added_date}</CardDescription>
                      </div>
                      <div className="bg-primary/10 text-primary px-2 py-1 rounded-md">
                        <Typography variant="small" className="font-medium">
                          ${item.price.toFixed(2)}
                        </Typography>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 rounded-md overflow-hidden bg-gray-100">
                        <img
                          src={item.image_url}
                          alt={item.product_name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <Typography variant="p" className="font-medium">
                          Quantity: {item.quantity}
                        </Typography>
                        <Typography variant="small" className="text-muted-foreground">
                          Total: ${(item.price * item.quantity).toFixed(2)}
                        </Typography>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t">
                    <div className="flex justify-between w-full">
                      <Typography variant="small" className="text-muted-foreground">
                        Item #{item.id}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {wishlistItems.length > 0 ? (
              wishlistItems.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="h-48 md:w-1/3 bg-gray-100">
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{product.name}</CardTitle>
                            <CardDescription>
                              Purchased on {product.purchase_date}
                            </CardDescription>
                          </div>
                          <div className="bg-primary/10 text-primary px-2 py-1 rounded-md">
                            <Typography variant="small" className="font-medium">
                              ${product.price.toFixed(2)}
                            </Typography>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Typography variant="p">{product.description}</Typography>
                        <div className="mt-2">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              product.status === "Delivered"
                                ? "bg-green-100 text-green-800"
                                : product.status === "Shipped"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {product.status}
                          </span>
                        </div>
                      </CardContent>
                      <CardFooter className="border-t">
                        <div className="flex justify-between w-full">
                          <Typography variant="small" className="text-muted-foreground">
                            Product #{product.id}
                          </Typography>
                          <button className="text-sm text-primary hover:underline">
                            View Details
                          </button>
                        </div>
                      </CardFooter>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="col-span-full flex justify-center items-center h-40">
                <Typography>No products found</Typography>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerDetails;
