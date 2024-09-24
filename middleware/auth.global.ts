import { storeToRefs } from "pinia";
import { useAuthStore } from "~/store/useAuthStore";

export default defineNuxtRouteMiddleware(async (to, from) => {
  console.log("calling auth.global middleware---");
  const { getMe } = useAuthStore();
  const { authenticated, me } = storeToRefs(useAuthStore());
  const token = useCookie("accessToken");

  const UNAUTH_PAGES = ["/login"]; // accessible for unauthenticated users
  const PRIVATE_PAGES = []; // accessible for authenticated users
  const PUBLIC_PAGES = ["/"]; // accessible for everyone

  if (token.value && !me.value?.id) {
    await getMe();
  }
  // for authenticated users
  // if token exists and url is /login redirect to homepage
  if (token.value && to && UNAUTH_PAGES.includes(to.path as string)) {
    return navigateTo("/");
  }

  // for unauthenticated users
  // if token doesn't exist redirect to log in
  if (
    !token.value &&
    ![...UNAUTH_PAGES, ...PUBLIC_PAGES].includes(to?.path as string)
  ) {
    abortNavigation();
    return navigateTo("/login");
  }
});
