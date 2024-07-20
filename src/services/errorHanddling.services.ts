import axios, { AxiosError } from "axios";

/**
 * Handles the Axios error by logging the error details.
 *
 * @param error - The Axios error.
 */
export const handleAxiosError = (error: AxiosError): void => {
  if (axios.isAxiosError(error)) {
    const axiosError: AxiosError = error;
    if (axiosError.response) {
      // The request was made and the server responded with a status code outside the range of 2xx
      console.error("Request failed with status:", axiosError.response.status);
      console.error("Response data:", axiosError.response.data);
    } else if (axiosError.request) {
      // The request was made but no response was received
      console.error("No response received:", axiosError.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error during request setup:", axiosError.message);
    }
  } else {
    // This error is not an Axios error
    console.error("An error occurred:", error);
  }
};
