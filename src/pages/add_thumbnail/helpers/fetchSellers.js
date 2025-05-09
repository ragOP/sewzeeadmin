import { apiService } from "@/api/api_service/apiService";
import { endpoints } from "@/api/endpoints";

export const fetchSellers = async () => {
  try {
    const apiResponse = await apiService({
      endpoint: endpoints.sellers,
      method: "GET",
    });

    if (apiResponse?.response?.sellers) {
      return apiResponse?.response?.sellers;
    }

    return [];
  } catch (error) {
    console.error(error);
  }
};
