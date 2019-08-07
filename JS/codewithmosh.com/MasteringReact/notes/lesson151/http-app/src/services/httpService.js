import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, error => {
  console.log("INTERCEPTOR CALLED");

  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  // Unexpected Error
  if (!expectedError) {
    console.log("Logging the error", error);
    // alert("An unexpected error occurred.");
    toast.error("An unexpected error occurred.");
  }

  // To pass control back to catch block, we need to return a "rejected promise"
  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};
