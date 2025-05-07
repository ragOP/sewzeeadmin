import { apiService } from "@/api/api_service/apiService";
import { endpoints } from "@/api/endpoints";

export const fetchSellers = async ({ payload }) => {
  console.log(payload);
  try {
    const apiResponse = await apiService({
      endpoint: endpoints.sellers,
      method: "POST",
      data: payload,
    });

    if (apiResponse?.response?.sellers) {
      return apiResponse?.response?.sellers;
    }

    return [];
  } catch (error) {
    console.error(error);
  }
};
