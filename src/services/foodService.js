import axios from "axios";

const API_URL = "https://foodapi-yej6.onrender.com/api/foods";

export const addFood = async (foodData, image) => {
  const formData = new FormData();
  formData.append("food", JSON.stringify(foodData));
  formData.append("file", image);

  try {
    await axios.post(API_URL, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  } catch (error) {
    console.error("Error while adding food", error);
    throw error;
  }
};

export const getFoodList = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error while fetching food list", error);
    throw error;
  }
};

export const deleteFood = async (foodId) => {
  try {
    const response = await axios.delete(`${API_URL}/${foodId}`);
    return response.status === 204 || response.status === 200;
  } catch (error) {
    console.error("Error while deleting food", error);
    throw error;
  }
};
