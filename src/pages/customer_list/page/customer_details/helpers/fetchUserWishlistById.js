import { apiService } from "@/api/api_service/apiService";
import { endpoints } from "@/api/endpoints";

export const fetchUserWishlistById = async (id) => {
    try {
      const apiResponse = await apiService({
        endpoint: `${endpoints.user_wishlist}/${id}`,
        method: "GET",
      });
      if (apiResponse?.response?.users) {
        return apiResponse?.response?.users;
      }
  
      return [];
    } catch (error) {
      console.error(error);
    }
  };
  