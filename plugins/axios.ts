import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";

export default defineNuxtPlugin((nuxtApp) => {
  const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com/todos",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const getRequest = <T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => {
    return api.get<T>(url, config);
  };

  nuxtApp.provide("getRequest", getRequest);
});
