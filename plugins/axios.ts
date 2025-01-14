import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";

export default defineNuxtPlugin((nuxtApp) => {
  const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com/todos",
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Request Interceptor
  api.interceptors.request.use(
    (config) => {
      // Add custom headers or tokens if needed
      return config;
    },
    (error) => {
      // Ensure rejection with an Error object
      return Promise.reject(new Error(error.message || "Request error"));
    }
  );

  // Response Interceptor
  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // Ensure rejection with an Error object
      const errorMessage = error.response?.data?.message || error.message || "Response error";
      return Promise.reject(new Error(errorMessage));
    }
  );

  // Define Axios methods
  const getRequest = <T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return api.get<T>(url, config);
  };

  const postRequest = <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return api.post<T>(url, data, config);
  };

  const putRequest = <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return api.put<T>(url, data, config);
  };

  const deleteRequest = <T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return api.delete<T>(url, config);
  };

  // Provide methods to Nuxt app
  nuxtApp.provide("axios", {
    get: getRequest,
    post: postRequest,
    put: putRequest,
    delete: deleteRequest,
  });
});
