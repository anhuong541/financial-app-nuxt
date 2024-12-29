export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide("hello", (msg: string) => `Hello, ${msg}!`);

  const config = useRuntimeConfig();
  //   console.log("Runtime config:", config);
});
