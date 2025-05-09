import { apiService } from "@/api/api_service/apiService";
import { endpoints } from "@/api/endpoints";

export const uploadThumbnail = async ({ payload }) => {
    console.log(payload);
  try {
    const apiResponse = await apiService({
      endpoint: endpoints.upload_thumbnail,
      method: "POST",
      data: payload
    });
    console.log(apiResponse);

    if (apiResponse?.response?.data) {
      return apiResponse?.response?.data;
    }

    return [];
  } catch (error) {
    console.error(error);
  }
};
