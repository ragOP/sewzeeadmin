import { apiService } from "@/api/api_service/apiService";
import { endpoints } from "@/api/endpoints";

export const fetchProducts = async ({ params }) => {
  try {
    const apiResponse = await apiService({
      endpoint: endpoints.products,
      method: "GET",
      params,
    });

    if (apiResponse?.response?.products) {
      return apiResponse?.response?.products;
    }

    return [];
  } catch (error) {
    console.error(error);
  }
};
