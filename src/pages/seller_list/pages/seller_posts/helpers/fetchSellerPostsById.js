import { apiService } from "@/api/api_service/apiService";
import { endpoints } from "@/api/endpoints";

export const fetchSellerPostsById = async ({id}) => {
  console.log(id);
    try {
      const apiResponse = await apiService({
        endpoint: endpoints.seller_posts,
        method: "POST",
        data: {
          sellerId: id
        }
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
  