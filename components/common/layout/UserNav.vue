<script setup lang="ts">
import { storeToRefs } from "pinia"; // import storeToRefs helper hook from pinia
import { useAuthStore } from "~/store/useAuthStore"; // import the auth store we just created

const { logUserOut } = useAuthStore(); // use authenticateUser action from  auth store
const { me } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs

const logout = () => {
  logUserOut();
  navigateTo("/login");
};
</script>

<template>
  <s-dropdown-menu v-if="me">
    <s-dropdown-menu-trigger as-child>
      <s-button variant="ghost" class="relative h-8 w-8 rounded-full">
        <s-avatar class="h-8 w-8">
          <s-avatar-image alt="@" />
          <s-avatar-fallback>{{ me?.name?.[0] }}</s-avatar-fallback>
        </s-avatar>
      </s-button>
    </s-dropdown-menu-trigger>
    <s-dropdown-menu-content class="w-56" align="end">
      <s-dropdown-menu-label class="font-normal flex">
        <div class="flex flex-col space-y-1">
          <p class="text-sm font-medium leading-none">{{ me?.name }}</p>
          <p class="text-xs leading-none text-muted-foreground">
            {{ me?.email }}
          </p>
        </div>
      </s-dropdown-menu-label>
      <s-dropdown-menu-separator />
      <s-dropdown-menu-group>
        <s-dropdown-menu-item @click="navigateTo('/profile')">
          History
        </s-dropdown-menu-item>
        <s-dropdown-menu-item>
          Lobby&nbsp;<span class="text-muted-foreground">(coming soon)</span>
        </s-dropdown-menu-item>
        <!-- <s-dropdown-menuItem> Settings </s-dropdown-menuItem>
        <s-dropdown-menuItem>New Team</s-dropdown-menuItem> -->
      </s-dropdown-menu-group>
      <s-dropdown-menu-separator />
      <s-dropdown-menu-item @click="logout"> Log out </s-dropdown-menu-item>
    </s-dropdown-menu-content>
  </s-dropdown-menu>
</template>
