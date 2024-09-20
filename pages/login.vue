<template>
  <section class="self-center w-full flex justify-center">
    <s-card class="w-[450px] h-full">
      <s-card-header>
        <s-card-title>Sign in</s-card-title>
        <s-card-description
        >Enter your email and password to sign in</s-card-description
        >
      </s-card-header>
      <s-card-content>
        <form @submit.prevent="login">
          <div class="grid items-center w-full gap-4 mb-6">
            <div class="flex flex-col space-y-1.5">
              <s-label for="email">Email</s-label>
              <s-input id="email" v-model="user.email" />
            </div>
            <div class="flex flex-col space-y-1.5">
              <s-label for="password">Password</s-label>
              <s-input
                  id="password"
                  v-model="user.password"
                  html-type="password"
              />
            </div>
          </div>
          <div class="flex flex-col gap-3 items-center">
            <div class="w-full">
              <s-button class="w-full" :loading="signInLoading">
                Sign in
              </s-button>
            </div>
            <NuxtLink class="text-sm font-light text-blue-600 underline" to="/register">or create an account</NuxtLink>
          </div>
        </form>
      </s-card-content>
    </s-card>
  </section>
</template>
<script setup lang="ts" >
import { storeToRefs } from "pinia"; // import storeToRefs helper hook from pinia
import { useAuthStore } from "~/store/useAuthStore"; // import the auth store we just created

const { authenticateUser } = useAuthStore(); // use authenticateUser action from  auth store

const { signInLoading } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs

const user = ref({
  email: "",
  password: "",
});

const login = async () => {
  await authenticateUser(user.value); // call authenticateUser and pass the user object
};
</script>
