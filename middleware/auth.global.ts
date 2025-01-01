export default defineNuxtRouteMiddleware(async (to, from) => {
  // const { $auth } = useNuxtApp();
  // // Wait for the Firebase auth state to be resolved
  // const user = await new Promise((resolve) => {
  //   const unsubscribe = $auth.onAuthStateChanged((user) => {
  //     unsubscribe();
  //     resolve(user);
  //   });
  // });
  // // Redirect if no user is logged in and trying to access protected routes
  // if (!user && to.path !== "/login") {
  //   return navigateTo("/login");
  // } else {
  //   return navigateTo("/about");
  // }
  // console.log("trigger");
});

// is Learning how to use Middleware and Authentication
