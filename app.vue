<template>
  <div>
    <NuxtRouteAnnouncer />
    <Toaster />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
import Toaster from '~/components/ui/toast/Toaster.vue'
import { useAuthStore } from "~/store/useAuthStore";

const { logUserOut, getMe } = useAuthStore(); // use authenticateUser action from  auth store

async function bootstrap() {
  // await getMe();
}

// bootstrap();
</script>
