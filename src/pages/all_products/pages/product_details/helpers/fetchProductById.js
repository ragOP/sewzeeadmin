import { apiService } from "@/api/api_service/apiService";
import { endpoints } from "@/api/endpoints";

export const fetchProductById = async ({ id }) => {
    console.log(id);
  try {
    const apiResponse = await apiService({
      endpoint: `${endpoints.get_product}/${id}`,
      method: "GET",
    });
    console.log(apiResponse);

    if (apiResponse?.response) {
      return apiResponse?.response[0];
    }

    return [];
  } catch (error) {
    console.error(error);
  }
};
