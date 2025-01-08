export default defineNuxtRouteMiddleware((to, from) => {
  const { $auth } = useNuxtApp();

  if (!$auth?.currentUser && to.path !== "/login") {
    return navigateTo("/login");
  }
});
