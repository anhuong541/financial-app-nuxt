// types/nuxt.d.ts
import { AxiosRequestConfig, AxiosResponse } from "axios";
import type { Auth } from "firebase/auth";
import type { DocumentData } from "firebase/firestore";

declare module "#app" {
  interface NuxtApp {
    $axios: {
      get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
      post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
      put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
      delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    };

    $auth: Auth;
    $firestore: Firestore;
    $getFirebaseDocs: (colRef: CollectionReference<DocumentData, DocumentData>) => Promise<any>;
    $getFirebaseDoc: (docRef: DocumentReference<DocumentData, DocumentData>) => Promise<any | undefined>;
  }
}

declare module "vue" {
  interface ComponentCustomProperties {
    $axios: {
      get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
      post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
      put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
      delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    };

    $auth: Auth;
    $firestore: Firestore;
    $getFirebaseDocs: (colRef: CollectionReference<DocumentData, DocumentData>) => Promise<any>;
    $getFirebaseDoc: (docRef: DocumentReference<DocumentData, DocumentData>) => Promise<any | undefined>;
  }
}
