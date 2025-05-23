import { apiService } from "@/api/api_service/apiService";
import { endpoints } from "@/api/endpoints";

export const approveProductById = async ({ id }) => {
  try {
    const apiResponse = await apiService({
      endpoint: `${endpoints.approve_product}/${id}`,
      method: "PATCH",
    });

    if (apiResponse?.response?.product) {
      return apiResponse?.response?.product;
    }

    return [];
  } catch (error) {
    console.error(error);
  }
};
