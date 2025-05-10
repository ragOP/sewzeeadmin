import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { uploadNotification } from "../helpers/uploadNotification";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FileUpload from "@/components/file-upload";
import { useNavigate } from "react-router";

const NotificationCard = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
  });

  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({
    title: false,
    description: false,
    image: false,
  });

  const { mutate: uploadMutation, isPending: isUploading } = useMutation({
    mutationFn: (formPayload) => uploadNotification({ payload: formPayload }),
    onSuccess: () => {
      toast.success("Notification sent successfully.");
      setFormData({ title: "", description: "", image: null });
      setImagePreview(null);
      navigate("/dashboard");
    },
    onError: (error) =>
      toast.error(error?.message || "Failed to send Notification."),
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

  const handleSubmit = () => {
    const hasError = {
      title: !formData.title.trim(),
      description: !formData.description.trim(),
      image: !formData.image,
    };

    setErrors(hasError);

    if (hasError.title || hasError.description || hasError.image) {
      toast.error("Please fill all required fields.");
      return;
    }

    const formPayload = new FormData();
    formPayload.append("title", formData.title);
    formPayload.append("description", formData.description);
    formPayload.append("image", formData.image);

    uploadMutation(formPayload);
  };

  return (
    <div className="p-10 max-w-4xl mx-auto my-auto w-full space-y-6 bg-white rounded-xl border border-gray-200">
      {/* Title Field */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Title</Label>
        <Input
          type="text"
          placeholder="Enter Notification title"
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
        />
        {errors.title && (
          <p className="text-sm text-red-500">Please enter title.</p>
        )}
      </div>

      {/* Description Field */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Description</Label>
        <Input
          type="text"
          placeholder="Enter Notification description"
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
        />
        {errors.description && (
          <p className="text-sm text-red-500">Please enter description.</p>
        )}
      </div>

      {/* File Upload */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Upload Image</Label>
        <FileUpload
          defaultText="Drop your Notification image here"
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
          {isUploading ? "Sending..." : "Send Notification"}
        </Button>
      </div>
    </div>
  );
};

export default NotificationCard;
