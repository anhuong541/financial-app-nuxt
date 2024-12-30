// types/nuxt.d.ts
import { AxiosRequestConfig, AxiosResponse } from "axios";
import type { Auth } from "firebase/auth";

declare module "#app" {
  interface NuxtApp {
    $axios: {
      get<T = any>(
        url: string,
        config?: AxiosRequestConfig
      ): Promise<AxiosResponse<T>>;
      post<T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
      ): Promise<AxiosResponse<T>>;
      put<T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
      ): Promise<AxiosResponse<T>>;
      delete<T = any>(
        url: string,
        config?: AxiosRequestConfig
      ): Promise<AxiosResponse<T>>;
    };

    $firestore: Firestore;
    $auth: Auth;
  }
}

declare module "vue" {
  interface ComponentCustomProperties {
    $axios: {
      get<T = any>(
        url: string,
        config?: AxiosRequestConfig
      ): Promise<AxiosResponse<T>>;
      post<T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
      ): Promise<AxiosResponse<T>>;
      put<T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
      ): Promise<AxiosResponse<T>>;
      delete<T = any>(
        url: string,
        config?: AxiosRequestConfig
      ): Promise<AxiosResponse<T>>;
    };

    $firestore: Firestore;
    $auth: Auth;
  }
}
