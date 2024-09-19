<template>
  <main-header />

  <div class="main-layout">

    <slot></slot>
  </div>
</template>
<script setup lang="ts">

</script>
<style scoped>
.main-layout {
  margin: 0 auto;
  max-width: 1200px;
  width: 100%;
  padding: 0 20px;
}
</style>