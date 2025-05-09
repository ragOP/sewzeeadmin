import { useRef, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { fetchSellers } from "../../add_thumbnail/helpers/fetchSellers";
import { uploadBanner } from "../helpers/uploadBanner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import FileUpload from "@/components/file-upload";
import { cn } from "@/lib/utils";

const BannerCard = () => {
  const [formData, setFormData] = useState({
    name: "",
    image: null,
    brandId: "",
    type: "",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({ seller: false, image: false });

  const {
    data: sellers,
    isLoading: isSellersLoading,
    error: sellersError,
  } = useQuery({
    queryKey: ["sellers"],
    queryFn: fetchSellers,
    onSuccess: () => toast.success("Sellers fetched successfully."),
    onError: (error) =>
      toast.error(error?.message || "Failed to fetch sellers."),
  });

  const { mutate: uploadMutation, isPending: isUploading } = useMutation({
    mutationFn: (formPayload) => uploadBanner({ payload: formPayload }),
    onSuccess: () => {
      toast.success("Banner uploaded successfully.")
      setFormData({
        name: "",
        image: null,
        brandId: "",
        type: "",
      });
      setImagePreview(null);
    },
    onError: (error) =>
      toast.error(error?.message || "Failed to upload banner."),
  });

  const handleFileChange = (file) => {
    setFormData((prev) => ({
      ...prev,
      image: file,
    }));

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);

    setErrors((prev) => ({ ...prev, image: false }));
  };

  const handleSubmit = () => {
    const hasError = {
      seller: !formData.brandId,
      image: !formData.image,
    };

    setErrors(hasError);

    if (hasError.seller || hasError.image) {
      toast.error("Please fill all fields before submitting.");
      return;
    }

    const formPayload = new FormData();
    formPayload.append("name", formData.name);
    formPayload.append("brandId", formData.brandId);
    formPayload.append("type", formData.type);
    formPayload.append("image", formData.image);

    uploadMutation(formPayload);
  };

  return (
    <div className="p-10 max-w-4xl mx-auto my-auto w-full space-y-6 bg-white rounded-xl border border-gray-200">
      {/* Seller Dropdown */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Select Seller</label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className={cn("w-full justify-start", {
                "border-red-500": errors.seller,
              })}
            >
              {formData.name || "Choose a seller"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full max-h-60 overflow-y-auto">
            {isSellersLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            ) : sellers?.length ? (
              sellers.map((seller) => (
                <DropdownMenuItem
                  key={seller._id}
                  onClick={() =>
                    setFormData({
                      ...formData,
                      name: seller.name,
                      brandId: seller._id,
                      type: seller.business_type,
                    }) || setErrors((prev) => ({ ...prev, seller: false }))
                  }
                >
                  {seller.name}
                </DropdownMenuItem>
              ))
            ) : (
              <p className="text-sm text-red-500 px-3 py-1">No sellers found.</p>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        {errors.seller && (
          <p className="text-sm text-red-500">Please select a seller.</p>
        )}
      </div>

      {/* File Upload */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Upload Image</label>
        <FileUpload
          defaultText="Drop your banner here"
          acceptedFileTypes={{
            "image/jpeg": [".jpg", ".jpeg"],
            "image/png": [".png"],
          }}
          onFilesUploaded={(file) => handleFileChange(file)}
        />
        {errors.image && (
          <p className="text-sm text-red-500">Please upload an image.</p>
        )}
      </div>

      {/* Image Preview */}
      {imagePreview && (
        <div className="space-y-1">
          <label className="text-sm text-muted-foreground">
            Banner Preview
          </label>
          <img
            src={imagePreview}
            alt="Banner Preview"
            className="mt-2 rounded-lg w-48 h-48 object-cover border shadow"
          />
          <p className="text-xs text-muted-foreground">
            Preview of the image you've uploaded.
          </p>
        </div>
      )}

      {/* Submit Button */}
      <div className="pt-4">
        <Button
          onClick={handleSubmit}
          disabled={isUploading}
          className="w-full"
        >
          {isUploading ? "Uploading..." : "Add Banner"}
        </Button>
      </div>
    </div>
  );
};

export default BannerCard;
