import { createPinia } from "pinia";
import { VueQueryPlugin } from "@tanstack/vue-query";

export default defineNuxtPlugin((nuxtApp) => {
  const pinia = createPinia();
  nuxtApp.vueApp.use(pinia);
  nuxtApp.provide("pinia", pinia);
  nuxtApp.vueApp.use(VueQueryPlugin);
});
