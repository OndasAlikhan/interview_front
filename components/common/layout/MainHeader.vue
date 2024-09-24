<template>
  <header class="border-b-border border-b-[1px] h-20 items-center flex">
    <div class="flex justify-between header-inner">
      <p class="text-3xl">TechCheck</p>
      <div v-if="authenticated" class="ml-auto flex items-center space-x-4">
        <user-nav />
      </div>
      <nuxt-link v-else to="/login">
        <s-button variant="default">Войти</s-button>
      </nuxt-link>
    </div>
  </header>
</template>
<script setup lang="ts">
import { useAuthStore } from "~/store/useAuthStore";

const { authenticated, me } = storeToRefs(useAuthStore());


</script>
<style scoped>
.header-inner {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;
}
</style>