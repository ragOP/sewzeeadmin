import { apiService } from "@/api/api_service/apiService";
import { endpoints } from "@/api/endpoints";

export const approveProductById = async ({ id }) => {
    console.log(id);
  try {
    const apiResponse = await apiService({
      endpoint: `${endpoints.approve_product}/${id}`,
      method: "PATCH",
    });
    console.log("from patch approve product",apiResponse);

    if (apiResponse?.response?.product) {
      return apiResponse?.response?.product;
    }

    return [];
  } catch (error) {
    console.error(error);
  }
};
