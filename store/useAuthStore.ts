import { defineStore } from "pinia";
import { useToast } from "~/components/ui/toast";

type RegisterPayload = {
  email: string;
  name: string;
  password: string;
  password_repeat: string;
};
type SignInPayload = {
  email: string;
  password: string;
};
type Me = {
  id: number;
  name: string;
  email: string;
  created_at: string;
};

export const useAuthStore = defineStore("auth", () => {
  const router = useRouter();
  const toast = useToast();

  const authenticated = ref(false);
  const signInLoading = ref(false);
  const registerLoading = ref(false);
  const me = ref<Me>();

  const registerUser = async (payload: RegisterPayload) => {
    const { $api } = useNuxtApp();
    try {
      registerLoading.value = true;
      const { data }: any = await $api(`/register`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: payload,
      });

      if (data?.token) {
        const token = useCookie("token");
        token.value = data.token;
        authenticated.value = true;

        toast.toast({
          variant: "default",
          description: "Вы успешно авторизовались",
        });

        router.push("/");
      } else throw new Error("error getting token");
    } catch (err: any) {
      console.error("err", err);
      if (err.response?._data?.message === "invalid login")
        toast.toast({
          variant: "destructive",
          description: "Invalid email or password",
        });
      else
        toast.toast({
          variant: "destructive",
          description: "Error on login, please try again later",
        });
    } finally {
      registerLoading.value = false;
    }
  };

  const authenticateUser = async ({ email, password }: SignInPayload) => {
    const $api = useNuxtApp().$api;
    try {
      signInLoading.value = true;
      const { data }: any = await $api(`/api/v1/auth`, {
        method: "post",
        body: {
          email,
          password,
        },
      });

      if (data?.token) {
        const token = useCookie("token");
        token.value = data.token;
        authenticated.value = true;

        toast.toast({
          variant: "default",
          description: "Вы успешно авторизовались",
        });

        router.push("/");
      } else throw new Error("error getting token");
    } catch (err: any) {
      console.error("err", err);
      if (err.response?._data?.message === "invalid login")
        toast.toast({
          variant: "destructive",
          description: "Invalid email or password",
        });
      else
        toast.toast({
          variant: "destructive",
          description: "Error on login, please try again later",
        });
    } finally {
      signInLoading.value = false;
    }
  };

  const getMe = async () => {
    const { $api } = useNuxtApp();
    const token = useCookie("token");
    try {
      const { data }: any = await $api(`/api/v1/auth`, {
        method: "get",
      });
      me.value = data;
      authenticated.value = true;
    } catch (err: any) {
      if (err?.status === 401) {
        const token = useCookie("token");
        authenticated.value = false;
        me.value = undefined;
        token.value = undefined;
      }
    }
  };

  const logUserOut = () => {
    const token = useCookie("token");
    authenticated.value = false;
    me.value = undefined;
    token.value = undefined;
    toast.toast({
      variant: "default",
      description: "You have been logged out",
    });
  };

  return {
    toast,
    me,
    authenticated,
    signInLoading,
    registerLoading,
    registerUser,
    authenticateUser,
    logUserOut,
    getMe,
  };
});
