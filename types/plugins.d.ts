// types/nuxt.d.ts
import { AxiosRequestConfig, AxiosResponse } from "axios";

declare module "#app" {
  interface NuxtApp {
    $getRequest: <T = any>(
      url: string,
      config?: AxiosRequestConfig
    ) => Promise<AxiosResponse<T>>;
    $firestore: Firestore;
  }
}

declare module "vue" {
  interface ComponentCustomProperties {
    $getRequest: <T = any>(
      url: string,
      config?: AxiosRequestConfig
    ) => Promise<AxiosResponse<T>>;
    $firestore: Firestore;
  }
}
