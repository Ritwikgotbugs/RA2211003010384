import axios from "axios";
import { REQUEST_TIMEOUT, API_TOKEN } from "./constants";

export const fetchFromAPI = async (url: string): Promise<number[]> => {
  try {
    const response = await axios.get(url, {
      timeout: REQUEST_TIMEOUT,
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    return response.data.numbers || [];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`Error fetching data from ${url}:`, error.message);
    } else {
      console.error(`Unknown error fetching data from ${url}:`, error);
    }
    return [];
  }
};
