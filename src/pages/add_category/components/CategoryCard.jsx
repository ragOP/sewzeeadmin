import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { uploadCategory } from "../helpers/uploadCategory";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FileUpload from "@/components/file-upload";
import { Minus, Plus } from "lucide-react";
import { useNavigate } from "react-router";

const CategoryCard = () => {
  const [formData, setFormData] = useState({
    name: "",
    image: null,
    subCategory: [""],
  });
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({ name: false, image: false });

  const { mutate: uploadMutation, isPending: isUploading } = useMutation({
    mutationFn: (formPayload) => uploadCategory({ payload: formPayload }),
    onSuccess: () => {
      toast.success("Category added successfully.");
      setFormData({ name: "", image: null, subCategory: [""] });
      setImagePreview(null);
      navigate("/dashboard");
    },
    onError: (error) =>
      toast.error(error?.message || "Failed to add category."),
  });

  const handleFileChange = (file) => {
    setFormData((prev) => ({ ...prev, image: file }));

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);

    setErrors((prev) => ({ ...prev, image: false }));
  };

  const handleSubCategoryChange = (index, value) => {
    const updated = [...formData.subCategory];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, subCategory: updated }));
  };

  const addSubCategory = () => {
    setFormData((prev) => ({
      ...prev,
      subCategory: [...prev.subCategory, ""],
    }));
  };

  const removeSubCategory = () => {
    if (formData.subCategory.length > 1) {
      setFormData((prev) => ({
        ...prev,
        subCategory: prev.subCategory.slice(0, -1),
      }));
    }
  };

  const handleSubmit = () => {
    const hasError = {
      name: !formData.name,
      image: !formData.image,
    };
    setErrors(hasError);

    if (hasError.name || hasError.image) {
      toast.error("Please fill all required fields.");
      return;
    }

    const formPayload = new FormData();
    formPayload.append("name", formData.name);
    formPayload.append("image", formData.image);

    formData.subCategory.forEach((sub, index) => {
      if (sub.trim()) {
        formPayload.append(`sub_categories[${index}]`, sub);
      }
    });

    uploadMutation(formPayload);
  };

  return (
    <div className="p-10 max-w-4xl mx-auto my-auto w-full space-y-6 bg-white rounded-xl border border-gray-200">
      {/* Name Field */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Category Name</Label>
        <Input
          type="text"
          placeholder="Enter Category Name"
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        {errors.name && (
          <p className="text-sm text-red-500">Please enter a name.</p>
        )}
      </div>

      {/* Sub Categories */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Sub Categories</Label>
        {formData.subCategory.map((sub, index) => (
          <Input
            key={index}
            type="text"
            placeholder={`Sub Category ${index + 1}`}
            value={sub}
            onChange={(e) =>
              handleSubCategoryChange(index, e.target.value)
            }
            className="mb-2"
          />
        ))}

        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={addSubCategory}>
            <Plus className="h-4 w-4" /> Add Sub Category
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={removeSubCategory}
            disabled={formData.subCategory.length === 1}
          >
            <Minus className="h-4 w-4" /> Remove Sub Category
          </Button>
        </div>
      </div>

      {/* File Upload */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Upload Image</Label>
        <FileUpload
          defaultText="Drop your Category image here"
          acceptedFileTypes={{
            "image/jpeg": [".jpg", ".jpeg"],
            "image/png": [".png"],
          }}
          onFilesUploaded={handleFileChange}
        />
        {errors.image && (
          <p className="text-sm text-red-500">Please upload an image.</p>
        )}
      </div>

      {/* Image Preview */}
      {imagePreview && (
        <div className="space-y-1">
          <Label className="text-sm font-medium">Image Preview</Label>
          <img
            src={imagePreview}
            alt="Preview"
            className="mt-2 rounded-lg w-48 h-48 object-cover border shadow"
          />
          <p className="text-xs text-muted-foreground">
            This is a preview of the image you uploaded.
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
          {isUploading ? "Uploading..." : "Add Category"}
        </Button>
      </div>
    </div>
  );
};

export default CategoryCard;
