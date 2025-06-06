import { apiService } from "@/api/api_service/apiService";
import { endpoints } from "@/api/endpoints";

export const uploadNotification = async ({ payload }) => {
  try {
    const apiResponse = await apiService({
      endpoint: endpoints.upload_notification,
      method: "POST",
      data: payload
    });
    
    if (apiResponse?.response?.data) {
      return apiResponse?.response?.data;
    }

    return [];
  } catch (error) {
    console.error(error);
  }
};
